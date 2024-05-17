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
  userId: "",
  image: "",
  createdAt: "",
  updatedat: "",
};

export const ProductNew = () => {
  const { saveProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [Iduser, setUserId] = useState(user.uid);
  const [nameUser, setnameUser] = useState(user.displayName);
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [rateError, setRateError] = useState("");

  let imageUrl;

  const {
    name,
    category,
    description,
    url,
    rate,
    userId,
    displayName,
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
    let hasError = false;

    if (!name) {
      setNameError("Name is required");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!category) {
      setCategoryError("Category is required");
      hasError = true;
    } else {
      setCategoryError("");
    }

    if (!description) {
      setDescriptionError("Description is required");
      hasError = true;
    } else {
      setDescriptionError("");
    }

    if (!url) {
      setUrlError("Url is required");
      hasError = true;
    } else {
      setUrlError("");
    }

    if (!rate) {
      setRateError("Rate is required");
      hasError = true;
    } else {
      setRateError("");
    }
    
    if (hasError) {
      return;
    }

    const newProduct = {
      name,
      category,
      description,
      url,
      rate,
      userId: Iduser,
      displayName: nameUser,
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
            {nameError && <p className="text-red-500">{nameError}</p>}
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
            {descriptionError && (
              <p className="text-red-500">{descriptionError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
              name="category"
              placeholder="Category..."
              value={category}
              onChange={onInputChange}
            >
              <option value="">---Select---</option>
              <option value="IA">Artificial Intelligence</option>
              <option value="software">Business Software</option>
              <option value="hardware">Hardware</option>
              <option value="mobil">Mobile technology</option>
              <option value="arhitecture">Technological Architecture</option>
              <option value="business">Business Intelligence</option>
            </select>
            {categoryError && <p className="text-red-500">{categoryError}</p>}
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
            {urlError && <p className="text-red-500">{urlError}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rate"
            >
              Rate
            </label>
            <select
              id="rate"
              name="rate"
              value={rate}
              onChange={onInputChange}
              className="mt-2 w-full p-2 border rounded-md"
            >
              <option value="" disabled>
                Select a rating
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {rateError && <p className="text-red-500">{rateError}</p>}
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
