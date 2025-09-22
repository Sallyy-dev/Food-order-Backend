import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

export default function MapWithCard() {
  const position = [30.0444, 31.2357];

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "30px",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}   
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          background: "#0B0D17",
          color: "white",
          padding: "24px",
          borderRadius: "16px",
          width: "50%",
          maxWidth: "460px",
          flex: "1 1 300px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.6rem", fontWeight: "bold" }}>
          McDonald’s
        </h2>
        <p
          style={{
            color: "#FFB400",
            margin: "10px 0",
            fontWeight: "600",
            fontSize: "1.1rem",
          }}
        >
          Downtown Cairo
        </p>
        <p style={{ margin: "10px 0", lineHeight: "1.6" }}>
          Mohammed Mahmoud, Ad Dawawin, Abdeen,
          <br /> Cairo Governorate 4280101
        </p>
        <p style={{ margin: "16px 0" }}>
          <strong style={{ display: "block", marginBottom: "4px" }}>
            Phone number
          </strong>
          <a
            href="tel:0221600377"
            style={{
              color: "#FFB400",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            0221600377
          </a>
        </p>
        <p>
          <strong style={{ display: "block", marginBottom: "4px" }}>
            Website
          </strong>
          <a
            href="http://mcdonalds.eg/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#FFB400",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            http://mcdonalds.eg/
          </a>
        </p>
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: -80 }}   
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          flex: "2 1 400px",
          width: "200px",
          height: "300px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
        }}
      >
        <MapContainer
          center={position}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={position} icon={customIcon}>
            <Popup>McDonald’s Downtown Cairo</Popup>
          </Marker>
        </MapContainer>
      </motion.div>
    </div>
  );
}
