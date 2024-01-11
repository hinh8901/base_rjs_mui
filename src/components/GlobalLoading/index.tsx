import React, { useState, useImperativeHandle, ReactNode } from "react"
import { CircularProgress } from "@mui/material"

import Backdrop from "../Backdrop"
import CanView from "../CanView"

interface GlobalLoadingAction {
  show: (children?: ReactNode) => void
  hide: () => void
}

const globalLoadingRef = React.createRef<GlobalLoadingAction>()

const GlobalLoadingComponent = React.forwardRef<GlobalLoadingAction>(function GlobalLoadingComponent(_props, ref) {
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false)
  const [children, setChildren] = useState<ReactNode | null>(null)

  useImperativeHandle(ref, () => ({
    show: (children = null) => {
      setIsShowLoading(true)
      setChildren(children)
    },
    hide: () => setIsShowLoading(false)
  }))

  return (
    <Backdrop open={isShowLoading} sx={{ zIndex: 9999 }}>
      <CanView
        condition={!!children}
        fallback={<CircularProgress />}
      >
        {children}
      </CanView>
    </Backdrop>
  )
})

const GlobalLoading = () => <GlobalLoadingComponent ref={globalLoadingRef} />

export default GlobalLoading

export const globalLoading: GlobalLoadingAction = {
  show: (children) => globalLoadingRef.current?.show(children),
  hide: () => globalLoadingRef.current?.hide()
}