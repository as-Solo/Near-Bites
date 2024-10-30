import "../styles/Navbar.css"
import profileLogo from "../assets/images/logos/Profile_white.png"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import service from "../services/config"
import inboxWhite from "../assets/images/logos/inbox_white.png"
import ReactDOM from 'react-dom';


function Navbar() {
  
  const { isLogin, update } = useContext(AuthContext)
  const [imageProfile, setImageProfile] = useState("")
  const [request, setRequest] = useState([])
  
  const [isOpen, setIsOpen] = useState(false)
  
  const getRequest = async ()=>{
    try {
      const response = await service.get(`/users/request-list`)
      // console.log(response.data.request)
      setRequest(response.data.request)
    }
    catch (error) {
      console.log(error)
    }
  }

  const getData = async()=>{
    if(isLogin){
      const response = await service.get(`/users/profile`)
      setImageProfile(response.data.image)
    }
    else{
      setImageProfile("")
    }
  }
  
  useEffect(()=>{
    getData()
    getRequest()
  },[isLogin, update])

  const handleAccept = async (e)=>{
    e.preventDefault()
    try {
      const response = await service.put(`/users/request/yes/${e.target.name}`)
      // console.log(response.data.message)
      getRequest()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeny = async (e)=>{
    e.preventDefault()
    try {
      const response = await service.put(`/users/request/no/${e.target.name}`)
      console.log(response.data.message)
      getRequest()
    } catch (error) {
      console.log(error)
    }
  }
  
    
  return ReactDOM.createPortal(
    <div className="centradito">
      <div className="navbar-container">
        {request.length === 0
        ?<Link to={`/conversations`}>
          <div className="inbox-container">
            <img src={inboxWhite} alt="" />
          </div>
        </Link>
        : <div onClick={()=>setIsOpen(true)} className="inbox-container">
            <div className="notificacion-request-pendientes">
              {request.length}
            </div>
            <img src={inboxWhite} alt="" />
            <div onMouseLeave={()=>setIsOpen(false)}  className="request-pendientes-container" style={isOpen?{clipPath:"inset(-5% -5% -5% -5%)"}:{}}>
              <hr />
              {/* <hr /> */}
              <Link to={`/conversations`}>
                <div>
                  <p className="link-conversaciones">IR A CONVERSACIONES</p>
                </div>
              </Link>
              <hr />
              <p className="solicitudes-pendientes">Solicitudes pendientes</p>
              <div className="request-map-container">
              {request.map((user)=>{
                return(
                  <div key={user._id} className="ficha-request-pendientes">
                    <div className="datos-user-ficha-request">
                      <div className="ficha-user-request-image-container">
                        <img src={user.image} alt="" />
                      </div>
                      <div className="ficha-request-column">
                        <p className="ficha-request-name">@{user.username}</p>
                        <p className="ficha-request-created">{user.createdAt.split("T")[0].split('-')[2]}/{user.createdAt.split("T")[0].split('-')[1]}/{user.createdAt.split("T")[0].split('-')[0]}</p>
                      </div>
                    </div>
                    <div className="ficha-request-column">
                      <button onClick={handleAccept} name={user._id} className="boton-aceptar">Aceptar</button>
                      <button onClick={handleDeny} name={user._id} className="boton-rechazar">Rechazar</button>
                    </div>
                  </div>
                )
              })}
              </div>
              

            </div>
          </div>
        }
        <Link to={isLogin?"/profile":"/login"}>
        <div className="navbar-logo-container">
          <img className="navbar-logo-profile" src={imageProfile || profileLogo} alt="" />
        </div>
        </Link>
      </div>
    </div>,
    document.body
  )
}

export default Navbar