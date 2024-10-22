import "../styles/Favoritos.css"
import nearBitesText from "../assets/images/logos/nearBites_texto.png";
import { useEffect, useState } from "react";
import service from "../services/config";
import RestaurantCardFav from "../components/RestaurantCardFav.jsx"
import FavSelect from "../assets/images/logos/Favorites_selected.png"
import { useNavigate } from "react-router-dom";

function Wishlist(props) {

  const { position } = props
  const [wishes, setWishes] = useState(null)
  const navigate = useNavigate()

  const getData = async ()=>{
    const response = await service.get('/users/wishlist/populate')
    setWishes(response.data.wishlist)
  }

  useEffect(()=>{
    getData()
    return ()=>{}
  }, [])

  if (!wishes){
    return (<h3>...loading</h3>)
  }
  return (
    <div className="favourites-centradito" >
      <div className="favourites-container">
        <div className="favourites-img-container">
          <img src={nearBitesText} alt="Near Bites logo"/>
          <div className="fav-icon-img-container">
            <img className="fav-icon-img" src={FavSelect} alt="Icono de favoritos" />
          </div>
        </div>
        {wishes.length === 0 && <div className="reservas-anteriores-container reservas-container" style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <p className="sin-resultados"> No nos podemos creer que no tengas planeado ningún sitio al que ir.<br/>No puede ser.<br/>Echa un buen vistazo.</p>
          <button onClick={()=>navigate('/')} className="reg-boton">Buscar Restaurantes</button>
        </div>}
      <div className="favourites-restaurants-container">
        {wishes.map((restaurante)=>{
          return(<RestaurantCardFav key={restaurante._id} restaurant={restaurante} position={position} getData={getData}/> )
        })}
      </div>
        
      </div>
    </div>
  )
}

export default Wishlist