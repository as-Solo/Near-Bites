import { useEffect, useState } from "react"
import service from "../services/config"
import DotLoader from "react-spinners/DotLoader";
import defaultUser from "../assets/images/logos/Profile_white.png"
import { Link } from "react-router-dom";

function ConversationsList() {

  const [listaChats, setListaChats] = useState([])
  const [loading, setLoading] = useState(true)

  const getData = async ()=>{
    const response = await service.get("/messages/chatlist")
    console.log(response.data.accepted)
    setListaChats(response.data.accepted)
  }

  useEffect(()=>{
    getData()
    setLoading(false)
    return ()=>{}
  }, [])

  return (
    <div className="reg-centradito" >
      <div className="tope-width-conversacion">

        <div className="lista-chats-container">
          {loading
          ? <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div>
          : listaChats.map((usuario)=>{
            return(
              <Link key={usuario._id} to={`/conversation/${usuario._id}`}>
                <div className="ficha-usuarios-chat">
                  <div className="imagen-nombre">
                    <div className="container-imagen-destinatario user-chat-img">
                      <img src={usuario.image || defaultUser} alt="" />
                    </div>
                    <div className="ficha-chat-first-row">
                      <p>@{usuario.username}</p>
                      <div className="ficha-chat-follow">
                        <p>siguiendo: {usuario.followCount}</p>
                        <p>seguidores: {usuario.followersCount}</p>
                      </div>
                    </div>
                  </div>  
                  <p className="usuario-desde">Usuario desde: <strong> {usuario.createdAt.split("T")[0].split("-")[2]} / {usuario.createdAt.split("T")[0].split("-")[1]} / {usuario.createdAt.split("T")[0].split("-")[0]} </strong> </p>
                </div>
              </Link>
            )
          })}
        </div>


      </div>
    </div>
  )
}

export default ConversationsList