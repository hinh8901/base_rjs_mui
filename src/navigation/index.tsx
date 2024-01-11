import React, { useCallback, useEffect, Suspense } from 'react'
import { Route, RouteProps, Routes, useLocation, useNavigate } from 'react-router-dom'

import { PrivateRoutes, PublicRoutes } from '@/routers'
import { useAppSelector } from '@/hooks/useAppSelector'

const Navigation = () => {
  const { isSignedIn } = useAppSelector(state => state.auth)
  const publicURL = PublicRoutes.map((route) => route.path)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const redirectURL = useCallback(() => {
    if (isSignedIn && publicURL.includes(pathname)) return navigate("/signed-in")
    if (!isSignedIn && !publicURL.includes(pathname)) return navigate("/login")
  }, [isSignedIn, pathname])

  const routesWillRender = isSignedIn ? PrivateRoutes : PublicRoutes

  useEffect(() => {
    redirectURL()
  }, [redirectURL])

  return (
    <Routes>
      {routesWillRender.map((route: RouteProps, index: number) => <Route key={index} {...route} />)}
    </Routes>
  )
}

export default Navigation