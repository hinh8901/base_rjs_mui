import React, { BaseSyntheticEvent, useState } from "react"
import { NumberFormatValues, NumericFormat, NumericFormatProps, SourceInfo } from "react-number-format"
import { TextField, TextFieldProps } from "@mui/material"

export interface InputNumberPropsPublic extends Omit<NumericFormatProps, "onChange" | "customInput" | "size" | "color" | "type" | "autoComplete"> {
  label?: string
  name?: string
  shrinkLabel?: boolean
  placeholder?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  autoComplete?: boolean
  removeTrailingZeros?: boolean
  slots?: {
    textfield?: Omit<TextFieldProps, "value" | "type" | "defaultValue">
  }
  onChange?: (values?: NumberFormatValues, sourceInfo?: SourceInfo) => void
  onBlur?: (event?: BaseSyntheticEvent) => void
  onFocus?: (event?: BaseSyntheticEvent) => void
  numericFormatType?: NumericFormatProps["type"] // text | tel | password. Use this prop in case when want to pass `type` to NumericFormat Component
}

export interface InputNumberProps extends InputNumberPropsPublic {
  value: string
  onChangeFormInput?: (value: string) => void
  onBlurFormInput?: (event?: BaseSyntheticEvent) => void
  onFocusFormInput?: () => void
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(props, ref) {
  const {
    label, name, shrinkLabel, value, onChange, onFocus, onBlur,
    placeholder, disabled, error, helperText, autoComplete,
    onChangeFormInput, onBlurFormInput, onFocusFormInput, slots,
    numericFormatType = "text",
    ...restProps
  } = props

  const [numericValues, setNumericValues] = useState<NumberFormatValues>()

  // isShrinkLabel: true is mock data. It will be replaced by conditional expression when apply for all text input.
  const isShrinkLabel = false || shrinkLabel

  const handleOnFocus = (event: BaseSyntheticEvent) => {
    onFocus?.(event)
    onFocusFormInput?.()
  }

  const handleOnChange = (values: NumberFormatValues, sourceInfo: SourceInfo) => {
    const { value } = values
    onChange?.(values, sourceInfo)
    onChangeFormInput?.(value)
    setNumericValues(values)
  }

  const handleOnBlur = (event: BaseSyntheticEvent) => {
    onBlur?.(event)
    onBlurFormInput?.(event)
    onChangeFormInput?.(numericValues?.floatValue?.toString() ?? "")
  }

  const textFieldPropsCustom = {
    fullWidth: true,
    inputRef: ref,
    label,
    name,
    placeholder,
    disabled,
    error,
    helperText,
    autoComplete: autoComplete ? "on" : "off",
    ...slots?.textfield,
    InputLabelProps: {
      shrink: isShrinkLabel,
      ...slots?.textfield?.InputLabelProps,
    },
    inputProps: {
      ...slots?.textfield?.inputProps,
    },
    sx: {
      marginBottom: 3,
      ...slots?.textfield?.sx
    }
  }

  return (
    <NumericFormat
      type={numericFormatType}
      value={value}
      customInput={TextField}
      onValueChange={handleOnChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...textFieldPropsCustom}
      {...restProps}
    />
  )
})

export default InputNumber
