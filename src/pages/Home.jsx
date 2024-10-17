import { useState } from "react"
import "../styles/Home.css"
import Input from "../components/Input"

function Home() {

  const [content, setContent] = useState("")
  const handleInput = (e)=>{
    e.preventDefault()
    console.log(e.target.value)
    setContent(e.target.value)
  }
  return (
    <div className="home-centradito">
      <div className="home-container">
        <Input handleInput={handleInput} content={content}/>
        <div className="home-map-container">
          MAPA
        </div>
        <div className="home-content-container">
          <div className="home-filters-container"></div>
          <div className="home-restaurants-container"></div>
        </div>
      </div>
    </div>
  )
}

export default Home