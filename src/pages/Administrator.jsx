import { useState } from "react";
import service from "../services/config";
import { useNavigate } from "react-router-dom";
import "../styles/PruebasCloudinary.css"

function Administrator() {
  
  const [imageUrl, setImageUrl] = useState(null); 
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect
  const navigate = useNavigate()

  
  const handleFileUpload = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await service.post("/upload", uploadData)

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/");
    }
  };
  return (
    <div className="favourites-centradito" >
      <div className="favourites-container">
        <label>Image: </label>
        <div className="el-input">
          <input style={{opacity:"1"}}
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
        <img src={imageUrl} alt="" style={{width:"300px", objectFit:"cover"}}/>
        {imageUrl ?<div><img src={imageUrl} alt="img" width={200} /></div> : null}
      </div>
    </div>
    )
  }

export default Administrator