import { useParams } from "react-router-dom"


function EditRestaurant() {

  const { restaurantId } = useParams()
  return (
    <div>EditRestaurant</div>
  )
}

export default EditRestaurant