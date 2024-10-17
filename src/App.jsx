import { useState } from 'react'
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

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/profile' element={ <Profile/> }/>
        <Route path='/' element={ <Home/> }/>
        <Route path='/restaurants/:restaurantId' element={ <Restaurant/> }/>
        <Route path='/restaurants/:restaurantId/bookings' element={ <RestaurantBooking/> }/>
        <Route path='/favourites' element={ <Favoritos/> } />
        <Route path='/wishlist' element={ <Wishlist/> } />
        <Route path='/bookings' element={ <Reservas/> }/>
        <Route path='/administrator' element={ <Administrator/> }/>
        <Route path='*' element={ <Home/> }/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
