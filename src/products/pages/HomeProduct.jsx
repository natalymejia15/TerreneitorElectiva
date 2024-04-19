import React from 'react';
import ProductList from '../components/ProductList'
import { HeaderProduct } from '~products/components/HeaderProduct';
import { Navbar } from '~ui/components';

export const HomeProduct = () => {
  return (
    <>
        <Navbar />
        <br />
        <HeaderProduct />
        <hr />
        <ProductList />
    </>
  )
}
