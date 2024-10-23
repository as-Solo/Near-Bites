import { useParams } from "react-router-dom"
import "../styles/EditRestaurant.css"
import { useEffect, useRef, useState } from "react";
import service from "../services/config";

function EditRestaurant() {

  const [divWidth, setDivWidth] = useState(0);  // Estado para el ancho del div
  const divRef = useRef(null);  // Referencia al div
  const [diapositiva, setDiapositiva] = useState(0)
  const [moving, setMoving] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [newCategorie, setNewCategorie] = useState("")

  const [errorMessage, setErrorMessage] = useState("")
  const [warning, setWarning] = useState(false)

  const [restaurante, setRestaurante] = useState({name:"", address:"", rating:0, city:"", country:"", zip_code:""})
  const [editData, setEditData] = useState({
    profileImage: "",
    categories: [],
    
    images:[],

    timeSlots:[],
    capacity: 0,
    isDiscount: false,
    discountAmount:0
  })

  const { restaurantId } = useParams()

  const getData = async ()=>{
    const response = await service.get(`restaurants/${restaurantId}`)
    const clone = {
      profileImage:response.data.profileImage,
      categories:response.data.categories,
      
      images:response.data.images,

      timeSlots:response.data.timeSlots,
      capacity:response.data.capacity,
      isDiscount:response.data.isDiscountalse,
      discountAmount:response.data.discountAmount
    }
    const rest = {
      name: response.data.name,
      address: response.data.address,
      rating: response.data.rating,
      city: response.data.city,
      country: response.data.country,
      zip_code: response.data.zip_code
    }
    setRestaurante(rest)
    setEditData(clone)
  }
  useEffect(() => {
    getData()
    const handleResize = (entries) => {
      for (let entry of entries) {
        setDivWidth(entry.contentRect.width);  // Actualiza el ancho del div
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }
    return () => {
      if (divRef.current) {
        resizeObserver.unobserve(divRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setWarning(true)
      const warn = setTimeout(() => {
        setWarning(false);
      }, 3000);
      
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3500);

      return () => {clearTimeout(timer), clearTimeout(warn)};
    }
  }, [errorMessage]);

  const handleDiapos = (num)=>{
    if (diapositiva + num < 0 || diapositiva + num > 2){
      return
    }
    else{
      setMoving(true)      
      setIsDisabled(true)
      setDiapositiva(diapositiva + num)
      setTimeout(()=>{
        setMoving(false)        
        setIsDisabled(false)
      }, 750)
    }
  }

  const handleDeleteCategories = async (e)=>{
    const clone = structuredClone(editData)
    clone.categories = clone.categories.filter(categoria=>categoria !== e.target.name)
    setEditData(clone)
  }

  const handleNewCategorie = ()=>{
    if (!editData.categories.some(categoria => categoria.toLowerCase() === newCategorie.toLowerCase()) && newCategorie !== ''){
      const clone = structuredClone(editData)
      clone.categories.push(newCategorie)
      setEditData(clone)
    }
    else{
      if (newCategorie === ''){
        setErrorMessage(`Debes introducir una categoria.`)
      }
      else{
        setErrorMessage(`${newCategorie} ya se encuentra entre tus categorias.`)
      }
      console.log("patata")
    }
    setNewCategorie("")
  }

  return (
    <div className="profile-centradito">
      <div className="edit-restaurant-area" ref={divRef}>
        <div className="edit-restaurant-warning-delete">

        </div>
          <p className={`reg-warning`} style={{opacity:warning?"1":"0", zIndex:"90"}}>{errorMessage}</p>
          <button onClick={()=>handleDiapos( - 1)} className="botones-diapos" disabled={isDisabled} style={{left:"10px", paddingRight:"3px", opacity:diapositiva===0?0.1:1}}>❮</button>
          <button onClick={()=>handleDiapos( + 1)} className="botones-diapos" disabled={isDisabled} style={{right:"10px", paddingLeft:"3px", opacity:diapositiva===2?0.1:1}}>❯</button>
          <div className="edit-res-diapos-botonera">
            <button onClick={()=>handleDiapos( - 1)} className="botones-diapos-bottom" disabled={isDisabled} style={{opacity:diapositiva===0?0.1:1}}>anterior</button>
            <button onClick={()=>handleDiapos( + 1)} className="botones-diapos-bottom" disabled={isDisabled} style={{opacity:diapositiva===2?0.1:1}}>siguiente</button>
          </div>
          <button className="botones-diapos-bottom save-changes-button">guardar cambios</button>
        <div className="cuadro-diapositivas-container" style={{left:`${diapositiva * -divWidth}px`,transition:moving?"all .7s ease":"none"}}>
          <div style={{width:`${divWidth}px`}} className="diapositiva-container" >
            <div className="edit-restaurant-img-container">
              <img className="edit-restaurant-image" src={editData.profileImage} alt="" />
            </div>
            <div className="edit-res-data-container">
              <div className="edit-res-info-name-container">
                <p>{restaurante.name}</p>
                <p>{restaurante.address}, {restaurante.zip_code}, {restaurante.city}</p>
              </div>
              <div className="edit-res-cat-container">
                {editData.categories.map(categoria=>{
                  return(
                    <div key={categoria} className="edit-restaurant-categoria">
                      <p className="edit-res-cat-name"> {categoria} </p>
                      <button onClick={handleDeleteCategories} className="edit-res-cat-button" name={categoria}>x</button>
                    </div>
                  )
                })}
              </div>
              <div className="edit-res-cat-input-container">
                <input className="edit-res-cat-input" onChange={(e)=>{setNewCategorie(e.target.value) || ""}} type="text" name="" value={newCategorie}/>
                <button onClick={handleNewCategorie} className="edit-res-cat-button" name="" >añadir</button>
              </div>
            </div>
          </div>
          <div style={{width:`${divWidth}px`}} className="diapositiva-container" >DIAPO 2 {divWidth} - {`${diapositiva}px`}</div>
          <div style={{width:`${divWidth}px`}} className="diapositiva-container" >DIAPO 3 {divWidth} - {`${diapositiva}px`}</div>
          {/* <div style={{width:`${divWidth}px`}} className="diapositiva-container" >DIAPO 4 {divWidth} - {`${diapositiva}px`}</div> */}
          
        </div>
      </div>
    </div>
  )
}

export default EditRestaurant