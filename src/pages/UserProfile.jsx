import { useNavigate, useParams } from "react-router-dom";
import nearBitesText from "../assets/images/logos/NearBites_texto.png";
import { useContext, useEffect, useState } from "react";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";
import profileLogo from "../assets/images/logos/Profile_white.png"



function UserProfile() {

  const {userId} = useParams()
  const {loggedUserId} = useContext(AuthContext)
  const [user, setUser] = useState(null)
  const [numLikes, setNumLikes] = useState('')
  const [isFollowed, setIsFollowed] = useState(false)

  const navigate = useNavigate()

  const getData = async ()=>{
    try {
      const response = await service.get(`/users/userby/${userId}`)
      // console.log(response.data)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getFollows = async ()=>{
    try {
      const response = await service.get(`/users/is-following/${userId}`)
      console.log(response.data)
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

  useEffect(()=>{
    if(userId === loggedUserId){
      navigate("/profile")
    }
    getLikes()
    getFollows()
    getData()
    return ()=>{}
  }, [])

  if (user === null){
    return (
    <h1>loading</h1>
  )
  }
  return (
    <div className="reg-centradito">
      <img className={`reg-image`} src={nearBitesText} alt="Near Bites logo"/>
      <div className={`reg-cajon`}>
        <div className="boton-follow-container">
          <button onClick={handleFollow} className="boton-follow-user">{isFollowed?"Unfollow":"Follow"}</button>
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
        

      </div>
      <button className="boton-clasico">Abrir conversación</button>
    </div>
  )
}

export default UserProfile