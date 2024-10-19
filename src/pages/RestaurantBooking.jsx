import "../styles/RestaurantId.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";
import "../styles/RestaurantIdReview.css"


function RestaurantBooking() {

  const API_URL = import.meta.env.VITE_API_URL;

  const distance = 2 // aqui va la formula para calcular distancia entre position y las coordenadas del restaurante

  const { isDark } = useContext(ThemeContext)
  const navigate = useNavigate()

  const [infoMessage, setInfoMessage] = useState("")
  const [warning, setWarning] = useState(false)

  const {loggedUserId} = useContext(AuthContext)
  const { restaurantId } = useParams()

  const [restaurante, setRestaurante] = useState(null)

  const [turnos, setTurnos] = useState([])
  const [partySize, setPartySize] = useState(1)
  const [dia, setDia] = useState(() => {
    const today = new Date(Date.now());
    const formattedDate = today.toISOString().split("T")[0];
    return formattedDate;
  })
  
  // quiza pueda hacer un objeto con claves por cada turno del restaurante
  // lo relleno por default con el capacity y luego voy restando 
  // los partySize de cada reserva correspondiente a ese turno

  const handleDia = (e)=>{
    e.preventDefault()
    setDia(e.target.value)
  }

  const handlePartySize = (e)=>{
    e.preventDefault()
    if(e.target.value > restaurante.capacity){
      e.target.value = restaurante.capacity
    }
    setPartySize(e.target.value)
  }

  const handleCreateBooking = async (e)=>{
    const newReview = {
      partySize: partySize,
      day: dia,
      startHour: e.target.name,
      user: loggedUserId,
      restaurant: restaurantId
    }
    try {
      const response = await axios.post(`${API_URL}/api/bookings`, newReview)
      setInfoMessage(`Reserva realizada para ${partySize} personas`)
      getRestaurantSlots()
    } catch (error) {
      console.log(error)
    }
  }

  const getRestaurantSlots = async ()=>{
    const response = await axios.get(`${API_URL}/api/restaurants/${restaurantId}`)
    const clone = []
    response.data.timeSlots.forEach(startHour=>{
      clone.push({[startHour]: response.data.capacity})
    })

    const booking = await axios.get(`${API_URL}/api/bookings/${restaurantId}/${dia}`)
    console.log(booking.data)
    booking.data.forEach(booking=>{
      clone.forEach(turno=>{
        if(turno[booking.startHour]){
          turno[booking.startHour] -= booking.partySize
        }
      })
    })
    setTurnos(clone)
    setRestaurante(response.data)
  }

  useEffect(()=>{
    getRestaurantSlots()
    return ()=>{}
  }, [dia])


  if (restaurante === null){
    return( <h1>Probando</h1> )
  }
  return (
    // annadirle un boton para ver el perfil del restaurante
    <div className="restaurant-id-centradito">
      <div className="restaurant-id-container">
        <div className="restaurant-id-img-container">
          <img className="restaurant-id-img" src={restaurante.profileImage} alt="" />
          <div onClick={()=>navigate('/')} className="restaurant-id-volver"><p style={{pointerEvents:"none"}}>❮</p></div>
        </div>

        <div className="restaurant-id-ficha cabecera-booking">
          <div className="res-ficha-cabecera">
            <p className="res-id-name">{restaurante.name}</p>
            <p className="res-id-rating">{restaurante.rating}⭐ - {distance}km</p>
          </div>
          <p className="res-id-address">{restaurante.address}, ({restaurante.city})</p>
          <div className="res-card-home-categories-container">
              {restaurante.categories.map((categoria, index)=>{
                return(
                  <div key={index} className="res-card-home-data-categoria">{categoria}</div>
                )
              })}
          </div>
        </div>
        
        <div className="form-booking-container">
          <input onChange={handleDia} type="date" />
          <input onChange={handlePartySize} type="number" name="partySize" value={partySize} min={1} max={restaurante.capacity}/>
          <hr />
          <p>Esto son nuestros turnos para el {dia}</p>
          {turnos.map((turno, index)=>{
            const [hora, capacidad] = (Object.entries(turno)[0])
            if (capacidad >= partySize){
            return (
              <div key={index} style={{display:"flex", gap:"5px"}}>
                <p>{hora} - </p>
                <p>{capacidad}</p>
                <button onClick={handleCreateBooking} name={hora}>reservar</button>
              </div>
            )}
          })}
        </div>

          <p>restaurante {restaurantId} usuario {loggedUserId}</p>

      </div>
    </div>
  )
}

export default RestaurantBooking