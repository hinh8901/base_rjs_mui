import React, { useState } from "react"
import { TextField, TextFieldProps } from "@mui/material"
import { DatePicker, LocalizationProvider, LocalizationProviderProps, DatePickerProps } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import moment from "moment"

type DatePickerMomentProps = DatePickerProps<moment.Moment, moment.Moment>

export interface InputDatePropsPublic {
  label?: string
  shrinkLabel?: boolean
  placeholder?: string
  helperText?: string
  disabled?: boolean
  maxDate?: DatePickerMomentProps["maxDate"]
  minDate?: DatePickerMomentProps["minDate"]
  inputFormat?: DatePickerMomentProps["inputFormat"]
  outputFormat?: DatePickerMomentProps["inputFormat"]
  error?: boolean
  required?: boolean
  editTextInput?: boolean
  slots?: {
    localizationProvider?: LocalizationProviderProps
    datePickder?: DatePickerMomentProps
    textField?: TextFieldProps
  }

  onChange?: DatePickerMomentProps["onChange"]
}

export interface InputDateProps extends InputDatePropsPublic {
  value: DatePickerMomentProps["value"]
  onChangeFormInput?: (value: string) => void
  onBlurFormInput?: () => void
  onFocusFormInput?: () => void
}

const DEFAULT_DATE_FORMAT = "DD/MM/YYYY"

const InputDate = React.forwardRef<HTMLInputElement, InputDateProps>(function InputDate(props, ref) {
  const {
    label, shrinkLabel, value, placeholder, helperText, disabled, error,
    inputFormat = DEFAULT_DATE_FORMAT, outputFormat = DEFAULT_DATE_FORMAT,
    onChange, onChangeFormInput, onBlurFormInput, onFocusFormInput,
    required, editTextInput, slots, ...restProps
  } = props

  const [openDateDialog, setOpenDateDialog] = useState(false)

  // isShrinkLabel: true is mock data. It will be replaced by conditional expression when apply for all text input.
  const isShrinkLabel = false || shrinkLabel

  const handleOpenDateDialog = () => {
    if (disabled) return false
    setOpenDateDialog(true)
    onFocusFormInput?.()

  }

  const handleCloseDateDialog = () => {
    setOpenDateDialog(false)
    onBlurFormInput?.()
  }

  const handleClickTextField = () => {
    if (editTextInput) return
    handleOpenDateDialog()
  }

  const onChangeHandle = (value: moment.Moment | null, keyboardInputValue: string | undefined) => {
    const dateFormatted = moment(value).format(outputFormat)
    onChangeFormInput?.(dateFormatted)
    onChange?.(value, keyboardInputValue)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} {...slots?.localizationProvider}>
      <DatePicker
        value={moment(value, inputFormat)}
        open={openDateDialog}
        inputFormat={inputFormat}
        onOpen={handleOpenDateDialog}
        onClose={handleCloseDateDialog}
        onChange={onChangeHandle}
        inputRef={ref}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              {...slots?.textField}
              label={label}
              fullWidth
              InputLabelProps={{
                ...params.InputLabelProps,
                shrink: isShrinkLabel,
                ...slots?.textField?.InputLabelProps
              }}
              required={required}
              error={error}
              helperText={helperText}
              onClick={handleClickTextField}
              inputProps={{
                ...params.inputProps,
                readOnly: !editTextInput,
                placeholder: placeholder ? placeholder : `Chọn ${label}`,
                ...slots?.textField?.inputProps
              }}
            />
          )
        }}
        disabled={disabled}
        {...restProps}
        {...slots?.datePickder}
      />
    </LocalizationProvider>
  )
})

export default InputDate
