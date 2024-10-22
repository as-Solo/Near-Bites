import { useEffect, useState } from "react"
import "../styles/Home.css"
import Map from "../components/Map"
import axios from "axios"
import RestaurantCardHome from "../components/RestaurantCardHome"
import nearBitesText from "../assets/images/logos/NearBites_texto.png";
import { useLocation } from "react-router-dom"


function Home(props) {

  const API_URL = import.meta.env.VITE_API_URL;

  // const [position, setPosition] = useState([40.3954259, -3.7182542]);
  const {position} = props
  const [restaurantList, setRestaurantList] = useState([])
  const [availableCategories, setAvailableCategories] = useState([])
  
  const [queryString, setQueryString] = useState('')
  const [categoriesList, setCategoriesList] = useState([]) // estos son los filtros
  const [limitRes, setLimitRes] = useState(5)
  const [distanceRes, setDistanceRes] = useState(4)
  const [isTyping, setIsTyping] = useState(null)


  const getData = async ()=>{
    try {
      // const response = await axios.get(`${API_URL}/api/restaurants/${position[0]}/${position[1]}/${distanceRes*1000 || 2000}/${limitRes || 5}`)
      const response = await axios.post(`${API_URL}/api/restaurants/filters/dinamicos/${position[0]}/${position[1]}/${distanceRes*1000 || 4000}/${limitRes || 5}`, {queryString, categoriesList})
      // console.log(response.data)
      setRestaurantList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCategories = async ()=>{
    try {
      const response = await axios.get(`${API_URL}/api/restaurants/unique/categories`)
      setAvailableCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCategories();
  }, [])

  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.watchPosition(
    //     (pos) => {
    //       // console.log(pos)
    //       const { latitude, longitude } = pos.coords;
    //       setPosition([latitude, longitude]);
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // }
    // else {
    //   console.error('No podemos geolocalizarte');
    // }
    getData()
  }, [limitRes, distanceRes, position, queryString, categoriesList]);

  const handleInput = (e)=>{
    e.preventDefault()
    if (isTyping){
      clearTimeout(isTyping)
    }
    setIsTyping( setTimeout(()=>{
      setQueryString(e.target.value)
    }, 800) )
  }

  const handleLimit = (e)=>{
    // console.log(e.target.value)
    e.preventDefault()
    if (isTyping){
      clearTimeout(isTyping)
    }
    setIsTyping( setTimeout(()=>{
      setLimitRes(e.target.value)
    }, 800) )
  }

  const handleDistance = (e)=>{
    // console.log(e.target.value)
    e.preventDefault()
    if (isTyping){
      clearTimeout(isTyping)
    }
    setIsTyping( setTimeout(()=>{
      setDistanceRes(e.target.value)
    }, 800) )
  }

  const handleCategories = (e) =>{
    let clone = structuredClone(categoriesList)
    if (e.target.checked == true){
      clone.push(e.target.name)
    }
    else{
      clone = clone.filter(elem=>elem!=e.target.name)
    }
    setCategoriesList(clone)
    console.log(clone)
  }

  return (
    <div className="home-centradito">
      <div className="home-container">
        <div className="logoHome-container">
          <img className="logoHome-img" src={nearBitesText} alt="" />
        </div>
        {/* <Input handleInput={handleInput} content={content}/> */}
        <div className="barra-busqueda-home">
          <input onChange={handleInput} className="barra-busqueda-input" type="text" name="query" placeholder="¿Qué te apetece hoy?"/>
          <div className="barra-busqueda-numbers-container">
            <div className="barra-busqueda-parejita">
              <label className="busqueda-numbers-labels" htmlFor="limit">Nº</label>
              <input className="barra-busqueda-numbers-input" onChange={handleLimit} type="number" name="limit" min={1} defaultValue={5}/>
            </div>
            <div className="barra-busqueda-parejita">
              <label className="busqueda-numbers-labels" htmlFor="distance">Distancia</label>
              <input className="barra-busqueda-numbers-input" onChange={handleDistance} type="number" name="distance" min={1} defaultValue={4}/>
            </div>
          </div>
        </div>
        <div className="home-map-container">
          <Map position={position} restaurantes={restaurantList}/>
        </div>
        <div className="barra-categorias">
          {availableCategories.map((categoria, index)=>{
            return(
                <div key={index} className="categoria-home">
                  <input className="categoria-checker-input" onClick={handleCategories} type="checkbox" name={categoria}/>
                  <div className="categoria-checked-label">{categoria}</div>
                </div>
            )
          })}
        </div>
        <div className="home-content-container" style={{padding:"5px 0"}}>
          {/* <div className="home-filters-container"></div> */}
          <div className="home-restaurants-container">
            {restaurantList.length <= 0 && <p className="sin-resultados">No hay resultados para esta búsqueda.<br/> ¿Por qué no pruebas a aumentar la distancia?</p> }
            {restaurantList.map(restaurant=>{
              return(
                <RestaurantCardHome key={restaurant._id} restaurant={restaurant} position={position}/>
              )
            })}
            {/* <div style={{padding:"30px", width:"100%"}}></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home