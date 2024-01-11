import React, { useId, useMemo, BaseSyntheticEvent, ElementType } from "react"
import {
  MenuItem,
  Select,
  SelectProps,
  MenuItemProps,
  Chip,
  Box,
  SelectChangeEvent,
  OutlinedInput
} from "@mui/material"

import Utils from "@/utils/Utils"
import { GeneralProps, OptionAsObject } from "../../types"
import LoadingComponent from "../LoadingComponent"

export interface NormalSelectSlots {
  select?: SelectProps
  menuItem?: MenuItemProps
}

export interface SelectWithoutSearchingProps extends GeneralProps {
  labelId: string
  iconComponent: ElementType
  onOpen: (event: BaseSyntheticEvent) => void
  onBlur: (event: BaseSyntheticEvent) => void
  onClose: (event: BaseSyntheticEvent) => void
  onChange: (event: SelectChangeEvent<unknown>) => void
  slots?: NormalSelectSlots
  isOptionsAsArrayOfObject: boolean
}

const SelectWithoutSearching = React.forwardRef<HTMLInputElement, SelectWithoutSearchingProps>(function SelectWithoutSearching(props: SelectWithoutSearchingProps, ref) {
  const {
    label, labelId, options = [], propertyLabel = "label", propertyValue = "value",
    value, onOpen, onClose, onChange, multiple, shrinkLabel, iconComponent,
    isOptionsAsArrayOfObject, loading, noOptionText, placeholder, slots,
    ...restProps
  } = props

  const id = useId()

  const valueOfSelect = useMemo(() => {
    if (!multiple) return value
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }, [multiple, value])

  const renderValueInMultipleCase = (value: (string | number)[]) => {
    let selectedOptions = value
    if (isOptionsAsArrayOfObject) {
      selectedOptions = value.map((item) => {
        const option = Utils.findItemByPropertyValue(item, propertyValue, options as OptionAsObject[]) as OptionAsObject[]
        return option[0][propertyLabel]
      })
    }
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selectedOptions.map((option) => <Chip key={option} label={option} />)}
      </Box>
    )
  }

  const renderValueInSingleCase = (value: string | number) => {
    if (isOptionsAsArrayOfObject) {
      const selected = Utils.findItemByPropertyValue(value, propertyValue, options as OptionAsObject[]) as OptionAsObject[]
      return selected ? selected[0][propertyLabel] : null
    }
    return value
  }

  const renderValue = (value: unknown) => {
    if (!value && value !== 0 || Array.isArray(value) && value.length < 1)
      return placeholder ?? `Chọn ${label}`

    return multiple ?
      renderValueInMultipleCase(value as (string | number)[]) :
      renderValueInSingleCase(value as string | number)
  }

  const optionRendered = useMemo(() => {
    if (loading) return <LoadingComponent />
    if (options.length < 1) return <MenuItem disabled {...slots?.menuItem}>{noOptionText}</MenuItem>

    if (!isOptionsAsArrayOfObject)
      return (options as (string | number)[]).map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)

    return (options as OptionAsObject[]).map(option => {
      const label = option[propertyLabel]
      const value = option[propertyValue]
      return <MenuItem key={`${label}-${value}`} value={value}>{option[propertyLabel]}</MenuItem>
    })
  }, [loading, options, slots?.menuItem, noOptionText])

  return (
    <Select
      labelId={labelId}
      id={id}
      IconComponent={iconComponent}
      label={label}
      onOpen={onOpen}
      onClose={onClose}
      onChange={onChange}
      value={valueOfSelect}
      multiple={multiple}
      renderValue={renderValue}
      displayEmpty={shrinkLabel}
      error={props.error}
      input={<OutlinedInput notched={shrinkLabel} label={label} />}
      inputRef={ref}
      {...restProps}
      {...slots?.select}
    >
      {optionRendered}
    </Select>
  )
})

export default SelectWithoutSearching
