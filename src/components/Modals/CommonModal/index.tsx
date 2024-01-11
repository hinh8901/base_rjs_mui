import React, { useState, SyntheticEvent, forwardRef, useImperativeHandle } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import styled from "styled-components"

import { ACTION_AREA, CommonModalState, PROPS_CONFIG_TYPES, PropsConfigIF } from "./types"
import { GlobalModalRefIF } from "../GlobalModal/types"

import Action from "./partials/Action"
import Backdrop from "@/components/Backdrop"

const PROPS_CONFIG: PropsConfigIF = {
  [PROPS_CONFIG_TYPES.DEFAULT]: {},
}

const INIT_CONFIG: CommonModalState = {
  open: false,
  closable: true,
  children: null,
  hiddenArea: [
    ACTION_AREA.ACCEPT_BUTTON,
    ACTION_AREA.CANCEL_BUTTON,
    ACTION_AREA.BACKDROP,
    ACTION_AREA.CLOSE_ICON
  ],
  keepData: false,
  propsConfig: PROPS_CONFIG_TYPES.DEFAULT
}

const CommonModal = forwardRef<GlobalModalRefIF>(function CommonModal(_props, ref) {
  const [config, setConfig] = useState<CommonModalState>(INIT_CONFIG)

  const isCloseWhenClickBackdrop = config?.hiddenArea?.includes(ACTION_AREA.BACKDROP)
  const propsConfigData = PROPS_CONFIG[config.propsConfig ?? PROPS_CONFIG_TYPES.DEFAULT]

  const closeModal = () => {
    setConfig(prev => ({ ...prev, open: false }))
  }

  const onClose = (_e: SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === "backdropClick" && isCloseWhenClickBackdrop) {
      closeModal()
    }
  }

  const clearModalData = () => !config.keepData && setConfig(INIT_CONFIG)

  useImperativeHandle(ref, () => {
    return {
      open: (config: Omit<CommonModalState, "open">) => {
        setConfig(prev => ({ ...prev, ...config, open: true }))
      },
      close: closeModal
    }
  })

  return (
    <Dialog
      open={config.open}
      slots={{ backdrop: Backdrop }}
      onClose={onClose}
      onTransitionExited={clearModalData}
      {...propsConfigData?.dialog}
    >
      {
        config.closable &&
        <IconButton edge="end" onClick={closeModal}
          sx={{
            position: 'absolute',
            right: 18,
            top: 10,
          }}
          {...propsConfigData.closeIcon}
        >
          {config.closeIcon || propsConfigData.closeIcon?.children || <CloseIcon />}
        </IconButton>
      }
      <DialogTitle {...propsConfigData?.title}>{config.title}</DialogTitle>
      <DialogContent {...propsConfigData?.content}>
        {config.children}
      </DialogContent>
      <DialogActions {...propsConfigData?.action}>
        <Action
          footer={config.footer}
          okText={config.okText}
          cancelText={config.cancelText}
          onOk={config.onOk}
          onCancel={config.onCancel}
          hiddenArea={config.hiddenArea}
          setConfig={setConfig}
        />
      </DialogActions>
    </Dialog>
  )
})

export default CommonModal

const BackdropStyled = styled(Backdrop)`
  z-index: -1;
`