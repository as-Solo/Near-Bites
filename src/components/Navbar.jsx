import "../styles/Navbar.css"
import profileLogo from "../assets/images/logos/Profile_white.png"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"


function Navbar() {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const { isLogin, loggedUserId, update } = useContext(AuthContext)
  const [imageProfile, setImageProfile] = useState("")
  
  
  const getData = async()=>{
    // console.log(isLogin)
    if(isLogin){
      const response = await axios.get(`${API_URL}/api/users/${loggedUserId}`)
      setImageProfile(response.data.image)
    }
    else{
      setImageProfile("")
    }
  }
  
  useEffect(()=>{
    getData()
  },[isLogin, update])
  
  
  
  // console.log("image:" + imageProfile)
  // console.log("user:" + imageProfile)
  
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