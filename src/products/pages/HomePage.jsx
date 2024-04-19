import React from 'react'
import ProductList from '../components/ProductList'
import { Navbar } from '~/ui'

export const HomePage = () => {
  return (
    <>
      <div>
        <div>
          <Navbar />
          <br/>
          <ProductList/>
        </div>
      </div>
    </>
  )
}
