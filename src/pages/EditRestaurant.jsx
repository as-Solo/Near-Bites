import { useNavigate, useParams } from "react-router-dom"
import "../styles/EditRestaurant.css"
import { useEffect, useRef, useState } from "react";
import service from "../services/config";
import nearBitesText from "../assets/images/logos/NearBites_texto.png";
import defaultImage from "../assets/images/img-default-edit.jpeg"

function EditRestaurant() {

  const navigate = useNavigate()

  const [divWidth, setDivWidth] = useState(0);  // Estado para el ancho del div
  const divRef = useRef(null);  // Referencia al div
  const [diapositiva, setDiapositiva] = useState(0)
  const [moving, setMoving] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  
  const [newCategorie, setNewCategorie] = useState("")
  const [deleteCategorie, setDeleteCategorie] = useState("")
  const [deleteImage, setDeleteImage] = useState("")
  const [deleteSlot, setDeleteSlot] = useState("")
  const [zoomImage, setZoomImage] = useState("")

  const [turnoVar, setTurnoVar] = useState({min:"", hora:""})

  const [imageUrl, setImageUrl] = useState(defaultImage);

  const [isUploading, setIsUploading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("")
  const [warning, setWarning] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteImgConfirm, setDeleteImgConfirm] = useState(false)
  const [deleteSlotConfirm, setDeleteSlotConfirm] = useState(false)
  const [isZoom, setIsZoom] = useState(false)

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

  const handleDeleteCategories = async ()=>{
    const clone = structuredClone(editData)
    clone.categories = clone.categories.filter(categoria=>categoria !== deleteCategorie)
    setEditData(clone)
    setDeleteCategorie('')
    setDeleteConfirm(false)
  }

  const handleDeleteImages = async ()=>{
    const clone = structuredClone(editData)
    clone.images = clone.images.filter(imagen=>imagen !== deleteImage)
    setEditData(clone)
    setDeleteImage('')
    setDeleteImgConfirm(false)
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

  const handleFileUpload = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const clone = structuredClone(editData)
      const response = await service.post("/upload", uploadData)
      clone.profileImage = response.data.imageUrl;
      setEditData(clone)
      setIsUploading(false);
    }
    catch (error) {
      console.log(error)
      setErrorMessage("Algo salió mal al subir la imagen, intentalo de nuevo en un rato.");
    }
  };

  const handleFileUploadImages = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
   
    try {
      const clone = structuredClone(editData)
      const response = await service.post("/upload", uploadData)
      clone.images.push(response.data.imageUrl);
      setEditData(clone)
      setIsUploading(false);
    }
    catch (error) {
      console.log(error)
      setErrorMessage("Algo salió mal al subir la imagen, intentalo de nuevo en un rato.");
    }
  };

  const handleTurno = (e)=>{
    const clone = structuredClone(turnoVar)

    console.log()
    if (+e.target.value < e.target.min){
      e.target.value = ""
    }
    if (+e.target.value > e.target.max){
      // console.log("entrando")
      e.target.value = ""
    }
  
    clone[e.target.name] = e.target.value // .padStart(2, '0')
    setTurnoVar(clone)
  }

  const handleCreateSlot = ()=>{
    const clone = structuredClone(editData)
    const newSlot = turnoVar.hora.padStart(2, '0') + ":" + turnoVar.min.padStart(2, '0')
    if(clone.timeSlots.includes(newSlot)){
      setErrorMessage("Ya existe ese turno")
    }
    else{
      clone.timeSlots.push(newSlot)
      clone.timeSlots.sort();
      if(clone.timeSlots.includes("00:00")){
        clone.timeSlots.push('00:00')
        clone.timeSlots.shift()
      }
      setEditData(clone)
    }
  }

  const handleDeleteSlot = ()=>{
    const clone = structuredClone(editData)
    clone.timeSlots = clone.timeSlots.filter(elem=>elem !== deleteSlot)
    setEditData(clone)
    setDeleteSlotConfirm(false)
  }

  const handleInputText = (e)=>{
    const clone = structuredClone(editData)
    if(e.target.value < e.target.min){
      e.target.value = ""
    }
    if(e.target.name === "discountAmount"){
      // e.target.value /= 100
      if(e.target.value > 0){
        clone.isDiscount = true
      }
      else{
        clone.isDiscount = false
      }
    }
    clone[e.target.name] = e.target.value
    // console.log(clone)
    setEditData(clone)
  }

  const handleEditRestaurant = async ()=>{
    try {
      const response = await service.patch(`/restaurants/owner/${restaurantId}`, editData)
      console.log(response)
      setErrorMessage("Cambios guardados correctamente")
      // getData()
      // setTimeout(()=>{
      //   navigate("/administrator")
      // }, 2000)
    }
    catch (error) {
      console.log(error)
      setErrorMessage("Algo ha salido mal, intentalo de nuevo mas tarde")
    }
  }
  
  return (
    <div className="profile-centradito">
      <div className="edit-restaurant-area" ref={divRef}>

        <div className="edit-res-warning-delete" style={{opacity:deleteConfirm?"1":"0", pointerEvents:deleteConfirm?"auto":"none"}}>
          <div className="marco-delete-confirm">
            <p className="texto-warning-delete">¿Estás seguro que quieres eliminar esta categoria?</p>
            <div className="delete-confirm-botonera">
              <button onClick={handleDeleteCategories} className="delete-confirm-eliminar delete-confirm-boton">Eliminar</button>
              <button onClick={()=>setDeleteConfirm(false)} className="delete-confirm-cancelar delete-confirm-boton">Cancelar</button>
            </div>
          </div>
        </div>

        <div className="edit-res-warning-delete" style={{opacity:deleteImgConfirm?"1":"0", pointerEvents:deleteImgConfirm?"auto":"none"}}>
          <div className="marco-delete-confirm">
            <p className="texto-warning-delete">¿Estás seguro que quieres eliminar esta imagen?</p>
            <div className="delete-confirm-botonera">
              <button onClick={handleDeleteImages} className="delete-confirm-eliminar delete-confirm-boton">Eliminar</button>
              <button onClick={()=>setDeleteImgConfirm(false)} className="delete-confirm-cancelar delete-confirm-boton">Cancelar</button>
            </div>
          </div>
        </div>

        <div className="edit-res-warning-delete" style={{opacity:deleteSlotConfirm?"1":"0", pointerEvents:deleteSlotConfirm?"auto":"none"}}>
          <div className="marco-delete-confirm">
            <p className="texto-warning-delete">¿Estás seguro que quieres eliminar esta imagen?</p>
            <div className="delete-confirm-botonera">
              <button onClick={handleDeleteSlot} className="delete-confirm-eliminar delete-confirm-boton">Eliminar</button>
              <button onClick={()=>setDeleteSlotConfirm(false)} className="delete-confirm-cancelar delete-confirm-boton">Cancelar</button>
            </div>
          </div>
        </div>

        <div onClick={()=>setIsZoom(false)} className="edit-res-warning-delete" style={{opacity:isZoom?"1":"0", pointerEvents:isZoom?"auto":"none"}}>
          <div className="marco-zoom">
            <div className="delimitador-foto-zoom">
              <img className="imagen-ampliada" src={zoomImage} alt="" />
            </div>
            <p className="texto-foto-ampliada">`{restaurante.name}`</p>
          </div>
        </div>

        <p className={`reg-warning`} style={{opacity:warning?"1":"0", zIndex:"90"}}>{errorMessage}</p>
        <button onClick={()=>handleDiapos( - 1)} className="botones-diapos" disabled={isDisabled} style={{left:"10px", paddingRight:"3px", opacity:diapositiva===0?0.1:1}}>❮</button>
        <button onClick={()=>handleDiapos( + 1)} className="botones-diapos" disabled={isDisabled} style={{right:"10px", paddingLeft:"3px", opacity:diapositiva===2?0.1:1}}>❯</button>
        <div className="edit-res-diapos-botonera">
          <button onClick={()=>handleDiapos( - 1)} className="botones-diapos-bottom" disabled={isDisabled} style={{opacity:diapositiva===0?0.1:1}}>anterior</button>
          <button onClick={()=>handleDiapos( + 1)} className="botones-diapos-bottom" disabled={isDisabled} style={{opacity:diapositiva===2?0.1:1}}>siguiente</button>
        </div>
        <button onClick={handleEditRestaurant} className="botones-diapos-bottom save-changes-button">Guardar cambios</button>

        <div className="cuadro-diapositivas-container" style={{left:`${diapositiva * -divWidth}px`,transition:moving?"all .7s ease":"none"}}>
          <div style={{width:`${divWidth}px`}} className="diapositiva-container" >
            <div className="edit-restaurant-img-container">
              <img className="edit-restaurant-image" src={editData.profileImage} alt="" />
              <div className="res-edit-cloudinary-input">
                +
                <input style={{opacity:"0", zIndex:"120", width:"100%", height:"100%", borderRadius:"50%", position:"absolute"}}
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>
            </div>
            <div className="edit-res-data-container">
              <div className="edit-res-info-name-container">
                <p className="edit-re-info-text-name">{restaurante.name}</p>
                <p className="edit-re-info-text-address">{restaurante.address}, {restaurante.zip_code}, {restaurante.city}</p>
              </div>
              <div className="edit-res-cat-container">
                {editData.categories.map(categoria=>{
                  return(
                    <div key={categoria} className="edit-restaurant-categoria">
                      <p className="edit-res-cat-name"> {categoria} </p>
                      <button onClick={(e)=>{setDeleteConfirm(true), setDeleteCategorie(e.target.name)}} className="edit-res-cat-button" name={categoria}>x</button>
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
          <div style={{width:`${divWidth}px`}} className="diapositiva-container" >
            <div className="ajustes-dispositiva-container">
                <div className="galeria-imagenes-container">
                  {editData.images.map(imagen=>{
                    return(
                    <div key={imagen} className="miniaturas">
                      <img onClick={()=>{setZoomImage(imagen), setIsZoom(true)}} className="imagen-down" src={imagen} alt={`Imagen de ${restaurante.name}`} />
                      <button onClick={(e)=>{setDeleteImgConfirm(true), setDeleteImage(e.target.name)}} className="boton-eliminar-imagen-galeria" name={imagen}>X</button>
                    </div>)
                  })
                  }
                </div>
            </div>
            <div className="imagen-load-container">
              <img className="carga-imagenes" src={imageUrl} alt="" />
              <div className="res-edit-cloudinary-input">
                +
                <input style={{opacity:"0", zIndex:"120", width:"100%", height:"100%", borderRadius:"50%", position:"absolute"}}
                  type="file"
                  name="image"
                  onChange={handleFileUploadImages}
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>
          <div style={{width:`${divWidth}px`}} className="diapositiva-container" >
            <div className="ajustes-diapositiva-3">
              <div className="res-edit-turnos-global-container">
                <h4>ESTABLECER TURNOS</h4>
                <div className="res-edit-turnos-container">
                  {editData.timeSlots.map((turno, index)=>{
                    return(
                    <div className="edicion-turnos-container" key={index}>
                      <p className="edicion-texto-turno">{turno} h.</p>
                      <button onClick={(e)=>{ setDeleteSlotConfirm(true), setDeleteSlot(e.target.name)}} className="edit-res-cat-button" name={turno}>X</button>
                    </div>)
                  })}
                </div>
                <div className="res-edit-input-parejita-turno">
                  <input onChange={handleTurno} className="input-turno" type="number" name="hora" min={0} max={23} value={turnoVar.hora}/>
                  <p>:</p>
                  <input onChange={handleTurno} className="input-turno" type="number" name="min" min={0} max={59} value={turnoVar.min}/>
                  <button onClick={handleCreateSlot} className="boton-add-turno">añadir</button>
                </div>
              </div>
              <div className="res-edit-turnos-global-container diapo3-global-single">
                <h4>ESTABLECER CAPACIDAD</h4>
                <div className="res-edit-input-parejita-turno">
                  <input onChange={handleInputText} className="input-turno-text" type="number" min={1} name="capacity" value={editData.capacity || ""}/>
                </div>
              </div>
              <div className="res-edit-turnos-global-container diapo3-global-single">
                <h4>ESTABLECER OFERTA</h4>
                <div className="res-edit-input-parejita-turno">
                  <input onChange={handleInputText} className="input-turno-text" type="number" min={0} name="discountAmount" value={(editData.discountAmount) || ''}/> {/* .toFixed(1) */}
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>
      <div className="logo-nearbites-container" style={{width:`${divWidth}px`}}>
          <div className="near-bites-img-container">
            <img className="near-bites-img" src={nearBitesText} alt="Near Bites logo" />
          </div>
      </div>
      <div className="barrita-progreso" style={{width:`${divWidth}px`}}>
        <div className="relleno-barrita-progreso" style={{width:`${divWidth/3 * (diapositiva + 1)}px`, transition:moving?"all .7s ease":"none", backgroundColor:diapositiva===2?"rgb(70, 130, 182)":"rgb(127, 163, 201)"}}></div>
      </div>
    </div>
  )
}

export default EditRestaurant