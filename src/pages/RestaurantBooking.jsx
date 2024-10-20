import "../styles/RestaurantId.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";
import "../styles/RestaurantIdBooking.css"


function RestaurantBooking() {

  let numResults = 0

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

    const booking = await axios.get(`${API_URL}/api/bookings/restaurants/${restaurantId}/${dia}`)
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

  useEffect(() => {
    if (infoMessage) {
      setWarning(true)
      const warn = setTimeout(() => {
        setWarning(false);
      }, 3000);
      
      const timer = setTimeout(() => {
        setInfoMessage("");
      }, 3500);

      return () => {clearTimeout(timer), clearTimeout(warn)};
    }
  }, [infoMessage]);


  if (restaurante === null){
    return( <h1>Probando</h1> )
  }
  return (
    // annadirle un boton para ver el perfil del restaurante
    <div className="restaurant-id-centradito">
      <div className="restaurant-id-container">
        <div className="restaurant-id-img-container">
          <img className="restaurant-id-img" src={restaurante.profileImage} alt="" />
          <div onClick={()=>navigate(`/restaurants/${restaurantId}`)} className="restaurant-id-volver"><p style={{pointerEvents:"none"}}>❮</p></div>
        </div>

        <div className="restaurant-id-ficha cabecera-booking">
          <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0", fontSize:".9rem", left:"0", zIndex:"25"}}>{infoMessage}</p>
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
          <div className="form-cabecera">
            <div className="form-cabecera-calendar-container">
              <input className="form-booking-input" onChange={handleDia} type="date" value={dia}/>
              <div className="form-comensales-container">
                <label className="comensales-label" htmlFor="partySize">Comensales</label>
                <input className="form-booking-input" onChange={handlePartySize} type="number" name="partySize" value={partySize} min={1} max={restaurante.capacity}/>
              </div>
            </div>
            {/* <p className="form-text-slots">Turnos disponibles el <span>{dia.split('-')[2]}/{dia.split('-')[1]}/{dia.split('-')[0]}</span></p> */}
          </div>
          <div className="form-slots-select-container">
            {turnos.map((turno, index)=>{
              const [hora, capacidad] = (Object.entries(turno)[0])
              if (capacidad >= partySize){
                numResults++
                return (
                  <div className="ficha-turno-container" key={index} >
                    <div className="ficha-data">
                      <div className="ficha-turno-column">
                        {/* <p className="ficha-labels">Turno</p> */}
                        <p className="ficha-turno-hora">{hora}</p>
                      </div>
                      <div className="ficha-turno-column">
                        <p className="ficha-labels">Huecos</p>
                        <p className="ficha-turnos-capacidad">{capacidad}</p>
                      </div>
                    </div>
                    <button className="ficha-booking-boton" onClick={handleCreateBooking} name={hora}>Reservar</button>
                  </div>
                )}
              })}
              {!numResults && <p className="sin-reservas">Lo sentimos mucho!.<br/> No tenemos reservas disponibles con esos terminos </p>}
            </div>
        </div>

      </div>
    </div>
  )
}

export default RestaurantBooking