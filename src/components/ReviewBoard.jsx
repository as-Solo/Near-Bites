import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios";


function ReviewBoard(props) {

  const API_URL = import.meta.env.VITE_API_URL;

  const { review, setInfoMessage, getData } = props
  const { loggedUserId } = useContext(AuthContext)

  const handleRemove = async ()=>{
    try {
      const response = await axios.delete(`${API_URL}/api/reviews/${review._id}`)
      console.log(response)
      setInfoMessage(response.data.message)
      getData()
    } catch (error) {
      console.log(error)
      setInfoMessage(error)
    }
  }

  return (
    <div className="review-card-container">
      <p className="res-id-review-description" >&quot;{review.description}&quot;</p>
      <div className="user-profile-review">
        <div className="user-profile-img-container">
        <img className="user-profile-img" src={review.user.image} alt="" />
        </div>
        <p>@{review.user.username}</p>
        </div>
      <p className="res-id-review-rating" >{review.rating} ⭐</p>
      {review.user._id === loggedUserId && <button onClick={handleRemove} className="review-card-delete">X</button>}
    </div>
  )
}

export default ReviewBoard