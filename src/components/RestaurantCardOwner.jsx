import { Link } from "react-router-dom"
import defaultRes from "../assets/images/logos/DefaultRes.png"

function RestaurantCardOwner(props) {
  
  const { restaurant } = props
  return (
    <div className="ficha-res-owner-list-container">
          <Link to={`/edit-restaurants/${restaurant._id}`}>
          <div className="ficha-res-owner-img-container">
            <img className="ficha-res-owner-image" src={restaurant.profileImage} onError={(e) => { e.target.onerror = null; e.target.src = defaultRes }} alt={`Foto de ${restaurant.name}` } />
            {restaurant.isDiscount && <div className="etiqueta-oferta">
              <p>{restaurant.discountAmount} <span>%</span> </p>
            </div>}
          </div>
          </Link>

          <div className="ficha-res-data-container">
            <div className="ficha-res-data-cabecera">
              <p className="ficha-res-data-nombre" >{restaurant.name}</p>
              <p className="ficha-res-data-rating" >{restaurant.rating} ⭐</p>
            </div>
            <p className="ficha-res-data-address">{restaurant.address}</p>
            <div className="res-card-home-categories-container">
            {restaurant.categories.map((categoria, index)=>{
              return(
                <div key={index} className="res-card-home-data-categoria">{categoria}</div>
              )
            })}

            </div>
          </div>

        </div>
  )
}

export default RestaurantCardOwner