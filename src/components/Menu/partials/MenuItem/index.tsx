import React, { ReactNode } from "react"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import ExpandMoreIconMUI from '@mui/icons-material/ExpandMore'

import { MenuItemProps } from "../../types"

import CanView from "@/components/CanView"
import { ExpandIcon, ListItem, RotateTransition } from "./style"

const RenderExpandIcon = (props: { isOpenSubMenu: boolean, ExpandMoreIcon: ReactNode, ExpandLessIcon: ReactNode }) => {
  const { isOpenSubMenu, ExpandMoreIcon = null, ExpandLessIcon = null } = props

  if (!ExpandMoreIcon && !ExpandLessIcon) return <RotateTransition activeEffect={isOpenSubMenu}><ExpandMoreIconMUI /></RotateTransition>
  if (!!ExpandMoreIcon && !ExpandLessIcon) return <RotateTransition activeEffect={isOpenSubMenu}>{ExpandMoreIcon}</RotateTransition>
  if (!ExpandMoreIcon && !!ExpandLessIcon) return <RotateTransition activeEffect={!isOpenSubMenu}>{ExpandLessIcon}</RotateTransition>
  return <>{isOpenSubMenu ? ExpandLessIcon : ExpandMoreIcon}</>
}

const MenuItem = (props: MenuItemProps) => {
  const {
    active = false, label, Icon, Prefix, Suffix, slots,
    onClick, isSubMenuItem = false, isOpenSubMenu = false,
    ExpandMoreIcon, ExpandLessIcon
  } = props

  const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClick && onClick(event)
  }

  return (
    <ListItem {...slots?.item} onClick={handleOnClick}>
      <ListItemButton {...slots?.itemButton}>
        <CanView condition={!!Icon}>
          <ListItemIcon {...slots?.itemIcon}>{Icon}</ListItemIcon>
        </CanView>
        <CanView condition={!!Prefix}>{Prefix}</CanView>
        <CanView condition={!!label}>
          <ListItemText>{label}</ListItemText>
        </CanView>
        <CanView condition={!!Suffix}>{Suffix}</CanView>
        <CanView condition={isSubMenuItem}>
          <ExpandIcon>
            <RenderExpandIcon
              isOpenSubMenu={isOpenSubMenu}
              ExpandLessIcon={ExpandLessIcon}
              ExpandMoreIcon={ExpandMoreIcon}
            />
          </ExpandIcon>
        </CanView>
      </ListItemButton>
    </ListItem>
  )
}

export default MenuItem