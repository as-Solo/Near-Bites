import { useEffect, useState } from "react"
import service from "../services/config"
import "../styles/AdminControl.css"
import defaultPicture from "../assets/images/logos/Profile_white.png"


function AdminControl() {

  const [userList, setUserList] = useState([])

  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [usuarioDelete, setUsuarioDelete] = useState("")

  const getData = async ()=>{
    const response = await service("/admins/users")
    setUserList(response.data)
  }

  useEffect(()=>{
    getData()
    return (()=>{})
  }, [])

  const handleChangeRol = async (e)=>{
    if(!e.target.checked){
      try {
        const response = await service.patch("/admins/change_rol", {userId:e.target.name, newRol:"user"})
        getData()
      } catch (error) {
        console.log(error)
      }
    }
    else{
      try {
        const response = await service.patch("/admins/change_rol", {userId:e.target.name, newRol:"owner"})
        getData()
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  const handleDeleteUser = async ()=>{
    try {
      const response = await service.delete(`/admins/users/${usuarioDelete}`)
      setUsuarioDelete("")
      setDeleteConfirm(false)
      getData()
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="admin-centradito">
      <div className="admin-area">
      <div className="edit-res-warning-delete" style={{opacity:deleteConfirm?"1":"0", pointerEvents:deleteConfirm?"auto":"none"}}>
          <div className="marco-delete-confirm">
            <p className="texto-warning-delete">¿Estás seguro que quieres eliminar esta categoria?</p>
            <div className="delete-confirm-botonera">
              <button onClick={handleDeleteUser} className="delete-confirm-eliminar delete-confirm-boton">Eliminar</button>
              <button onClick={()=>setDeleteConfirm(false)} className="delete-confirm-cancelar delete-confirm-boton">Cancelar</button>
            </div>
          </div>
        </div>
        <div className="admin-encabezado">
          <div className="foto-spidermam-container">
            <img src="https://w7.pngwing.com/pngs/955/385/png-transparent-telegram-sticker-line-vk-spiderman-meme-hand-sticker-meme-thumbnail.png" alt="" />
          </div>
          <h2>UN GRAN PODER CONLLEVA UNA GRAN RESPONSABILIDAD</h2>
        </div>
        <div className="lista-usuarios-container">
          {userList.map((user)=>{
            return(
              <div key={user._id} className="ficha-user">
                <div className="flotando-container">
                  <div className="imagen-usuario-container">
                    <img src={user.image || defaultPicture} alt="" />
                  </div>
                  <p className="nombre-usuario">@{user.username}</p>
                </div>
                <div className="botones-ficha-container">
                  <div className="base-boton-check-propio" style={user.rol==="owner"?{borderColor:"rgb(70, 130, 182)"}:{borderColor:"rgb(30, 30, 30", backgroundColor:"rgba(30, 30, 30, .2)"}}>
                    <p className="texto-rol" style={user.rol==="owner"?{color:"rgb(70, 130, 182)"}:{}}>{user.rol}</p>
                    <div className="pelotica-boton-check" style={user.rol==="owner"?{backgroundColor:"rgb(70, 130, 182)", right:"0"}:{backgroundColor:"rgb(30, 30, 30)", left:"0"}}></div>
                    <input onChange={handleChangeRol} className="check-de-verdad" type="checkbox" name={user._id} checked={user.rol==="owner"}/>
                  </div>
                  <button onClick={(e)=>{setDeleteConfirm(true), setUsuarioDelete(e.target.name)}} className="boton-admin-eliminar" name={user._id}>eliminar</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminControl