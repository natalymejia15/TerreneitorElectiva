import React, {useContext, useRef} from 'react'
import {FirebaseContext} from '../firebase'

export const ViewProduct=({product})=>{   
    const { firebase } = useContext(FirebaseContext);    
    const {id, name, description, url, tags, userId, images, createdAt, updatedAt}=product;

    const exietnceProcduct=()=>{
        try{
            firebase.db.collection('product')
            .doc(id)
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-md bg-white">
                <div className="lg-flex">
                    <div className='lg:w-5/12 xl:-3/12'>
                        <img src={images} alt="Product Image"/>
                    </div>
                    <div className='lg:w-7/12 xl:-9/12 pl-5'>
                        <p className='font-bold text-2xl text-yellow-600 mb-4'>{name}</p>
                        <p className='text-gray-600 mb-4'>{description}</p>
                        <p className='text-gray-600 mb-4'>{tags}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
