import "../styles/Favoritos.css"
import nearBitesText from "../assets/images/logos/NearBites_texto.png";
import { useEffect, useState } from "react";
import service from "../services/config";
import RestaurantCardFav from "../components/RestaurantCardFav.jsx"
import FavSelect from "../assets/images/logos/Favorites_selected.png"
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";


function Wishlist(props) {

  const { position } = props
  const [wishes, setWishes] = useState([])
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)


  const getData = async ()=>{
    const response = await service.get('/users/wishlist/populate')
    setWishes(response.data.wishlist)
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
            <img className="fav-icon-img" src={FavSelect} alt="Icono de favoritos" />
          </div>
        </div>
        {loading ?
          ( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div>)
          : (<>
            {wishes.length === 0 &&
              <div className="reservas-anteriores-container reservas-container" style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <p className="sin-resultados"> No nos podemos creer que no tengas planeado ningún sitio al que ir.<br/>No puede ser.<br/>Echa un buen vistazo.</p>
                <button onClick={()=>navigate('/')} className="reg-boton">Buscar Restaurantes</button>
              </div>}
          <div className="favourites-restaurants-container">
            {wishes.map((restaurante)=>{
              return(<RestaurantCardFav key={restaurante._id} restaurant={restaurante} position={position} getData={getData}/> )
            })}
          </div>
          </>)
        }
        
      </div>
    </div>
  )
}

export default Wishlist