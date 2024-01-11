import { CommonModalState } from "../CommonModal/types"

export interface GlobalModalRefIF {
  open: (config: Omit<CommonModalState, "open">) => void
  close: () => void
}
