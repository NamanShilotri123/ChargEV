import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const MainContext = createContext();

export function MainProvider({ children }) {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [userCredential, setuserCredential] = useState({});
  const [stationData, setStationData] = useState(null);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  function getUserName() {
    axios
      .get("http://localhost:8000/auth/", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((data) => data.data)
      .then((data) => {
        if (data.error) {
          console.log("upexpected token is provided");
        } else {
          setUserName(data.username);
        }
      });
  }

  const getAccessToken = () => {
    axios({
      method: "post",
      url: "http://localhost:8000/auth/refresh/",
      data: {
        refresh: refreshToken,
      },
    })
      .then((res) => setAccessToken(res.data))
      .catch((e) => console.log(e.message));
  };
  const userLoggedOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setProfileId(null);
    setIsUserLogin(false);
    userName("");
  };

  return (
    <MainContext.Provider
      value={{
        setCoords,
        userLoggedOut,
        coords,
        stationData,
        isUserLogin,
        profilePic,
        setIsUserLogin,
        getUserName,
        setStationData,
        userCredential,
        setuserCredential,
        getAccessToken,
        setProfileId,
        profileId,
        userName,
        accessToken,
        setAccessToken,
        setRefreshToken,
        setProfilePic,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
