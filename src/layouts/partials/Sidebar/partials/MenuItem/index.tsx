import React, { ReactNode } from "react"
import { Box } from "@mui/material"

import { SidebarItemProps } from "../../types"

import { sidebar } from "../.."
import { Link } from "./style"
import MenuItem from "@/components/Menu/partials/MenuItem"

const Container = (props: { isRenderLink: boolean, isSubMenuItem: boolean, href: string, children: ReactNode }) => {
  const { isSubMenuItem, href, children, isRenderLink } = props
  if (isSubMenuItem || !isRenderLink) return <Box>{children}</Box>
  return <Link to={href}>{children}</Link>
}

const SidebarItem = (props: SidebarItemProps) => {
  const {
    href, hrefMatched, level, levelIndent = 24,
    onClick, isRenderLink = true, closeOnClick = true,
    setMenuOpenMapping,
    ...restProps
  } = props

  const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClick && onClick(event)
    setMenuOpenMapping(({ level: currentLevel, menuPaths: currentMenuPaths }) => {
      if (level === 1) return { level: 1, menuPaths: [href] }
      if (level > currentLevel) return { level, menuPaths: [...currentMenuPaths, href] }
      const hrefMatchedRemain = currentMenuPaths.slice(0, level - 1)
      return { level, menuPaths: [...hrefMatchedRemain, href] }
    })
    if (!props.isSubMenuItem && closeOnClick) sidebar.close()
  }

  return (
    <Container isSubMenuItem={!!props.isSubMenuItem} href={href} isRenderLink={isRenderLink}>
      <MenuItem
        {...restProps}
        onClick={handleOnClick}
        slots={{
          itemButton: {
            sx: {
              paddingLeft: level * levelIndent + "px"
            }
          }
        }}
      />
    </Container>
  )
}

export default SidebarItem