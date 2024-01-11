import { Dispatch, SetStateAction } from "react"
import { CommonModalState } from "../../types"

export interface ActionProps {
  footer: CommonModalState["footer"]
  okText: CommonModalState["okText"]
  onOk: CommonModalState["onOk"]
  cancelText: CommonModalState["cancelText"]
  onCancel: CommonModalState["onCancel"]
  hiddenArea: CommonModalState["hiddenArea"]
  setConfig: Dispatch<SetStateAction<CommonModalState>>
}
