import "../styles/RestaurantId.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";
import "../styles/RestaurantIdBooking.css"
import service from "../services/config";
import calcularDistancia from "../utils/calcularDistancia.js"
import DotLoader from "react-spinners/DotLoader";
import Stars from "../components/Stars.jsx";

function RestaurantBooking(props) {

  let numResults = 0

  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const from = location.state?.from 

  const {position} = props
  const [distance, setDistance] = useState(null)

  const { isDark } = useContext(ThemeContext)
  const navigate = useNavigate()

  const [infoMessage, setInfoMessage] = useState("")
  const [warning, setWarning] = useState(false)

  const { restaurantId } = useParams()

  const [restaurante, setRestaurante] = useState({})

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
      restaurant: restaurantId
    }
    try {
      await service.post(`/bookings`, newReview)
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
    booking.data.forEach(booking=>{
      clone.forEach(turno=>{
        if(turno[booking.startHour]){
          turno[booking.startHour] -= booking.partySize
        }
      })
    })
    setTurnos(clone)
    setRestaurante(response.data)
    setDistance(calcularDistancia(position[0], position[1], response.data.coords[0], response.data.coords[1]).toFixed(1))
    setLoading(false)
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


  return (
    <div className="restaurant-id-centradito">
      <div className="restaurant-id-container">
        <div className="restaurant-id-img-container">
        {loading
        ? ( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div> )
        : <img className="restaurant-id-img" src={restaurante.profileImage} alt="" />
        }
          <div onClick={()=>navigate( from || `/restaurants/${restaurantId}` )} className="restaurant-id-volver"><p style={{pointerEvents:"none"}}>❮</p></div>
        </div>

        {loading
        ? ( null )
        :<>
          <div className="restaurant-id-ficha cabecera-booking">
            <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0", fontSize:".9rem", left:"0", zIndex:"25"}}>{infoMessage}</p>
            <div className="res-ficha-cabecera">
              <p className="res-id-name">{restaurante.name}</p>
              <div className="rating-container">
                <Stars value={restaurante.rating}/>
                <p className="res-id-rating"> - {distance} km</p> {/*{restaurante.rating}⭐*/}
              </div>
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
        </>}
        
        <div className="form-booking-container">
          <div className="form-cabecera">
            <div className="form-cabecera-calendar-container">
              <input className="form-booking-input" onChange={handleDia} type="date" value={dia}/>
              <div className="form-comensales-container">
                <label className="comensales-label" htmlFor="partySize">Comensales</label>
                <input className="form-booking-input" onChange={handlePartySize} type="number" name="partySize" value={partySize} min={1} max={restaurante.capacity}/>
              </div>
            </div>
          </div>

          <div className="form-slots-select-container">
            {loading ?
              ( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div>)
              : (<>
                {turnos.map((turno, index)=>{
                  const [hora, capacidad] = (Object.entries(turno)[0])
                  if (capacidad >= partySize){
                    numResults++
                    return (
                      <div className="ficha-turno-container" key={index} >
                        <div className="ficha-data">
                          <div className="ficha-turno-column">
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
                </>)
              }
            </div>
        </div>

      </div>
    </div>
  )
}

export default RestaurantBooking