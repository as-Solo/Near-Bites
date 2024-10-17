import "../styles/Navbar.css"
import profileLogo from "../assets/images/logos/Profile_white.png"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="centradito">
      <div className="navbar-container">
        <Link to="/profile">
        <div className="navbar-logo-container">
          <img className="navbar-logo-profile" src={profileLogo} alt="" />
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar