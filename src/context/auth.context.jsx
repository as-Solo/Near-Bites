// Los contextos tienen necesariamente dos componentes:
// 1.- El contexto como tal AuthContext
// 2.- El "envoltorio"

import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()

function AuthWrapper(props){

  const API_URL = import.meta.env.VITE_API_URL;

  const [isLogin, setIsLogin] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [isValidatingToken, setIsValidatingToken] = useState(true)
  const [update, setUpdate] = useState(true)

  useEffect(()=>{
    authenticateUser()
  }, [])

  const authenticateUser = async ()=>{
    try {
      const authToken = localStorage.getItem("authToken")
      const response = await axios.get(`${API_URL}/api/auth/verify`, {
        headers: { authorization: `Bearer ${authToken}`}
      })
      setIsLogin(true);
      setLoggedUserId(response.data._id)
      // console.log(response.data.rol)
      if (response.data.rol === "owner"){
        setIsOwner(true)
      }
      else{
        setIsOwner(false)
      }
      setIsValidatingToken(false)
      // console.log(response)
    }
    catch (error) {
      // el token no es valido o no existe
      console.log(error)
      setIsLogin(false)
      setLoggedUserId(null)
      setIsOwner(false)
      setIsValidatingToken(false)
      // setUpdate(current=>!current)
    }
  }

  const passedContext = {
    isLogin,
    loggedUserId,
    isOwner,
    update,
    setUpdate,
    authenticateUser
  }

  if (isValidatingToken){
    return <h3>Validando</h3>
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