import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmail = (e)=>setEmail(e.target.value);
  const handleUsername = (e)=>setUsername(e.target.value);
  const handlePassword = (e)=>setPassword(e.target.value);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${API_URL}/api/auth/signup`, {email, password, username})
      navigate("/login")
    } catch (error) {
      console.log(error)
      if (error.response.status === 400){
        setErrorMessage(error.response.data.message)
      }else{
        //! redireccion a /error
      }
    }
  }

  return (
    <div style={{display:"flex", flexDirection:"column", marginTop:"60px"}}>
      <h1 style={{marginBottom:"30px"}}>REGISTRO</h1>
      <form onSubmit={handleSignup} style={{display:"flex", flexDirection:"column", gap:"10px", alignItems:"center"}}>
        <label htmlFor="email">Email</label>
        <input onChange={(e)=>handleEmail(e)} type="email" name="email" value={email} placeholder="example@domain.com"/>
        <label htmlFor="username">Usuario</label>
        <input onChange={(e)=>handleUsername(e)} type="text" name="username" value={username} placeholder="Your_username"/>
        <label htmlFor="password">Contraseña</label>
        <input onChange={(e)=>handlePassword(e)} type="password" name="password" value={password} placeholder="********"/>
        <button>Crear Cuenta</button>
        <p style={{marginTop:"40px"}}>Ya eres usuario?</p>
        <button onClick={()=>navigate("/login")}>Logearse</button>
        <p style={{opacity:errorMessage?"1":"0", transition:"all .5s", position:"absolute", backgroundColor:"rgb(98, 182, 255)", color:"white", top:"60px", width:"100%", textAlign:"center"}}>{errorMessage}</p>
      </form>
    </div>
  )
}

export default Signup