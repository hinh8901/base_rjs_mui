import { ReactNode } from "react"
import {
  DrawerProps,
  ListProps,
  ListItemButtonProps,
  ListItemIconProps,
  ListItemProps,
  CollapseProps,
} from "@mui/material"

export interface MenuProps {
  open?: DrawerProps["open"]
  width?: number
  collapsedWidth?: number
  collapse?: boolean
  children?: ListProps["children"]
  mode?: DrawerProps["variant"]
  slots?: {
    drawer?: Omit<DrawerProps, "open" | "variant">,
    list?: Omit<ListProps, "children">
  }
}

export interface MenuItemConfiguration {
  label?: string
  Icon?: ReactNode
  Prefix?: ReactNode
  Suffix?: ReactNode
  ExpandMoreIcon?: ReactNode
  ExpandLessIcon?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export interface MenuItemProps extends MenuItemConfiguration {
  active?: boolean
  slots?: {
    item?: ListItemProps
    itemButton?: ListItemButtonProps
    itemIcon?: ListItemIconProps
  }
  /**
   * Specifying whether the item has a corresponding menu or not.
   * @default false
   */
  isSubMenuItem?: boolean
  /**
   * Specifying state of the corresponding menu: open (true) or close (false).
   * @default false
   */
  isOpenSubMenu?: boolean
}

export interface SubMenuProps
  extends Omit<CollapseProps, "in" | "onClick">,
    MenuItemProps {
  open?: boolean
}
