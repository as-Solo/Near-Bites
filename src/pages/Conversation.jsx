import { useNavigate, useParams } from "react-router-dom"
import "../styles/Conversation.css"
import { useContext, useEffect, useRef, useState } from "react"
import service from "../services/config"
import MessageCard from "../components/MessageCard"
import io from "socket.io-client"
import { AuthContext } from "../context/auth.context"
import defaultUser from "../assets/images/logos/Profile_white.png"
import DotLoader from "react-spinners/DotLoader";


function Conversation() {

  const API_URL = import.meta.env.VITE_API_URL;
  const socket = useRef(null);
  const chatRef = useRef(null)
  const endOfMessagesRef = useRef(null);

  const navigate = useNavigate()
  const { userId } = useParams()

  const {loggedUserId} = useContext(AuthContext)

  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [destinatario, setDestinatario] = useState({image:'', username:''})
  const [loading, setLoading] = useState(true)

  const getConversation = async ()=>{
    const response = await service.get(`/messages/group-by/conversation/${userId}`)
    // console.log(response.data)
    setConversation(response.data)
  }

  const getDestinatario = async ()=>{
    const response = await service.get(`/users/chat/${userId}`)
    setDestinatario(response.data)
  }

  useEffect(()=>{
    socket.current = io(API_URL);

    getConversation()
    getDestinatario()
    setLoading(false)
    socket.current.on('mensaje', (mensaje)=>{
      if(loggedUserId === mensaje){
        getConversation()
      }
    })
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
    return ()=>{
      socket.current.disconnect();
      console.log("Desconectado del servidor de sockets");
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [conversation, loading])

  const handleCreateMessage = async ()=>{
    const response = await service.post(`/messages/${userId}`, {message:message})
    socket.current.emit("mensaje", response.data.destinatario)
    // console.log(response)
    setMessage('')
    getConversation()
  }

  if(loading){
    return (
      <div className="reg-centradito" >
        <div className="tope-width-conversacion">
          <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div>
        </div>
      </div>
    )
  }

  return (
    <div className="reg-centradito" >
      <div className="tope-width-conversacion">
        <div className="cabecera-chat">
          <div className="container-imagen-destinatario">
            <img src={destinatario.image || defaultUser} alt="" />
          </div>
          <p>@{destinatario.username}</p>
        </div>
        <div onClick={()=>navigate(`/conversations` )} className="conversacion-volver"><p style={{pointerEvents:"none"}}>❮</p></div>
          
        <div ref={chatRef} className="conversation-area conversation-modules">
          {conversation.map(dia=>{
            return(
              <div className="recolocacion-chats" key={dia.day}>
                <p className="etiqueta-dia">{dia.day.split('-')[2]} / {dia.day.split('-')[1]} / {dia.day.split('-')[0]}</p>
                {dia.messages.map( (chat)=>{
                  return(
                    <MessageCard key={chat._id} chat={chat} userId={userId}/>
                  )
                })}
              </div>
              )
            })}
            <div ref={endOfMessagesRef}></div>
          </div>
        <div className="writing-area-container conversation-modules">
          <textarea className="area-nuevo-mensaje" onChange={(e)=>setMessage(e.target.value)} name="" id="" value={message}></textarea>
          <button className="boton-enviar-mensaje" onClick={handleCreateMessage}>➤</button>
        </div>
      </div>
    </div>
  )
}

export default Conversation