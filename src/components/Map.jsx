

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import markerIconPng from "../assets/images/patata.png"
import markerIconIhPng from "../assets/images/marker-icon-ih.png"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

const Map = (props) => {
  
  const {position, restaurantes} = props;
  const mapRef = useRef(null);

  useEffect(() => {
    const map = mapRef.current; // Acceder a la referencia del mapa
    if (map) {
      console.log('Centrando mapa en:', position); // Mostrar en consola
      map.setView(position, map.getZoom()); // Recentrar el mapa
    }
  }, [position]); // Dependencia en position


  return (
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup>Estás aquí</Popup>
      </Marker>
      <Marker position={[41.3977127,2.1078485]} icon={new Icon({iconUrl: markerIconIhPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup>IronHack</Popup>
      </Marker>
      <Marker position={[40.392456,-3.6984403]} icon={new Icon({iconUrl: markerIconIhPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup>IronHack</Popup>
      </Marker>

      {restaurantes.map((eachRes)=>{
        return(
          <div key={eachRes._id}>
            <Marker position={eachRes.coords} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
              <Popup>{eachRes.name}</Popup>
            </Marker>
          </div>
        )
      })}
    </MapContainer>
  );
};

export default Map;
