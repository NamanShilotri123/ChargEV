import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import MainContext from "../../context/MainContext";

const timeSlot = [
  "10:00-10:30",
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
  "12:00-12:30",
  "12:30-13:00",
  "13:00-13:30",
  "13:30-14:00",
  "14:00-14:30",
  "14:30-15:00",
  "15:00-15:30",
  "15:30-16:00",
  "16:00-16:30",
  "16:30-17:00",
  "17:00-17:30",
  "17:30-18:00",
];

function BookedStation() {
  const [station, setStation] = useState(null);
  const { isUserLogin, accessToken, profileId } = useContext(MainContext);
  useEffect(() => {
    getStationData();
  }, []);

  function getStationData() {
    axios
      .get(`http://localhost:8000/auth/booked/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((data) => data.data)
      .then((data) => setStation(data))
      .catch((e) => console.log(e.message));
  }
  return (
    <Container className=" ">
      {station == null ? (
        <Typography variant="h3">Loading Booked Station</Typography>
      ) : (
        <>
          <Typography
            variant="h4"
            color={"primary"}
            textAlign="center"
            sx={{ m: 2 }}
          >
            Your Booked Station
          </Typography>
          {station.map((s, index) => (
            <Card sx={{ mt: 1 }} key={index}>
              <CardContent className="text-gray-700">
                <Typography key={index} variant="body2">
                  {s.date}
                </Typography>
                <Typography key={index} color="primary" variant="h6">
                  {s.station.name}
                </Typography>
                <Typography key={index} variant="body1">
                  {timeSlot[s.slot - 1]}
                </Typography>
                <Typography key={index} variant="body1">
                  {s.station.address}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}

export default BookedStation;
