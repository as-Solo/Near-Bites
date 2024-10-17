import axios from "axios"
import { useContext } from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {

  const navigate = useNavigate()
  const {authenticateUser} = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmail = (e)=>{setEmail(e.target.value)}
  const handlePassword = (e)=>{setPassword(e.target.value)}
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {email, password})
      console.log(response)
      localStorage.setItem("authToken", response.data.authToken)
      await authenticateUser()
      navigate("/")
    }
    catch (error) {
      console.log(error)
      if (error.response.status === 400){
        setErrorMessage(error.response.data.message)
      } else{
        //! redireccion
      }
    }
  }

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div style={{display:"flex", flexDirection:"column", marginTop:"60px"}}>
      <h1 style={{marginBottom:"30px"}}>LOGIN</h1>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"10px", alignItems:"center"}}>
        <label htmlFor="email">Email</label>
        <input onChange={(e)=>{handleEmail(e)}} type="email" name="email" value={email} placeholder="example@domain.com"/>
        <label htmlFor="password">Password</label>
        <input onChange={(e)=>{handlePassword(e)}} type="password" name="password" value={password} placeholder="********"/>
        <button>Logearse</button>
        <p style={{opacity:errorMessage?"1":"0", transition:"all .5s", position:"absolute", backgroundColor:"rgb(98, 182, 255)", color:"white", top:"60px", width:"100%", textAlign:"center"}}>{errorMessage}</p>
      </form>
    </div>
  )
}

export default Login