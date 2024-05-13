import { useContext, useState } from "react";
import { useForm } from "~hooks/useForm";
import FileUploader from "react-firebase-file-uploader";
import { ProductContext } from "~products/context";
import { useNavigate } from "react-router";
import { FBstorage } from "~firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "~auth/context";

const newEmptyProduct = {
  name: "",
  category: "",
  description: "",
  url: "",
  rate: "",
  userId:"",
  image: "",
  createdAt: "",
  updatedat: "",
};

export const ProductNew = () => {
  const { saveProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [Iduser, setUserId]= useState(user.uid);
  let imageUrl;
  
  const {
    name,
    category,
    description,
    url,
    rate,
    userId,
    image,
    createdAt,
    updatedAt,
    onInputChange,
  } = useForm(newEmptyProduct);

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

  const onCreateNewProduct = async (event) => {
    event.preventDefault();

    const newProduct = {
      name,
      category,
      description,
      url,
      rate,
      userId:Iduser,
      image: imageUrl,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await saveProduct(newProduct);
    navigate("/MyProducts");
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
              onClick={onCreateNewProduct}
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
  );
};
