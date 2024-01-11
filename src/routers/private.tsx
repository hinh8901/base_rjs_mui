import React, { lazy } from 'react'

import { RouteConfigurations } from './types'
import Home from '@/pages/Home'

// const Home = lazy(() => import('@/pages/Home'))

const PrivateRoutes: RouteConfigurations[] = [
  { path: '/item-04', element: <Home /> },
  { path: '/item-05', element: <Home /> },
  { path: '/item-06', element: <Home /> },
  { path: '/item-61', element: <Home /> },
  { path: '/item-62', element: <Home /> },
  { path: '/item-621', element: <Home /> },
  { path: '/item-622', element: <Home /> },
  { path: '/item-623', element: <Home /> },
  { path: '/item-6231', element: <Home /> },
  { path: '/item-63', element: <Home /> },
  { path: '/signed-in', element: <Home /> },
  { path: '/', element: <Home /> },
]

export default PrivateRoutes
