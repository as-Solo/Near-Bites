import "../styles/RestaurantCardHome.css"
import { Link, useLocation } from "react-router-dom"
import defaultDish from "../assets/images/logos/DefaultDish.png"
import defaultRes from "../assets/images/logos/DefaultRes.png"
import calcularDistancia from "../utils/calcularDistancia.js"
import { useEffect, useState } from "react"
import service from "../services/config.js"
import Stars from "./Stars.jsx"


function RestaurantCardLike(props) {
  const { restaurant, position, getData } = props

  const [confirm, setConfirm] = useState(false)
  const [numFav, setNumFav] = useState([])

  const getFav = async ()=>{
    const response = await service.get(`/users/allfavs/${restaurant._id}`)
    setNumFav(response.data)
  }
  useEffect(()=>{
    getFav()
  },[])

  const handleLike = async ()=>{
      try {
        const response = await service.put(`/restaurants/unlike`, {restaurantId:restaurant._id})
        getData()
        setConfirm(false)
      }
      catch (error) {
        console.log(error)
      }
    }
  
  
  const distance = calcularDistancia(position[0], position[1], restaurant.coords[0], restaurant.coords[1]).toFixed(1) + " km"
  return (
    <div className="res-card-home-container" style={{position:"relative"}}>
      
      <div className="fav-delete-confirm" style={{opacity:confirm?"1":"0", pointerEvents:confirm?"auto":"none"}}>
        <div className="marco-delete-confirm">
          <p>¿Estás seguro que quieres eliminar esta restaurante de favoritos?</p>
          <div className="delete-confirm-botonera">
            <button onClick={handleLike} className="delete-confirm-eliminar delete-confirm-boton">Eliminar</button>
            <button onClick={()=>setConfirm(false)} className="delete-confirm-cancelar delete-confirm-boton">Cancelar</button>
          </div>
        </div>
      </div>



      <div className="res-card-image-container">
        <Link to={`/restaurants/${restaurant._id}`}>
        <div className="res-card-main-image">
          <img className="res-card-image" src={restaurant.profileImage} onError={(e) => { e.target.onerror = null; e.target.src = defaultRes }} alt="Profile Restaurant pic" />
          {restaurant.isDiscount && <div className="res-card-oferta">{restaurant.discountAmount}<span style={{fontWeight:"800", fontSize:".7rem"}}>%</span></div>}
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
          <p className="res-card-home-adress">{restaurant.address}</p>
          <div className="res-car-homr-data-row">
              <div className="rating-container">
                {/* <p className="res-card-home-rating">{restaurant.rating}</p> */}
                <Stars value={restaurant.rating}/>
              </div>
              <p className="res-card-home-rating">{restaurant.likes.length}💕</p>
              <p className="res-card-home-rating">{numFav}🔖</p>
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
        <div className="botonera-fav">
          <Link to={`/restaurants/${restaurant._id}/bookings`} state={{from:'/'}}>
            <button className="res-card-home-data-button"  style={restaurant.isDiscount ? {backgroundColor:"#F1C40F", color:"rgb(20, 20, 20)", fontWeight:"700"}:{}}>RESERVAR</button>
          </Link>
          <button onClick={()=>{setConfirm(true)}} className="res-card-home-data-button fav-eliminar">Eliminar</button>
        </div>
      </div>
        
    </div>
  )
}

export default RestaurantCardLike