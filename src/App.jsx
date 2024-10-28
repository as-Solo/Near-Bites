import { useEffect, useState } from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Restaurant from './pages/Restaurant'
import RestaurantBooking from './pages/RestaurantBooking'
import Favoritos from './pages/Favoritos'
import Reservas from './pages/Reservas'
import Profile from './pages/Profile'
import Administrator from './pages/Administrator'
import Wishlist from './pages/Wishlist'
import Private from './components/auth/Private'
import Public from './components/auth/Public'
import Owner from './components/auth/Owner'
import PlayGround from './components/PlayGround'
import EditRestaurant from './pages/EditRestaurant'
import Admin from './components/auth/Admin'
import AdminControl from './pages/AdminControl'
import UserProfile from './pages/UserProfile'

function App() {
  
  const [position, setPosition] = useState([40.3954259, -3.7182542]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    else {
      console.error('No podemos geolocalizarte');
    }
  }, []);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/signup' element={ <Public> <Signup/> </Public> }/>
        <Route path='/login' element={ <Public> <Login/> </Public> }/>
        <Route path='/profile' element={ <Private> <Profile/> </Private> }/>
        <Route path='/' element={ <Home position={position}/> }/>
        <Route path='/restaurants/:restaurantId' element={ <Restaurant position={position}/> }/>
        <Route path='/restaurants/:restaurantId/bookings' element={ <Private> <RestaurantBooking position={position}/> </Private> }/>
        <Route path='/favourites' element={ <Private> <Favoritos position={position}/> </Private> } />
        <Route path='/wishlist' element={ <Private> <Wishlist position={position}/> </Private> } />
        <Route path='/bookings' element={ <Private> <Reservas/> </Private> }/>
        <Route path='/administrator' element={ <Owner> <Administrator/> </Owner> }/>
        <Route path='/edit-restaurants/:restaurantId' element={ <Owner> <EditRestaurant/> </Owner> }/>
        <Route path='/admin-control' element={ <Admin> <AdminControl/> </Admin> }/>
        <Route path="/user-profile/:userId" element={ <Private> <UserProfile/> </Private> }/>
       
        <Route path='*' element={ <Home/> }/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
