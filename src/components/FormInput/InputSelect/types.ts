export type OptionAsObject = Record<string, string | number>

export type Option = OptionAsObject | string | number

export interface GeneralProps {
  label?: string
  shrinkLabel?: boolean
  required?: boolean
  options: OptionAsObject[] | (string | number)[]
  value: string | number | (string | number)[]
  disabled?: boolean
  error?: boolean
  placeholder?: string
  propertyLabel?: string
  propertyValue?: string
  multiple?: boolean
  loading?: boolean
  noOptionText?: string
}
