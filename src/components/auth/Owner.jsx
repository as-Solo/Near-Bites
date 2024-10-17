import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"


function Owner(props) {

  const {isOwner} = useContext(AuthContext)
  if(isOwner){
    return props.children
  }
  else{
    return <Navigate to={"/"}/>
  }
}

export default Owner