import React from 'react'
import logo from "../../image/Keep.png";
import { NavLink } from 'react-router-dom';

export const HeaderProduct = () => {
  return (
    <>
         <div className="md:flex max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl m-3">
            <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:w-48" src={ logo } alt="A cute kitten"/>
            </div>
            <div className="p-8 ml-4">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">KeepCoding</div>
                  <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline" href="#" >Tech School</a>
                  <p className="mt-2 text-gray-500">High-performance training center in programming and technology. </p>
                <br />
                <NavLink
                  to="https://keepcoding.io/sobre-nosotros/" 
                  target="_blank"
                  rel="noreferrer noopener"
                  className='bg-violet-800 hover:bg-gray-400 text-white font-bold py-2 px-4 ml-20 border border-violet-800 rounded'
                >
                    Get Product
                </NavLink>                
            </div>
        </div>    
    </>
  )
}
