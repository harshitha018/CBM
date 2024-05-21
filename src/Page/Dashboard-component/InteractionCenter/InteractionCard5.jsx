import React, { useState } from "react";

import {
  Button,
  Stack,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  CalendarCheck,
  EnvelopeSimple,
  HourglassMedium,
  MapPin,
  NotePencil,
  ProjectorScreenChart,
  User,
} from "@phosphor-icons/react";

import { MdOutlineLocalPhone } from "react-icons/md";
import { connect } from "react-redux";
import { setDarkMode } from "../../../redux/actions/action";

const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
  };
};

const InteractionCard5 = (props) => {
  const [selectedProject, setSelectedProject] = useState("Project");
  const [selectedWaitingList, setSelectedWaitingList] =
    useState("Waiting List");
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [selectedAvailablity, setSelectedAvailablity] =
    useState("Availability");

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleWaitingListChange = (e) => {
    setSelectedWaitingList(e.target.value);
  };

  const handleLoactionChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleAvailablityChange = (e) => {
    setSelectedAvailablity(e.target.value);
  };

  return (
    <>
      <Grid xs={12}>
        <Box
          className={`card dashboardMode ${
            props.darkMode ? "dark-mode" : "light-mode"
          } ms-1 mt-1`}
          sx={{ height: "18vh" }}
          p={1}
        >
          <Stack direction="row">
            <NotePencil size={15} />

            <Typography
              className="ms-2"
              color="primary"
              sx={{ fontSize: 12 }}
              gutterBottom
            >
              Survey/Appointment/Call back Scheduling
            </Typography>
          </Stack>
          <Grid
            container
            className="survey_schedule"
            direction={"row"}
            spacing={1}
          >
            <Grid item xs={1.5} sm={4} md={1.5}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block"}}
              >
                First Name
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                className="ms-2"
                sx={{
                  fontSize: "10px",
                  height: "20px",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  startAdornment: <User size={18} />,
                  style: {
                    height: "29px",
                    background: "#faf9f6",
                  },
                }}
              />
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "10px",
                    display: "block",
                    
                  }}
                ></Typography>
                <Grid className="d-flex flex-column" sx={{marginTop:"-2px"}}>
                  <label  style={{ fontSize: "10px" }}>
                     Project{" "}
                  </label>
                  <Select
                    value={selectedProject}
                    onChange={handleProjectChange}
                    style={{
                      height: "29px",
                      fontSize: "12px",
                      marginTop: "2px",
                      background: "#faf9f6",
                    }}
                  >
                    <MenuItem value={"Project"}>Project</MenuItem>
                    <MenuItem value={"Survey"}>Survey</MenuItem>
                    <MenuItem value={"Appointment"}>Appointment</MenuItem>
                    <MenuItem value={"Call back"}>Call back</MenuItem>
                  </Select>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5} sx={{marginLeft:"-12px"}}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "10px",
                    display: "block",
                    marginTop: "7px",
                  }}
                ></Typography>
                <Grid className="d-flex flex-column" sx={{marginTop:"-2px"}}>
                  <label  style={{ fontSize: "10px" }}>
                    Waiting List{" "}
                  </label>
                  <Select
                    value={selectedWaitingList}
                    onChange={handleWaitingListChange}
                    style={{
                      height: "29px",
                      fontSize: "12px",
                      marginTop: "2px",
                      background: "#faf9f6",
                    }}
                  >
                    <MenuItem value={"Waiting List"}>Waiting List</MenuItem>
                    <MenuItem value={"Queue"}>Queue</MenuItem>
                  </Select>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5}
            sx={{marginLeft:"-12px"}}
            >
              <Typography
                variant="body1"
                component="span"
                className="ms-4"
                sx={{
                  fontSize: "10px",
                  display: "block",
                  
                }}
              >
                Phone Number
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                className="ms-4"
                sx={{
                  fontSize: "10px",
                  height: "10px",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  startAdornment: <MdOutlineLocalPhone size={18} />,
                  style: {
                    height: "29px",
                    background: "#faf9f6",
                  },
                }}
              />
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "10px",
                    display: "block",
                  }}
                ></Typography>
                <Grid
                  className="d-flex flex-column"
               
                >
                  <label style={{ fontSize: "10px" }}>
                    Location{" "}
                  </label>
                  <Select
                    value={selectedLocation}
                    onChange={handleLoactionChange}
                    style={{
                   
                      height: "29px",
                      fontSize: "12px",
                      background: "#faf9f6",
                    }}
                  >
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                  </Select>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "10px",
                    display: "block",
                  }}
                ></Typography>
                <Grid
                  className="d-flex flex-column"
                
                >
                  <label style={{ fontSize: "10px" }}>
                     Availability{" "}
                  </label>
                  <Select
                    value={selectedAvailablity}
                    onChange={handleAvailablityChange}
                    style={{
                    
                      height: "29px",
                      fontSize: "12px",
                      background: "#faf9f6",
                    }}
                  >
                    <MenuItem value={"Availability"}> Availability</MenuItem>
                    <MenuItem value={"Ready"}> Ready</MenuItem>
                    <MenuItem value={"Not Ready"}>Not Ready</MenuItem>
                  </Select>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{
                  fontSize: "10px",
                  display: "block",
                
                }}
              >
                Enter Email
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                className="ms-2"
                sx={{
                  fontSize: "10px",
                  height: "10px",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  startAdornment: <EnvelopeSimple size={18} />,

                  style: {
                    height: "29px",
                    background: "#faf9f6",
                  },
                }}
              />
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "10px",
                    display: "block",
                  }}
                ></Typography>
                <Grid
                  className="d-flex flex-column"
                  
                >
                  <label style={{ fontSize: "10px" }} className="ms-2">
                     Date{" "}
                  </label>
                  <input
                    type="Date"
                    style={{
                     
                      height: "29px",
                      fontSize: "10px",
                      background: "#faf9f6",
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>

            <Grid item xs={1.5} sm={4} md={1.5}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{
                  fontSize: "10px",
                  display: "block",
                
                }}
              >
                Sticky Agent
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                className="ms-2"
                sx={{
                  fontSize: "10px",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  startAdornment: <User size={18} />,
                  style: {
                    height: "29px",
                    background: "#faf9f6",
                  },
                }}
              />
            </Grid>

            {/* <Grid p={2} className="ms-1 ms-auto">
              <Button variant="contained">Schedule now</Button>
            </Grid> */}
            

            <Grid className="d-flex ms-auto">
                <Grid
                  item
                  // xs={1.5}
                  // sm={2}
                  // md={1.5}
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    className="ms-2"
                    sx={{
                      fontSize: "10px",
                      height: "32px",
                      // marginRight: "10px",
                    }}
                  >
                    Schedule Now
                  </Button>
                </Grid>

                
              </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(InteractionCard5);
