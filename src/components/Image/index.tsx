import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  href?: string
}

const Image = (props: ImageProps) => {
  const { href, ...rest } = props

  if (!href) return <CustomImage {...rest} />
  return (
    <Link to={href}>
      <CustomImage {...rest} />
    </Link>
  )
}

export default Image

const CustomImage = styled.img`
  vertical-align: middle;
`