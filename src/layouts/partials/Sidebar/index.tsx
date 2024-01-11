import React, { useMemo, useState, useImperativeHandle, ForwardedRef, useCallback } from "react"
import { useLocation } from "react-router-dom"

import { ArrayOfConfigurationHref, SidebarAction, SidebarProps, menuOpenMappingIF } from "./types"

import SubMenu from "./partials/SubMenu"
import MenuItem from "./partials/MenuItem"
import { Backdrop } from "@/components"
import Menu from "@/components/Menu"

const sidebarRef = React.createRef<SidebarAction>()

const SIDEBAR_WIDTH = 280
const SIDEBAR_COLLAPSED_WIDTH = 66

const SidebarComponent = React.forwardRef(function SidebarComponent(props: SidebarProps, ref: ForwardedRef<SidebarAction>) {
  const {
    options, closeOnBackdropClick = true, openOnlySubMenuMatched = true,
    mode = "temporary", levelIndent = 24
  } = props
  const [open, setOpen] = useState<boolean>(false)
  const [collapse, setCollapse] = useState<boolean>(false)
  const { pathname } = useLocation()

  const flatOptionsRelationship = (options: SidebarProps['options'], parentHref: ArrayOfConfigurationHref = []) => {
    const flatResult: ArrayOfConfigurationHref[] = []
    options.forEach((option) => {
      const { subMenu, href } = option
      if (!subMenu || subMenu.length < 1) return parentHref ?
        flatResult.push([...parentHref, href]) :
        flatResult.push([href])

      flatResult.push(...flatOptionsRelationship(subMenu, [...parentHref, href]))
    })
    return flatResult
  }

  const flatRelationship = useMemo(() => flatOptionsRelationship(options), [options])

  const arrayOfHrefMatched = useMemo(() => {
    return flatRelationship.find((path) => path[path.length - 1] === pathname)
  }, [options, pathname, flatRelationship])

  const [menuOpenMapping, setMenuOpenMapping] = useState<menuOpenMappingIF>(() => {
    const isMatchedHref = !!arrayOfHrefMatched
    const intendedLevel = isMatchedHref ? arrayOfHrefMatched.length - 1 : 1
    return {
      level: intendedLevel > 1 ? intendedLevel : 1,
      menuPaths: isMatchedHref ? arrayOfHrefMatched.slice(0, arrayOfHrefMatched.length - 1) : []
    }
  })

  const renderMenu = useCallback((options: SidebarProps['options'], parentLevel: number = 0) => {
    return options.map((option) => {
      const { subMenu, href, ...restProps } = option
      const isHrefMatched = arrayOfHrefMatched?.includes(href)
      if (!subMenu || subMenu.length < 1) return (
        <MenuItem
          key={href}
          href={href}
          hrefMatched={!!isHrefMatched}
          level={parentLevel + 1}
          levelIndent={levelIndent}
          menuOpenMapping={menuOpenMapping}
          setMenuOpenMapping={setMenuOpenMapping}
          openOnlySubMenuMatched={openOnlySubMenuMatched}
          {...restProps}
        />
      )
      return (
        <SubMenu
          key={href}
          href={href}
          hrefMatched={!!isHrefMatched}
          level={parentLevel + 1}
          levelIdent={levelIndent}
          menuOpenMapping={menuOpenMapping}
          setMenuOpenMapping={setMenuOpenMapping}
          openOnlySubMenuMatched={openOnlySubMenuMatched}
          {...restProps}
        >
          {renderMenu(subMenu, parentLevel + 1)}
        </SubMenu>
      )
    })
  }, [arrayOfHrefMatched, menuOpenMapping])

  const menuRendered = useMemo(() => renderMenu(options), [options, renderMenu])

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggleCollapse: () => setCollapse((prev) => !prev)
  }))

  return (
    <Menu
      open={open}
      mode={mode}
      width={SIDEBAR_WIDTH}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      collapse={collapse}
      slots={{
        drawer: {
          keepMounted: true,
          slots: {
            backdrop: Backdrop
          },
          onClose: (_event, reason) => {
            if (closeOnBackdropClick && reason === "backdropClick") sidebar.close()
          }
        }
      }}
    >
      {menuRendered}
    </Menu>
  )
})

const Sidebar = (props: SidebarProps) => <SidebarComponent ref={sidebarRef} {...props} />

export default Sidebar

export const sidebar: SidebarAction = {
  open: () => sidebarRef.current?.open(),
  close: () => sidebarRef.current?.close(),
  toggleCollapse: () => sidebarRef.current?.toggleCollapse()
}