import React, { useEffect, useState } from "react";
// import '../index.css'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Badge,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { SquaresFour } from "@phosphor-icons/react";
import Tooltip from "@mui/material/Tooltip";
import cbm_image from "../assests/cbm_assests/images/Inaipi_Logo-1.2.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setDarkMode } from "../redux/actions/action";
import { GiRotaryPhone } from "react-icons/gi";
import Modal from "@mui/joy/Modal";

import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";

const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
  };
};

const SideBar = (props) => {
  const [activeIndex, setActiveIndex] = useState();
  const [openRotary, setOpenRotary] = useState(false);

  const roteryOpen = () => {
    console.log("cliclkedddd", openRotary);
    setOpenRotary(true);
    console.log("cliclkeddddafter", openRotary);
  };

  const handleIconClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index);
  };

  useEffect(() => {
    const storedIndex = localStorage.getItem("activeIndex");
    if (storedIndex) {
      setActiveIndex(parseInt(storedIndex));
    }
  }, []);

  const renderMenu = (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openRotary}
      onClose={() => setOpenRotary(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "start" }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          borderRadius: 2,
          p: 0,
          boxShadow: 24,
          width: "100%",
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1e40af",
            padding: "16px",
            borderRadius: "4px 4px 0 0",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            sx={{ color: "#fff", margin: 0 }}
          >
            <h5>Preview Campaign List</h5>
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenRotary(false)}
            sx={{ color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 3 }}>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Box
                sx={{
                  maxHeight: 550, // Adjust the height as needed
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: 0,
                    height: 0,
                  },
                  msOverflowStyle: "none", // IE and Edge
                  scrollbarWidth: "none", // Firefox
                }}
              >
                <Table>
                  <TableHead
                    sx={{
                      backgroundColor: "#1e3a8a",
                      position: "sticky",
                      top: -1,
                    }}
                  >
                    <TableRow>
                      {Array.from({ length: 11 }).map((_, index) => (
                        <TableCell
                          sx={{ color: "#fff", border: "1px solid #cbd5e1" }}
                          key={index}
                        >
                          Heading {index + 1}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                        sx={{
                          backgroundColor:
                            rowIndex % 2 === 0 ? "#f0f0f0" : "#e0e0e0", // Alternating row colors
                        }}
                      >
                        {Array.from({ length: 11 }).map((_, colIndex) => (
                          <TableCell
                            sx={{
                              border: "1px solid #cbd5e1",
                              fontWeight: "bold",
                            }}
                            key={colIndex}
                          >
                            Row {rowIndex + 1} Col {colIndex + 1}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <>
      <AppBar position="static" color="">
        <Toolbar
          sx={{
            "@media screen and (min-width: 600px)": {
              padding: 0,
            },
            height: "100vh",
          }}
          // className={`${props.darkMode ? "dark-mode" : "white"}`}
        
        >
          <Stack
            alignItems={"center"}
            className={`sidebarMode  ${
              props.darkMode ? "dark-mode" : "light-mode"
            }`}
            sx={{ height: "100%", width: "100%", marginTop: "0px" }}
            spacing={2}
          >
            <img
              src={cbm_image}
              alt="image"
              style={{
                marginLeft: "-4px",
                marginTop: "6px",
                height: "45px",
                width: "50px",
                padding: "0px",
              }}
            />

            <Stack spacing={1.8}>
              <Stack className="realdash">
                <Tooltip title="Home" arrow placement="right">
                <Link to="/dashboard">
                  <IconButton
                    edge="end"
                    sx={{
                      color: "white",
                      width: "63px",
                      padding: "0px",
                      borderRadius: "8px",
                    }}
                  >
                    <HomeIcon sx={{ fontSize: 25 }} />
                  </IconButton>
                  </Link>

                </Tooltip>
              </Stack>
              <span className="border-top"></span>
              <Stack>
                <Tooltip title="Rotary phone" arrow placement="right" className="ms-2">
                  <IconButton
                    size="large"
                    edge="end"
                    onClick={() => roteryOpen()}
                    sx={{
                      color: "white",
                      padding: "0px",
                      // marginRight:"10px",
                      borderRadius: "8px",
                    }}
                  >
                      <GiRotaryPhone style={{ fontSize: 25 }} />
                    
                  </IconButton>
                </Tooltip>
              </Stack>

              <span className="border-top"></span>
              <Stack className="realdash">
                <Tooltip title="Dashboard" arrow placement="right">
                  <Link to="/dashboardrealtime">
                    <IconButton
                      size="large"
                      edge="end"
                      sx={{
                        color: "white",
                      width: "63px",
                      padding: "0px",
                      borderRadius: "8px",
                      }}
                    >
                      <DashboardIcon style={{ fontSize: 25 }} />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Stack>

              <span className="border-top" style={{ width: "78px" }}></span>
              {/* <Stack>
                <SquaresFour size={25} color="white" />
              </Stack>
              <span className="border-top"></span> */}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(SideBar);
