import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FileUploader from 'react-firebase-file-uploader'
import { ProductContext } from "~products/context";

export const NewProduct = () => {

  const { saveProduct}= useContext(ProductContext);

  const formik= useFormik ({
    initialValues:{
      name:'',
      category:'',
      description:'',
      url:'',
      tags:'',
      image:''
    },
    validationSchema:Yup.object({
      name:Yup.string()
                .min(10,'The name must be a minimum of 10 characters.')
                .required('Product name is required'),
      category:Yup.string()
                .min(10,'The category must be a minimum of 10 characters.')
                .required('Product category is required'),
      tags:Yup.string()
                .required('The label is required'), 
      description:Yup.string()
                .min(10,'The description must have a minimum of 10 characters')
                .required('Description is required'),     
    })
  })   

  const onCreateNewProduct = async (event)=>{
    event.preventDefault();

    const newProduct={
      name,
      category,
      description,
      url,
      tags,
      image
    };
    await saveProduct(newProduct);

  }
  
   return (
       <>
       <div className="md:flex max-w-md mx-auto bg-white rounded-xl shadow-2xl border overflow-hidden md:max-w-2xl m-4">
           <div className="product_box">
               <div className="addproduct_container">
                   <span className="signup_message text-center ml-10">
                       Add your product here
                   </span>
                   <br />
                   <form >
                       <label htmlFor="name">Name</label>
                       <input
                           className='shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none'
                           type="text"
                           name="name"
                           placeholder="Product Name..."                           
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}                           
                       />
                       {formik.touched.name && formik.errors.name?(
                        <div>
                            <p className='text-red-900'>{formik.errors.name}</p>
                        </div>
                         ):null}
                       <label htmlFor="name">Description</label>
                       <textarea
                           className='shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none'
                           type="text"
                           name="name"
                           placeholder="Description..."
                           value={formik.values.description}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}                           
                        >
                        </textarea>
                        {formik.touched.description && formik.errors.description?(
                        <div>
                            <p className='text-red-900'>{formik.errors.description}</p>
                        </div>
                         ):null}                        
                       <label htmlFor="name">Tags</label>
                       <input
                           className="name_field"
                           type="text"
                           name="name"
                           placeholder="productivity, desgin tools"
                           value={formik.values.tags.tags}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}                                  
                       />
                       {formik.touched.tags && formik.errors.tags?(
                        <div>
                            <p className='text-red-900'>{formik.errors.name}</p>
                        </div>
                         ):null}                       
                       <label 
                            className='block text-gray-700 text-sm font-bold mb-2' 
                            htmlFor='imagen'                            
                        >Image
                        </label>
                        <FileUploader
                            accept='/image/*'
                            id="image"
                            name='image'
                            />
                       <input
                           className="submit_button"
                           type="submit"
                           value="Submit"
                           onClick={onCreateNewProduct}
                       />
                   </form>
               </div>
           </div>
       </div>
       </>
   )
}
