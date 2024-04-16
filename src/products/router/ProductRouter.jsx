import { Navigate, Routes, Route } from 'react-router-dom';


export const ProductRouter = () => {
    return (
        <>

            <div className='container'>
                <Routes>
                    <Route path='/retro' element={<RetroPage />} />
                    <Route path='/' element={<Navigate to="/retro" />} />
                </Routes>
            </div>
        </>
    )
}