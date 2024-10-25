import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

function Private(props) {
  
  const { isLogin } = useContext(AuthContext)
  
  if (isLogin){
    return props.children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}

export default Private