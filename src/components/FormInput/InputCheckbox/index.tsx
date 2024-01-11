import React, { ChangeEvent } from "react"
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControlProps,
  FormControlLabelProps,
  CheckboxProps
} from "@mui/material"

import CanView from "@/components/CanView"

export interface InputCheckboxPropsPublic {
  name?: string
  label?: string
  error?: boolean
  helperText?: string
  disabled?: boolean
  onChange?: (event: ChangeEvent) => void
  slots?: {
    formControl?: FormControlProps
    formControlLabel?: FormControlLabelProps
    checkbox?: CheckboxProps
  }
}

export interface InputCheckboxProps extends InputCheckboxPropsPublic {
  value: boolean
  onChangeFormInput?: (checked: boolean) => void
}

const InputCheckbox = React.forwardRef<HTMLInputElement, InputCheckboxProps>(function InputCheckbox(props, ref) {
  const {
    name, label, helperText, error, disabled, value,
    onChange, onChangeFormInput, slots
  } = props

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeFormInput?.(event.target.checked)
    onChange?.(event)
  }

  return (
    <FormControl sx={{ marginBottom: 3 }} {...slots?.formControl}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            onChange={onChangeHandle}
            inputRef={ref}
            checked={value}
            {...slots?.checkbox}
          />
        }
        label={label}
        disabled={disabled}
        {...slots?.formControlLabel}
      />
      <CanView condition={!!helperText}>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </CanView>
    </FormControl>
  )
})

export default InputCheckbox
