import React from "react"
import CommonModal from "../CommonModal"

import { GlobalModalRefIF } from "./types"

const globalModalRef = React.createRef<GlobalModalRefIF>()
export const globalModal: GlobalModalRefIF = {
  open: (config) => {
    globalModalRef.current?.open ?
      globalModalRef.current?.open(config) :
      console.log("%cThe global modal requests to be opened", "color: green")
  },
  close: () => {
    globalModalRef.current?.close ?
      globalModalRef.current?.close() :
      console.log("%cThe global modal requests to be closed", "color: red")
  }
}

const GlobalModal = () => {
  return <CommonModal ref={globalModalRef} />
}

export default GlobalModal