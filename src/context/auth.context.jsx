// Los contextos tienen necesariamente dos componentes:
// 1.- El contexto como tal AuthContext
// 2.- El "envoltorio"

import axios from "axios";
import service from "../services/config.js"
import { createContext, useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";


const AuthContext = createContext()

function AuthWrapper(props){

  const API_URL = import.meta.env.VITE_API_URL;

  const [isLogin, setIsLogin] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isValidatingToken, setIsValidatingToken] = useState(true)
  const [update, setUpdate] = useState(true)

  useEffect(()=>{
    authenticateUser()
  }, [])

  const authenticateUser = async ()=>{
    try {
      const response = await service.get(`/auth/verify`)
     
      setIsLogin(true);
      setLoggedUserId(response.data._id)
      if (response.data.rol === "owner"){
        setIsOwner(true)
      }
      else if( response.data.rol === "admin"){
        setIsAdmin(true)
      }
      else{
        setIsOwner(false)
        setIsAdmin(false)
      }
      setIsValidatingToken(false)
    }
    catch (error) {
      console.log(error)
      setIsLogin(false)
      setLoggedUserId(null)
      setIsOwner(false)
      setIsAdmin(false)
      setIsValidatingToken(false)
    }
  }

  const passedContext = {
    isLogin,
    loggedUserId,
    isOwner,
    isAdmin,
    update,
    setUpdate,
    authenticateUser
  }

  if (isValidatingToken){
    return <div className="loader-container" style={{width:"100dvw", height:"100dvh"}}> <DotLoader color={"#4682b6"} loading={isValidatingToken} size={50} /> </div>
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