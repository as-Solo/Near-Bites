import "../styles/RestaurantCardHome.css"
import { Link, useLocation } from "react-router-dom"
import defaultDish from "../assets/images/logos/DefaultDish.png"
import defaultRes from "../assets/images/logos/DefaultRes.png"
import calcularDistancia from "../utils/calcularDistancia.js"


// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfgCGR6P5HG_TjU9CKr52zZ4Vbo1tAqMjq4g&s
function RestaurantCardHome(props) {
  const { restaurant, position } = props
  const distance = calcularDistancia(position[0], position[1], restaurant.coords[0], restaurant.coords[1]).toFixed(1) + " km"
  return (
    <div className="res-card-home-container">
        <div className="res-card-image-container">
          <Link to={`/restaurants/${restaurant._id}`}>
          <div className="res-card-main-image">
            <img className="res-card-image" src={restaurant.profileImage} onError={(e) => { e.target.onerror = null; e.target.src = defaultRes }} alt="Profile Restaurant pic" />
            {restaurant.isDiscount && <div className="res-card-oferta">{restaurant.discountAmount*100}<span style={{fontWeight:"800", fontSize:".7rem"}}>%</span></div>}
          </div>
          </Link>
          <div className="res-card-images" style={restaurant.images.length === 0?{border:"none"}:{}}>
            {restaurant.images.map((image, index)=>{
              return(
                <div key={index} className="res-card-other-image">
                  <img className="res-card-image" src={image} onError={(e) => { e.target.onerror = null; e.target.src = defaultDish }} alt="food pic" />
                </div>
              )
            })}
          </div>
        </div>
        <div className="res-card-home-data">
          <div className="res-card-home-data-izq">
            <p className="res-card-home-name">{restaurant.name}</p>
            <p className="res-card-home-adress">{restaurant.address}</p> {/*, ({restaurant.city}) */}
            <div className="res-car-homr-data-row">
              <p className="res-card-home-rating">{restaurant.rating}⭐</p>
              <p className="res-card-home-distance">{distance}</p>
            </div>
            <div className="res-card-home-categories-container">
              {restaurant.categories.slice(0, 3).map((categoria, index)=>{
                return(
                  <div key={index} className="res-card-home-data-categoria">{categoria}</div>
                )
              })}
            </div>
          </div>
          <Link to={`/restaurants/${restaurant._id}/bookings`} state={{from:'/'}}>
            <button className="res-card-home-data-button"  style={restaurant.isDiscount ? {backgroundColor:"#F1C40F", color:"rgb(20, 20, 20)", fontWeight:"700"}:{}}>RESERVAR</button>
          </Link>
        </div>
    </div>
  )
}

export default RestaurantCardHome