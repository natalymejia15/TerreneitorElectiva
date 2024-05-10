import React from 'react';
import ProductList from '../components/ProductList'
import { HeaderProduct } from '~products/components/HeaderProduct';

export const HomeProduct = () => {
  return (
    <>
        <HeaderProduct />
        <hr />
        <ProductList />
    </>
  )
}
