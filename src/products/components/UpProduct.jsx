import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
import { ProductContext } from "~products/context";
import { useNavigate } from "react-router";
import { setDoc, doc, getDoc } from "firebase/firestore/lite";
import { FBstorage, FirebaseDB } from "~firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    setFormState,
  };
};

const initialForm = {
  name: "",
  category: "",
  description: "",
  url: "",
  rate: "",
  image: "",
};

export const UpProduct = () => {
  const { id } = useParams();
  const { updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  let imageUrl;

  const {
    name,
    category,
    description,
    url,
    rate,
    image,
    onInputChange,
    setFormState,
  } = useForm(initialForm);

  const update = async (e) => {
    e.preventDefault();

    const upProduct = {
      id: id,
      name: name,
      category: category,
      description: description,
      url: url,
      rate: rate,
      image: image,
      updatedat: currentDate,
    };

    await updateProduct(upProduct);
    navigate("/MyProducts");
    window.location.reload();
  };

  const getProductById = async (id) => {
    const productDoc = await getDoc(doc(FirebaseDB, "products", id));
    if (productDoc.exists()) {
      const productData = productDoc.data();
      setFormState({
        name: productData.name || "",
        category: productData.category || "",
        description: productData.description || "",
        url: productData.url || "",
        rate: productData.rate || "",
        image: productData.image || "",
      });
    } else {
      alert("Product not found");
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  const handleImageUpload = async (e) => {
    try {
      const FilesImg = e.target.files[0];
      const refFilesImg = ref(FBstorage, `images/${FilesImg.name}`);
      await uploadBytes(refFilesImg, FilesImg);
      imageUrl = await getDownloadURL(refFilesImg);
      setFormState((prevState) => ({ ...prevState, image: imageUrl }));
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl border overflow-hidden md:max-w-2xl m-4 items-center justify-center">
        <div className="shadow-md rounded px-5 pt-6 pb-5 mb-4">
          <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">
            Update your product here
          </h1>
        </div>
        <br />
        <form className="bg-white shadow-md rounded px-5" onSubmit={update}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Name..."
              value={name}
              onChange={onInputChange}
              required
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
              required
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
              required
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
              placeholder="productivity, design tools"
              value={rate}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
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
            <button
              className="mt-2 bg-violet-500 text-white px-4 py-2 rounded-md"
              type="submit"
            >
              Update
            </button>
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
