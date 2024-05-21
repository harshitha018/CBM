import React, { useEffect, useState } from "react";
import { styled, alpha, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import photo from "../assests/cbm_assests/assets2/images/47.png";
import { MdDialpad } from "react-icons/md";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./navbar.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Modal from "@mui/joy/Modal";
import {
  BookOpenText,
  ChatDots,
  MagnifyingGlass,
  Phone,
  Power,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import CloseIcon from "@mui/icons-material/Close";
import { GiRotaryPhone } from "react-icons/gi";
import { Card, CardContent, Grid, Stack, Table, TableHead, TableRow, TableCell, TableBody,  TextField, Tooltip } from "@mui/material";
import Switch from "@mui/material/Switch";
import { connect } from "react-redux";
import {
  setDarkMode,
  setAnswerScreen,
  setOutgoingCall,
  setIncomingCallAccepted,
  setChangestatus,
  setOpensurvey,
} from "../redux/actions/action";
import { color } from "framer-motion";
import AnswerCallScreen from "./DialerComponent/AnswerCallScreen";
import moment from "moment";
import axios from "axios";
import { BaseUrl } from "../Page/Constant/BaseUrl";
import MissedcallComp from "./MissedcallComp";

const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
    answerScreen: state.data.answerScreen,
    OutgoingCall: state.data.OutgoingCall,
    status: state.data.status,
    opensurvey: state.data.opensurvey,
  };
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const NavBar = (props) => {
  const userDetails = JSON.parse(localStorage.getItem("userinformation"));
  // console.log('userDetails',userDetails)
  const { OpenMakecalldialer, setOpenMakecalldialer } = props;
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [personDetails, setpersonDetails] = useState(false);
  const [powerDetails, setpowerDetails] = useState(false);
  const [showWhatsappNotification, setshowWhatsappNotification] =
    useState(false);
  const [showWhatsapp, setshowWhatsapp] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showMissedcalls, setShowMissedcalls] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [showExtraDropdown, setShowExtraDropdown] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);

  const [startTime, setStartTime] = useState(null); // Initialize startTime as null
  const [elapsedTime, setElapsedTime] = useState(0);

  const [statuslist, setStatuslist] = useState([]);
  const [openRotary, setOpenRotary] = useState(false);
  const [currentTimeforReady, setCurrentTimeforReady] = useState(
    moment().startOf("day")
  );
  const [currentTimeforBreak, setCurrentTimeforBreak] = useState(
    moment().startOf("day")
  );

  const roteryOpen = () => {
    console.log("cliclkedddd", openRotary);
    setOpenRotary(true);
    console.log("cliclkeddddafter", openRotary);
  };

  const reasoncodeList = async () => {
    try {
      const response = await axios.post(
        BaseUrl + "/agent/userStatus/list",
        { type: "skill" },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      );
      console.log(response.data.status);
      if (response.data.status === "OK") {
        setStatuslist(response.data.dataList);
      }
    } catch (error) {
      console.error("Error fetching reason codes:", error);
    }
  };

  const handelUpdateStatus = async (item) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/agent/updateStatus?agentId=${userDetails[0].userId}&status=${item}`,

        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      );
      console.log(response.data.status);
      if (response.data.status === "OK") {
        props.setChangestatus(response.data.data.status);
      }
    } catch (error) {
      console.error("Error fetching reason codes:", error);
    }
  };

  useEffect(() => {
    let intervalIdReady, intervalIdBreak;

    // Reset timers when status changes
    setCurrentTimeforReady(moment().startOf("day")); // Reset 'Ready' timer
    setCurrentTimeforBreak(moment().startOf("day")); // Reset 'Break' timer

    // Start the timer for 'Ready' status
    if (props.status === "Ready") {
      intervalIdReady = setInterval(() => {
        setCurrentTimeforReady((prevTime) => prevTime.add(1, "second"));
      }, 1000);
    } else {
      clearInterval(intervalIdReady); // Pause the 'Ready' timer
    }

    // Start the timer for other statuses
    if (props.status !== "Ready" && statuslist && statuslist.length > 0) {
      intervalIdBreak = setInterval(() => {
        setCurrentTimeforBreak((prevTime) => prevTime.add(1, "second"));
      }, 1000);
    } else {
      clearInterval(intervalIdBreak); // Pause the timer for other statuses
    }

    // Cleanup function to clear intervals
    return () => {
      clearInterval(intervalIdReady);
      clearInterval(intervalIdBreak);
    };
  }, [props.status]);

  const formattedTimeforReady = currentTimeforReady.format("HH:mm:ss");
  const formattedTimeforBreak = currentTimeforBreak.format("HH:mm:ss");

  useEffect(() => {
    reasoncodeList();
  }, []);

  // const formattedTimeforReady = currentTimeforReady.format("HH:mm:ss");
  // const formattedTimeforBreak = currentTimeforBreak.format("HH:mm:ss");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmenuClick = (event) => {
    console.log(event);
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  const handleStatusChange = (item) => {
    console.log("item", item);
    props.setChangestatus(item);
  };

  const handleMode = () => {
    props.setDarkMode(!props.darkMode);
  };

  const isMenuOpen = Boolean(personDetails);
  const isPowerDetailsOpen = Boolean(powerDetails);

  const handleProfileMenuOpen = (e) => {
    setpersonDetails(e.currentTarget);
  };

  const handleMenuClose = () => {
    setpersonDetails(false);
  };

  const handlePowerDetailsOpen = (e) => {
    setpowerDetails(e.currentTarget);
  };

  const handlePowerDetailClose = () => {
    setpowerDetails(false);
    handleMenuClose();
  };

  const toggleWhatsappNotify = () => {
    setshowWhatsapp(!showWhatsapp);
  };

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  const toggleMissedCalls = () => {
    setShowMissedcalls(!showMissedcalls);
  };

  const toggleEmailNotification = () => {
    setShowEmailNotification(!showEmailNotification);
  };

  const toggleSurveyNotification = () => {
    props.setOpensurvey(!props.opensurvey);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const makecallDialpad = () => {
    props.setOpenMakecalldialer(!props.OpenMakecalldialer);
    props.setDialedNumber("");
  };

  const handleMakeCall = () => {
    if (props.dialedNumber.trim() === "") {
      openWarningSnackbar();
      console.log("Please enter a number before making a call.");
      return;
    }
    props.makeCall(props.dialedNumber);
    props.setIncomingCallAccepted(false);
    props.setOutgoingCall(true);
    props.setOpenMakecalldialer(false);
  };

  const openWarningSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleNumberClick = (num) => {
    props.setDialedNumber((prevNumber) => prevNumber + num);
  };

  const handleClear = () => {
    props.setDialedNumber("");
  };

  const handleDelete = () => {
    props.setDialedNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const menuId = "primary-search-account-menu";
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
            // backgroundColor: "#1e40af",
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
  const powerDetailId = "primary-search-account-menu-mobile";
  const renderPowerDetails = (
    <Menu
      personDetails={powerDetails}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={powerDetailId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isPowerDetailsOpen}
      onClose={handlePowerDetailClose}
    >
      <MenuItem onClick={handlePowerDetailClose}>Logout</MenuItem>
      <MenuItem onClick={handlePowerDetailClose}>Reset Password</MenuItem>
      <MenuItem onClick={handlePowerDetailClose}>Update Profile</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            className={`sidebarMode ${
              props.darkMode ? "dark-mode" : "#2ea55e"
            }`}
          >
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} onClick={handleMode} />}
            />

            <Search sx={{ color: "white" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <div className="dropdown mx-2">
              <button
                className="btn btn-light dropdown-toggle campine-dropdwn"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  height: "37px",
                  fontSize: "10px",
                  borderRadius: "8px",
                }}
              >
                <span style={{ fontSize: "12px" }}>Campaign</span>
              </button>
 
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    Inbound
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Outbound
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="card navbarCard"
              style={{ height: "37px", borderRadius: "8px" }}
            >
              <div className="card-body">
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ marginTop: "-12px" }}
                >
                  <div>
                    {/* Status */}
                    <Button
                      aria-controls="dropdown-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      variant="contained"
                      size="small"
                      sx={{
                        fontSize: "6px",
                        borderRadius: "8px",
                        width: "auto",
                        height: "20px",
                      }}
                      color={props.status == "Ready" ? "success" : "error"}
                    >
                      {props.status}
                    </Button>
 
                    <Menu
                      id="dropdown-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "dropdown-button",
                      }}
                    >
                      {props.status !== "Ready" && (
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            handelUpdateStatus("Ready");
                          }}
                        >
                          {/* ready */}
                          <div className="d-flex w-100 justify-content-between">
                            <div
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Ready
                            </div>
                            <div
                              className="my-auto mx-2"
                              style={{
                                height: "8px",
                                width: "8px",
                                borderRadius: "50%",
                                backgroundColor: "green",
                              }}
                            ></div>
                          </div>
                        </MenuItem>
                      )}
                      {/* <MenuItem
                        onClick={() => {
                          handleClose();
                          handelUpdateStatus("Ready");
                        }}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <div style={{fontSize:'9px',fontWeight:'bold'}}>Ready</div>
                          <div
                            className="my-auto mx-2"
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "50%",
                              backgroundColor: "green",
                            }}
                          ></div>
                        </div>
                      </MenuItem> */}
                      {/* <MenuItem
                        onClick={() => {
                          handleClose();
                          handelUpdateStatus("Not Ready");
                        }}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <div>Not Ready</div>
                          <div
                            className="my-auto"
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "50%",
                              backgroundColor: "red",
                            }}
                          ></div>
                        </div>
                      </MenuItem> */}
                      {/* <MenuItem onClick={handleSubmenuClick}>
                        Not Ready (Reason)
                      </MenuItem> */}
                      {props.status !== "Not Ready" && (
                        <MenuItem onClick={handleSubmenuClick}>
                          <div className="d-flex w-100 justify-content-between">
                            <div
                              style={{ fontSize: "11px", fontWeight: "bold" }}
                            >
                              Not Ready
                            </div>
                            <div
                              className="my-auto mx-2"
                              style={{
                                height: "8px",
                                width: "8px",
                                borderRadius: "50%",
                                backgroundColor: "red",
                              }}
                            ></div>
                          </div>
                        </MenuItem>
                      )}
                    </Menu>
 
                    <Menu
                      id="submenu"
                      anchorEl={submenuAnchorEl}
                      open={Boolean(submenuAnchorEl)}
                      onClose={handleSubmenuClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {statuslist.map((item) => {
                        return (
                          <MenuItem
                            sx={{ width: "18vw" }}
                            onClick={() => {
                              handleSubmenuClose();
                              handelUpdateStatus(item.statusName);
                              handleClose();
                            }}
                          >
                            <div className="d-flex w-100 justify-content-between">
                              <div
                                style={{ fontSize: "11px", fontWeight: "bold" }}
                              >
                                {item.statusName}
                              </div>
                              <div
                                className="my-auto"
                                style={{
                                  height: "8px",
                                  width: "8px",
                                  borderRadius: "50%",
                                  backgroundColor: "red",
                                }}
                              ></div>
                            </div>
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </div>
 
                  <span
                    className="mx-2"
                    style={{
                      color: "black",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {props.status == "Ready" && (
                      <span>{formattedTimeforReady}</span>
                    )}
                    {props.status !== "Ready" && (
                      <span>{formattedTimeforBreak}</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Box
              className="card mx-2"
              sx={{ height: "37px", borderRadius: "8px" }}
            >
              <Stack direction="row" alignItems="center">
                <Box>
                  <img
                    src={photo}
                    alt=""
                    style={{ width: "40px", height: "35px", marginTop: "-7px" }}
                  />
                </Box>
                <Box className="ms-3">
                  <Stack direction="column" className="mx-2">
                    <Typography
                      variant="caption"
                      className="d-inline-block text-truncate"
                      sx={{
                        fontSize: "12px",
                        color: "black !important",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100px",
                        marginTop: "0px",
                        fontWeight: "bold",
                      }}
                    >
                      {userDetails[0].firstName + " " + userDetails[0].lastName}
                    </Typography>
                    <Typography
                      variant="caption"
                      gutterBottom
                      sx={{
                        fontSize: "11px",
                        color: "black",
                        marginLeft: "1px",
                      }}
                    >
                      Ext Number
                    </Typography>
                    {/* <Typography variant="body2">10:20</Typography> */}
                  </Stack>
                </Box>
              </Stack>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Box className="me-2" sx={{ marginTop: "10px" }}>
                <MdDialpad
                  className="icon"
                  size={20}
                  color="white"
                  onClick={makecallDialpad}
                />
              </Box>

              <Tooltip title="Whatsapp" arrow placement="bottom">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  sx={{ color: "white" }}
                  onClick={toggleWhatsappNotify}
                >
                  <Badge badgeContent={4} color="error">
                    <WhatsappLogo size={25} weight="fill" />
                  </Badge>
                </IconButton>
              </Tooltip>

              {showWhatsapp && (
                <Box className="Whatsappnotification_toggle">
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      className="ms-2 mt-3"
                      color="black"
                      sx={{ fontSize: 15 }}
                      gutterBottom
                    >
                      Whatsapp Notification
                    </Typography>

                    <Typography
                      className="ms-2 "
                      color="black"
                      sx={{ fontSize: 13 }}
                      gutterBottom
                      onClick={toggleWhatsappNotify}
                    >
                      <X size={16} />
                    </Typography>
                    {!showWhatsapp && (
                      <Typography
                        className="ms-2 mt-1"
                        color="primary"
                        sx={{ fontSize: 12 }}
                        gutterBottom
                      >
                        No Whatsapp Notification to display
                      </Typography>
                    )}
                  </Grid>
                </Box>
              )}

              <Tooltip title="Message" arrow placement="bottom">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  sx={{ color: "white" }}
                  onClick={toggleMessages}
                >
                  <Badge badgeContent={4} color="error">
                    <ChatDots size={25} weight="fill" />
                  </Badge>
                </IconButton>
              </Tooltip>
              {showMessages && (
                <Box className="Interaction_toggle">
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      className="ms-2 mt-3"
                      color="black"
                      sx={{ fontSize: 15 }}
                      gutterBottom
                    >
                      Interactions
                    </Typography>

                    <Typography
                      className="ms-2"
                      color="black"
                      sx={{ fontSize: 13 }}
                      gutterBottom
                      onClick={toggleMessages}
                    >
                      <X size={16} />
                    </Typography>
                    {!showMessages && (
                      <Typography
                        className="ms-2 mt-1"
                        color="primary"
                        sx={{ fontSize: 12 }}
                        gutterBottom
                      >
                        No Messages to display
                      </Typography>
                    )}
                  </Grid>
                </Box>
              )}

              <Tooltip title="Missed Call" arrow placement="bottom">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  sx={{ color: "white" }}
                  onClick={toggleMissedCalls}
                >
                  <Badge badgeContent={4} color="error">
                    <Phone size={25} weight="fill" />
                  </Badge>
                </IconButton>
              </Tooltip>

              {showMissedcalls && (
                <Box className="MissedCalls_toggle" sx={{ zIndex: 0 }}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      className="ms-2 mt-3"
                      color="black"
                      sx={{ fontSize: 15 }}
                      gutterBottom
                    >
                      Missed Calls
                    </Typography>

                    <Typography
                      className="ms-2 "
                      color="black"
                      sx={{ fontSize: 13 }}
                      gutterBottom
                      onClick={toggleMissedCalls}
                    >
                      <X size={16} />
                    </Typography>
                    <MissedcallComp />

                    {!showMissedcalls && (
                      <Typography
                        className="ms-2 mt-1"
                        color="primary"
                        sx={{ fontSize: 12 }}
                        gutterBottom
                      >
                        No Missed Calls to display
                      </Typography>
                    )}
                  </Grid>
                </Box>
              )}

              {props.opensurvey && (
                <Box className="MissedCalls_toggle" sx={{ zIndex: 0 }}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      className="ms-2 mt-3"
                      color="black"
                      sx={{ fontSize: 15 }}
                      gutterBottom
                    >
                      Survey
                    </Typography>

                    <Typography
                      className="ms-2 "
                      color="black"
                      sx={{ fontSize: 13 }}
                      gutterBottom
                      onClick={toggleSurveyNotification}
                    >
                      <X size={16} />
                    </Typography>
                    <MissedcallComp />
                  </Grid>
                </Box>
              )}

              <Tooltip title="Email" arrow placement="bottom">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  sx={{ color: "white" }}
                  onClick={toggleEmailNotification}
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {showEmailNotification && (
                <Box className="Email_toggle">
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      className="ms-2 mt-3"
                      color="black"
                      sx={{ fontSize: 15 }}
                      gutterBottom
                    >
                      Email Notifications
                    </Typography>

                    <Typography
                      className="ms-2 "
                      color="black"
                      sx={{ fontSize: 13 }}
                      gutterBottom
                      onClick={toggleEmailNotification}
                    >
                      <X size={16} />
                    </Typography>
                    {!showEmailNotification && (
                      <Typography
                        className="ms-2 mt-1"
                        color="primary"
                        sx={{ fontSize: 12 }}
                        gutterBottom
                      >
                        No Email notifications to display
                      </Typography>
                    )}
                  </Grid>
                </Box>
              )}

              <Tooltip title="Notification" arrow placement="bottom">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  sx={{ color: "white" }}
                  onClick={toggleNotification}
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {showNotification && (
                <Box className="notification_toggle">
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      className="ms-2 mt-3"
                      color="black"
                      sx={{ fontSize: 15 }}
                      gutterBottom
                    >
                      Notifications
                    </Typography>

                    <Typography
                      className="ms-2 "
                      color="black"
                      sx={{ fontSize: 13 }}
                      gutterBottom
                      onClick={toggleNotification}
                    >
                      <X size={16} />
                    </Typography>
                    {!showNotification && (
                      <Typography
                        className="ms-2 mt-1"
                        color="primary"
                        sx={{ fontSize: 12 }}
                        gutterBottom
                      >
                        No notifications to display
                      </Typography>
                    )}
                  </Grid>
                </Box>
              )}
              <Tooltip title="Rotary phone" arrow placement="bottom">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="show 17 new notifications"
                  onClick={() => roteryOpen()}
                  sx={{ color: "white" }}
                >
                  <Badge badgeContent={17} color="error">
                    <GiRotaryPhone />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Power" arrow placement="bottom">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={powerDetailId}
                  aria-haspopup="true"
                  onClick={handlePowerDetailsOpen}
                  style={{ color: "white" }}
                >
                  <Power size={25} />
                </IconButton>
              </Tooltip>
            </Box>
            {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box> */}
          </Toolbar>
        </AppBar>

        {renderPowerDetails}
        {renderMenu}
      </Box>

      {/* Makecall dialer pad */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="warning"
        >
          Please enter a number before making a call.
        </MuiAlert>
      </Snackbar>

      {props.OpenMakecalldialer && (
        <Box className="dialpadNavbar_main">
          <Card className="dialpadNavbar-card" style={{ borderRadius: "10px" }}>
            <TextField
              value={props.dialedNumber}
              onChange={props.handleExtensionChange}
              style={{ width: "18rem" }}
              className="p-2"
            />
            <Grid
              container
              spacing={1}
              className="p-2"
              style={{ marginLeft: "8px" }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
                <Grid key={num} item xs={4} p={1}>
                  <Button
                    className="dialpad-btn"
                    style={{ color: "black" }}
                    onClick={() => handleNumberClick(num)}
                  >
                    {num}
                  </Button>
                </Grid>
              ))}
              <Grid item xs={4}>
                <Button
                  className="dialpad-btn"
                  onClick={handleClear}
                  style={{ color: "orange" }}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  className="dialpad-btn"
                  onClick={handleDelete}
                  style={{ color: "red" }}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  className="dialpad-btn"
                  style={{ color: "black" }}
                  onClick={makecallDialpad}
                >
                  <X size={20} />
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} m={2}>
              <Button
                className="dialpad-btn"
                onClick={() => {
                  handleMakeCall();
                  localStorage.setItem("dialedNumber", props.dialedNumber);
                }}
                style={{ color: "white", background: "green" }}
                fullWidth
              >
                Call
              </Button>
            </Grid>
          </Card>
        </Box>
      )}
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
  setAnswerScreen,
  setOutgoingCall,
  setIncomingCallAccepted,
  setChangestatus,
  setOpensurvey,
})(NavBar);
