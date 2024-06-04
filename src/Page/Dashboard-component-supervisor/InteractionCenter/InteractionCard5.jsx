import React, { useState } from "react";

import {
  Button,
  Stack,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
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
      <Grid xs={6}>
        <Box
          className={`card dashboardMode ${
            props.darkMode ? "dark-mode" : "light-mode"
          } ms-1 mt-1`}
          sx={{ height: "44vh" }}
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
          <Grid container className="mt-1" direction={"row"} spacing={1}>
            <Grid xs={4} sm={4} md={4}>
              <Box p={0.4}>
                <div
                  className="input-group flex-nowrap"
                  style={{ height: "46px", fontSize: "12px" }}
                >
                  <span className="input-group-text" id="addon-wrapping">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    aria-label="Full Name"
                    aria-describedby="addon-wrapping"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </Box>
            </Grid>

            <Grid Item xs={4} sm={4} md={4}>
              <Box p={0.4}>
                <Box className="card" p={1}>
                  <Stack direction={"row"} alignItems={"center"}>
                    <ProjectorScreenChart size={20} color="black" />

                    <Select
                      value={selectedProject}
                      onChange={handleProjectChange}
                      style={{
                        marginLeft: "8px",
                        width: "146px",
                        height: "29px",
                        fontSize: "12px",
                      }}
                    >
                      <MenuItem value={"Project"}>Project</MenuItem>
                      <MenuItem value={"Survey"}>Survey</MenuItem>
                      <MenuItem value={"Appointment"}>Appointment</MenuItem>
                      <MenuItem value={"Call back"}>Call back</MenuItem>
                    </Select>
                  </Stack>
                </Box>
              </Box>
            </Grid>

            <Grid Item xs={4} sm={4} md={4}>
              <Box p={0.4}>
                <Box className="card" p={1}>
                  <Stack direction={"row"} alignItems={"center"}>
                    <HourglassMedium size={20} color="black" />

                    <Select
                      value={selectedWaitingList}
                      onChange={handleWaitingListChange}
                      style={{
                        marginLeft: "8px",
                        width: "146px",
                        height: "29px",
                        fontSize: "12px",
                      }}
                    >
                      <MenuItem value={"Waiting List"}>Waiting List</MenuItem>
                      <MenuItem value={"Queue"}>Queue</MenuItem>
                    </Select>
                  </Stack>
                </Box>
              </Box>
            </Grid>

            <Grid Item xs={4} sm={4} md={4}>
              <Box p={0.4}>
                <div
                  className="input-group flex-nowrap"
                  style={{ height: "46px", fontSize: "12px" }}
                >
                  <span className="input-group-text" id="addon-wrapping">
                    {/* <Phone  /> */}
                    <MdOutlineLocalPhone size={20} color="black" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    aria-label="Phone number"
                    aria-describedby="addon-wrapping"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </Box>
            </Grid>

            <Grid Item xs={4} sm={4} md={4}>
              <Box p={0.4}>
                <Box className="card" p={1}>
                  <Stack direction={"row"} alignItems={"center"}>
                    <MapPin size={20} color="black" />

                    <Select
                      value={selectedLocation}
                      onChange={handleLoactionChange}
                      style={{
                        marginLeft: "8px",
                        width: "146px",
                        height: "29px",
                        fontSize: "12px",
                      }}
                    >
                      <MenuItem value={"Location"}>Location</MenuItem>
                      <MenuItem value={"Location"}>Location</MenuItem>
                    </Select>
                  </Stack>
                </Box>
              </Box>
            </Grid>
            <Grid Item xs={4} sm={4} md={4}>
              <Box p={0.4}>
                <Box className="card" p={1}>
                  <Stack direction={"row"} alignItems={"center"}>
                    <MapPin size={20} color="black" />

                    <Select
                      value={selectedAvailablity}
                      onChange={handleAvailablityChange}
                      style={{
                        marginLeft: "8px",
                        width: "146px",
                        height: "29px",
                        fontSize: "12px",
                      }}
                    >
                      <MenuItem value={"Availability"}> Availability</MenuItem>
                      <MenuItem value={"Ready"}> Ready</MenuItem>
                      <MenuItem value={"Not Ready"}>Not Ready</MenuItem>
                    </Select>
                  </Stack>
                </Box>
              </Box>
            </Grid>
            <Grid Item xs={4} sm={4} md={4}>
              <Box p={0.4}>
                <div
                  className="input-group flex-nowrap"
                  style={{ height: "46px", fontSize: "12px" }}
                >
                  <span className="input-group-text" id="addon-wrapping">
                    <EnvelopeSimple size={18} color="black" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email.."
                    aria-label="Enter email.."
                    aria-describedby="addon-wrapping"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </Box>
            </Grid>
            <Grid Item xs={4} sm={4} md={4}>
              <Box p={0.4}>
                <Box className="card" p={1}>
                  <Stack direction={"row"} alignItems={"center"}>
                    <CalendarCheck size={20} color="black" />

                    <input
                      type="Date"
                      style={{
                        marginLeft: "8px",
                        width: "146px",
                        height: "29px",
                        fontSize: "12px",
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Grid>
            <Grid xs={4} sm={4} md={4}>
              <Box p={0.4}>
                <div
                  className="input-group flex-nowrap"
                  style={{ height: "46px", fontSize: "12px" }}
                >
                  <span className="input-group-text" id="addon-wrapping">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sticky Agent"
                    aria-label="Sticky Agent"
                    aria-describedby="addon-wrapping"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </Box>
            </Grid>
            <Grid p={1} className="ms-4 ms-auto">
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
