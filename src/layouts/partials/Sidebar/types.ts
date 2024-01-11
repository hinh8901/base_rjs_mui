import { ReactNode, Dispatch, SetStateAction } from "react"
import {
  DrawerProps,
  ListItemButtonProps,
  ListItemIconProps,
  ListItemProps,
} from "@mui/material"
import {
  MenuProps,
  SubMenuProps as SubMenuComponentProps,
  MenuItemProps,
  MenuItemConfiguration,
} from "@/components/Menu/types"

export interface SidebarItemConfiguration extends MenuItemConfiguration {
  href: string
  subMenu?: SidebarItemConfiguration[]
  slots?: {
    item?: ListItemProps
    itemButton?: ListItemButtonProps
    itemIcon?: ListItemIconProps
  }
  /**
   * By default, the element will be rendered as a link (Ract Router Dom Link) if it has no submenu
   * Use this prop to not render the link if desired, event if it donesn't have a submenu.
   * @default true
   */
  isRenderLink?: boolean
  closeOnClick?: boolean
}

export interface SidebarItemProps
  extends MenuItemProps,
    Omit<SidebarItemConfiguration, "subMenu"> {
  hrefMatched: boolean
  level: number
  levelIndent: SidebarProps["levelIndent"]
  menuOpenMapping: menuOpenMappingIF
  setMenuOpenMapping: Dispatch<SetStateAction<menuOpenMappingIF>>
  openOnlySubMenuMatched: boolean
}

export type ArrayOfConfigurationHref = SidebarItemConfiguration["href"][]

export interface SidebarProps extends MenuProps {
  options: SidebarItemConfiguration[]
  closeOnBackdropClick?: boolean
  minWidth?: number | string
  maxWidth?: number | string
  openOnlySubMenuMatched?: boolean
  collapsed?: boolean
  /**
   * The distance (left or right) between the item's level and its parent
   * @unit px
   */
  levelIndent?: number
}

export interface SubMenuProps
  extends Omit<SubMenuComponentProps, "isOpenSubMenu" | "isSubMenuItem"> {
  href: SidebarItemConfiguration["href"]
  defaulOpen?: boolean
  hrefMatched: boolean
  level: number
  levelIdent: SidebarProps["levelIndent"]
  menuOpenMapping: menuOpenMappingIF
  setMenuOpenMapping: Dispatch<SetStateAction<menuOpenMappingIF>>
  openOnlySubMenuMatched: boolean
}

export interface SidebarAction {
  open: () => void
  close: () => void
  toggleCollapse: () => void
}

export interface menuOpenMappingIF {
  level: number
  menuPaths: SidebarItemConfiguration["href"][]
}
