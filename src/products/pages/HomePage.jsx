import ProductList from '../components/ProductList'
import { Navbar } from '~/ui'
import { HeaderHome } from '~products/components/HeaderHome'

export const HomePage = () => {
  return (
    <>
      <div>
        <div>
          <Navbar />
          <br/>
          <HeaderHome />
          <ProductList/>
        </div>
      </div>
    </>
  )
}
