import React, { BaseSyntheticEvent, useId, useMemo } from "react"
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  InputLabelProps,
  AutocompleteCloseReason,
  AutocompleteChangeReason,
  SelectChangeEvent
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import SelectWithoutSearching, { NormalSelectSlots } from "./partials/SelectWithoutSearching"
import SelectWithSearching, { OnChangeValue, SearchingSelectSlots } from "./partials/SelectWithSearching"
import CanView from "@/components/CanView"
import { GeneralProps } from "./types"

export interface InputSelectPropsPublic extends Omit<GeneralProps, "value"> {
  helperText?: string
  onChange?: (arg1: OnChangeValue | SelectChangeEvent<unknown>, arg2?: BaseSyntheticEvent, arg3?: AutocompleteChangeReason) => void
  onOpen?: (event?: BaseSyntheticEvent) => void
  onBlur?: (event?: BaseSyntheticEvent) => void
  onClose?: (event?: BaseSyntheticEvent, reason?: AutocompleteCloseReason) => void
  useSearching?: boolean
  slots?: {
    formControl?: FormControlProps
    inputLabel?: InputLabelProps
    normalSelect?: NormalSelectSlots
    searchingSelect?: SearchingSelectSlots
  }
}

export interface InputSelectProps extends InputSelectPropsPublic {
  value: GeneralProps["value"]
  onChangeFormInput?: (value: OnChangeValue | SelectChangeEvent<unknown>) => void
  onBlurFormInput?: (event: BaseSyntheticEvent) => void
  onFocusFormInput?: () => void
}

const InputSelect = React.forwardRef<HTMLInputElement, InputSelectProps>(function InputSelect(props, ref) {
  const {
    shrinkLabel, helperText, onOpen, onBlur, onClose, onChange,
    onChangeFormInput, onBlurFormInput, onFocusFormInput, multiple = false, useSearching = false,
    noOptionText = "Không có dữ liệu", slots, ...restProps
  } = props

  const labelId = useId()
  const helperTextId = useId()
  // isApplySearching: false value is mock data. It will be replaced by conditional expression when apply for all select input.
  const isApplySearching = false || useSearching

  // isShrinkLabel: false is mock data. It will be replaced by conditional expression when apply for all select input.
  const isShrinkLabel = false || shrinkLabel

  const isOptionsAsArrayOfObject = useMemo(() => {
    return (restProps.options as any[]).every(item => typeof item === "object")
  }, [restProps.options])

  const handleOnOpen = (event: BaseSyntheticEvent) => {
    onOpen?.(event)
    onFocusFormInput?.()
  }

  const handleOnBlur = (event: BaseSyntheticEvent) => {
    onBlurFormInput?.(event)
    onBlur?.(event)
  }

  const handleOnClose = (event: BaseSyntheticEvent, reason?: AutocompleteCloseReason) => {
    onClose?.(event, reason)
  }

  const onChangeSelectWithSearching = (value: OnChangeValue, event: BaseSyntheticEvent, reason: AutocompleteChangeReason) => {
    onChangeFormInput?.(value)
    onChange?.(value, event, reason)
  }

  const onChangeSelectWithoutSearching = (event: SelectChangeEvent<unknown>) => {
    onChangeFormInput?.(event)
    onChange?.(event)
  }

  const handleOnChange = (arg1: OnChangeValue | SelectChangeEvent<unknown>, arg2?: unknown, arg3?: unknown) => {
    isApplySearching ?
      onChangeSelectWithSearching(arg1 as OnChangeValue, arg2 as BaseSyntheticEvent, arg3 as AutocompleteChangeReason) :
      onChangeSelectWithoutSearching(arg1 as SelectChangeEvent<unknown>)
  }

  const generalProps = {
    onOpen: handleOnOpen,
    onBlur: handleOnBlur,
    onClose: handleOnClose,
    onChange: handleOnChange,
    multiple,
    shrinkLabel: isShrinkLabel,
    isOptionsAsArrayOfObject,
    noOptionText,
    ref
  }

  return (
    <FormControl
      fullWidth
      variant="outlined"
      {...slots?.formControl}
      sx={{
        // Custom general style here
        marginBottom: 3,
        // Not edit line below
        ...slots?.formControl?.sx
      }}
    >
      <CanView
        condition={!isApplySearching}
        fallback={
          <SelectWithSearching
            popupIcon={<ExpandMoreIcon />}
            {...generalProps}
            {...restProps}
          />
        }
      >
        <InputLabel
          id={labelId}
          error={restProps.error}
          required={restProps.required}
          shrink={isShrinkLabel}
          {...slots?.inputLabel}
          sx={{
            // Custom general style here

            // Not edit line below
            ...slots?.inputLabel?.sx
          }}
        >
          <span>{restProps.label}</span>
        </InputLabel>
        <SelectWithoutSearching
          labelId={labelId}
          iconComponent={ExpandMoreIcon}
          slots={slots?.normalSelect}
          {...generalProps}
          {...restProps}
        />
      </CanView>
      <CanView condition={!!helperText}>
        <FormHelperText error={restProps.error} id={helperTextId}>
          {helperText}
        </FormHelperText>
      </CanView>
    </FormControl>
  )
})

export default InputSelect
