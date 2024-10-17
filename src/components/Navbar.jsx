import "../styles/Navbar.css"
import profileLogo from "../assets/images/logos/Profile_white.png"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"


function Navbar() {

  const { isLogin } = useContext(AuthContext)
  return (
    <div className="centradito">
      <div className="navbar-container">
        <Link to={isLogin?"/profile":"/login"}>
        <div className="navbar-logo-container">
          <img className="navbar-logo-profile" src={profileLogo} alt="" />
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar