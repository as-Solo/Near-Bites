import starsFilled from "../assets/images/piezas/StarsFilled.png"
import starsEmpty from "../assets/images/piezas/StarsEmpty.png"
import "../styles/Stars.css"

function StarsInput(props) {

  const {value, handle} = props

  return (
    <div className="stars-container">
        <img src={starsEmpty} alt="" />
        <img className="stars-filled" src={starsFilled} alt="" style={{maskSize:`${value * 20}% 100%`}}/>
        <input onChange={(handle)} type="range" min={0} max={5} step={.1} value={value} name="rating" style={{opacity:"0", width:"100%"}} />
    </div>
  )
}

export default StarsInput