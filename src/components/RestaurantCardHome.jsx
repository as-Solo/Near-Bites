import "../styles/RestaurantCardHome.css"
import { Link } from "react-router-dom"

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfgCGR6P5HG_TjU9CKr52zZ4Vbo1tAqMjq4g&s
function RestaurantCardHome(props) {
  const {restaurant} = props
  const distance = "3km"
  return (
    <div className="res-card-home-container">
        <div className="res-card-image-container">
          <Link to={`/restaurants/${restaurant._id}`}>
          <div className="res-card-main-image">
            <img className="res-card-image" src={restaurant.profileImage} alt="" />
          </div>
          </Link>
          <div className="res-card-images">
            {restaurant.images.map((image, index)=>{
              return(
                <div key={index} className="res-card-other-image">
                  <img className="res-card-image" src={image} alt="" />
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
              {restaurant.categories.map((categoria, index)=>{
                return(
                  <div key={index} className="res-card-home-data-categoria">{categoria}</div>
                )
              })}
            </div>
          </div>
          <Link to={`/restaurants/${restaurant._id}/bookings`}>
            <button className="res-card-home-data-button">RESERVAR</button>
          </Link>
        </div>
    </div>
  )
}

export default RestaurantCardHome