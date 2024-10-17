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
import Private from './components/auth/Private'
import Public from './components/auth/Public'
import Owner from './components/auth/Owner'

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/signup' element={ <Public> <Signup/> </Public> }/>
        <Route path='/login' element={ <Public> <Login/> </Public> }/>
        <Route path='/profile' element={ <Private> <Profile/> </Private> }/>
        <Route path='/' element={ <Home/> }/>
        <Route path='/restaurants/:restaurantId' element={ <Restaurant/> }/>
        <Route path='/restaurants/:restaurantId/bookings' element={ <Private> <RestaurantBooking/> </Private> }/>
        <Route path='/favourites' element={ <Private> <Favoritos/> </Private> } />
        <Route path='/wishlist' element={ <Private> <Wishlist/> </Private> } />
        <Route path='/bookings' element={ <Private> <Reservas/> </Private> }/>
        <Route path='/administrator' element={ <Owner> <Administrator/> </Owner> }/>
        <Route path='*' element={ <Home/> }/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
