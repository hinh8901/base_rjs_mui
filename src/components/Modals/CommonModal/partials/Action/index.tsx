import React, { isValidElement } from "react"
import { Button } from "@mui/material"

import { ActionProps } from "./types"
import { ACTION_AREA, COMPONENT_TYPE } from "../../types"

const Action = (props: ActionProps) => {
  const {
    footer = COMPONENT_TYPE.DEFAULT,
    okText = "OK",
    cancelText = "Cancel",
    onOk,
    onCancel,
    hiddenArea,
    setConfig
  } = props
  const isCloseWhenClickCancelBtn = hiddenArea?.includes(ACTION_AREA.CANCEL_BUTTON)
  const isCloseWhenClickAcceptBtn = hiddenArea?.includes(ACTION_AREA.ACCEPT_BUTTON)

  const closeModal = () => {
    setConfig(prev => ({ ...prev, open: false }))
  }

  const handleOnCancel = () => {
    onCancel && onCancel()
    isCloseWhenClickCancelBtn && closeModal()
  }

  const handleOnOk = () => {
    onOk && onOk()
    isCloseWhenClickAcceptBtn && closeModal()
  }

  switch (footer) {
    case undefined:
    case null:
      return null

    case COMPONENT_TYPE.DEFAULT:
      return (
        <>
          {cancelText && <Button onClick={handleOnCancel}>{cancelText}</Button>}
          {okText && <Button onClick={handleOnOk} autoFocus>{okText}</Button>}
        </>
      )

    default:
      if (isValidElement(footer)) return footer
      return <>{footer}</>
  }
}

export default Action