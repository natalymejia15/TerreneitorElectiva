import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../firebase';
import VerPlato from '../UI/VerPlato'

export const ModifyProduct = () => {
      const [product, setProduct]=useState([])
      const { firebase } = useContext(FirebaseContext);  
      //obtener platos de la base de datos
      useEffect(() => {
        const getProduct = () => {
            firebase.db.collection('product').onSnapshot(handleSnapshot);
        }
        getProduct();
    }, []);
      //Snapshot nos permite usar la db en tiempo real de firestore
    function handleSnapshot(snapshot){
      const result = snapshot.docs.map( doc =>{
          return{
              id:doc.id,
              ...doc.data()
          }
      });
      setProduct(result);
      //console.log(resultados);
    }
  return (
        <>
            <h1 className="text-sky-600 m-10 text-2xl font-light mb-4 text-center">Agrega aqui los nuevos Platos</h1>
            <Link to='/plato' className='m1-3 bg-blue-800 hover:bg-blue-400 inline-block mb-5 p-2 text-white justify-center uppercase font-bold'> Adicionar
            </Link>
            {platos.map( plato => (
            <VerPlato
                key= {plato.id}
                plato={plato}
            />
            ))}
        </>
        );
}