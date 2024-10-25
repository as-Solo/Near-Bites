import "../styles/Registro.css"
import axios from "axios"
import { useContext } from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import nearBitesText from "../assets/images/logos/NearBites_texto.png";
import service from "../services/config";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {

  const navigate = useNavigate()
  const {authenticateUser} = useContext(AuthContext)
  const { isDark } = useContext(ThemeContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [warning, setWarning] = useState(false)

  const handleEmail = (e)=>{setEmail(e.target.value)}
  const handlePassword = (e)=>{setPassword(e.target.value)}
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const response = await service.post(`/auth/login`, {email, password})
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

  return (
    <div className="reg-centradito">
      <img className={`${isDark?'dark-':'light-'}reg-image reg-image`} src={nearBitesText} alt="Near Bites logo"/>
      <div className={`${isDark?'dark-':'light-'}reg-cajon reg-cajon`}>
        <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0"}}>{errorMessage}</p>
        <form className={`${isDark?'dark-':'light-'}reg-form reg-form`} onSubmit={handleSubmit}>
          <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
            <label htmlFor="email">email</label>
            <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handleEmail(e)}} type="email" name="email" value={email} placeholder="example@domain.com"/>
          </div>
          <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
            <label htmlFor="password">contraseña</label>
            <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handlePassword(e)}} type="password" name="password" value={password} placeholder="********"/>
          </div>
          <button className={`${isDark?'dark-':'light-'}reg-boton reg-boton`}>Entrar</button>
        </form>
      </div>
      <div className={`${isDark?'dark-':'light-'}reg-cajon reg-cajon`} style={{padding:"15px"}}>
        <div  className={`${isDark?'dark-':'light-'}reg-swap reg-swap`}>
          <p className={`${isDark?'dark-':'light-'}reg-swap-text reg-swap-text`}>¿Aún no tienes cuenta?</p>
          <button className={`${isDark?'dark-':'light-'}reg-swap-boton reg-swap-boton`} onClick={()=>navigate("/signup")}>Registrate</button>
        </div>
      </div>
    </div>
  )
}

export default Login