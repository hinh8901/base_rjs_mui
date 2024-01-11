import { ReactNode } from "react"
import {
  DialogActionsProps,
  DialogContentProps,
  DialogProps,
  DialogTitleProps,
  IconButtonProps,
} from "@mui/material"

export enum PROPS_CONFIG_TYPES {
  DEFAULT,
}

export enum ACTION_AREA {
  CANCEL_BUTTON = "CANCEL_BUTTON",
  ACCEPT_BUTTON = "ACCEPT_BUTTON",
  CLOSE_ICON = "CLOSE_ICON",
  BACKDROP = "BACKDROP",
}

export interface PropsConfigIF {
  [key: string | number]: {
    dialog?: Omit<DialogProps, "children" | "open">
    title?: Omit<DialogTitleProps, "children">
    content?: Omit<DialogContentProps, "children">
    action?: DialogActionsProps
    closeIcon?: IconButtonProps
  }
}

export enum COMPONENT_TYPE {
  DEFAULT = "DEFAULT",
}

export interface CommonModalState {
  open: DialogProps["open"]
  /**
   * Specifying whether to display close icon or not.
   * @default true
   */
  closable?: boolean
  closeIcon?: IconButtonProps["children"]
  title?: DialogTitleProps["children"]
  children: ReactNode
  /**
   * Specifying the footer part of the modal (ok button & cancel button).
   * Can be replaced with React Node or set to null to hidden.
   * @default COMPONENT_TYPE.DEFAULT
   */
  footer?: COMPONENT_TYPE.DEFAULT | ReactNode
  okText?: ReactNode
  onOk?: () => void
  cancelText?: ReactNode
  onCancel?: () => void
  /**
   * Specifying where to click to hide the modal.
   * @default All - includes backrop, close icon, ok button & cancel button
   */
  hiddenArea?: Array<ACTION_AREA>
  /**
   * Specifying props to custom the modal.
   */
  propsConfig?: PROPS_CONFIG_TYPES
  keepData?: boolean
  /**
   * Specifies whether to clear data when modal hidden.
   * @default false - To ensure performance, it is recommended to set value to false
   */
}
