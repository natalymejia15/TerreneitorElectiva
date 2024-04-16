import { Navigate } from 'react-router-dom'; 

import { useContext } from "react";
import { AuthContext } from "../auth";


export const PrivateRouter = ({ children }) => {
  const { logged } = useContext(AuthContext);

  return (!logged) ? children : <Navigate to="/retro" />
}

