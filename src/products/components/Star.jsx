import React from 'react'
import { AiOutlineStar, AiFillStar} from 'react-icons/ai';

export const Star = (props) => {
  return (
    <>
        {
            [... new Array(5)].map((star, index)=>{
                return index < props.rate ? <AiFillStar className="text-yellow-500" /> : <AiOutlineStar  className="text-yellow-500"/>;
            })
        }
    </>
  )
}
