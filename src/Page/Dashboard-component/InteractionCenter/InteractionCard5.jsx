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
  Timer,
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
  const [stickyAgent, setStickyAgent] = useState(false);

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
        <Box
          className={`${
            props.darkMode ? "dark-mode" : "light-mode"
          }`}
          sx={{ height: "16vh" }}
          p={1}
        >
          <Stack direction="row align-item-center justify-content-between">
            <Grid className="d-flex">
              <NotePencil size={15} />

              <Typography
                className="ms-2"
                color="primary"
                sx={{ fontSize: 12 }}
                gutterBottom
              >
                Schedule Callback / Survey / Remainders
              </Typography>
            </Grid>
        
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
                      height: "25px",
                      // marginRight: "10px",
                    }}
                  >
                    Schedule
                  </Button>
                </Grid>
            </Grid>
           
          </Stack>
          <Grid
            container
            // className="survey_schedule "
            direction={"row"}
            spacing={1}
          >
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
                <Grid className="d-flex flex-column">
                  <label style={{ fontSize: "10px" }}>Date </label>

                  <TextField
                    // value={duedate}
                    variant="outlined"
                    // className="ms-2"
                    size="small"
                    sx={{
                      "& input[type='date']": {
                        fontSize: "10px",
                        height: "25px",
                      },
                    }}
                    type="date"
                    // onChange={(e) => setDuedate(e.target.value)}
                  />
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5} className="ms-1">
              <Typography
                variant="body1"
                component="span"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Time
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                sx={{
                  fontSize: "10px",
                  height: "20px",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  startAdornment: <Timer size={18} />,
                  style: {
                    height: "29px",
                    background: "#faf9f6",
                  },
                }}
              />
            </Grid>

            <Grid item xs={1.5} sm={4} md={1.5} sx={{ marginLeft: "1px" }}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "10px",
                    display: "block",
                  }}
                ></Typography>
                <Grid className="d-flex flex-column" sx={{ marginTop: "-2px" }}>
                  <label style={{ fontSize: "10px" }}>Type </label>
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
                    <MenuItem value={"Project"}>Type</MenuItem>
                    <MenuItem value={"Survey"}>Survey</MenuItem>
                    <MenuItem value={"Appointment"}>Appointment</MenuItem>
                    <MenuItem value={"Call back"}>Call back</MenuItem>
                  </Select>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5} sx={{ marginLeft: "-20px" }}>
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
                    Sms
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

            <Grid item xs={1.5} sm={4} md={1.5} sx={{ marginLeft: "18px" }}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "10px",
                    display: "block",
                  }}
                ></Typography>
                <Grid className="d-flex flex-column">
                  <label style={{ fontSize: "10px" }}>Dial Plan / Queue </label>
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
                    <MenuItem value={"Queue"}>Queue</MenuItem>
                  </Select>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={1.5} sm={4} md={1.5} sx={{ marginLeft: "1px" }}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: "10px",
                    display: "block",
                  }}
                ></Typography>
                <Grid className="d-flex flex-column">
                  <label style={{ fontSize: "10px" }}>Assign Campaign </label>
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

            {/* <Grid item xs={1.5} sm={4} md={1.5} className="d-flex">
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
            
               <div className="form-check" style={{ marginTop: "10px", marginLeft:"5px" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  checked={stickyAgent}
                  onChange={(e) => setStickyAgent(e.target.checked)}
                />
              </div>
            </Grid> */}

            <Grid item xs={2.3} sm={2} md={2.3} sx={{ marginLeft: "5px" }}>
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
                  height: "32px",
                  width: "70%",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  endAdornment: (
                    <div
                      className="form-check"
                      style={{ marginRight: "-15px" }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={stickyAgent}
                        onChange={(e) => setStickyAgent(e.target.checked)}
                      />
                    </div>
                  ),
                  style: {
                    height: "29px",
                    background: "#faf9f6",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(InteractionCard5);
