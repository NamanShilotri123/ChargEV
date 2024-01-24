import React, { useEffect, useState, useContext } from "react";
import GoogleMapReact from "google-map-react";
// import Data from "../assets/Data.json";
import { Link } from "react-router-dom";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";

import MainContext from "../context/MainContext";
const centers = { lat: 48.8584, lng: 2.2945 };

function Home() {
  // const [coords, setCoords] = useState({ lat: null, lng: null });
  const { setStationData, setCoords, coords } = useContext(MainContext);

  // const [data, setData] = useState(Data);
  const [newData, setNewData] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
        console.log("hello");
      }
    );
    axios.get("http://127.0.0.1:8000/stations").then((sData) => {
      setNewData(sData.data);
      setStationData(sData.data);
    });
  }, []);

  return (
    <>
      {coords.lat != null && newData != null ? (
        <div className="w-full h-[90vh]">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCIyfHs4tK5mAVlDIFXUwjAT9o3PGf-NqI",
            }}
            defaultCenter={coords}
            defaultZoom={15}
          >
            {/* <Marker position={coords} /> */}
            {newData.map((item, index) => {
              return (
                <Link
                  to={"/station/" + item.id}
                  key={index}
                  lat={item.lat}
                  lng={item.log}
                >
                  <div className="w-20 bg-gray-300 p-0.5 hover:scale-110">
                    {item.image.length > 0 ? (
                      <img
                        className="w-full aspect-video bg-cover bg-center"
                        src={` http://localhost:8000${item.image[0]}`}
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-full aspect-video bg-cover bg-center"
                        src="https://images.unsplash.com/photo-1600490819734-6311c5c6f517?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                        alt=""
                      />
                    )}
                    <h1 className="text-gray-800">{item.name}</h1>
                  </div>
                </Link>
              );
            })}
          </GoogleMapReact>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default Home;

// const { isLoaded } = useJsApiLoader({
//   googleMapsApiKey: "AIzaSyCIyfHs4tK5mAVlDIFXUwjAT9o3PGf-NqI",
// });

// const [map, setMap] = useState(/** @type google.maps.Map */ (null));

// {/*
//  <GoogleMap
// center={coords}
// zoom={15}
// mapContainerStyle={{ width: "100%", height: "100%" }}
// options={{
//   zoomControl: false,
//   streetViewControl: false,
//   mapTypeControl: false,
//   fullscreenControl: false,
// }}
// onLoad={(map) => setMap(map)}
// >
// {data.map((i, index) => (
//   <Marker key={index} position={i} />
// ))}
// </GoogleMap> */}
