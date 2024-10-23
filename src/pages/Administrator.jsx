import "../styles/Administrator.css"
import { useEffect, useState } from "react";
import service from "../services/config";
import "../styles/PruebasCloudinary.css"
import nearBitesText from "../assets/images/logos/NearBites_texto.png";
import RestaurantCardOwner from "../components/RestaurantCardOwner";

function Administrator() {

  const [restaurants, setRestaurants] = useState([])

  const getData = async ()=>{
    const response = await service.get("/users/owner")
    // console.log(response.data)
    setRestaurants(response.data.restaurantsOwned)
  }

  useEffect(()=>{
    getData()
  }, [])

  return(
    <div className="profile-centradito" >
    {restaurants === null ? <h3>...cargando</h3>:
      <div className="owner-res-area">

        <div className="logoHome-container" style={{top:"-70px", left:"10px"}}>
          <img className="logoHome-img" src={nearBitesText} alt="Near bites logo" />
        </div>

        <div className="owner-res-list-container">
          {restaurants.map(restaurant=>{
            return(
              <RestaurantCardOwner key={restaurant._id} restaurant={restaurant}/>
          )
          })}
        </div>
        
      </div>
  }
  </div>
  )
  
  }

export default Administrator