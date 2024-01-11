import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Navigation from './navigation'
import GlobalLoading from './components/GlobalLoading'
import GlobalModal from './components/Modals/GlobalModal'

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <GlobalLoading />
      <GlobalModal />
    </BrowserRouter>
  )
}

export default App