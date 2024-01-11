import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '@mui/material'

import CustomText, { CustomTextProps, TEXT_TYPE } from '../CustomText'

interface CustomButtonProps extends ButtonProps {
  children: ReactNode,
  slots?: {
    text?: Omit<CustomTextProps, "children">
  }
}

const CustomButton = (props: CustomButtonProps) => {
  const { children, slots, sx, ...restProps } = props

  const renderChildren = () => {
    if (typeof children === "string") return (
      <CustomText
        type={TEXT_TYPE.Body_14_Regular}
        {...slots?.text}
      >
        {children}
      </CustomText>
    )
    return children
  }

  return (
    <Button
      sx={{
        ...ButtonSx,
        ...sx
      }}
      {...restProps}
    >
      {renderChildren()}
    </Button>
  )
}

export default CustomButton

const ButtonSx = {
  // Write general props here
}