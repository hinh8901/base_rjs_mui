import React, { ReactNode } from "react"

interface CanViewProps {
  condition: boolean
  children: ReactNode
  fallback?: ReactNode
}

const CanView: React.FC<CanViewProps> = ({
  condition,
  children,
  fallback = null
}) => {
  return (
    <>
      {condition ? children : fallback}
    </>
  )
}

export default CanView
