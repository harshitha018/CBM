import React, { useEffect, useState } from "react";
import "./DashboardRealtime.css";
import NavBar from "../../Component/NavBar";
import SideBar from "../../Component/SideBar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import UserLogo from "../../assests/Realtime-dash-assets/user-account.png";
import UserNotReady from "../../assests/Realtime-dash-assets/user.png";
import IncomingCall from "../../assests/Realtime-dash-assets/incoming-call.png";
import CallAnswered from "../../assests/Realtime-dash-assets/telephone.png";
import MissedCall from "../../assests/Realtime-dash-assets/missed-call.png";
import WaitingCall from "../../assests/Realtime-dash-assets/call.png";
import SandClock from "../../assests/Realtime-dash-assets/sand-clock.png";
import EmployeeOfTheMonth from "../../assests/Realtime-dash-assets/employee-of-the-month.png";
import PhoneCall from "../../assests/Realtime-dash-assets/phone-call.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ApexChart from "./ApexChart";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function DashboardRealtime() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const headers = {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiQWRtaW4iLCJVc2VyRGV0YWlscyI6eyJhdXRvZ2VuVXNlcnNJZCI6MSwiZW1haWwiOiJuYXNAZ21haWwuY29tIiwiZW1wbG95ZWVJZCI6IkFkbWluIiwiZmlyc3ROYW1lIjoiVGVuYW50SSIsImxhc3ROYW1lIjoiVDk3NDIwMjQwNF8wMyIsIm1vYmlsZU51bWJlciI6IjkwMzkzMjA5MDkiLCJwYXNzd29yZCI6IiQyYSQxMCRxdlBKNEhLWDhWMENxZUxnVndET1dPTC90WkxnYUtXUHY4RnNFeVkud0ZIMllkWkUvRlMwaSIsInN0YXR1cyI6IkFDVElWRSIsImF1dG9nZW5Vc2Vyc0RldGFpbHNJZCI6IiIsInVzZXJncm91cE5hbWUiOiJzYWxlc3MiLCJyb2xlcyI6W3siYXV0b2dlblJvbGVzSWQiOm51bGwsInJlY0FkZER0IjpudWxsLCJyZWNVcGRhdGVEdCI6bnVsbCwicm9sZXNOYW1lIjoiQWRtaW4iLCJkZXNjcmlwdGlvbiI6bnVsbCwicm9sZUNyZWF0ZVN0YXR1cyI6bnVsbCwic3RhdHVzIjpudWxsLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwidXNlclNjcmVlbk1hcCI6bnVsbH1dLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQWRtaW4ifV0sInJvbGVzTGlzdCI6WyJBZG1pbiJdLCJwYnhFeHQiOiIiLCJza2lsbFNldCI6IiIsImRpc3Bvc2l0aW9uIjoiQ09MTEVDVElPTiIsInVzZXJncm91cHR5cGUiOm51bGwsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjpudWxsLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlfSwiaWF0IjoxNzE3MDY5MTc4LCJleHAiOjE3MTcwNzI3Nzh9.b9roP6x41uNn7T-8WaOt0BymiGXyPGx_MyFBGfwT3sGzkH2_zg1ZZlrCrGXBOECgk-O7pH1ESkBhUA2DNl3jEw", // Replace with your actual access token
      "Content-Type": "application/json",
    };

    async function getUser() {
      try {
        const response = await axios.get(
          "http://192.168.45.59:8080/cbmUAT/usergroup/getusergroupDetail"
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <Grid container direction={"row"}>
      {/* <Snackbar
    >
    </Snackbar> */}
      <Grid item xs={0.5}>
        <SideBar />
      </Grid>
      <Grid item xs={11.5}>
        <Grid container spacing={0.4} direction={"column"}>
          <Grid item xs={12}>
            <NavBar />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1} marginBottom={0.2}>
                {/* Charts */}
                <Grid item xs={12}>
                  <Card
                    sx={{
                      minWidth: 275,
                      marginLeft: "1px",
                      marginRight: "1px",
                      background: " #FFFFFF",
                    }}
                  >
                    <ApexChart />
                  </Card>
                </Grid>
              </Grid>

              {/* Agent activity */}

              <Card sx={{ height: "70vh", backgroundColor: "whitesmoke" }}>
                <Grid container spacing={0.1}>
                  {/* Skills */}

                  {/* Left vertical bar */}
                  <Grid item xs={0.3}>
                    <Card sx={{ height: "70vh", marginLeft: "1px" }}>
                      <Box
                        sx={{
                          height: "20vh",
                          backgroundColor: "#5D8AA8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1px",
                        }}
                      >
                        <div
                          style={{
                            transform: "rotate(-90deg)",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          <h2>SKILL1</h2>
                        </div>
                      </Box>
                      <Box
                        sx={{
                          height: "20vh",
                          backgroundColor: "#5D8AA8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1px",
                        }}
                      >
                        <div
                          style={{
                            transform: "rotate(-90deg)",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          <h2>SKILL2</h2>
                        </div>
                      </Box>
                      <Box
                        sx={{
                          height: "30vh",
                          backgroundColor: "#5D8AA8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            transform: "rotate(-90deg)",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          <h2>AGENTS__STATE</h2>
                        </div>
                      </Box>
                    </Card>
                  </Grid>

                  {/* middle vertical bar */}

                  <Grid item xs={10.7}>
                    {/* middle first card */}
                    <Card
                      sx={{
                        height: "20vh",
                        background: " #FFFFFF",

                        marginBottom: "1px",
                      }}
                    >
                      <Box
                        sx={{
                          paddingLeft: "10px",
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={1.5}>
                            <Box sx={{ height: "20vh" }}>
                              <label
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "small",
                                  // color: "white",
                                }}
                              >
                                AGENTS STAFFED
                              </label>

                              <Box
                                sx={{
                                  height: "85px",
                                  width: "85px",
                                  border: "1px solid white",
                                  backgroundColor: "#6699CC",
                                  position: "relative",
                                  top: "15px",
                                  left: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                  boxShadow: 9, // This adds a subtle shadow
                                  transition: "transform 0.3s, box-shadow 0.3s",
                                }}
                              >
                                <img
                                  src={UserLogo}
                                  alt="userLogo"
                                  style={{
                                    height: "55px",
                                    position: "absolute",
                                    top: "-18px",
                                  }}
                                />
                                <label
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "35px",
                                  }}
                                >
                                  100
                                </label>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={1.5}>
                            <Box>
                              <label
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "small",
                                  // color: "white",
                                }}
                              >
                                AGENTS NOT READY
                              </label>
                              <Box
                                sx={{
                                  height: "85px",
                                  width: "85px",
                                  border: "1px solid white",
                                  backgroundColor: "#6699CC",
                                  position: "relative",
                                  top: "15px",
                                  left: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                  boxShadow: 9, // This adds a subtle shadow
                                  transition: "transform 0.3s, box-shadow 0.3s",
                                }}
                              >
                                <img
                                  src={UserNotReady}
                                  alt="UserNotReady"
                                  style={{
                                    height: "50px",
                                    position: "absolute",
                                    top: "-18px",
                                  }}
                                />
                                <label
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "35px",
                                  }}
                                >
                                  20
                                </label>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={1.5}>
                            <Box>
                              <label
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "small",
                                  // color: "white",
                                }}
                              >
                                CALLS OFFERED
                              </label>

                              <Box
                                sx={{
                                  height: "85px",
                                  width: "85px",
                                  border: "1px solid white",
                                  backgroundColor: "#6699CC",
                                  position: "relative",
                                  top: "15px",
                                  left: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                  boxShadow: 9, // This adds a subtle shadow
                                  transition: "transform 0.3s, box-shadow 0.3s",
                                }}
                              >
                                <img
                                  src={IncomingCall}
                                  alt="IncomingCall"
                                  style={{
                                    height: "50px",
                                    position: "absolute",
                                    top: "-18px",
                                  }}
                                />
                                <label
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "35px",
                                  }}
                                >
                                  200
                                </label>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={1.5}>
                            <Box>
                              <label
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "small",
                                  // color: "white",
                                }}
                              >
                                CALLS ANSWERED
                              </label>
                              <Box
                                sx={{
                                  height: "85px",
                                  width: "85px",
                                  border: "1px solid white",
                                  backgroundColor: "#6699CC",
                                  position: "relative",
                                  top: "15px",
                                  left: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                  boxShadow: 9, // This adds a subtle shadow
                                  transition: "transform 0.3s, box-shadow 0.3s",
                                }}
                              >
                                <img
                                  src={CallAnswered}
                                  alt="CallAnswered"
                                  style={{
                                    height: "50px",
                                    position: "absolute",
                                    top: "-18px",
                                  }}
                                />
                                <label
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "35px",
                                  }}
                                >
                                  170
                                </label>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={1.5}>
                            <Box>
                              <label
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "small",
                                  // color: "white",
                                }}
                              >
                                CALLS ABANDONED
                              </label>

                              <Box
                                sx={{
                                  height: "85px",
                                  width: "85px",
                                  border: "1px solid white",
                                  backgroundColor: "#6699CC",
                                  position: "relative",
                                  top: "15px",
                                  left: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                  boxShadow: 9, // This adds a subtle shadow
                                  transition: "transform 0.3s, box-shadow 0.3s",
                                }}
                              >
                                <img
                                  src={MissedCall}
                                  alt="MissedCall"
                                  style={{
                                    height: "50px",
                                    position: "absolute",
                                    top: "-18px",
                                  }}
                                />
                                <label
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "35px",
                                  }}
                                >
                                  25
                                </label>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={1.5}>
                            <Box>
                              <label
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "small",
                                  // color: "white",
                                }}
                              >
                                CALLS WAITING
                              </label>
                              <Box
                                sx={{
                                  height: "85px",
                                  width: "85px",
                                  border: "1px solid white",
                                  backgroundColor: "#6699CC",
                                  position: "relative",
                                  top: "15px",
                                  left: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                  boxShadow: 9, // This adds a subtle shadow
                                  transition: "transform 0.3s, box-shadow 0.3s",
                                }}
                              >
                                <img
                                  src={WaitingCall}
                                  alt="WaitingCall"
                                  style={{
                                    height: "50px",
                                    position: "absolute",
                                    top: "-18px",
                                  }}
                                />
                                <label
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "35px",
                                  }}
                                >
                                  40
                                </label>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={1.5}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  style={{ height: "50px" }}
                                  src={SandClock}
                                  alt="SandClock"
                                />
                              </Box>
                              <Box>
                                <label
                                  style={{
                                    // color: "white",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  00:00:03
                                </label>
                                <label
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "x-small",
                                    // color: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  MAX WAIT TIME
                                </label>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={1.5}>
                            <Box
                              sx={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                className="my-auto"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                  height: "70px",
                                  width: "70px",
                                  alignItems: "center",
                                }}
                              >
                                <CircularProgressbar
                                  className="h-100 mt-auto"
                                  value={40}
                                  text={`26`}
                                  styles={buildStyles({
                                    // Colors
                                    pathColor: `#22c55e`,
                                    textColor: "black",
                                    textSize: "40px",
                                    trailColor: "#d6d6d6",
                                    backgroundColor: "#3e98c7",
                                  })}
                                />
                              </div>
                              <span>
                                <label
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "x-small",
                                    // color: "white",
                                    paddingTop: "20px",
                                    position: "relative",
                                    bottom: "19px",
                                    // marginBottom:'20px'
                                    // marginLeft:'0px'
                                  }}
                                >
                                  SERVICE LEVEL
                                </label>
                              </span>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>

                    {/* middle second card  */}
                    <Grid container>
                      <Grid item xs={12}>
                        <Card
                          sx={{
                            height: "20vh",
                            background: "#FFFFFF",

                            marginBottom: "1px",
                          }}
                        >
                          <Box
                            sx={{
                              paddingLeft: "10px",
                            }}
                          >
                            <Grid container spacing={1}>
                              <Grid item xs={1.5}>
                                <Box sx={{ height: "20vh" }}>
                                  <label
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "small",
                                      // color: "white",
                                    }}
                                  >
                                    AGENTS STAFFED
                                  </label>

                                  <Box
                                    sx={{
                                      height: "85px",
                                      width: "85px",
                                      border: "1px solid white",
                                      backgroundColor: "#6699CC",
                                      position: "relative",
                                      top: "15px",
                                      left: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "end",
                                      boxShadow: 9, // This adds a subtle shadow
                                      transition:
                                        "transform 0.3s, box-shadow 0.3s",
                                    }}
                                  >
                                    <img
                                      src={UserLogo}
                                      alt="userLogo"
                                      style={{
                                        height: "55px",
                                        position: "absolute",
                                        top: "-18px",
                                      }}
                                    />
                                    <label
                                      style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "35px",
                                      }}
                                    >
                                      124
                                    </label>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={1.5}>
                                <Box>
                                  <label
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "small",
                                      // color: "white",
                                    }}
                                  >
                                    AGENTS NOT READY
                                  </label>
                                  <Box
                                    sx={{
                                      height: "85px",
                                      width: "85px",
                                      border: "1px solid white",
                                      backgroundColor: "#6699CC",
                                      position: "relative",
                                      top: "15px",
                                      left: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "end",
                                      boxShadow: 9, // This adds a subtle shadow
                                      transition:
                                        "transform 0.3s, box-shadow 0.3s",
                                    }}
                                  >
                                    <img
                                      src={UserNotReady}
                                      alt="UserNotReady"
                                      style={{
                                        height: "50px",
                                        position: "absolute",
                                        top: "-18px",
                                      }}
                                    />
                                    <label
                                      style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "35px",
                                      }}
                                    >
                                      70
                                    </label>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={1.5}>
                                <Box>
                                  <label
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "small",
                                      // color: "white",
                                    }}
                                  >
                                    CALLS OFFERED
                                  </label>

                                  <Box
                                    sx={{
                                      height: "85px",
                                      width: "85px",
                                      border: "1px solid white",
                                      backgroundColor: "#6699CC",
                                      position: "relative",
                                      top: "15px",
                                      left: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "end",
                                      boxShadow: 9, // This adds a subtle shadow
                                      transition:
                                        "transform 0.3s, box-shadow 0.3s",
                                    }}
                                  >
                                    <img
                                      src={IncomingCall}
                                      alt="IncomingCall"
                                      style={{
                                        height: "50px",
                                        position: "absolute",
                                        top: "-18px",
                                      }}
                                    />
                                    <label
                                      style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "35px",
                                      }}
                                    >
                                      105
                                    </label>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={1.5}>
                                <Box>
                                  <label
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "small",
                                      // color: "white",
                                    }}
                                  >
                                    CALLS ANSWERED
                                  </label>
                                  <Box
                                    sx={{
                                      height: "85px",
                                      width: "85px",
                                      border: "1px solid white",
                                      backgroundColor: "#6699CC",
                                      position: "relative",
                                      top: "15px",
                                      left: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "end",
                                      boxShadow: 9, // This adds a subtle shadow
                                      transition:
                                        "transform 0.3s, box-shadow 0.3s",
                                    }}
                                  >
                                    <img
                                      src={CallAnswered}
                                      alt="CallAnswered"
                                      style={{
                                        height: "50px",
                                        position: "absolute",
                                        top: "-18px",
                                      }}
                                    />
                                    <label
                                      style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "35px",
                                      }}
                                    >
                                      144
                                    </label>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={1.5}>
                                <Box>
                                  <label
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "small",
                                      // color: "white",
                                    }}
                                  >
                                    CALLS ABANDONED
                                  </label>

                                  <Box
                                    sx={{
                                      height: "85px",
                                      width: "85px",
                                      border: "1px solid white",
                                      backgroundColor: "#6699CC",
                                      position: "relative",
                                      top: "15px",
                                      left: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "end",
                                      boxShadow: 9, // This adds a subtle shadow
                                      transition:
                                        "transform 0.3s, box-shadow 0.3s",
                                    }}
                                  >
                                    <img
                                      src={MissedCall}
                                      alt="MissedCall"
                                      style={{
                                        height: "50px",
                                        position: "absolute",
                                        top: "-18px",
                                      }}
                                    />
                                    <label
                                      style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "35px",
                                      }}
                                    >
                                      73
                                    </label>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={1.5}>
                                <Box>
                                  <label
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "small",
                                      // color: "white",
                                    }}
                                  >
                                    CALLS WAITING
                                  </label>
                                  <Box
                                    sx={{
                                      height: "85px",
                                      width: "85px",
                                      border: "1px solid white",
                                      backgroundColor: "#6699CC",
                                      position: "relative",
                                      top: "15px",
                                      left: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "end",
                                      boxShadow: 9, // This adds a subtle shadow
                                      transition:
                                        "transform 0.3s, box-shadow 0.3s",
                                    }}
                                  >
                                    <img
                                      src={WaitingCall}
                                      alt="WaitingCall"
                                      style={{
                                        height: "50px",
                                        position: "absolute",
                                        top: "-18px",
                                      }}
                                    />
                                    <label
                                      style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "35px",
                                      }}
                                    >
                                      58
                                    </label>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={1.5}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      style={{ height: "50px" }}
                                      src={SandClock}
                                      alt="SandClock"
                                    />
                                  </Box>
                                  <Box>
                                    <label
                                      style={{
                                        // color: "white",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      00:00:03
                                    </label>
                                    <label
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "x-small",
                                        // color: "white",
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      MAX WAIT TIME
                                    </label>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={1.5}>
                                <Box
                                  sx={{
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                  }}
                                >
                                  <div
                                    className="my-auto"
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      flexDirection: "column",
                                      height: "70px",
                                      width: "70px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <CircularProgressbar
                                      className="h-100 mt-auto"
                                      value={38}
                                      text={`25`}
                                      styles={buildStyles({
                                        // Colors
                                        pathColor: `#22c55e`,
                                        textColor: "black",
                                        textSize: "40px",
                                        trailColor: "#d6d6d6",
                                        backgroundColor: "#3e98c7",
                                      })}
                                    />
                                  </div>
                                  <span>
                                    <label
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "x-small",
                                        // color: "white",
                                        paddingTop: "20px",
                                        position: "relative",
                                        bottom: "19px",
                                        // marginBottom:'20px'
                                        // marginLeft:'0px'
                                      }}
                                    >
                                      SERVICE LEVEL
                                    </label>
                                  </span>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>

                    {/* Agent Table  */}

                    <Grid container>
                      <Grid container>
                        <Grid container>
                          <Grid item xs={12}>
                            <Card
                              sx={{ height: "30vh", backgroundColor: "gray" }}
                            >
                              <TableContainer
                                component={Paper}
                                sx={{
                                  maxHeight: "30vh",
                                  "&::-webkit-scrollbar": {
                                    display: "none",
                                  },
                                  "-ms-overflow-style": "none", // IE and Edge
                                  "scrollbar-width": "none", // Firefox
                                }}
                              >
                                <Table size="small" stickyHeader>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        sx={{
                                          padding: "10px",
                                          fontWeight: "bold",
                                          backgroundColor: "#6699CC",
                                          color: "white",
                                        }}
                                      >
                                        Agent Name
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          padding: "10px",
                                          fontWeight: "bold",
                                          backgroundColor: "#6699CC",
                                          color: "white",
                                        }}
                                      >
                                        Login ID
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          padding: "10px",
                                          fontWeight: "bold",
                                          backgroundColor: "#6699CC",
                                          color: "white",
                                        }}
                                      >
                                        Extension
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          padding: "10px",
                                          fontWeight: "bold",
                                          backgroundColor: "#6699CC",
                                          color: "white",
                                        }}
                                      >
                                        Type
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          padding: "10px",
                                          fontWeight: "bold",
                                          backgroundColor: "#6699CC",
                                          color: "white",
                                        }}
                                      >
                                        Status
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          padding: "10px",
                                          fontWeight: "bold",
                                          backgroundColor: "#6699CC",
                                          color: "white",
                                        }}
                                      >
                                        Skillset
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          padding: "10px",
                                          fontWeight: "bold",
                                          backgroundColor: "#6699CC",
                                          color: "white",
                                        }}
                                      >
                                        Channel
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          padding: "10px",
                                          fontWeight: "bold",
                                          backgroundColor: "#6699CC",
                                          color: "white",
                                        }}
                                      >
                                        Action
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {[...Array(10)].map((_, index) => (
                                      <TableRow key={index}>
                                        <TableCell
                                          sx={{
                                            padding: "6px",
                                            backgroundColor: "#FFFFFF",
                                            // color: "white",
                                          }}
                                        >
                                          Agent Name {index + 1}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            padding: "6px",
                                            backgroundColor: "#FFFFFF",
                                            // color: "white",
                                          }}
                                        >
                                          Login {index + 1}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            padding: "6px",
                                            backgroundColor: "#FFFFFF",
                                            // color: "white",
                                          }}
                                        >
                                          Ext {index + 1}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            padding: "6px",
                                            backgroundColor: "#FFFFFF",
                                            // color: "white",
                                          }}
                                        >
                                          Type {index + 1}
                                          {/* type dropdown                      */}
                                          <FormControl
                                            sx={{
                                              marginLeft: "5px",
                                              minWidth: 91,
                                              width: 91,
                                            }}
                                          >
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              onChange={handleChange}
                                              sx={{
                                                height: "20px", // Adjust the height as needed
                                                fontSize: "10px", // Adjust the font size as needed
                                                // color: "#FFFFFF",
                                              }}
                                              // Alternatively, you can use inline style
                                              // style={{ height: '30px', fontSize: '14px' }}
                                            >
                                              <MenuItem value={10}>
                                                Inbound
                                              </MenuItem>
                                              <MenuItem value={20}>
                                                Outbound
                                              </MenuItem>
                                              <MenuItem value={30}>
                                                Blend
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            padding: "6px",
                                            backgroundColor: "#FFFFFF",
                                            // color: "white",
                                          }}
                                        >
                                          Status {index + 1}
                                          {/* status dropdown */}
                                          <FormControl
                                            sx={{
                                              marginLeft: "5px",
                                              minWidth: 100,
                                              width: 100,
                                            }}
                                          >
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              onChange={handleChange}
                                              sx={{
                                                height: "20px", // Adjust the height as needed
                                                fontSize: "10px", // Adjust the font size as needed
                                                // color: "#FFFFFF",
                                              }}
                                              // Alternatively, you can use inline style
                                              // style={{ height: '30px', fontSize: '14px' }}
                                            >
                                              <MenuItem value={10}>
                                                Logged In
                                              </MenuItem>
                                              <MenuItem value={20}>
                                                Logged Out
                                              </MenuItem>
                                              <MenuItem value={30}>
                                                Not Ready
                                              </MenuItem>
                                              <MenuItem value={40}>
                                                Idle
                                              </MenuItem>
                                              <MenuItem value={50}>
                                                On Call
                                              </MenuItem>
                                              <MenuItem value={60}>
                                                Break
                                              </MenuItem>
                                              <MenuItem value={70}>
                                                ACW
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            padding: "6px",
                                            backgroundColor: "#FFFFFF",
                                            // color: "white",
                                          }}
                                        >
                                          Skillset {index + 1}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            padding: "6px",
                                            backgroundColor: "#FFFFFF",
                                            // color: "white",
                                          }}
                                        >
                                          Channel {index + 1}
                                          {/* channel dropdown  */}
                                          <FormControl
                                            sx={{
                                              marginLeft: "5px",
                                              minWidth: 75,
                                              width: 75,
                                            }}
                                          >
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              onChange={handleChange}
                                              sx={{
                                                height: "20px", // Adjust the height as needed
                                                fontSize: "10px", // Adjust the font size as needed
                                                // color: "#FFFFFF",
                                              }}
                                              // Alternatively, you can use inline style
                                              // style={{ height: '30px', fontSize: '14px' }}
                                            >
                                              <MenuItem value={10}>
                                                Voice
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            padding: "6px",
                                            backgroundColor: "#FFFFFF",

                                            // color: "white",
                                          }}
                                        >
                                          Action {index + 1}
                                          {/* action dropdown  */}
                                          <FormControl
                                            sx={{
                                              marginLeft: "5px",
                                              minWidth: 90,
                                              width: 90,
                                            }}
                                          >
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              onChange={handleChange}
                                              sx={{
                                                height: "20px", // Adjust the height as needed
                                                fontSize: "10px", // Adjust the font size as needed
                                                // color: "#FFFFFF",
                                              }}
                                              // Alternatively, you can use inline style
                                              // style={{ height: '30px', fontSize: '14px' }}
                                            >
                                              <MenuItem value={10}>
                                                Barge In
                                              </MenuItem>
                                              <MenuItem value={20}>
                                                Whisper
                                              </MenuItem>
                                              <MenuItem value={30}>
                                                Monitor
                                              </MenuItem>
                                              <MenuItem value={40}>
                                                Message
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Card>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* right vertical bar */}

                  <Grid item xs={1}>
                    <Card sx={{ height: "70vh", marginRight: "1px" }}>
                      <Box
                        sx={{
                          height: "20vh",
                          background:
                            "linear-gradient(45deg, #ADD8E6 30%, #ADD8E6 50%,#59ABE3 90%)",

                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginBottom: "1px",
                        }}
                      >
                        <div
                          style={{
                            // color: "white",
                            // marginLeft: "13px",
                            fontSize: "13px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Congratulations!
                        </div>
                        <img
                          src={EmployeeOfTheMonth}
                          alt="EmployeeOfTheMonth"
                          style={{
                            height: "50px",
                            // marginLeft: "35px",
                            marginTop: "15px",
                          }}
                        />
                        <div
                          style={{
                            // color: "white",
                            // marginLeft: "13px",
                            fontSize: "xx-small",
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Employee Of The Month
                        </div>

                        <label
                          style={{
                            // color: "white",
                            fontWeight: "bold",
                            fontSize: "smaller",
                            // marginLeft: "20PX",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          JOHN SMITH
                        </label>
                      </Box>
                      {/* right middle */}
                      <Box
                        sx={{
                          height: "20vh",
                          backgroundColor: "#cbd5e1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          marginBottom: "1px",
                        }}
                      >
                        <Box>
                          <img
                            src={PhoneCall}
                            alt="PhoneCall"
                            style={{
                              height: "35px",
                              // marginTop: "-20px",
                            }}
                          />
                        </Box>
                        <Box>
                          <label
                            style={{
                              color: "#0284c7",
                              fontWeight: "bold",
                              fontSize: "xx-large",
                              fontFamily: "sans-serif",
                            }}
                          >
                            1832
                          </label>
                        </Box>
                        <Box>
                          <label
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "small",
                              paddingLeft: "10px",
                              display: "flex",
                              justifyContent: "center",
                              marginLeft: "15px",
                            }}
                          >
                            Total Contact Center Calls
                          </label>
                        </Box>
                      </Box>
                      {/* right bottom */}
                      <Box
                        sx={{
                          height: "30vh",
                          background:
                            "linear-gradient(45deg, #ADD8E6 30%, #ADD8E6 50%,#59ABE3 90%)",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Box>
                          <div
                            className="my-auto"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                              height: "70px",
                              width: "70px",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgressbar
                              className="h-100 mt-auto"
                              value={80}
                              text={`9`}
                              styles={buildStyles({
                                // Colors
                                pathColor: `#22c55e`,
                                textColor: "black",
                                textSize: "40px",
                                trailColor: "#d6d6d6",
                                backgroundColor: "#3e98c7",
                              })}
                            />
                          </div>
                        </Box>
                        <Box sx={{ paddingTop: "20px" }}>
                          <label
                            style={{
                              // color: "white",
                              fontWeight: "bold",
                              fontSize: "small",
                              fontFamily: "sans-serif",
                              position: "relative",
                              // right:'10px'
                            }}
                          >
                            <center>
                              Overall Service <br /> <center>Level</center>
                            </center>
                          </label>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DashboardRealtime;
