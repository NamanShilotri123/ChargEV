import React, { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  TextareaAutosize,
  ImageList,
  ImageListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

import { color, Stack } from "@mui/system";
function About() {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };

  const Events = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/men/74.jpg",
      name: "Joslyn",
      dev: "Team 17 Digital Limited",
      rank: 4.2,
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      name: "Miley",
      dev: "King",
      rank: 4.3,
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Ansley",
      dev: "Rovino",
      rank: 4.4,
    },
    {
      id: 4,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Arjuns",
      dev: "ELECTRONIC ARTS",
      rank: 4.3,
    },
    {
      id: 5,
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      name: "Lukas",
      dev: "Blizzard Entertainment Inc.",
      rank: 4.2,
    },
    {
      id: 6,
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      name: "Yosef",
      dev: "Halfbrick Studios",
      rank: 4.3,
    },
    {
      id: 7,
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      name: "Krish",
      dev: "Kiloo",
      rank: 4.4,
    },
    {
      id: 8,
      image: "https://randomuser.me/api/portraits/men/95.jpg",
      name: "Litzy",
      dev: "Imengi Studios",
      rank: 4.3,
    },
    {
      id: 9,
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      name: "Litzy",
      dev: "Mojang ",
      rank: 4.4,
    },
    {
      id: 10,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      name: "Carley",
      dev: "Videolabs ",
      rank: 4.3,
    },
  ];

  const images = [
    {
      id: 1,
      image:
        "https://roboticsandautomationnews.com/wp-content/uploads/2019/05/electric-vehicle-charging-station.jpg",
    },
    {
      id: 2,
      image:
        "https://fleely.com/wp-content/uploads/2021/08/how-to-open-electric-car-charging-station-in-India.jpg",
    },
    {
      id: 3,
      image:
        "https://cdn.pixabay.com/photo/2016/10/13/22/30/tesla-1738969_1280.jpg",
    },
  ];
  const options = {
    margin: 30,
    items: 3,
    responsiveClass: true,
    nav: false,
    dots: false,
    autoplay: true,

    smartSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <>
      <Box>
        <OwlCarousel
          className="owl-theme"
          itme="1"
          autoplay={true}
          items={1}
          dots={true}
          slideBy={1}
          loop={true}
        >
          {images.map((image) => (
            <ImageList sx={{ width: "100vw", height: "500px" }}>
              <ImageListItem
                sx={{
                  width: "99vw",
                  height: "500px",
                  overflow: "hidden",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              >
                <img src={image.image} alt="name" loading="lazy" />
              </ImageListItem>
            </ImageList>
          ))}
        </OwlCarousel>
        <Box
          sx={{
            padding: "10px 20px 70px 20px",
            height: "100%",
            background: "#f0f0f0",
          }}
        >
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Our Features
          </Typography>
          <Box sx={{ verticalAlign: "middle", marginTop: "30px" }}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={(e, isExpanded) => handleChange(isExpanded, "panel1")}
              elevation={6}
            >
              <AccordionSummary
                id="panel1-header"
                aria-controls="panel1-content"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Search For EV Stations</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  With a single click, users can find EV charging stations near
                  them. They can also look for a specific station. They can even
                  save their favourite station. Furthermore, this feature will
                  only display EV charging stations, allowing the user to locate
                  a specific one quickly and easily.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel2"}
              onChange={(e, isExpanded) => handleChange(isExpanded, "panel2")}
              elevation={6}
            >
              <AccordionSummary
                id="panel2-header"
                aria-controls="panel2-content"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Slot Booking</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  After selecting a specific station, the user can schedule an
                  appointment. This feature will display information about a
                  specific station as well as the available slot. After a user
                  books an appointment, a unique Token ID is generated through
                  which that user's spot in their preferred slot is reserved.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel3"}
              onChange={(e, isExpanded) => handleChange(isExpanded, "panel3")}
              elevation={6}
            >
              <AccordionSummary
                id="panel3-header"
                aria-controls="panel3-content"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>User dashboard/profile</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  After entering the login credentials. The user dashboard page
                  will open, displaying the user's booking history. It lists the
                  current and previous EV charging stations that the user has
                  reserved. To make it easier for the user to keep track of
                  records. It also includes the user's information, such as
                  name, photo, and so on. To ensure their security, this will
                  only be visible to the user.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>

        <Box sx={{ height: "600px", background: "#f0f0f0", elevation: "10" }}>
          <OwlCarousel
            className="owl-theme"
            autoplay
            nav
            dots
            loop
            {...options}
          >
            {Events.map((Event) => (
              <Card
                className="team-item"
                key={Event.id}
                elevation={10}
                height="400px"
              >
                <CardMedia
                  component="img"
                  height="250px"
                  image={Event.image}
                  alt="Event image"
                  sx={{ objectFit: "contain" }}
                />

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    style={{ textAlign: "center" }}
                  >
                    {Event.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text-secondary"
                    style={{ textAlign: "center" }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisic
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </OwlCarousel>
        </Box>
      </Box>

      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            feedBackForm
          </Typography>
          <Card elevation={10} sx={{ margin: 5 }}>
            <Stack spacing={2} direction="column" padding={5}>
              <TextField
                label="User Name"
                placeholder="Enter your User Name"
                required
              />
              <TextField
                label="Email"
                placeholder="Enter Your Email"
                required
              />
              {/* <TextField label='FeedBack' placeholder="Enter Your Message"   required  /> */}
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Messages"
                variant="contained"
                required
                minRows={5}
              />
              <Button variant="contained" size="large">
                Submit
              </Button>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Office
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: "2px solid black",
            }}
          >
            <Card
              elevation={10}
              sx={{ padding: "110px", marginTop: "30px", margin: 5 }}
            >
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Visit Office
                  </Typography>
                  <Typography sx={{ textAlign: "center" }}>
                    Maharashtera Thane west
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Call Us
                  </Typography>
                  <Typography sx={{ textAlign: "center" }}>
                    123453332 / 4444324
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Send Email
                  </Typography>
                  <Typography sx={{ textAlign: "center" }}>
                    EvCharge@gmail.com
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default About;
