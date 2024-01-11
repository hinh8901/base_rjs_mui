import React from "react"
import { List } from "@mui/material"

import { MenuProps } from "./types"

import MenuComponent from "./style"

const Menu = (props: MenuProps) => {
  const {
    open = false, mode = "temporary", slots, children,
    collapse = false, width = 280, collapsedWidth = 66
  } = props
  return (
    <MenuComponent
      open={open}
      variant={mode}
      width={width}
      collapse={collapse}
      collapsedWidth={collapsedWidth}
      {...slots?.drawer}
    >
      <List {...slots?.list}>
        {children}
      </List>
    </MenuComponent>
  )
}

export default Menu