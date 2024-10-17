// Los contextos tienen necesariamente dos componentes:
// 1.- El contexto como tal AuthContext
// 2.- El "envoltorio"

import axios from "axios";
import { createContext, useState } from "react";

const AuthContext = createContext()

function AuthWrapper(props){

  const API_URL = import.meta.env.VITE_API_URL;

  const [isLogin, setIsLogin] = useState(false)
  const [userId, setUserId] = useState(null)
  const [isOwner, setIsOwner] = useState(false)

  const authenticateUser = async ()=>{
    try {
      const authToken = localStorage.getItem("authToken")
      const response = await axios.get(`${API_URL}/api/auth/verify`, {
        headers: { authorization: `Bearer ${authToken}`}
      })
      console.log(response)
    }
    catch (error) {
      console.log(error)
    }
  }

  const passedContext = {
    isLogin,
    userId,
    isOwner,
    authenticateUser
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}