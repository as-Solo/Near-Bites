import starsFilled from "../assets/images/piezas/StarsFilled.png"
import starsEmpty from "../assets/images/piezas/StarsEmpty.png"
import "../styles/Stars.css"
import { useState } from "react"

function Stars(props) {

  const {value, handle} = props
  // const [value, setValue] = useState(3)

  // const handleValue = (e)=>{
  //   setValue(e.target.value)
  // }
  // console.log(value)

  return (
    <div className="stars-container">
        <img src={starsEmpty} alt="" />
        <img className="stars-filled" src={starsFilled} alt="" style={{maskSize:`${value * 20}% 100%`}}/>
        {/* <div className="stars-mask" style={{width:`${value*20}%`}}>
        </div> */}
        <input onChange={(handle)} disabled type="range" min={0} max={5} step={.1} value={value} style={{opacity:"0"}}/>
    </div>
  )
}

export default Stars