import "../styles/Favoritos.css"
import nearBitesText from "../assets/images/logos/NearBites_texto.png";
import { useEffect, useState } from "react";
import service from "../services/config";
import RestaurantCardLike from "../components/RestaurantCardLike.jsx"
import LikeSelect from "../assets/images/logos/Like_red.png"
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";


function Favoritos(props) {

  const { position } = props
  const [favourites, setFavourites] = useState([])
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);


  const getData = async ()=>{
    const response = await service.get('/restaurants/user/like')
    setFavourites(response.data)
    setLoading(false)
  }

  useEffect(()=>{
    getData()
    return ()=>{}
  }, [])

  return (
    <div className="favourites-centradito" >
      <div className="favourites-container">
      <div onClick={()=>navigate(`/` )} className="restaurant-id-volver boton-fav-volver"><p style={{pointerEvents:"none"}}>❮</p></div>

        <div className="favourites-img-container">
          <img src={nearBitesText} alt="Near Bites logo"/>
          <div className="fav-icon-img-container">
            <img className="fav-icon-img" src={LikeSelect} alt="Icono de favoritos" />
          </div>
        </div>
        {loading ?
        ( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div>)
        : (<>
        {favourites.length === 0 &&
          <div className="reservas-anteriores-container reservas-container" style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <p className="sin-resultados"> Si aún no has encontrado ese sitio<br/>que te robe el corazón.<br/>Este es un buen comienzo.</p>
            <button onClick={()=>navigate('/')} className="reg-boton">Buscar Restaurantes</button>
          </div>}
          <div className="favourites-restaurants-container">
            {favourites.map((restaurante)=>{
              return(<RestaurantCardLike key={restaurante._id} restaurant={restaurante} position={position} getData={getData}/> )
            })}
          </div>
          </>)
        }
        
      </div>
    </div>
  )
}

export default Favoritos