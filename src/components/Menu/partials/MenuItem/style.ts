import { Colors } from "@/themes"
import {
  ListItem as ListItemMUI,
  styled,
  ListItemIcon,
  Stack,
} from "@mui/material"
import { Link as LinkReactRouterDOM } from "react-router-dom"

export const ListItem = styled(ListItemMUI)({
  padding: 0,
})

export const Link = styled(LinkReactRouterDOM)`
  text-decoration: none;
  color: ${Colors.gray};
  &:active {
    color: ${Colors.gray};
  }
`
export const ExpandIcon = styled(ListItemIcon)`
  justify-content: flex-end;
`

export const RotateTransition = styled(Stack, {
  shouldForwardProp: (propName) => propName !== "activeEffect",
})<{ activeEffect: boolean }>(({ activeEffect }) => ({
  transitionDuration: "0.5s",
  transform: `rotate(${activeEffect ? "180deg" : "0deg"})`,
}))
