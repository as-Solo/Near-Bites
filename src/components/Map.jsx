

import { useContext, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import markerIconPng from "../assets/images/patata.png"
import markerIconIhPng from "../assets/images/marker-icon-ih.png"
import markerIconYouPng from "../assets/images/marker-icon-you.png"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon, DivIcon } from 'leaflet'
import { AuthContext } from '../context/auth.context';
import defaultImage from "../assets/images/logos/Profile_white.png"
import service from '../services/config';

const Map = (props) => {
  
  const {position, restaurantes} = props;
  const mapRef = useRef(null);

  const [pinImage, setPinImage] = useState(defaultImage)

  const getImage = async ()=>{
    const response = await service.get("/users/pinimage")
   if(response.data.image){
     setPinImage(response.data.image)
   }
  }
  useEffect(()=>{
    getImage()
    return ()=>{}
  }, [])
  useEffect(() => {
    const map = mapRef.current; // Acceder a la referencia del mapa
    if (map) {
      console.log('Centrando mapa en:', position); // Mostrar en consola
      map.setView(position, map.getZoom()); // Recentrar el mapa
    }
    return ()=>{}
  }, [position]); // Dependencia en position

  const customIcon = new DivIcon({
    className: 'custom-icon',
    html: `<div style="border-radius: 50%; border: 3px solid rgb(0, 183, 255); overflow: hidden; width: 35px; height: 35px; background-color: rgba(41, 46, 48, .6); display: flex; justify-content: center; align-items:center">
             <img src="${pinImage}" style="width: 90%; height: 90%; object-fit:cover;" />
           </div>`,
    iconSize: [35, 35],
    iconAnchor: [12, 41]
  });

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <Marker position={position} icon={new Icon({iconUrl: pinImage, iconSize: [35, 35], iconAnchor: [12, 41]})}> */}
      <Marker position={position} icon={customIcon}>
        <Popup offset={[4, -25]}>Estás aquí</Popup>
      </Marker>
      <Marker position={[41.3977127,2.1078485]} icon={new Icon({iconUrl: markerIconIhPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup offset={[1, -17]}>IronHack Barcelona</Popup>
      </Marker>
      <Marker position={[40.392456,-3.6984403]} icon={new Icon({iconUrl: markerIconIhPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup offset={[1, -17]}>IronHack Madrid</Popup>
      </Marker>

      {restaurantes.map((eachRes)=>{
        return(
          <div key={eachRes._id}>
            <Marker position={eachRes.coords} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
              <Popup offset={[1, -17]}>{eachRes.name}</Popup>
            </Marker>
          </div>
        )
      })}
    </MapContainer>
  );
};

export default Map;
