import { useContext, useState } from "react";
import { useForm } from "~hooks/useForm";
import FileUploader from "react-firebase-file-uploader";
import { ProductContext } from "~products/context";
import { useNavigate } from "react-router";
import { firebaseStorage } from "../../firebase/config";

const newEmptyProduct = {
  name: "",
  category: "",
  description: "",
  url: "",
  rate: "",
  image: "",
  createdAt: "",
  updatedat: "",
};

export const ProductNew = () => {
  const { saveProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState("");

  const {
    name,
    category,
    description,
    url,
    rate,
    image,
    createdAt,
    updatedAt,
    onInputChange,
  } = useForm(newEmptyProduct);

/*   const handleImageUpload = async (nameImage) => {
    const urlImagen = await firebaseStorage.
      .ref("imgproductos")
      .child(nombreImagen)
      .getDownloadURL();
    setImageUrl(urlImagen);
  }; */

  const onCreateNewProduct = async (event) => {
    event.preventDefault();

    const newProduct = {
      name,
      category,
      description,
      url,
      rate,
      image: imageUrl,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await saveProduct(newProduct);
    navigate('/MyProducts')
  };

  return (
    <>
      <div className="md:flex max-w-md mx-auto bg-white rounded-xl shadow-2xl border overflow-hidden md:max-w-2xl m-4">
        <div className="product_box">
          <div className="addproduct_container">
            <span className="signup_message text-center ml-10">
              Add your product here
            </span>
            <br />
            <form>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="id"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
                placeholder="Product Name..."
                value={name}
                onChange={onInputChange}
              />
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
                name="description"
                placeholder="Description..."
                value={description}
                onChange={onInputChange}
              ></textarea>
              <label htmlFor="category">Category</label>
              <textarea
                type="text"
                id="category"
                className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
                name="category"
                placeholder="Category..."
                value={category}
                onChange={onInputChange}
              ></textarea>
              <label htmlFor="url">Url</label>
              <textarea
                type="text"
                id="url"
                className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
                name="url"
                placeholder="Url..."
                value={url}
                onChange={onInputChange}
              ></textarea>
              <label htmlFor="rate">Tags</label>
              <input
                id="rate"
                type="text"
                name="rate"
                className="name_field"
                placeholder="productivity, desgin tools"
                value={rate}
                onChange={onInputChange}
              />
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
                /* storageRef={firebaseStorage.storage.ref("products")} */
            /*     onChange={handleImageUpload} */
              />
              <input
                className="submit_button"
                type="submit"
                onClick={onCreateNewProduct}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
