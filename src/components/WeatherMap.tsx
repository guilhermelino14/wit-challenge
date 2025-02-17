import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { WeatherMapProps } from "../types";

const WeatherMap = ({ lat, lon, city }: WeatherMapProps) => {
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={10}
      style={{ height: "400px", width: "100%", borderRadius: "10px", marginTop: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} icon={customIcon}>
        <Popup>location of {city}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default WeatherMap;
