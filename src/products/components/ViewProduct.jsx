import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { ProductContext } from "~products/context";
import { AuthContext } from "~auth/context";
import { getDoc, doc } from "firebase/firestore/lite";
import { FirebaseDB } from "~firebase/config";

export const ViewProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { uploadProduct } = useContext(ProductContext);
    const { user } = useContext(AuthContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [Iduser, setUserId]= useState(user.uid);
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
        navigate("/MyProducts");        
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

  return (
    <div>ViewProduct</div>
  )
}
