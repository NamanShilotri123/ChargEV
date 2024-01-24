import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import axios from "axios";
import ImageCrousel from "../components/ImageCrousel";
import {
  Alert,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { red } from "@mui/material/colors";
import { useContext } from "react";
import MainContext from "../context/MainContext";
function SingleStations() {
  const { stationId } = useParams();
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(null);
  const [useremail, setUseremail] = useState(null);
  const [review, setReview] = useState(null);
  const navigate = useNavigate();
  const [alertOpen, setalertOpen] = useState(false);
  const { isUserLogin, accessToken } = useContext(MainContext);

  useEffect(() => {
    getStationData();
  }, []);

  function getStationData() {
    axios
      .get(`http://127.0.0.1:8000/stations/station/${stationId}/`)
      .then((sData) => setData(sData.data));
  }

  function SubmitReview(e) {
    e.preventDefault();
    if (!accessToken) {
      setalertOpen(true);
    }
    axios
      .post(
        `http://127.0.0.1:8000/stations/station/${stationId}/reviews/`,
        {
          user: username,
          email: useremail,
          review: review,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((data) => data.status == "201")
      .then(() => getStationData())
      .catch((e) => console.log(e.message));
  }
  return (
    <div className="min-h-screen pb-10 ">
      {alertOpen && (
        <Alert
          severity="error"
          className="-translate-x-[50%]"
          sx={{
            position: "fixed",
            top: "10px",
            left: "50%",
            width: "600px",
          }}
          onClose={() => {
            setalertOpen(false);
          }}
        >
          You are not logged in
        </Alert>
      )}

      {data != null && (
        <>
          <ImageCrousel image={data.image} />
          <div
            style={{ zIndex: 10 }}
            className="absolute  min-h-[60vh]  shadow-lg -translate-x-[50%]  w-[80%] left-[50%]  -mt-[20vh] grid grid-cols-2"
          >
            <div className="bg-white p-5 flex justify-between flex-col">
              <div className="space-y-5">
                <Typography variant="h3" color={"primary"} gutterBottom>
                  {data.name}
                </Typography>
                <Typography gutterBottom variant="body1">
                  {data.address}
                </Typography>
                {data.price[0]?.discounted_price ? (
                  <Typography color="primary" variant="h4">
                    ₹<b>{data.price[0]?.discounted_price}</b>
                    /hr
                  </Typography>
                ) : (
                  <>
                    <Typography color="primary" variant="h4">
                      ₹<b>200</b>/hr
                    </Typography>
                    <Typography color={red[400]} variant="body1">
                      *this price is set by default only for presentation
                      purpose*
                    </Typography>
                  </>
                )}
                {/* <Typography color="primary" variant="h4">
                  ₹
                  {data.price[0]?.discounted_price
                    ? data.price[0]?.discounted_price
                    : "200"}
                  /hr
                </Typography> */}
              </div>
              <Link
                to={`/station/${stationId}/booking`}
                className="py-3 px-6 w-full hover:bg-red-400 bg-red-500 text-gray-50 text-center"
              >
                Book A Slot
              </Link>
            </div>
            <div className="">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCIyfHs4tK5mAVlDIFXUwjAT9o3PGf-NqI",
                }}
                defaultCenter={{ lat: data.lat, lng: data.log }}
                defaultZoom={15}
              >
                <IconButton size="large" color="primary">
                  <FmdGoodIcon lat={data.lat} lng={data.log} />
                </IconButton>
              </GoogleMapReact>
            </div>
          </div>
          <div className="h-screen mt-[42vh] py-10 w-[80%] mx-auto">
            <Typography align="center" color="primary" variant="h4">
              Reviews
            </Typography>
            <Box width={"100%"} minHeight={"100vh"}>
              {Object.keys(data.reviews).length == 0 && (
                <Typography variant="subtitle1">
                  There is Not any review for this station
                </Typography>
              )}
              {data.reviews?.map((data, index) => (
                <Paper variant="outlined" sx={{ p: 2, my: 1 }}>
                  <Typography variant="h5" textTransform={"capitalize"}>
                    {data.user}
                  </Typography>
                  <Typography color={"GrayText"} variant="body1">
                    {data.email}
                  </Typography>
                  <Typography variant="subtitle1" textTransform={"capitalize"}>
                    {data.review}
                  </Typography>
                </Paper>
              ))}
              <Typography
                variant="h5"
                align="center"
                sx={{ mt: 5, mb: 4 }}
                color="primary"
              >
                Add A Review
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 5 }}
                className="space-y-4"
                onSubmit={SubmitReview}
                component={"form"}
              >
                <Stack direction={"row"} spacing={4}>
                  <TextField
                    variant="outlined"
                    label="user Name"
                    fullWidth
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    required
                    label="email"
                    type={"email"}
                    onChange={(e) => setUseremail(e.target.value)}
                    fullWidth
                  />
                </Stack>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  required
                  label="what is your review"
                ></TextField>

                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Add Review
                </Button>
              </Paper>
            </Box>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleStations;
