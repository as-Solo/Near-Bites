import { useState } from "react";


function Input(props) {

  const {content, handleInput} = props
  const [hover, setHover] = useState(false);
	const [focus, setFocus] = useState(false);

  const container = {
    width:"100%",
    borderRadius:"30px",
    backgroundColor:"rgb(20, 20, 20)",
    margin:"0",
    border:"1px solid rgb(70, 130, 182)",
    padding:"4px 0px 4px 15px",
    position:"relative"
  }

  const label = {
    position:"absolute"
  }
  return (
    <div style={container} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <label style={label} htmlFor="nombre">Qué te apetece hoy_</label>
        <input onChange={(e)=>handleInput(e)} onFocus={()=>setFocus(true)} onBlur={() => setFocus(false)} type="text" name={content} id={content} value={content}/>
    </div>
  )
}

export default Input