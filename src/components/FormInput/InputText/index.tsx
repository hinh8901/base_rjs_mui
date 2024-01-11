import React, { BaseSyntheticEvent } from "react"
import { TextField, TextFieldProps } from "@mui/material"

export interface InputTextPropsPublic {
  label?: string
  name?: string
  shrinkLabel?: boolean
  placeholder?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  autoComplete?: string
  reduceSpace?: boolean
  autoCapitalize?: boolean
  maxLength?: number
  slots?: {
    textfield?: TextFieldProps
  }
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  onFocus?: () => void
}

export interface InputTextProps extends InputTextPropsPublic {
  value: string
  onChangeFormInput?: (value: string) => void
  onBlurFormInput?: (event?: BaseSyntheticEvent) => void
  onFocusFormInput?: () => void
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(function InputText(props, ref) {
  const {
    shrinkLabel, onChange, onFocus, onBlur,
    onChangeFormInput, onBlurFormInput, onFocusFormInput, slots,
    reduceSpace = true, autoCapitalize = true, maxLength,
    ...restProps
  } = props

  // isShrinkLabel: true is mock data. It will be replaced by conditional expression when apply for all text input.
  const isShrinkLabel = false || shrinkLabel

  const onChangeHandle = (e: BaseSyntheticEvent) => {
    const value: string = e.target.value
    onChangeFormInput?.(value)
    onChange?.(value)
  }

  const onFocusHandle = () => {
    onFocus?.()
    onFocusFormInput?.()
  }

  const onBlurHandle = (event: BaseSyntheticEvent) => {
    let value: string = event.target.value

    if (reduceSpace) value = value.replace(/\s+/g, " ").trim()
    if (autoCapitalize) value = value.toLocaleUpperCase()

    onBlur?.(value)
    onBlurFormInput?.(event)
    onChangeFormInput?.(value)
  }

  return (
    <TextField
      fullWidth
      onChange={onChangeHandle}
      onFocus={onFocusHandle}
      onBlur={onBlurHandle}
      inputRef={ref}
      {...restProps}
      {...slots?.textfield}
      InputLabelProps={{
        shrink: isShrinkLabel,
        ...slots?.textfield?.InputLabelProps,
      }}
      inputProps={{
        maxLength,
        ...slots?.textfield?.inputProps,
      }}
      sx={{
        marginBottom: 3,
        ...slots?.textfield?.sx
      }}
    />
  )
})

export default InputText
