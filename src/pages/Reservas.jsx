import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";
import "../styles/Listas.css"

function Reservas() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [infoMessage, setInfoMessage] = useState("")
  const [warning, setWarning] = useState(false)

  const {loggedUserId} = useContext(AuthContext)
  const [oldBookings, setOldBookings] = useState(null)
  const [bookings, setBookings] = useState(null)

  const { isDark } = useContext(ThemeContext)
  const navigate = useNavigate()
  const distance = 2

  const getData = async ()=>{
    const response = await axios.get(`${API_URL}/api/bookings/users/${loggedUserId}`)
    const hoy = new Date()
    hoy.setDate(hoy.getDate() - 1)
    const pasadas = []
    const actuales = []
    response.data.forEach((booking)=>{
      if (new Date(booking.day) < hoy){
        pasadas.push(booking)
      }
      else{
        actuales.push(booking)
      }
    })
    setOldBookings(pasadas)
    setBookings(actuales)
  }

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

  useEffect(()=>{
    getData()
  }, [])

  const handleDelete = async (e) =>{
    e.preventDefault()
   try {
     await axios.delete(`${API_URL}/api/bookings/${e.target.name}`)
     setInfoMessage("Reserva eliminada correctamente")
     getData()
   } catch (error) {
      console.log(error)
   }
  }

  if(oldBookings === null || bookings === null){
    return(
      <h3>...Accediendo a los datos</h3>
    )
  }

  return (
    <div className="centradito-listas">
      <div className="reservas-maxwidth-container">
        <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0", fontSize:".9rem", left:"0", zIndex:"25"}}>{infoMessage}</p>
        <div onClick={()=>navigate('/')} className="restaurant-id-volver" style={{top:"-45px"}}><p style={{pointerEvents:"none"}}>❮</p></div>
        <p className="booking-list-titular">ANTIGUAS</p>
        <div className="reservas-anteriores-container reservas-container">
          {oldBookings.map(booking=>{
            return(
              <div className="ficha-bookinglist-container" key={booking._id}>
                <Link to={`/restaurants/${booking.restaurant._id}`}>
                <div className="ficha-bookinglist-img-container">
                  <img className="ficha-bookinglist-img" src={booking.restaurant.profileImage} alt="" />
                </div>
                </Link>
                <div className="ficha-bookinglist-data-container">
                  <div className="ficha-bookinglist-data-restaurant">
                    <div className="data-cabecera">
                      <p className="ficha-bookinglist-text">{booking.restaurant.name}</p>
                      <p className="ficha-bookinglist-text">{booking.restaurant.rating}⭐</p>
                    </div>
                    <p className="ficha-bookinglist-text">{booking.restaurant.address}</p>
                  </div>
                  <hr className="separador"/>
                  <div className="ficha-bookinglist-data-reserva">
                    <p className="ficha-bookinglist-text-data">Reservada mesa el <strong> {booking.day.split('T')[0].split('-')[2]}/{booking.day.split('T')[0].split('-')[1]}/{booking.day.split('T')[0].split('-')[0]}</strong></p>
                    <p className="ficha-bookinglist-text-data">Para <strong> {booking.partySize} </strong> personas</p>
                  </div>
                  <div className="ficha-bookinglist-botonera">
                    <button onClick={handleDelete} className="ficha-bookinglist-boton" name={booking._id}>X</button>
                  </div>
                </div>
              </div>
          )
          })}
        </div>
        <p className="booking-list-titular">PENDIENTES</p>
        <div className="reservas-actuales-container reservas-container">
          {bookings.map(booking=>{
            return(
              <div className="ficha-bookinglist-container" key={booking._id}>
                <Link to={`/restaurants/${booking.restaurant._id}`}>
                <div className="ficha-bookinglist-img-container">
                  <img className="ficha-bookinglist-img" src={booking.restaurant.profileImage} alt="" />
                </div>
                </Link>
                <div className="ficha-bookinglist-data-container">
                  <div className="ficha-bookinglist-data-restaurant">
                    <div className="data-cabecera">
                      <p className="ficha-bookinglist-text">{booking.restaurant.name}</p>
                      <p className="ficha-bookinglist-text">{booking.restaurant.rating}⭐</p>
                    </div>
                    <p className="ficha-bookinglist-text">{booking.restaurant.address}</p>
                  </div>
                  <hr className="separador"/>
                  <div className="ficha-bookinglist-data-reserva">
                    <p className="ficha-bookinglist-text-data">Reservada mesa el <strong> {booking.day.split('T')[0].split('-')[2]}/{booking.day.split('T')[0].split('-')[1]}/{booking.day.split('T')[0].split('-')[0]}</strong></p>
                    <p className="ficha-bookinglist-text-data">Para <strong> {booking.partySize} </strong> personas</p>
                  </div>
                  <div className="ficha-bookinglist-botonera">
                    <button onClick={handleDelete} className="ficha-bookinglist-boton" name={booking._id}>X</button>
                  </div>
                </div>
              </div>)
            })}
        </div>
      </div>
    </div>
  )
}

export default Reservas