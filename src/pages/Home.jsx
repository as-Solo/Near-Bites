import { useEffect, useState } from "react"
import "../styles/Home.css"
import Input from "../components/Input"
import Map from "../components/Map"
import axios from "axios"
import RestaurantCardHome from "../components/RestaurantCardHome"

function Home() {

  const [position, setPosition] = useState([40.3954259, -3.7182542]);
  const [restaurantList, setRestaurantList] = useState([])
  const API_URL = import.meta.env.VITE_API_URL;

  const getData = async ()=>{
    const response = await axios.get(`${API_URL}/api/restaurants/${position[0]}/${position[1]}/${2000}/${10}`)
    console.log(response.data)
    setRestaurantList(response.data)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          console.log(pos)
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    else {
      console.error('No podemos geolocalizarte');
    }
    getData()
  }, []);

  const [content, setContent] = useState("")
  const handleInput = (e)=>{
    e.preventDefault()
    console.log(e.target.value)
    setContent(e.target.value)
  }

  return (
    <div className="home-centradito">
      <div className="home-container">
        {/* <Input handleInput={handleInput} content={content}/> */}
        <div className="home-map-container">
          <Map position={position} restaurantes={restaurantList}/>
        </div>
        <div className="home-content-container" style={{padding:"5px 0"}}>
          {/* <div className="home-filters-container"></div> */}
          <div className="home-restaurants-container">
            {restaurantList.map(restaurant=>{
              return(
                <RestaurantCardHome key={restaurant._id} restaurant={restaurant}/>
              )
            })}
            <div style={{height:"00px", width:"100%"}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home