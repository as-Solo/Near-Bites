import "../styles/RestaurantId.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReviewBoard from "../components/ReviewBoard";
import { ThemeContext } from "../context/theme.context";
import LikeWhite from "../assets/images/logos/Like_white.png"
import LikeRed from "../assets/images/logos/Like_red.png"
import FavUnselect from "../assets/images/logos/Favorites_unselected.png"
import FavSelect from "../assets/images/logos/Favorites_selected.png"
import defaultRes from "../assets/images/logos/DefaultRes.png"
import service from "../services/config";
import calcularDistancia from "../utils/calcularDistancia.js"
import DotLoader from "react-spinners/DotLoader"
import Stars from "../components/Stars.jsx";
import StarsInput from "../components/StarsInput.jsx";


function Restaurant(props) {

  const API_URL = import.meta.env.VITE_API_URL;

  const { position } = props
  
  const [infoMessage, setInfoMessage] = useState("")
  const [warning, setWarning] = useState(false)

  const {isLogin, loggedUserId} = useContext(AuthContext)
  const { restaurantId } = useParams()
  
  const [numFav, setNumFav] = useState("")

  const { isDark } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [distance, setDistance] = useState(null)

  const [restaurante, setRestaurante] = useState("")
  const [reviews, setReviews] = useState([])

  const [makingReview, setMakingReview] = useState(false)
  const [newReview, setNewReview] = useState({description:'', rating:1})

  const [isLike, setIsLike] = useState(false)
  const [isFav, setIsFav] = useState(false)

  const [loading, setLoading] = useState(true);

  const getData = async (distance) =>{
    try {
      const numFavs = await service.get(`/users/allfavs/${restaurantId}`)
      setNumFav(numFavs.data)
      const response = await axios.get(`${API_URL}/api/restaurants/${restaurantId}`)
      setRestaurante(response.data)
      if(response.data){
        setLoading(false)
      }

      setDistance(calcularDistancia(position[0], position[1], response.data.coords[0], response.data.coords[1]).toFixed(1))

      const resrev = await axios.get(`${API_URL}/api/reviews/${restaurantId}/with_users`)

      setReviews(resrev.data)
      const wishlist = await service.get(`/users/wishlist`)


      if(response.data.likes.includes(loggedUserId)){
        setIsLike(true)
      }
      
      if(wishlist.data.wishlist.includes(restaurantId)){
        setIsFav(true)
      }


    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getData()
    return ()=>{}
  }, [])

  useEffect(() => {
    if (infoMessage) {
      setWarning(true)
      const warn = setTimeout(() => {
        setWarning(false);
      }, 3000);
      
      const timer = setTimeout(() => {
        setInfoMessage("");
        getData()
      }, 3500);

      return () => {clearTimeout(timer), clearTimeout(warn)};
    }
  }, [infoMessage]);
  
  const handleChanges = (e)=>{
    e.preventDefault()
    const clone = structuredClone(newReview)
    clone[e.target.name] = e.target.value
    if (clone.rating > 5){
      clone.rating = 5
    }
    setNewReview(clone)
  }

  const handleCreate = async ()=>{
    if(newReview.description){
      try {
          await service.post(`/reviews`, {
          restaurant: restaurantId,
          description: newReview.description,
          rating: newReview.rating
        })
        setInfoMessage("Reseña creada con exito.")
        setMakingReview(false)
        setNewReview({description:"", rating:1})
        getData()
      } catch (error) {
        console.log(error)
      }
    }
    else{
      setInfoMessage("Debes escribir elgo en el area de texto")
    }
  }

  const handleCancel = ()=>{
    setMakingReview(false)
    setNewReview({description:"", rating:1})
  }

  const handleLike = async ()=>{
    
    if(!isLike){
      try {
        const response = await service.put(`/restaurants/like`, {restaurantId:restaurantId})
        getData()
        setInfoMessage(response.data.message)
        setIsLike(true)
      }
      catch (error) {
        console.log(error)
      }
    }
    else{
      try {
        const response = await service.put(`/restaurants/unlike`, {restaurantId:restaurantId})
        getData()
        setInfoMessage(response.data.message)
        setIsLike(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleFav = async ()=>{
    
    if(!isFav){
      try {
        const response = await service.put(`/users/fav/${restaurantId}`)
        getData()
        setInfoMessage(response.data.message)
        setIsFav(true)
      }
      catch (error) {
        console.log(error)
      }
    }
    else{
      try {
        const response = await service.put(`/users/unfav/${restaurantId}`)
        getData()
        setInfoMessage(response.data.message)
        setIsFav(false)
      }
      catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className="restaurant-id-centradito">
      <div className="restaurant-id-container">
        <div className="restaurant-id-img-container">
        {loading
        ? ( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div> )
        : <img className="restaurant-id-img" src={restaurante.profileImage} onError={(e) => { e.target.onerror = null; e.target.src = defaultRes }} alt="" />
        }
          <div onClick={()=>navigate('/')} className="restaurant-id-volver"><p style={{pointerEvents:"none"}}>❮</p></div>
        </div>
        <div className="restaurant-id-ficha">
          {loading ?
            ( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div>)
            : (<>
              <div onClick={handleFav} className="favourite-button" style={{borderColor:isFav?"rgba(180, 25, 25, 0)":"white"}}>
                <img src={isFav?FavSelect:FavUnselect} alt="" />
              </div>
              <div onClick={handleLike} className="like-button" style={{borderColor:isLike?"rgba(180, 25, 25, 0)":"white"}}>
                <img src={isLike?LikeRed:LikeWhite} alt="" />
              </div>
              <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0", fontSize:".9rem", left:"0", zIndex:"25"}}>{infoMessage}</p>
              <div className="form-make-review" style={{opacity:makingReview?"1":"0", pointerEvents:makingReview?"auto":"none"}}>
                  <textarea onChange={(e)=>handleChanges(e)} className="make-review-area" name="description" id="" value={newReview.description}></textarea>
                  <div className="make-review-rating-container">
                    <StarsInput value={newReview.rating} handle={handleChanges}/>
                    {/* <label className="make-review-rating-text" htmlFor="rating">Rating</label> */}
                    <input onChange={(e)=>handleChanges(e)} className="make-review-rating" type="number" name="rating" max={5} min={1}  value={newReview.rating}/>
                  </div>
                <div className="make-review-botonera">
                  <button onClick={handleCancel}  className="make-review-boton review-boton-cancelar" >Cancelar</button>
                  <button onClick={handleCreate} className="make-review-boton review-boton-crear" >Crear</button>
                </div>
              </div>
              <p className="res-id-name">{restaurante.name}</p>
              <p className="res-id-address">{restaurante.address}, ({restaurante.city})</p>
              <div className="rating-container">
              {/* <p className="res-id-rating">{restaurante.rating}</p> */}
              <Stars value={restaurante.rating}/>
              <p className="res-id-rating">- {restaurante.likes.length}💕 - {numFav}🔖 - {distance} km</p>
              </div>
              <div className="res-card-home-categories-container">
                  {restaurante.categories.map((categoria, index)=>{
                    return(
                      <div key={index} className="res-card-home-data-categoria">{categoria}</div>
                    )
                  })}
                </div>
                <div className="restaurant-id-botonera">
                  <button onClick={()=>{isLogin?setMakingReview(true):navigate('/login')}} className="res-id-boton boton-izq" >Comentar</button>
                  <button onClick={()=>navigate(`/restaurants/${restaurantId}/bookings`)} className="res-id-boton boton-der" >Reservar</button>
                </div>
            </>)
          }
        </div>
        <div className="restaurant-id-reviews">
          {loading ?
            ( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div>)
            : (<>
              {reviews.length === 0 && <p className="reviews-vacias">Aún no hay reseñas de este sitio.<br/>Se el primero en escribir una.</p> }
              {reviews.map(review=>{
                return(
                  <ReviewBoard key={review._id} review={review} setInfoMessage={setInfoMessage} getData={getData}/>
                )
              })}
           </>)
          }
        </div>
      </div>
    </div>
  )
}

export default Restaurant