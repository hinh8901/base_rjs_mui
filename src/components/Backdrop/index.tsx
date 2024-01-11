import React from "react"
import { Backdrop as BackdropMUI, BackdropProps } from "@mui/material"
import Colors from "@/themes/Colors"

const Backdrop = (props: BackdropProps) => {
  const { sx, ...restProps } = props

  return (
    <BackdropMUI
      sx={{ backgroundColor: Colors.backdrop, backdropFilter: "blur(3px)", ...sx }}
      {...restProps}
    />
  )
}

export default Backdrop