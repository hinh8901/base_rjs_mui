import { styled, Drawer, DrawerProps, Theme, CSSObject } from "@mui/material"

interface MenuProps extends DrawerProps {
  width: number
  collapse: boolean
  collapsedWidth: number
}

const openedMixin = (theme: Theme, width: MenuProps["width"]): CSSObject => ({
  width: width,
  transition: `${theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })}, ${theme.transitions.create("transform", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })} !important`,
  overflowX: "hidden",
})

const closedMixin = (
  theme: Theme,
  width: MenuProps["collapsedWidth"]
): CSSObject => ({
  width: width,
  transition: `${theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })}, ${theme.transitions.create("transform", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })} !important`,
  overflowX: "hidden",
})

const Menu = styled(Drawer, {
  shouldForwardProp: (prop) =>
    prop !== "collapse" && prop !== "width" && prop !== "collapsedWidth",
})<MenuProps>(({ theme, collapse, width, collapsedWidth }) => ({
  width,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(!collapse && {
    ...openedMixin(theme, width),
    "& .MuiDrawer-paper": openedMixin(theme, width),
  }),
  ...(collapse && {
    ...closedMixin(theme, collapsedWidth),
    "& .MuiDrawer-paper": openedMixin(theme, collapsedWidth),
  }),
}))

export default Menu
