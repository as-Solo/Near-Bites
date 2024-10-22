import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";
import "../styles/Listas.css"
import BookingCard from "../components/BookingCard";
import nearBitesText from "../assets/images/logos/nearBites_texto.png";
import service from "../services/config";


function Reservas() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [infoMessage, setInfoMessage] = useState("")
  const [warning, setWarning] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [reservaId, setReservaId] = useState("")

  const {loggedUserId} = useContext(AuthContext)
  const [oldBookings, setOldBookings] = useState(null)
  const [bookings, setBookings] = useState(null)

  const { isDark } = useContext(ThemeContext)
  const navigate = useNavigate()
  const distance = 2

  const getData = async ()=>{
    // const response = await axios.get(`${API_URL}/api/bookings/users/${loggedUserId}`)
    const response = await service.get(`/bookings/users/bookingList`)
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

  const handlePreDelete = (e)=>{
    e.preventDefault()
    setDeleteConfirm(true)
    setReservaId(e.target.name)
  }
  const handleDelete = async (e) =>{
    e.preventDefault()
   try {
    //  await axios.delete(`${API_URL}/api/bookings/${reservaId}`)
     await service.delete(`/bookings/${reservaId}`)
     setInfoMessage("Reserva eliminada correctamente")
     getData()
     setDeleteConfirm(false)
     setReservaId("")
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
      <div className="delete-confirm" style={{opacity:deleteConfirm?"1":"0", pointerEvents:deleteConfirm?"auto":"none"}}>
        <div className="marco-delete-confirm">
          <p className="texto-warning-delete">¿Estás seguro que quieres eliminar esta reserva?</p>
          <div className="delete-confirm-botonera">
            <button onClick={handleDelete} className="delete-confirm-eliminar delete-confirm-boton">Eliminar</button>
            <button onClick={()=>setDeleteConfirm(false)} className="delete-confirm-cancelar delete-confirm-boton">Cancelar</button>
          </div>
        </div>
      </div>
      <div className="reservas-maxwidth-container">
        <p className={`${isDark?'dark-':'light-'}reg-warning reg-warning`} style={{opacity:warning?"1":"0", fontSize:".9rem", left:"0", zIndex:"25"}}>{infoMessage}</p>
        <div onClick={()=>navigate('/')} className="restaurant-id-volver" style={{top:"-45px"}}><p style={{pointerEvents:"none"}}>❮</p></div>
        <img className={`${isDark?'dark-':'light-'}reg-image reg-image`} src={nearBitesText} alt="Near Bites logo"/>
        {oldBookings.length === 0 && bookings.length === 0?
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
          <div className="reservas-anteriores-container reservas-container">
            <p className="sin-resultados"> No tienes aun ninguna reserva hecha.<br/>Seguro que eso cambia pronto.<br/> ¿Por qué no echas un vistazo a nuestros restaurantes?</p>
            <button onClick={()=>navigate('/')} className="reg-boton">Buscar Restaurantes</button>
          </div>
        </div>
        :<>
        <p className="booking-list-titular">ANTIGUAS</p>
        {oldBookings.length === 0
        ?<div className="reservas-anteriores-container reservas-container" style={{minHeight:"30%", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <p className="sin-resultados"> Nos alegra que te hayas unido hace poco a nuestra comunidad.<br/>¡Hay mucho que descubrir!</p>
          <button onClick={()=>navigate('/')} className="reg-boton">Buscar Restaurantes</button>
        </div>
        :<div className="reservas-anteriores-container reservas-container">
          {oldBookings.map(booking=>{
            return(
              <BookingCard key={booking._id} booking={booking} handlePreDelete={handlePreDelete}/>
          )
          })}
        </div>
        }

        <p className="booking-list-titular">PENDIENTES</p>
        {bookings.length === 0
        ?<div className="reservas-actuales-container reservas-container" style={{minHeight:"30%", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <p className="sin-resultados"> No tienes ninguna reserva pendiente.<br/>¿Hay hambre de más??</p>
          <button onClick={()=>navigate('/')} className="reg-boton">Buscar Restaurantes</button>
        </div>
        :<div className="reservas-actuales-container reservas-container">
          {bookings.map(booking=>{
            return(
              <BookingCard key={booking._id} booking={booking} handlePreDelete={handlePreDelete}/>
              )
            })}
        </div>
        }

        </>}

      </div>
    </div>
  )
}

export default Reservas