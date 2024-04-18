import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { ProductHome } from './ProductHome'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductHome />
    </BrowserRouter>
  </React.StrictMode>,
)
