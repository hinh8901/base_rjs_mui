import React, { CSSProperties, ReactNode } from 'react'
import { Stack, SxProps, Theme, StackProps } from "@mui/material"
import { LinkProps } from 'react-router-dom'

import { CustomLink, StyledText } from './styles'
import CanView from '../CanView'

export interface CustomTextProps {
  children: React.ReactNode
  type?: SxProps<Theme>
  required?: boolean
  customStyle?: SxProps<Theme>
  spanStyle?: CSSProperties
  prefix?: ReactNode
  suffix?: ReactNode
  href?: string
  slots?: {
    container?: StackProps
    link?: Omit<LinkProps & React.RefAttributes<HTMLAnchorElement>, "to">
  }
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  type = {},
  customStyle = {},
  spanStyle = {},
  required,
  prefix,
  suffix,
  href,
  slots
}) => {
  const cStyle = { ...type, ...customStyle }

  const TextUI = () => {
    return (
      <Stack direction="row" columnGap={1} {...slots?.container}>
        {prefix}
        <StyledText style={cStyle}>
          {children}
        </StyledText>
        {suffix}
        <CanView condition={!!required}>
          <span style={{ color: "red", ...spanStyle }}></span>
        </CanView>
      </Stack>
    )
  }

  if (!href) return <TextUI />
  return (
    <CustomLink to={href} {...slots?.link}>
      <TextUI />
    </CustomLink>
  )
}

export default CustomText

export * from "./configs"