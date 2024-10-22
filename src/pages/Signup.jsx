import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ThemeContext } from "../context/theme.context";
import nearBitesText from "../assets/images/logos/nearBites_texto.png";
import service from "../services/config";


const API_URL = import.meta.env.VITE_API_URL;

function Signup() {

  const navigate = useNavigate()
  const { isDark } = useContext(ThemeContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [warning, setWarning] = useState(false)


  const handleEmail = (e)=>setEmail(e.target.value);
  const handleUsername = (e)=>setUsername(e.target.value);
  const handlePassword = (e)=>setPassword(e.target.value);

  useEffect(() => {
    if (errorMessage) {
      setWarning(true)
      const warn = setTimeout(() => {
        setWarning(false);
      }, 3000);
      
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3500);

      return () => {clearTimeout(timer), clearTimeout(warn)};
    }
  }, [errorMessage]);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      // await axios.post(`${API_URL}/api/auth/signup`, {email, password, username})
      await service.post("/auth/signup", {email, password, username})
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
    <div className="reg-centradito">
      <img className={`${isDark?'dark-':'light-'}reg-image reg-image`} src={nearBitesText} alt="Near Bites logo"/>
      <div className={`${isDark?'dark-':'light-'}reg-cajon reg-cajon`}>
        <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0"}}>{errorMessage}</p>
        <form onSubmit={handleSignup} style={{display:"flex", flexDirection:"column", gap:"10px", alignItems:"center"}}>
          <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
            <label htmlFor="email">email</label>
            <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>handleEmail(e)} type="email" name="email" value={email} placeholder="example@domain.com"/>
          </div>
          <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
            <label htmlFor="username">usuario</label>
            <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>handleUsername(e)} type="text" name="username" value={username} placeholder="Your_username"/>
          </div>
          <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
            <label htmlFor="password">contraseña</label>
            <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>handlePassword(e)} type="password" name="password" value={password} placeholder="********"/>
          </div>
          <button className={`${isDark?'dark-':'light-'}reg-boton reg-boton`}>Crear Cuenta</button>
       </form>
      </div>
      <div className={`${isDark?'dark-':'light-'}reg-cajon reg-cajon`} style={{padding:"15px"}}>
        <div  className={`${isDark?'dark-':'light-'}reg-swap reg-swap`}>
          <p className={`${isDark?'dark-':'light-'}reg-swap-text reg-swap-text`}>¿Ya eres usuario?</p>
          <button className={`${isDark?'dark-':'light-'}reg-swap-boton reg-swap-boton`} onClick={()=>navigate("/login")}>Entrar</button>
        </div>
      </div>
    </div>
  )
}

export default Signup