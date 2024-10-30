import { useNavigate, useParams } from "react-router-dom";
import nearBitesText from "../assets/images/logos/NearBites_texto.png";
import { useContext, useEffect, useState } from "react";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";
import profileLogo from "../assets/images/logos/Profile_white.png"
import DotLoader from "react-spinners/DotLoader";



function UserProfile() {

  const {userId} = useParams()
  const {loggedUserId} = useContext(AuthContext)
  const [user, setUser] = useState('')
  const [numLikes, setNumLikes] = useState('')
  const [isFollowed, setIsFollowed] = useState(false)

  const [isAccepted, setIsAccepted] = useState(false)
  const [isBlock, setIsBlock] = useState(false)
  const [isRequest, setIsRequest] = useState(false)

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const getData = async ()=>{
    try {
      const response = await service.get(`/users/userby/${userId}`)
      // console.log(response.data)
      setUser(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getFollows = async ()=>{
    try {
      const response = await service.get(`/users/is-following/${userId}`)
      // console.log(response.data)
      if (response.data){
        setIsFollowed(true)
      }
      else{
        setIsFollowed(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getLikes = async ()=>{
    const response = await service.get(`/restaurants/user/like/${userId}`)
    setNumLikes(response.data.length)
  }

  const getAccepted = async ()=>{
    const response = await service.get(`/users/is-accepted/${userId}`)
    // console.log(response.data)
    setIsAccepted(response.data)
  }

  const getRequest = async ()=>{
    const response = await service.get(`/users/is-request/${userId}`)
    setIsRequest(response.data)
    getData()
  }

  useEffect(()=>{
    if(userId === loggedUserId){
      navigate("/profile")
    }
    getAccepted()
    getRequest()
    getLikes()
    getFollows()
    getData()
    return ()=>{}
  }, [])

  const handleFollow = async()=>{
    try {
      if(isFollowed){
        const response =await service.put(`/users/unfollow/${userId}`)
        console.log(response.data.message)
      }
      else{
        const response = await service.put(`/users/follow/${userId}`)
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
    getFollows()
    
  }

  const handleRequest = async () =>{
    if(isAccepted){
      try {
        await service.put(`/users/request/yes/${userId}`)
      } catch (error) {
        console.log(error)
      }
      navigate(`/conversation/${userId}`)
    }
    else{
      try {
        const response = await service.put(`/users/request/${userId}`)
        console.log(response.data.message)
        getRequest()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="reg-centradito">
      <img className={`reg-image`} src={nearBitesText} alt="Near Bites logo"/>
      <div className={`reg-cajon`}>
      {loading?( <div className="loader-container"> <DotLoader color={"#4682b6"} loading={loading} size={50} /> </div> ):<>
        <div className="boton-follow-container">
          <button onClick={handleFollow} className="boton-follow-user" style={isFollowed?{backgroundColor:"rgba(127, 163, 201, .3)", color:"rgba(255, 255, 255, .7)"}:{}}>{isFollowed?"Unfollow":"Follow"}</button>
        </div>
        <div className="profile-marco-image">
          <img className="profile-image" src={user.image || profileLogo} alt="" />
        </div>

        <div className="cajon-info">
          <div className="user-profile-label-info">
            <p>Usuario desde:</p>
            <div className="user-profile-row">
              <p>{user.createdAt.split("T")[0].split('-')[2]} / {user.createdAt.split("T")[0].split('-')[1]} / {user.createdAt.split("T")[0].split('-')[0]}</p>
            </div>
          </div>
          <div className="user-profile-row">
            <p>{user.username}</p>
          </div>
          {user.name || user.lastname ?
            <div className="user-profile-row">
              <p>{user.name}</p>
              <p>{user.lastname}</p>
            </div>
            : null
          }
          <div className="user-profile-row-sep">
            <div className="user-profile-label-info">
              <p>🔖</p>
              <div className="user-profile-row">
                <p>{user.wishlist.length || 0} <span>Bookmark{user.wishlist.length>1 && 's'}</span></p>
              </div>
            </div>
            <div className="user-profile-label-info">
              <p>💕</p>
              <div className="user-profile-row">
                <p>{numLikes} <span>Like{numLikes>1 && 's'}</span></p>
              </div>
            </div>
          </div>
         
        </div>
        
        </>}
      </div>
      {!isBlock &&
        <button onClick={handleRequest} className="boton-clasico" disabled={isRequest} style={isRequest?{backgroundColor:"rgba(127, 163, 201, .1)", color:"rgba(255, 255, 255, .2)"}:{}}>{isAccepted?'Abrir conversación':isRequest?'Solicitud enviada':'Conectar'}</button>
      }
    </div>
  )
}

export default UserProfile