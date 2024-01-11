import React, { BaseSyntheticEvent, FC, useState } from "react"
import { Control, useController, useFormContext } from "react-hook-form"
import { useActiveFormContext } from "@/hooks/useFormActive"

import InputText, { InputTextProps, InputTextPropsPublic } from "./InputText"
import InputNumber, { InputNumberProps, InputNumberPropsPublic } from "./InputNumber"
import InputSelect, { InputSelectProps, InputSelectPropsPublic } from "./InputSelect"
import InputCheckbox, { InputCheckboxProps, InputCheckboxPropsPublic } from "./InputCheckbox"
import InputRadio, { InputRadioProps, InputRadioPropsPublic } from "./InputRadio"
import InputDate, { InputDateProps, InputDatePropsPublic } from "./InputDate"

type InputTypes = "text" | "number" | "select" | "checkbox" | "radio" | "date"

type BaseProps = {
  label?: string
  name: string
  defaultValue?: any
  required?: boolean
  control?: Control
  disabled?: boolean
  errorMessage?: string
  clearErrorOnFocus?: boolean
}

type FormInputProps<T extends keyof InputComponentPropsMap> =
  T extends "text" ? { type: T } & BaseProps & InputTextPropsPublic :
  T extends "number" ? { type: T } & BaseProps & InputNumberPropsPublic :
  T extends "select" ? { type: T } & BaseProps & InputSelectPropsPublic :
  T extends "checkbox" ? { type: T } & BaseProps & InputCheckboxPropsPublic :
  T extends "radio" ? { type: T } & BaseProps & InputRadioPropsPublic :
  T extends "date" ? { type: T } & BaseProps & InputDatePropsPublic :
  never

type InputComponentPropsMap = {
  text: InputTextProps
  number: InputNumberProps
  select: InputSelectProps
  checkbox: InputCheckboxProps
  radio: InputRadioProps
  date: InputDateProps
}

type InputComponents<T extends keyof InputComponentPropsMap> = {
  [K in T]: FC<InputComponentPropsMap[K]>
}

const InputComponents: InputComponents<InputTypes> = {
  text: InputText,
  number: InputNumber,
  select: InputSelect,
  checkbox: InputCheckbox,
  radio: InputRadio,
  date: InputDate
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps<InputTypes>>(function FormInput(props, ref) {
  const {
    type = "text", control, name, defaultValue, disabled = false, helperText,
    errorMessage, clearErrorOnFocus, ...restProps
  } = props

  const [hideErrorStatus, setHideErrorStatus] = useState(false)
  const { active } = useActiveFormContext()
  const methodHookForm = useFormContext()

  const controlHookForm = control || methodHookForm?.control
  if (!controlHookForm) throw new Error("control(react-hook-form) is required")

  const {
    field: { onChange, onBlur, ref: refHookForm, ...restFieldHookForm },
    fieldState,
    formState
  } = useController({ name, control: controlHookForm, defaultValue })

  const onChangeFormInput = (value: any) => {
    onChange(value)
  }

  const onBlurFormInput = (event: BaseSyntheticEvent) => {
    clearErrorOnFocus && setHideErrorStatus(false)
    onBlur()
  }

  const onFocusFormInput = () => {
    clearErrorOnFocus && setHideErrorStatus(true)
  }

  const inputProps: any = {
    error: hideErrorStatus ? false : !!errorMessage,
    onChangeFormInput,
    onBlurFormInput,
    onFocusFormInput,
    disabled: !active || disabled,
    helperText: hideErrorStatus ? helperText || null : errorMessage || helperText || null,
    ref: ref || refHookForm,
    ...restFieldHookForm,
    ...restProps
  }

  const Input = InputComponents[type]

  return <Input {...inputProps} />
})

export default FormInput
