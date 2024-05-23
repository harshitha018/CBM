import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Badge, Button, IconButton, Stack } from "@mui/material";
import { SquaresFour } from "@phosphor-icons/react";
import Tooltip from "@mui/material/Tooltip";
import cbm_image from "../assests/cbm_assests/images/Inaipi_Logo-1.2.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setDarkMode } from "../redux/actions/action";
import HomeIcon from '@mui/icons-material/Home';
import {Phone} from "@phosphor-icons/react";

const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
  };
};

const SideBar = (props) => {
  const [activeIndex, setActiveIndex] = useState();

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

  return (
    // <AppBar position="static" color="" className={` sidebarMode ${
      <AppBar position="static" color="" className={` ${
      props.darkMode ? "dark-mode" : "#2ea55e"
    }`} >
      <Toolbar
        sx={{
          "@media screen and (min-width: 600px)": {
            padding: 0,
          },
          height: "100vh",
        }}
      
        // style={{background:"red"}}
      >
        <Stack
          alignItems={"center"}
          sx={{ height: "100%", width: "100%", marginTop: "0px",backgroundColor:"white" }}
          spacing={2}
        >
          <img
            src={cbm_image}
            alt="image"
            style={{
              marginTop: "4px",
              height: "60px",
              width: "60px",
              padding: "3px",
            }}
          />

          <Stack spacing={1.8} className="side_btn">
            <Stack className="">
              <Link>
                <Tooltip title="Dashboard" arrow placement="right-start">
                <IconButton>
                  <HomeIcon
                  sx={{ fontSize: 30, color:"lightgray"}}
                    onClick={() => handleIconClick(0)}
                    style={{
                      fill: activeIndex === 0 ? "lightgray" : "",
                    }}
                  />
              </IconButton>
                </Tooltip>
              </Link>
            </Stack>
            <span className="border-top"></span>
            {/* <Stack>
              <Link to="/sdk">
                <Tooltip title="sdk" arrow placement="right-start">
                <Button> 
                  <SquaresFour
                    size={28}
                    color="white"
                    onClick={() => handleIconClick(1)}
                    style={{
                      backgroundColor: activeIndex === 1 ? "#0000ff" : "lightgray",
                    }}
                  ></SquaresFour>
              </Button> 
                </Tooltip>
              </Link>
            </Stack>  */}
            <Stack>
            <Tooltip title="Missed Call" arrow placement="bottom">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  sx={{ color: "lightgray" }}
                  // onClick={toggleMissedCalls}
                >
                  <Badge badgeContent={4} color="error">
                    <Phone size={25} weight="fill" />
                  </Badge>
                </IconButton>
              </Tooltip>
              </Stack>

            {/* <span className="border-top"></span>
            <Stack className="">
              <SquaresFour size={25} color="white" />
            </Stack>
            <span className="border-top"></span>
            <Stack>
              <SquaresFour size={25} color="white" />
            </Stack>
            <span className="border-top"></span> */}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(SideBar);
