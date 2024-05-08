import React from "react";
import "../.././index.css";
import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../firebase'
import FileUploader from 'react-firebase-file-uploader'
import {useNavigate } from 'react-router'


export const NewProduct = () => {

  //hooks
  const [upload, setUpload]=useState(false)
  const [progress, setProgress]=useState(0)
  const [urlImage, setURLimage]=useState('')
  //useContext
  const {firebase}= useContext(FirebaseContext);

  const navigate=useNavigate();

  const formik= useFormik ({
    initialValues:{
      name:'',
      description:'',
      tags:'',
      image:''
    },
    validationSchema:Yup.object({
      name:Yup.string()
                .min(10,'The name must be a minimum of 10 characters.')
                .required('Product name is required'),
      tags:Yup.string()
                .required('The label is required'), 
      description:Yup.string()
                .min(10,'The description must have a minimum of 10 characters')
                .required('Description is required'),     
    }),
    onSubmit: NewProduct => {
      try{
        NewProduct.imagen=urlImage;
        firebase.db.collection('Product').add(NewProduct);
        navigate('/homeProduct')
      }
      catch(error){
        console.log(error);
      }
    }
  });
//methods handle
  const handleUploadStart=()=>{
    setProgress(0);
    setUpload(true);
   }
  const handleUploadError=error=>{
    setUpload(false);
    console.log(error);
   }
  const handleUploadSuccess=async nameImage=>{ 
    setUpload(false);
    setProgress(100);
    const urlImage= await firebase
                  .storage
                  .ref('imgproduct')
                  .child(nameImage)
                  .getDownloadURL();
      setURLimage(urlImage);
  }
  const handleProgress=progress=>{
    setProgress(progress)
    console.log(progress)
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
                   <form onSubmit={formik.handleSubmit}>
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
                            randomizeFilename
                            storageRef={firebase.storage.ref("imgproduct")}
                            onUploadStarts={handleUploadStart}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                            onUploadError={handleUploadError}
                            />
                       <input
                           className="submit_button"
                           type="submit"
                           value="Submit"
                       />
                   </form>
               </div>
           </div>
       </div>
       </>
   )
}
