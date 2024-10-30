import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate, useParams } from "react-router-dom"
import service from "../../services/config"
import DotLoader from "react-spinners/DotLoader";

function ConvAccepted(props) {

  const { userId } = useParams()
  const { isLogin, loggedUserId } = useContext(AuthContext)
  const [isAccepted, setIsAccepted] = useState(null)

  

  const getAccepted = async ()=>{
    const response = await service.get(`/users/is-accepted/${userId}`)
    // console.log("Cosas", typeof response.data)
    setIsAccepted(response.data)
  }

  useEffect(()=>{
    getAccepted()
    return ()=>{}
  },[])

  if(isAccepted === null){
    return (<div className="loader-container"> <DotLoader color={"#4682b6"} size={50} /> </div> )
  }
  if(isAccepted){
    return (props.children)
  }
  else{
    return <Navigate to={`/user-profile/${userId}`}/>
  }
}

export default ConvAccepted