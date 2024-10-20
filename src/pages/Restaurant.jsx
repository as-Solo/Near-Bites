import "../styles/RestaurantId.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReviewBoard from "../components/ReviewBoard";
import { ThemeContext } from "../context/theme.context";
import LikeWhite from "../assets/images/logos/Like_white.png"
import LikeRed from "../assets/images/logos/Like_red.png"



function Restaurant() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [infoMessage, setInfoMessage] = useState("")
  const [warning, setWarning] = useState(false)

  const {loggedUserId} = useContext(AuthContext)
  const { restaurantId } = useParams()
  
  const { isDark } = useContext(ThemeContext)
  const navigate = useNavigate()
  const distance = 2 // aqui va la formula para calcular distancia entre position y las coordenadas del restaurante

  const [restaurante, setRestaurante] = useState(null)
  const [reviews, setReviews] = useState(null)

  const [makingReview, setMakingReview] = useState(false)
  const [newReview, setNewReview] = useState({description:'', rating:1})

  const [isLike, setIsLike] = useState(false)


  const getData = async () =>{
    try {
      const response = await axios.get(`${API_URL}/api/restaurants/${restaurantId}`)
      setRestaurante(response.data)
      const resrev = await axios.get(`${API_URL}/api/reviews/${restaurantId}/with_users`)
      // console.log(resrev.data)
      setReviews(resrev.data)
      if(response.data.likes.includes(loggedUserId)){
        setIsLike(true)
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
          await axios.post(`${API_URL}/api/reviews`, {
          user: loggedUserId,
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
    const token = localStorage.getItem("authToken")
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    if(!isLike){
      try {
        // console.log(typeof restaurantId, typeof loggedUserId)
        const response = await axios.put(`${API_URL}/api/restaurants/like`, {restaurantId:restaurantId, userId:loggedUserId}, config)
        setInfoMessage(response.data.message)
        setIsLike(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (restaurante === null || reviews === null){
    return ( <h3>...Cargando datos</h3> )
  }
  return (
    <div className="restaurant-id-centradito">
      <div className="restaurant-id-container">
        <div className="restaurant-id-img-container">
          <img className="restaurant-id-img" src={restaurante.profileImage} alt="" />
          <div onClick={()=>navigate('/')} className="restaurant-id-volver"><p style={{pointerEvents:"none"}}>❮</p></div>
        </div>
        <div className="restaurant-id-ficha">
          <div onClick={handleLike} className="like-button" style={{borderColor:isLike?"rgba(180, 25, 25, 0)":"white"}}>
            <img src={isLike?LikeRed:LikeWhite} alt="" />
          </div>
          <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0", fontSize:".9rem", left:"0", zIndex:"25"}}>{infoMessage}</p>
          <div className="form-make-review" style={{opacity:makingReview?"1":"0", pointerEvents:makingReview?"auto":"none"}}>
              <textarea onChange={(e)=>handleChanges(e)} className="make-review-area" name="description" id="" value={newReview.description}></textarea>
              <div className="make-review-rating-container">
                <label className="make-review-rating-text" htmlFor="rating">Rating</label>
                <input onChange={(e)=>handleChanges(e)} className="make-review-rating" type="number" name="rating" max={5} min={1}  value={newReview.rating}/>
              </div>
            <div className="make-review-botonera">
              <button onClick={handleCancel}  className="make-review-boton review-boton-cancelar" >Cancelar</button>
              <button onClick={handleCreate} className="make-review-boton review-boton-crear" >Crear</button>
            </div>
          </div>
          <p className="res-id-name">{restaurante.name}</p>
          <p className="res-id-address">{restaurante.address}, ({restaurante.city})</p>
          <p className="res-id-rating">{restaurante.rating}⭐ - {distance}km</p>
          <div className="res-card-home-categories-container">
              {restaurante.categories.map((categoria, index)=>{
                return(
                  <div key={index} className="res-card-home-data-categoria">{categoria}</div>
                )
              })}
            </div>
            <div className="restaurant-id-botonera">
              <button onClick={()=>setMakingReview(true)} className="res-id-boton boton-izq" >Comentar</button>
              <button onClick={()=>navigate(`/restaurants/${restaurantId}/bookings`)} className="res-id-boton boton-der" >Reservar</button>
            </div>
        </div>
        <div className="restaurant-id-reviews">
          {reviews.length === 0 && <p className="reviews-vacias">Aún no hay reseñas de este sitio.<br/>Se el primero en escribir una.</p> }
          {reviews.map(review=>{
            return(
              <ReviewBoard key={review._id} review={review} setInfoMessage={setInfoMessage} getData={getData}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Restaurant