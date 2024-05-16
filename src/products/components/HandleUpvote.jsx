import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "~firebase/config";

export const HandleUpvote = ({ id, onUpvoteChange }) => {
    const [upvote, setUpvote] = useState(0);

    useEffect(() => {
        const getList = async () => {
            try {
                const fieldName = 'productId'; 
                const searchValue = id;
                console.log("userid", fieldName);
                console.log("searchValue", searchValue);
                const queryComments = query(collection(FirebaseDB, 'comments'), where(fieldName, '==', searchValue));
                const querySnapshot = await getDocs(queryComments);
                const docs=[]
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id });
                   });
                const commentCount = docs.length; 
                setUpvote(commentCount); 
                onUpvoteChange(commentCount); 
            } catch (error) {
                console.log(error);
            }
        };

        getList();
    }, [id]); 

    return null; 
};

