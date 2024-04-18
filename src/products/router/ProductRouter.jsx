import { Navigate, Routes, Route } from 'react-router-dom';
//import { Navbar } from '../../ui';

export const ProductRouter = () => {
    return (
        <>

            <div className='container'>
                <Routes>
                    <Route path='/homeProduct' element={<HomeProduct />} />
                    <Route path='/' element={<Navigate to="/homeProduct" />} />
                </Routes>
            </div>
        </>
    )
}