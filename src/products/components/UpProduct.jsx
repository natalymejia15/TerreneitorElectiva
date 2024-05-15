import { useEffect, useState, useContext } from 'react'
import { useParams} from 'react-router-dom'
import { ProductContext } from "~products/context";
import { doc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "~firebase/config";

export const UpProduct = () => {

    const { id } = useParams();
    const { uploadProduct } = useContext(ProductContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    let imageUrl;

    const update = async (e)=>{
        e.preventDefault();
        const product=doc(FirebaseDB,'products', id);
        const upProduct = {
            name: name,
            category: category,
            description: description,
            url: url,
            rate: rate,
            image: image,
            updatedat: currentDate,           
        }
        await uploadProduct(upProduct);
    }

    const getProductById=async (id)=>{
        const product= await getDoc(doc(FirebaseDB,'products',id));
        if(product.exists()){
            console.log(product.data);
        } else {
            alert("Product not found")
        }
    }

    useEffect(()=>{
        getProductById(id);
    }, [])

    const handleImageUpload = async (e) => {
        try {
          const FilesImg = e.target.files[0];
          const refFilesImg = ref(FBstorage, `images/${FilesImg.name}`);
          await uploadBytes(refFilesImg, FilesImg);
          imageUrl = await getDownloadURL(refFilesImg);      
        } catch (error) {
          console.error("Error loading image:", error);
        }
      };


  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl border overflow-hidden md:max-w-2xl m-4 items-center justify-center">
        <div className="shadow-md rounded px-5 pt-6 pb-5 mb-4">
          <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">
            Add your product here
          </h1>
        </div>
        <br />
        <form className="bg-white shadow-md rounded px-5">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="id"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Name..."
              value={name}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              placeholder="Description..."
              value={description}
              onChange={onInputChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
                  className='shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none'
                  name="category"
                  placeholder="Category..."
                  value={category}
                  onChange={onInputChange}>
                  <option value="">---Select---</option>
                  <option value="IA">Artificial Intelligence</option>
                  <option value="software">Business Software</option>
                  <option value="hardware">Hardware</option>
                  <option value="mobil">Mobile technology</option>
                  <option value="arhitecture">Technological Architecture</option>
                  <option value="business">Business Intelligence</option>
                </select>            
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              Url
            </label>
            <input
              type="text"
              id="url"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="url"
              placeholder="Url..."
              value={url}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rate"
            >
              Rate
            </label>
            <input
              id="rate"
              type="text"
              name="rate"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="productivity, desgin tools"
              value={rate}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imagen"
            >
              Image
            </label>
            <FileUploader
              accept="/image/*"
              id="image"
              name="image"
              onChange={handleImageUpload}
            />
          </div>
          <div className="items-center justify-center text-center">
            <input
              className="bg-violet-900 hover:bg-violet-600 text-white font-bold py-2 px-20 justity rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={update}
            />
          </div>
          <div className="mt-6 text-violet-500 text-center">
            <a href="/MyProducts" className="hover:underline">
              Go back
            </a>
          </div>
        </form>
      </div>
    </>
  )
}
