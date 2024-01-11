import React, { useId, useMemo, ChangeEvent } from "react"
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  FormControlProps,
  FormLabelProps,
  RadioGroupProps,
  FormControlLabelProps,
  RadioProps
} from "@mui/material"

import CanView from "@/components/CanView"

type OptionAsObject = Record<string, string | number>

export interface InputRadioPropsPublic {
  options: OptionAsObject[] | (string | number)[]
  name?: string
  label?: string
  helperText?: string
  error?: boolean
  disabled?: boolean
  required?: boolean
  propertyLabel?: string
  propertyValue?: string
  onlyShowValue?: boolean
  onChange?: (e: ChangeEvent, value: string) => void
  slots?: {
    formControl?: FormControlProps
    formLabel?: FormLabelProps
    radioGroup?: RadioGroupProps
    formControlLabel?: FormControlLabelProps
    radio?: RadioProps
  }
}

export interface InputRadioProps extends InputRadioPropsPublic {
  value: string | number
  onChangeFormInput?: (value: string) => void
}

const InputRadio = React.forwardRef<HTMLInputElement, InputRadioProps>(function InputRadio(props, ref) {
  const {
    label, name, value, options = [], propertyLabel = "label", propertyValue = "value",
    onChange, onChangeFormInput, helperText, error, disabled, required, onlyShowValue, slots
  } = props

  const id = useId()

  const isOptionsAsArrayOfObject = useMemo(() => {
    return (options as any[]).every(item => typeof item === "object")
  }, [options])

  const radioOptions = useMemo(() => {
    if (!onlyShowValue) return options

    return isOptionsAsArrayOfObject ?
      (options as OptionAsObject[]).filter((option) => option[propertyValue] == value) :
      (options as (string | number)[]).filter((option) => option == value)
  }, [options, value, onlyShowValue, isOptionsAsArrayOfObject, propertyValue])

  const handleOnChange = (event: ChangeEvent, value: string) => {
    onChange?.(event, value)
    onChangeFormInput?.(value)
  }

  return (
    <FormControl sx={{ marginBottom: 3 }} {...slots?.formControl}>
      <FormLabel id={id} error={error} required={required} {...slots?.formLabel}>
        {label}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby={id}
        name={name}
        value={value}
        onChange={handleOnChange}
        {...slots?.radioGroup}
      >
        {
          radioOptions.map((item) => {
            const itemLabel = isOptionsAsArrayOfObject ? (item as OptionAsObject)[propertyLabel] : (item as string | number)
            const itemValue = isOptionsAsArrayOfObject ? (item as OptionAsObject)[propertyValue] : (item as string | number)
            const isChecked = itemValue == value

            return (
              <FormControlLabel
                key={`${itemLabel}-${itemValue}`}
                label={isChecked ? <Typography sx={{ fontWeight: 600 }}>{itemLabel}</Typography> : itemLabel}
                value={itemValue}
                control={
                  <Radio
                    disabled={disabled}
                    checked={isChecked}
                    inputRef={ref}
                    {...slots?.radio}
                  />
                }
                {...slots?.formControlLabel}
              />
            )
          })
        }
      </RadioGroup>
      <CanView condition={!!helperText}>
        <FormHelperText error={error} >{helperText}</FormHelperText>
      </CanView>
    </FormControl>
  )
})

export default InputRadio
