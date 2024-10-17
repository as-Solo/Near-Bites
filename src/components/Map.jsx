

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Estás aquí</Popup>
      </Marker>
      {restaurantes.map((eachRes)=>{
        return(
          <div key={eachRes._id}>
            <Marker position={eachRes.coords}>
              <Popup>{eachRes.name}</Popup>
            </Marker>
          </div>
        )
      })}
    </MapContainer>
  );
};

export default Map;
