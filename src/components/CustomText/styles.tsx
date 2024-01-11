import { Colors, FontSizes, FontWeight } from '@/themes'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TextBase = styled.span`
    font-weight: ${FontWeight.font_400};
    font-size: ${FontSizes.font_14 + 'px'};
    color: '#000';
    letter-spacing: -0.02em; 
`

export const StyledText = styled(TextBase)``
//     line-height:  ${(props: any) => props.textStyle.lineHeight};
//     font-family: ${(props: any) => props.textStyle.fontFamily};
//     font-weight: ${(props: any) => props.textStyle.fontWeight};
//     font-size: ${(props: any) => props.textStyle.fontSize + 'px'};
//     font-style: ${(props: any) => props.textStyle.fontStyle ? props.textStyle.fontStyle : 'normal'};
//     color: ${(props: any) => props.textStyle.color};
//     text-align: ${(props: any) => props.textStyle.textAlign};
//     justify-content: ${(props: any) => props.textStyle.justifyContent};
//     letter-spacing: ${(props: any) => props.textStyle.letterSpacing ? props.textStyle.letterSpacing + 'em' : '-0.02em'};
//     margin-left: ${(props: any) => props.textStyle.marginLeft};
//     display: ${(props: any) => props.textStyle.display ? props.textStyle.display : 'inline'};
//     margin-bottom: ${(props: any) => props.textStyle.marginBottom + 'px'};
//     margin-top: ${(props: any) => props.textStyle.marginTop + 'px'};
//     text-decoration: ${(props: any) => props.textStyle.textDecoration};
//     white-space: ${(props: any) => props.textStyle.whiteSpace};
//     span {
//         font-weight: ${(props: any) => props.spanStyle.fontWeight};
//         font-size: ${(props: any) => props.spanStyle.fontSize + 'px'};
//         color: ${(props: any) => props.spanStyle.color};
//     }
// `

export const CustomLink = styled(Link)`
  text-decoration: none;
`
