import { useParams } from "react-router-dom"


function MessageCard(props) {

  const {userId, chat} = props
  return (
    <div className={`mensaje-conversacion ${chat.remitente===userId?"remitente":"destinatario"}`}>
        <p className="texto-mensaje">{chat.mensaje} </p>
        <p className="hora-mensaje">{new Date(chat.createdAt).toLocaleString("es-ES", {
          hour: "2-digit",
          minute: "2-digit"})
        }</p>
    </div>
  )
}

export default MessageCard