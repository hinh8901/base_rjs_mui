import React, { useEffect, useState, useCallback } from "react"

import { SubMenuProps } from "../../types"

import SubMenuComponent from "@/components/Menu/partials/SubMenu"

const SubMenu = (props: SubMenuProps) => {
  const {
    href, defaulOpen, hrefMatched, level, menuOpenMapping,
    setMenuOpenMapping, openOnlySubMenuMatched, onClick, levelIdent = 24,
    ...restProps
  } = props
  const [open, setOpen] = useState<boolean>(hrefMatched)
  const [initRender, setInitRender] = useState<boolean>(true)

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setOpen(!open)
    setMenuOpenMapping(({ level: currentLevel, menuPaths: currentMenuPaths }) => {
      if (level === 1) return { level: 1, menuPaths: [href] }
      if (level > currentLevel) return { level, menuPaths: [...currentMenuPaths, href] }
      const isClickHrefMatched = currentMenuPaths.includes(href)
      const hrefMatchedRemain = currentMenuPaths.slice(0, level - 1)
      return {
        level: isClickHrefMatched ? level - 1 : level,
        menuPaths: isClickHrefMatched ? hrefMatchedRemain : [...hrefMatchedRemain, href]
      }
    })
    onClick && onClick(event)
  }

  const closeSubMenuNotMatch = useCallback(() => {
    if (openOnlySubMenuMatched && !menuOpenMapping.menuPaths.includes(href) && !initRender) return setOpen(false)
    setInitRender(false)
  }, [menuOpenMapping.menuPaths, openOnlySubMenuMatched])

  useEffect(() => {
    closeSubMenuNotMatch()
  }, [closeSubMenuNotMatch])

  return (
    <SubMenuComponent
      {...restProps}
      open={open}
      onClick={handleClick}
      slots={{
        itemButton: {
          sx: {
            paddingLeft: level * levelIdent + "px"
          }
        }
      }}
    />
  )
}

export default SubMenu