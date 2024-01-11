import React, { useMemo, useCallback, CSSProperties, BaseSyntheticEvent, HTMLAttributes, ReactNode } from "react"
import {
  Autocomplete,
  TextField,
  AutocompleteProps,
  TextFieldProps,
  AutocompleteCloseReason,
  AutocompleteOwnerState,
  AutocompleteRenderOptionState,
  AutocompleteChangeReason
} from "@mui/material"
import styled from "styled-components"

import Utils from "@/utils/Utils"
import { GeneralProps, Option, OptionAsObject } from "../../types"
import LoadingComponent from "../LoadingComponent"

export interface SearchingSelectSlots {
  autocomplete?: Omit<AutocompleteProps<Option, boolean, boolean, boolean>, "multiple" | "options" | "renderInput">
  textField?: TextFieldProps
  autocompleteItem?: CSSProperties
  autocompleteNoItem?: CSSProperties
}

export type OnChangeValue = Option | Option[] | (string | number)[] | null

export interface SelectWithSearchingProps extends GeneralProps {
  onOpen: (event: BaseSyntheticEvent) => void
  onBlur: (event: BaseSyntheticEvent) => void
  onClose: (event: BaseSyntheticEvent, reason: AutocompleteCloseReason) => void
  onChange: (value: OnChangeValue, event: BaseSyntheticEvent, reason: AutocompleteChangeReason) => void
  popupIcon: ReactNode
  slots?: SearchingSelectSlots
  isOptionsAsArrayOfObject: boolean
}

const SelectWithSearching = React.forwardRef<HTMLInputElement, SelectWithSearchingProps>(function SelectWithSearching(props: SelectWithSearchingProps, ref) {
  const {
    label, shrinkLabel, required, options = [], value, error, placeholder,
    propertyLabel = "label", propertyValue = "value", onChange, slots,
    multiple, isOptionsAsArrayOfObject, loading, noOptionText, ...restProps
  } = props

  const renderValueInMultipleCase = useCallback(() => {
    if (!Array.isArray(value)) return []

    if (isOptionsAsArrayOfObject)
      return value.reduce((selectedValues: Option[], item: string | number) => {
        const option = Utils.findItemByPropertyValue(item, propertyValue, options as OptionAsObject[])
        if (option) selectedValues.push(option[0])
        else if (slots?.autocomplete?.freeSolo) selectedValues.push(item)
        return selectedValues
      }, [])

    return value

  }, [isOptionsAsArrayOfObject, value, propertyValue, options, slots?.autocomplete?.freeSolo])

  const renderValueInSingleCase = useCallback(() => {
    if (isOptionsAsArrayOfObject) {
      const option = Utils.findItemByPropertyValue(value.toString(), propertyValue, options as OptionAsObject[]) as OptionAsObject[]
      if (option) return option[0]
      else if (slots?.autocomplete?.freeSolo) return value as string
    }
    return value as string
  }, [isOptionsAsArrayOfObject, value, propertyValue, options, slots?.autocomplete?.freeSolo])

  const valueRendered = useMemo(
    () => multiple ?
      renderValueInMultipleCase() :
      renderValueInSingleCase()
    , [multiple, renderValueInMultipleCase, renderValueInSingleCase]
  )

  const onChangeInMultipleCase = (event: BaseSyntheticEvent, value: OnChangeValue, reason: AutocompleteChangeReason) => {
    if (!value) return false

    let newValue = value
    if (isOptionsAsArrayOfObject && Array.isArray(value)) {
      newValue = (value as Option[]).reduce((result: Option[], item) => {
        if (typeof item === "object") result.push(item[propertyValue])
        else if (slots?.autocomplete?.freeSolo) result.push(item)
        return result
      }, [])
    }

    onChange(newValue, event, reason)
  }

  const onChangeInSingleCase = (event: BaseSyntheticEvent, value: Option | null, reason: AutocompleteChangeReason) => {
    if (!value) return false

    let newValue = value
    if (typeof value === "object") newValue = value[propertyValue]

    onChange(newValue, event, reason)
  }

  const handleOnChange = (event: BaseSyntheticEvent, value: OnChangeValue, reason: AutocompleteChangeReason) => {
    multiple ? onChangeInMultipleCase(event, value as Exclude<OnChangeValue, Option>, reason) : onChangeInSingleCase(event, value as Option | null, reason)
  }

  const renderLabel = (option: Option) => {
    switch (typeof option) {
      case "string":
      case "number":
        return option.toString()

      case "object":
      default:
        return option[propertyLabel].toString()
    }
  }

  const renderOption = (
    { className, ...restProps }: HTMLAttributes<HTMLLIElement>,
    option: Option,
    { selected }: AutocompleteRenderOptionState,
    _state: AutocompleteOwnerState<Option, boolean, boolean, boolean>
  ) => {
    return (
      <AutoCompleteItem
        selected={selected}
        {...restProps}
        style={{
          ...slots?.autocompleteItem
        }}
      >
        {renderLabel(option)}
      </AutoCompleteItem>
    )
  }

  const noOptionTextRendered = useMemo(() => {
    if (loading) return <LoadingComponent />
    return <NoDataItem style={{ ...slots?.autocompleteNoItem }}>{noOptionText}</NoDataItem>
  }, [loading, options, slots?.autocompleteNoItem, noOptionText])

  return (
    <Autocomplete
      options={options}
      freeSolo={slots?.autocomplete?.freeSolo}
      getOptionLabel={renderLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          error={error}
          required={required}
          placeholder={placeholder ?? `Chọn ${props.label}`}
          InputLabelProps={{
            shrink: shrinkLabel
          }}
          inputRef={ref}
          {...slots?.textField}
        />
      )}
      disableClearable
      disablePortal
      renderOption={renderOption}
      noOptionsText={noOptionTextRendered}
      openOnFocus
      onChange={handleOnChange}
      value={valueRendered}
      multiple={multiple}
      {...restProps}
      {...slots?.autocomplete}
    />
  )
})

export default SelectWithSearching

const AutoCompleteItem = styled.li<{ selected: boolean }>``

const NoDataItem = styled.li``
