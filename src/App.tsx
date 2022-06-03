import { useEffect } from 'react';
import './styles/App.css';

function App() {
  useEffect(() => {
    initMap();
  }, []);

  return (
    <div className="main-container">
      <div id="mapContainer"></div>
      <div className="button-container">
        <button className="btn btn-primary" id="randomize">Teleport me to somewhere random</button>
        <button className="btn btn-secondary" id="reset">Bring me back home</button>
      </div>
    </div>
  );
}

function initMap() : void{
  const defaultLocation = { lat: 0, lng: 0 };
  const map:google.maps.Map = new google.maps.Map(
      document.getElementById("mapContainer") as HTMLElement,
      {
        zoom: 12,
        center: defaultLocation,
        streetViewControl: false,
        mapTypeControl: false
      }
    );

  const marker:google.maps.Marker = new google.maps.Marker({
      position: defaultLocation,
      map: map,
    });

  updateMapToLocation(map, marker);
  document.getElementById("randomize")?.addEventListener("click", () => randomizeLocation(map, marker));
  document.getElementById("reset")?.addEventListener("click", () => updateMapToLocation(map, marker));
}

declare global {
  interface Window {
    initMap: () => void;
  }
}

window.initMap = initMap;

function updateMapToLocation(map:google.maps.Map, marker:google.maps.Marker){
  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition((pos) => {
         const position = {lat: pos.coords.latitude, lng: pos.coords.longitude};
         map.setCenter(position);
         marker.setPosition(position);
     });
  }
}

function randomizeLocation(map:google.maps.Map, marker:google.maps.Marker){
  const position = {
    lat: +getRandomInRange(-90, 90, 3),
    lng: +getRandomInRange(-180, 180, 3),
  }
  map.setCenter(position);
  marker.setPosition(position);
  map.setZoom(5);
}

function getRandomInRange(from:any, to:any, fixed:any) {
  return (Math.random() * (to - from) + from);
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

export default App;
