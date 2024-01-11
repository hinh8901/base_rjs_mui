import React from "react"
import { Collapse } from "@mui/material"

import { SubMenuProps } from "../../types"

import MenuItem from "../MenuItem"

const SubMenu = (props: SubMenuProps) => {
  const {
    open, label, Icon, Prefix, Suffix, slots,
    ExpandLessIcon, ExpandMoreIcon, onClick, ...restProps
  } = props

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClick && onClick(event)
  }

  return (
    <>
      <MenuItem
        label={label}
        Icon={Icon}
        Prefix={Prefix}
        Suffix={Suffix}
        slots={slots}
        onClick={handleClick}
        isSubMenuItem
        isOpenSubMenu={open}
        ExpandMoreIcon={ExpandMoreIcon}
        ExpandLessIcon={ExpandLessIcon}
      />
      <Collapse in={open} {...restProps} />
    </>
  )
}

export default SubMenu