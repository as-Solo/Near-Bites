import { useNavigate, useParams } from "react-router-dom"
import "../styles/Conversation.css"
import { useEffect, useState } from "react"
import service from "../services/config"

function Conversation() {

  const navigate = useNavigate()
  const { userId } = useParams()

  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([])

  const getConversation = async ()=>{
    const response = await service.get(`/messages/conversation/${userId}`)
    console.log(response.data)
    setConversation(response.data)
  }

  useEffect(()=>{
    getConversation()
    return ()=>{}
  }, [])

  const handleCreateMessage = async ()=>{
    const response = await service.post(`/messages/${userId}`, {message:message})
    console.log(response)
    setMessage('')
    getConversation()
  }

  return (
    <div className="reg-centradito" >
      <div className="tope-width-conversacion">
        <div onClick={()=>navigate(`/` )} className="conversacion-volver"><p style={{pointerEvents:"none"}}>❮</p></div>
        <div className="conversation-area conversation-modules">
          {conversation.map(chat=>{
            return(
              <p key={chat._id} style={chat.remitente===userId?{color:"blue"}:{color:"red"}}>{chat.mensaje} </p>
            )
          })}
        </div>
        <div className="writing-area-container conversation-modules">
          <textarea onChange={(e)=>setMessage(e.target.value)} name="" id="" value={message}></textarea>
          <button onClick={handleCreateMessage}>enviar</button>
        </div>
      </div>
    </div>
  )
}

export default Conversation