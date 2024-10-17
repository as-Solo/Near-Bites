import "../styles/Footer.css"
import homeLogo from "../assets/images/logos/Home_grey.png"
import settingLogo from "../assets/images/logos/AdvancedSettings_grey.png"
import whishlistLogo from "../assets/images/logos/WishList_grey.png"
import favouritesLogo from "../assets/images/logos/Favorites_grey.png"
import bookingsLogo from "../assets/images/logos/Bookings_grey.png"
import homeLogo_w from "../assets/images/logos/Home_white.png"
import settingLogo_w from "../assets/images/logos/AdvancedSettings_white.png"
import whishlistLogo_w from "../assets/images/logos/WishList_white.png"
import favouritesLogo_w from "../assets/images/logos/Favorites_white.png"
import bookingsLogo_w from "../assets/images/logos/Bookings_white.png"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

function Footer() {
  
  const {isLogin, isOwner} = useContext(AuthContext)

  return (
    <div className="footer-centradito">
      <div className="footer-container">
        <Link to="/">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={homeLogo_w} alt="" />
        </div>
        </Link>
        {isLogin && <>
        <Link to="/favourites">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={favouritesLogo_w} alt="" />
        </div>
        </Link>
        <Link to="/wishlist">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={whishlistLogo_w} alt="" />
        </div>
        </Link>
        <Link to="/bookings">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={bookingsLogo_w} alt="" />
        </div>
        </Link>
        </>
        }
        {isOwner && <Link to="/administrator">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={settingLogo_w} alt="" />
        </div>
        </Link>}
      </div>
    </div>
  )
}

export default Footer