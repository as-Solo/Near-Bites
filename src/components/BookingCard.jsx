import { Link } from "react-router-dom";


function BookingCard(props) {

  const {booking, handlePreDelete} = props

  return (
    <div className="ficha-bookinglist-container">
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
        <p className="ficha-bookinglist-text-data">Reserva para el <strong> {booking.day.split('T')[0].split('-')[2]}/{booking.day.split('T')[0].split('-')[1]}/{booking.day.split('T')[0].split('-')[0]}</strong> a las <strong> {booking.startHour} </strong></p>
        <p className="ficha-bookinglist-text-data">Para <strong> {booking.partySize} </strong> personas.</p>
        </div>
        <div className="ficha-bookinglist-botonera">
        <button onClick={handlePreDelete} className="ficha-bookinglist-boton" name={booking._id}>X</button>
        </div>
      </div>
    </div>
  )
}

export default BookingCard