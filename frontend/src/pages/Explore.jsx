import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import GoogleMapReact from "google-map-react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import MainContext from "../context/MainContext";
import { motion, useScroll, useSpring } from "framer-motion";
const centers = { lat: 48.8584, lng: 2.2945 };

function Explore() {
  const { setStationData, setCoords, coords, stationData } =
    useContext(MainContext);
  const [searchStation, setSearchStation] = useState("");
  const [newCoords, setNewCoords] = useState(coords);

  // const [data, setData] = useState(Data);
  const [newData, setNewData] = useState(stationData);
  const LoadSearchStation = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/stations", {
        params: { search: `${searchStation}` },
      })
      .then((sData) => setNewData(sData.data));
  };

  return (
    <div className="lg:grid lg:grid-cols-6">
      <div className="lg:col-span-2 p-4 h-screen sm:w-full">
        <form
          className="border-2 border-gray-400 p-2 flex justify-center items-center"
          onSubmit={LoadSearchStation}
        >
          <input
            type="text"
            className="outline-none w-full "
            placeholder="Search..."
            onChange={(e) => setSearchStation(e.target.value)}
          />
          <AiOutlineSearch className="text-2xl" />
        </form>
        <div
          id="station-scroll"
          className="mt-5 space-y-4 overflow-y-auto h-[80vh] scroll-smooth"
        >
          {newData.map((item) => (
            <motion.div key={item.id} className="bg-gray-100 p-1">
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
              <div className="p-4 space-y-2">
                <h3 className="text-2xl font-semibold text-gray-600">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">{item.address}</p>
                <div className=" space-x-4 text-gray-100 ">
                  <button
                    onClick={() =>
                      setNewCoords({ lat: item.lat, lng: item.log })
                    }
                    className="bg-blue-400 px-6 py-2"
                  >
                    See On Map
                  </button>
                  <Link to={"/station/" + item.id}>
                    <button className="bg-red-400 px-6 py-2">
                      Book A Slot
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="col-span-4 h-screen">
        {newData != null ? (
          <div className="w-full h-screen">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCIyfHs4tK5mAVlDIFXUwjAT9o3PGf-NqI",
              }}
              defaultCenter={newCoords}
              defaultZoom={15}
              center={newCoords}
            >
              {newData.map((item) => {
                return (
                  <Link
                    to={"/station/" + item.id}
                    key={item.id}
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
      </div>
    </div>
  );
}

export default Explore;
