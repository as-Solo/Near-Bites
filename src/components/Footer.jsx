import "../styles/Footer.css"
import homeLogo from "../assets/images/logos/Home_grey.png"
import settingLogo from "../assets/images/logos/AdvancedSettings_grey.png"
import whishlistLogo from "../assets/images/logos/WishList_grey.png"
import favouritesLogo from "../assets/images/logos/Favorites_grey.png"
import bookingsLogo from "../assets/images/logos/Bookings_grey.png"
import { Link } from "react-router-dom"


function Footer() {
  return (
    <div className="footer-centradito">
      <div className="footer-container">
        <Link to="/">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={homeLogo} alt="" />
        </div>
        </Link>
        <Link to="/favourites">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={favouritesLogo} alt="" />
        </div>
        </Link>
        <Link to="/wishlist">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={whishlistLogo} alt="" />
        </div>
        </Link>
        <Link to="/bookings">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={bookingsLogo} alt="" />
        </div>
        </Link>
        <Link to="/administrator">
        <div className="footer-logo-container">
          <img className="footer-logo-profile" src={settingLogo} alt="" />
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Footer