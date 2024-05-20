import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Stack } from "@mui/material";
import { SquaresFour } from "@phosphor-icons/react";
import Tooltip from "@mui/material/Tooltip";
import cbm_image from "../assests/cbm_assests/images/Inaipi_Logo-1.2.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setDarkMode } from "../redux/actions/action";

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
    <AppBar position="static" color="">
      <Toolbar
        sx={{
          "@media screen and (min-width: 600px)": {
            padding: 0,
          },
          height: "100vh",
        }}
        className={`sidebarMode ${props.darkMode ? "dark-mode" : "#2ea55e"}`}
      >
        <Stack
          alignItems={"center"}
          sx={{ height: "100%", width: "100%", marginTop: "0px" }}
          spacing={2}
        >
          <img
            src={cbm_image}
            alt="image"
            style={{
              marginTop: "4px",
              height: "41px",
              width: "43px",
              padding: "3px",
            }}
          />

          <Stack spacing={1.8} className="">
            <Stack className="">
              <Link>
                <Tooltip title="Dashboard" arrow placement="right-start">
                  <SquaresFour
                    size={25}
                    color="white"
                    onClick={() => handleIconClick(0)}
                    style={{
                      backgroundColor: activeIndex === 0 ? "#0000ff" : "",
                    }}
                  ></SquaresFour>
                </Tooltip>
              </Link>
            </Stack>
            <span className="border-top"></span>
            <Stack>
              <Link to="/sdk">
                <Tooltip title="sdk" arrow placement="right-start">
                  <SquaresFour
                    size={25}
                    color="white"
                    onClick={() => handleIconClick(1)}
                    style={{
                      backgroundColor: activeIndex === 1 ? "#0000ff" : "",
                    }}
                  ></SquaresFour>
                </Tooltip>
              </Link>
            </Stack>

            <span className="border-top"></span>
            <Stack className="">
              <SquaresFour size={25} color="white" />
            </Stack>
            <span className="border-top"></span>
            <Stack>
              <SquaresFour size={25} color="white" />
            </Stack>
            <span className="border-top"></span>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(SideBar);
