import "../styles/Navbar.css"
import profileLogo from "../assets/images/logos/Profile_white.png"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import service from "../services/config"


function Navbar() {
  
  const { isLogin, update } = useContext(AuthContext)
  const [imageProfile, setImageProfile] = useState("")
  
  
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
  },[isLogin, update])
  
    
  return (
    <div className="centradito">
      <div className="navbar-container">
        <Link to={isLogin?"/profile":"/login"}>
        <div className="navbar-logo-container">
          <img className="navbar-logo-profile" src={imageProfile || profileLogo} alt="" />
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar