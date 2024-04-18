import React from 'react'
import Header from '../components/Header'
import ProductList from '../components/ProductList'

export const HomePage = () => {
  return (
    <>
      <div>
        <div>
          <Header></Header>
          <br/>
          <ProductList/>
        </div>
      </div>
    </>
  )
}
