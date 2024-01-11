import React, { lazy } from 'react'

import { RouteConfigurations } from './types'
import Home from '@/pages/Home'
import TestForm from '@/pages/TestForm'
import Dummy from '@/pages/Dummy'

// const Home = lazy(() => import('@/pages/Home'))
// const TestForm = lazy(() => import('@/pages/test-form'))

const PublicRoutes: RouteConfigurations[] = [
  { path: '/login', element: <Home /> },
  { path: '/test-form', element: <TestForm /> },
  { path: '/dummy', element: <Dummy /> },
  { path: '/item-02', element: <Home /> },
  { path: '/item-03', element: <Home /> },
  { path: '/item-31', element: <Home /> },
  { path: '/item-32', element: <Home /> },
  { path: '/item-33', element: <Home /> },
  { path: '/item-331', element: <Home /> },
  // 
  { path: '/item-04', element: <Home /> },
  { path: '/item-41', element: <Home /> },
  { path: '/item-42', element: <Home /> },
  { path: '/item-43', element: <Home /> },
  { path: '/item-431', element: <Home /> },
  // 
  { path: '/item-10', element: <Home /> },
  { path: '/item-101', element: <Home /> },
  { path: '/item-102', element: <Home /> },
  { path: '/item-103', element: <Home /> },
  { path: '/item-1031', element: <Home /> },
]

export default PublicRoutes