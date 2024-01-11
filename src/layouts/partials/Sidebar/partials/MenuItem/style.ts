import { Colors } from "@/themes"
import { styled } from "@mui/material"
import { Link as LinkReactRouterDOM } from "react-router-dom"

export const Link = styled(LinkReactRouterDOM)`
  text-decoration: none;
  color: ${Colors.gray};
  &:active {
    color: ${Colors.gray};
  }
`
