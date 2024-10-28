import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import "../styles/Profile.css"
import { ThemeContext } from "../context/theme.context";
import { useNavigate } from "react-router-dom";
import profileLogo from "../assets/images/logos/Profile_white.png"
import service from "../services/config";
import DotLoader from "react-spinners/DotLoader";
import Stars from "../components/Stars";



function Profile() {
  
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const {authenticateUser, setUpdate} = useContext(AuthContext)
  
  const { loggedUserId } = useContext(AuthContext)
  const { isDark } = useContext(ThemeContext)
  
  const [newData, setNewData] = useState({})
  const [oldUser, setOldUser] = useState(null)
  
  const [following, setFollowing] = useState(0)
  const [followers, setFollowers] = useState(0)
  
  const [errorMessage, setErrorMessage] = useState("")
  const [warning, setWarning] = useState(false)
  const [confirm, setConfirm] = useState(false)

  
  const [loading, setLoading] = useState(true);

  const getData = async()=>{
    const response = await service.get(`/users/profile`)
    setNewData({
      password: response.data.password || '',
      name: response.data.name || '',
      lastname: response.data.lastname || '',
      username: response.data.username || '',
      image: response.data.image || ''
    })
    const numFollowers = await service.get(`/users/followers`)
    setFollowers(numFollowers.data)
    setOldUser(response.data.username)
    setLoading(false)
    setFollowing(response.data.follow.length)
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
      const response = await service.patch(`/users/profile`, updateData)
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

  const handleConfirm = ()=>{
    setConfirm(true)
  }

  const handleDelete = async ()=>{
    try {
      const response = await service.delete(`/users/profile`)
      setConfirm(false)
      setErrorMessage(`${response.data.username} eliminado con exito.`)
      localStorage.removeItem("authToken")
      authenticateUser()
    } catch (error) {
      console.log(error)
    }
  }

   
  return (
    <div className="profile-centradito">
      <div className={`profile-container ${isDark?'dark-':'light-'}profile-container`}>
      {loading ?
          ( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div>)
          : (<>
        <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0"}}>{errorMessage}</p>
        <div className="profile-marco-image">
          <img className="profile-image" src={newData.image || profileLogo} alt="" />
        </div>
        <div className={`profile-follows-row`}>
          <p>{followers} seguidores</p>
          <p>{following} siguiendo</p>
        </div>
        <form className={`${isDark?'dark-':'light-'}reg-form reg-form`} onSubmit={handleSubmit}>
          <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
            <label htmlFor="email">imagen</label>
            <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handleChanges(e)}} type="text" name="image" value={newData.image} placeholder="https://ruta-de-la-imagen.jpg"/>
          </div>
          <div className="profile-row">
            <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
              <label htmlFor="email">nombre</label>
              <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handleChanges(e)}} type="text" name="name" value={newData.name} placeholder="Your name"/>
            </div>
            <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
              <label htmlFor="email">apellido</label>
              <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handleChanges(e)}} type="text" name="lastname" value={newData.lastname} placeholder="Your last name"/>
            </div>
          </div>
          <div className={`${isDark?'dark-':'light-'}reg-pareja reg-pareja`}>
            <label htmlFor="email">usuario</label>
            <input className={`${isDark?'dark-':'light-'}reg-input reg-input`} onChange={(e)=>{handleChanges(e)}} type="text" name="username" value={newData.username} placeholder="Your username"/>
          </div>
          <button className={`${isDark?'dark-':'light-'}reg-boton reg-boton`}>Actualizar</button>
          </form>
          <button className={`${isDark?'dark-':'light-'}reg-swap-boton reg-swap-boton profile-cerrar-sesion`} onClick={handleLogout}>CERRAR SESIÓN</button>
          <button className={`eliminar-cuenta`} onClick={handleConfirm}>ELIMINAR CUENTA</button>
          <div className="botonera-eliminar-container" style={{opacity:confirm?"1":"0", pointerEvents:confirm?"auto":"none"}}>
            <div className="marco-eliminar">
              <p className="texto-warning-delete">¿Estás seguro que quieres eliminar esta cuenta?<br/>Este proceso es irreversible.</p>
              <div className="botonera-eliminar">
                <button onClick={()=>{setConfirm(false)}} className="reg-boton reg-boton-cancelar">Cancelar</button>
                <button onClick={handleDelete} className="reg-boton">Aceptar</button>
              </div>
            </div>
          </div>
          </>)
          }
      </div>
    </div>
  )
}

export default Profile