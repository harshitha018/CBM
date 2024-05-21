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
          sx={{ height: "24vh" }}
          p={1}
        >
          <Stack direction="row">
            <NotePencil size={20} />

            <Typography
              className="ms-2"
              color="primary"
              sx={{ fontSize: 15 }}
              gutterBottom
            >
              Survey/Appointment/Call back Scheduling
            </Typography>
          </Stack>
          <Grid
            container
            className="survey_schedule mt-1"
            direction={"row"}
            spacing={1}
          >
            <Grid item xs={4} sm={4} md={4}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "12px", display: "block", marginBottom: "5px" }}
              >
                First Name
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                className="ms-2"
                sx={{
                  fontSize: "12px",
                  height: "20px",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  startAdornment: <User size={18} />,
                  style: { height: "29px", width: "205px", background:"#faf9f6" },
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "12px",
                    display: "block",
                    marginTop: "7px",
                  }}
                ></Typography>
                <Grid className="d-flex flex-column">
                  <label style={{ fontSize: "12px" }}>
                    <ProjectorScreenChart size={20} color="black" /> Project{" "}
                  </label>
                  <Select
                    value={selectedProject}
                    onChange={handleProjectChange}
                    style={{
                      marginLeft: "8px",
                      width: "205px",
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
            <Grid item xs={4} sm={4} md={4}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "12px",
                    display: "block",
                    marginTop: "7px",
                  }}
                ></Typography>
                <Grid className="d-flex flex-column">
                  <label style={{ fontSize: "12px" }}>
                    <HourglassMedium size={20} color="black" /> Waiting List{" "}
                  </label>
                  <Select
                    value={selectedWaitingList}
                    onChange={handleWaitingListChange}
                    style={{
                      marginLeft: "8px",
                      width: "205px",
                      height: "29px",
                      fontSize: "12px",
                      marginTop: "2px",
                      background:"#faf9f6",
                    }}
                  >
                    <MenuItem value={"Waiting List"}>Waiting List</MenuItem>
                    <MenuItem value={"Queue"}>Queue</MenuItem>
                  </Select>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={4} sm={4} md={4}  sx={{
                    marginTop: "20px",
                  }}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "5px",
                  marginTop: "7px",
                }}
              >
                Phone Number
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                className="ms-2"
                sx={{
                  fontSize: "12px",
                  height: "10px",
                  width: "50%",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  startAdornment: <MdOutlineLocalPhone size={18} />,
                  style: { height: "29px", width: "205px", background:"#faf9f6" },
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "12px",
                    display: "block",
                    marginTop: "2px",
                  }}
                ></Typography>
                <Grid className="d-flex flex-column"  sx={{
                    marginTop: "20px",
                  }}>
                  <label style={{ fontSize: "12px" }}>
                    <MapPin size={15} color="black" /> Location{" "}
                  </label>
                  <Select
                    value={selectedLocation}
                    onChange={handleLoactionChange}
                    style={{
                      marginLeft: "8px",
                      width: "205px",
                      height: "29px",
                      fontSize: "12px",
                      marginTop: "10px",
                      background:"#faf9f6",
                    }}
                  >
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                  </Select>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "12px",
                    display: "block",
                    marginTop: "7px",
                  }}
                ></Typography>
                <Grid className="d-flex flex-column"  
                 sx={{
                    marginTop: "20px",
                  }}>
                  <label style={{ fontSize: "12px" }}>
                    <MapPin size={15} color="black" /> Availability{" "}
                  </label>
                  <Select
                    value={selectedAvailablity}
                    onChange={handleAvailablityChange}
                    style={{
                      marginLeft: "8px",
                      width: "205px",
                      height: "29px",
                      fontSize: "12px",
                      marginTop: "7px",
                      background:"#faf9f6",
                    }}
                  >
                    <MenuItem value={"Availability"}> Availability</MenuItem>
                    <MenuItem value={"Ready"}> Ready</MenuItem>
                    <MenuItem value={"Not Ready"}>Not Ready</MenuItem>
                  </Select>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "5px",
                  marginTop: "20px",
                }}
              >
                Enter Email
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                className="ms-2"
                sx={{
                  fontSize: "12px",
                  height: "10px",
                  width: "50%",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  startAdornment: <EnvelopeSimple size={18} />,

                  style: { height: "29px", width: "205px", background:"#faf9f6" },
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "12px",
                    display: "block",
                    marginTop: "20px",
                  }}
                ></Typography>
                <Grid
                  className="d-flex flex-column"
                  sx={{
                    marginTop: "20px",
                  }}
                >
                  <label style={{ fontSize: "12px" }} className="ms-2">
                    <CalendarCheck size={15} color="black" /> Date{" "}
                  </label>
                  <input
                    type="Date"
                    className="mt-1"
                    style={{
                      marginLeft: "8px",
                      width: "205px",
                      height: "29px",
                      fontSize: "12px",
                       background:"#faf9f6",
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "5px",
                  marginTop: "20px",
                }}
              >
                Sticky Agent
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                className="ms-2"
                sx={{
                  fontSize: "12px",
                  width: "205px",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  startAdornment: <User size={18} />,
                  style: { height: "29px", width: "205px" , background:"#faf9f6"},
                }}
              />
            </Grid>
            <Grid p={2} className="ms-1 ms-auto">
              <Button variant="contained">Schedule now</Button>
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
