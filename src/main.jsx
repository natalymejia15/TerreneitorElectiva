import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { ProductHunt } from './ProductHunt'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductHunt />
    </BrowserRouter>
  </React.StrictMode>,
)
