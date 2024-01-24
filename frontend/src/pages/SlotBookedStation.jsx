import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContext from "../context/MainContext";

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

function SlotBookedStation() {
  const { stationId } = useParams();
  const [stationData, setStationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSlot, setBookedSlot] = useState(null);
  const { isUserLogin, accessToken, profileId } = useContext(MainContext);
  const navigate = useNavigate();
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  useEffect(() => {
    getSlotBookingStatus();
    getStationData();
  }, []);
  async function getSlotBookingStatus() {
    const data = await axios.get(
      `http://127.0.0.1:8000/stations/station/${stationId}/slot/`
    );
    const newData = data.data;
    const slotArray = [];
    await newData.forEach((e) => {
      slotArray.push(e.slot);
    });
    console.log(slotArray);
    setBookedSlot(slotArray);
  }
  function getStationData() {
    axios
      .get(`http://127.0.0.1:8000/stations/station/${stationId}/`)
      .then((sData) => setStationData(sData.data));
  }
  function SubmitSlot(e) {
    axios
      .post(
        `http://127.0.0.1:8000/stations/station/${stationId}/slot/`,
        {
          date: `${year}-${month}-${date}`,
          slot: e,
          user: profileId,
          station: stationId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((data) => data.status == "201")
      .then(() => navigate("/dashboard/bookedstation"))
      .catch((e) => console.log(e.message));
  }
  function BookingSlot(e) {
    const isBookedTrue = window.confirm(
      `Do You realy want to booked this charging station at ${e.target.name} this time. `
    );
    if (isBookedTrue === true) {
      console.log({
        date: `${year}-${month}-${date}`,
        slot: e.target.name,
        user: profileId,
        station: stationId,
      });
      SubmitSlot(e.target.name);
    }
    setIsLoading(true);
  }
  if (bookedSlot == null) {
    return (
      <Typography textAlign={"center"} variant="h3">
        Loading...
      </Typography>
    );
  }
  if (bookedSlot) {
    console.log(bookedSlot);
  }
  return (
    <>
      {isUserLogin ? (
        <Container>
          {" "}
          {isLoading ? (
            <Typography variant="h4" textAlign={"center"} sx={{ m: 3 }}>
              Loading...
            </Typography>
          ) : (
            <>
              <Typography variant="h4" textAlign={"center"} sx={{ mt: 3 }}>
                Booking Station
              </Typography>
              <Typography variant="h6" textAlign={"start"} sx={{ mt: 3 }}>
                {stationData?.name}
              </Typography>
              <div className="">
                {timeSlot.map((data, index) => (
                  <Button
                    key={index}
                    sx={{ m: 0.5, mr: 1 }}
                    disabled={bookedSlot.includes(index + 1) ? true : false}
                    variant="outlined"
                    onClick={BookingSlot}
                    name={index + 1}
                  >
                    {data}
                  </Button>
                ))}
              </div>
            </>
          )}
          {/* <div>{bookedSlot[0].slot}</div> */}
        </Container>
      ) : (
        navigate("/login")
      )}
    </>
  );
}

export default SlotBookedStation;
