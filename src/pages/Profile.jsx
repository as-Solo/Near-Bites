import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import "../styles/Profile.css"
import { ThemeContext } from "../context/theme.context";
import { useNavigate } from "react-router-dom";
import profileLogo from "../assets/images/logos/Profile_white.png"



function Profile() {

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const {authenticateUser, setUpdate} = useContext(AuthContext)

  const { loggedUserId } = useContext(AuthContext)
  const { isDark } = useContext(ThemeContext)

  const [newData, setNewData] = useState(null)
  const [oldUser, setOldUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState("")
  const [warning, setWarning] = useState(false)

  const getData = async()=>{
    const response = await axios.get(`${API_URL}/api/users/${loggedUserId}`)
    // console.log(response.data)
    setNewData({
      password: response.data.password || '',
      name: response.data.name || '',
      lastname: response.data.lastname || '',
      username: response.data.username || '',
      image: response.data.image || ''
    })
    setOldUser(response.data.username)
  }
  useEffect(()=>{
    getData()
    return ()=>{}
  }, [])

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

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const updateData = {
      image: newData.image,
      name: newData.name,
      lastname: newData.lastname,
    }
    if(oldUser !== newData.username){
      updateData.username = newData.username
    }

    try {
      const response = await axios.patch(`${API_URL}/api/users/${loggedUserId}`, updateData)
      await authenticateUser()
      setUpdate(current => !current)
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

  const handleChanges = (e)=>{
    e.preventDefault()
    const clone = structuredClone(newData)
    clone[e.target.name] = e.target.value
    setNewData(clone)
  }

  const handleLogout = ()=>{
    localStorage.removeItem("authToken")
    authenticateUser()
    navigate('/login')
  }


  // -------------------------------------  PINTADO  ----------------------------------------------
  if (newData === null){
    return ( <h3>Verificando...</h3>)
  }
  else{
   
  return (
    <div className="profile-centradito">
      <div className={`profile-container ${isDark?'dark-':'light-'}profile-container`}>
        <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0"}}>{errorMessage}</p>
        <div className="profile-marco-image">
          <img className="profile-image" src={newData.image || profileLogo} alt="" />
        </div>
        <form className={`${isDark?'dark-':'light-'}reg-form reg-form`} onSubmit={handleSubmit}>
          <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
            <label htmlFor="email">image</label>
            <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handleChanges(e)}} type="text" name="image" value={newData.image} placeholder="https://ruta-de-la-imagen.jpg"/>
          </div>
          <div className="profile-row">
            <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
              <label htmlFor="email">name</label>
              <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handleChanges(e)}} type="text" name="name" value={newData.name} placeholder="Your name"/>
            </div>
            <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
              <label htmlFor="email">lastname</label>
              <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handleChanges(e)}} type="text" name="lastname" value={newData.lastname} placeholder="Your last name"/>
            </div>
          </div>
          <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
            <label htmlFor="email">username</label>
            <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handleChanges(e)}} type="text" name="username" value={newData.username} placeholder="Your username"/>
          </div>
          <button className={`${isDark?'dark-':'light-'}reg-boton reg-boton`}>Actualizar</button>
          </form>
          <button className={`${isDark?'dark-':'light-'}reg-swap-boton reg-swap-boton profile-cerrar-sesion`} onClick={handleLogout}>CERRAR SESIÓN</button>
      </div>
    </div>
  )
}
}



export default Profile