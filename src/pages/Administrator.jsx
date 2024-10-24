import "../styles/Administrator.css"
import { useEffect, useState } from "react";
import service from "../services/config";
import "../styles/PruebasCloudinary.css"
import nearBitesText from "../assets/images/logos/NearBites_texto.png";
import RestaurantCardOwner from "../components/RestaurantCardOwner";
import DotLoader from "react-spinners/DotLoader";

function Administrator() {
  
  const [loading, setLoading] = useState(true);

  const [restaurants, setRestaurants] = useState([])

  const getData = async ()=>{
    const response = await service.get("/users/owner")
    // console.log(response.data)
    setRestaurants(response.data.restaurantsOwned)
    setLoading(false)
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
          {loading ?
            ( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div>)
            : (<>
              {restaurants.map(restaurant=>{
                return(
                  <RestaurantCardOwner key={restaurant._id} restaurant={restaurant}/>
              )
              })}
            </>)
          }
        </div>
        
      </div>
  }
  </div>
  )
  
  }

export default Administrator