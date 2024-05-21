import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import {
  Stack,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Menu,
  MenuItem,
  Select,
  makeStyles,
  Popover,
  Card,
  Divider,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SearchIcon from "@mui/icons-material/Search";
import {
  ChatCircleDots,
  IntersectThree,
  PhoneOutgoing,
  DownloadSimple,
  ShareFat,
  PhoneDisconnect,
  Record,
  Play,
  Flag,
  WhatsappLogo,
  WarningCircle,
} from "@phosphor-icons/react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import { PiPhoneDisconnectFill } from "react-icons/pi";
import { FaShareAlt } from "react-icons/fa";
import { connect } from "react-redux";
import {
  setDarkMode,
  setOutgoingCall,
  setIncomingCallAccepted,
} from "../../../redux/actions/action";
import { Pause } from "@mui/icons-material";
import axios from "axios";
import { BaseUrl } from "../../Constant/BaseUrl";
import moment from "moment";

const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
  };
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const InteractionCard4 = (props) => {
  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];

  const userDetails = JSON.parse(localStorage.getItem("userinformation"));

  const [AgentSummaryTab, setAgentSummaryTab] = useState("Outbound");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pause1, setPause1] = useState(false);
  const [flag, setflag] = useState(false);
  const [audioStates, setAudioStates] = useState({});
  const [interaction, setInteraction] = useState([]);

  const [openOutboundFilter, setOpenOutboundFilter] = useState(false);
  const [OpenInboundFilter, setOpenInboundFilter] = useState(false);

  const [dispositionlist, setDispositionlist] = useState([]);
  const [dispositionReason, setDispositionReason] = useState("");
  const [fromdate, setFromdate] = useState(defaultValue);
  const [todate, setTodate] = useState(defaultValue);
  const [globalsearch, setGlobalsearch] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const OpenDialogOutbound = () => {
    setOpenOutboundFilter(true);
  };

  const CloseDialogOutbound = () => {
    setOpenOutboundFilter(false);
  };

  const OpenDialogInbound = () => {
    setOpenInboundFilter(true);
  };

  const CloseDialogInbound = () => {
    setOpenInboundFilter(false);
  };

  // INTERACTIONLIST API
  const interactionList = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/agent/agentinteraction/list?agentId=${userDetails[0].userId}`,
        {
          limit: 1000,
          offset: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      );
      console.log("LLLLLLLLLL", response.data.dataList);
      if (response.data.status === "OK") {
        setInteraction(response.data.dataList);
        console.log("response", response);
      }
    } catch (error) {
      console.error("Error fetching reason codes:", error);
    }
  };

  useEffect(() => {
    interactionList();
  }, []);

  const handelFlag = () => {
    setflag(!flag);
  };

  const handelPause1 = (item) => {
    const recording = item.recording;
    const id = item.id;

    const currentAudio = audioStates[id]?.audio;
    const currentPauseState = audioStates[id]?.pause;

    if (recording) {
      if (!currentAudio || currentAudio.src !== recording) {
        const newAudio = new Audio(recording);
        newAudio.play();
        setPause1(!pause1);
        setAudioStates({
          ...audioStates,
          [id]: { audio: newAudio, pause: true },
        });
      } else {
        if (currentPauseState) {
          currentAudio.play();
        } else {
          currentAudio.pause();
        }
        setAudioStates({
          ...audioStates,
          [id]: { ...audioStates[id], pause: !currentPauseState },
        });
      }
    }
  };

  const handleAgentTabChange = (event, newValue) => {
    setAgentSummaryTab(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // FILTER API
  const FilterApi = async () => {
    const startDate = fromdate
      ? `${fromdate}T00:00:00.000Z`
      : `${defaultValue}T00:00:00.000Z`;

    const endDate = todate
      ? `${todate}T23:59:59.999Z`
      : `${defaultValue}T23:59:59.999Z`;
    await axios
      .post(
        BaseUrl + "/agent/filter",
        {
          agentId: userDetails[0].userId,
          disposition: dispositionReason,
          startDate: startDate,
          endDate: endDate,
          direction: AgentSummaryTab,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      )
      .then((res) => {
        console.log("filterapiiiiiii", res);
        if (res.data.status == "OK") {
          setInteraction(res.data.dataList);
          setDispositionReason("");
          setFromdate(defaultValue);
          setTodate(defaultValue);
          CloseDialogOutbound();
          CloseDialogInbound();
        } else {
        }
      })
      .catch((err) => {
        "filterapiiiiiiierr", err;
      });
  };

  const handleReasonChange = (event) => {
    setDispositionReason(event.target.value);
  };

  // DISPOSITION API //
  const dispositionList = async () => {
    try {
      const response = await axios.post(
        BaseUrl + "/agent/userDisposition/list",
        { type: "skill" },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      );
      console.log(response.data.dataList);
      if (response.data.status === "OK") {
        setDispositionlist(response.data.dataList);
        console.log("responseeeeeeeeee", response);
      }
    } catch (error) {
      console.error("Error fetching reason codes:", error);
    }
  };

  useEffect(() => {
    dispositionList();
  }, []);

  // SEARCH API
  const globalSearchList = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/agent/global-search`,
        {
          agentId: userDetails[0].userId,
          query: globalsearch,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      );
      console.log("LLLLLLLLLL", response.data.dataList);
      if (response.data.status === "OK") {
        setInteraction(response.data.dataList);
        setResponseColor("yellow");
      } else if (globalsearch == "") {
        interactionList();
      }
    } catch (error) {
      console.error("Error fetching reason codes:", error);
    }
  };

  useEffect(() => {
    if (globalsearch.length > 2) {
      globalSearchList();
    }
  }, [globalsearch]);

  useEffect(() => {
    if (globalsearch == "") {
      interactionList();
    }
  }, [globalsearch]);

  return (
    <>
      <Grid xs={12}>
        <Box
          className={`card dashboardMode agentSummary  ms-1 mt-1 ${
            props.darkMode ? "dark-mode" : "light-mode"
          } ms-1 mt-1`}
          sx={{ height: "44vh" }}
        >
          <Tabs
            value={AgentSummaryTab}
            onChange={handleAgentTabChange}
            aria-label="tabs"
            variant="fullWidth"
          >
            <Tab label="Outbound" value="Outbound" />
            <Tab label="Inbound" value="Inbound" />
          </Tabs>

          <Box
            className="agentSummary ms-1 mt-1"
            sx={{ height: "44vh", overflow: "scroll" }}
            p={1}
          >
            {AgentSummaryTab === "Outbound" && (
              <>
                <Stack direction="row">
                  <IntersectThree size={20} />
                  <Typography
                    className="ms-2 mt-1"
                    color="primary"
                    sx={{ fontSize: 15 }}
                    gutterBottom
                  >
                    Agent Interaction Summary
                  </Typography>
                 

                  <Button
                    variant="contained"
                    aria-describedby={id}
                    onClick={handleClick}
                    sx={{
                      marginLeft: "49%",
                      marginRight: "10px",
                      fontSize: "10px",
                      height: "32px",
                    }}
                  >
                    FILTER
                  </Button>

                  <div>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      sx={{
                        "& .MuiPopover-paper": {
                          marginTop: "-10px", // Adjust this value to set the space between the popover and the button
                        },
                      }}
                    >
                      <Card sx={{ p: 2, backgroundColor: "#f4f4f5" }}>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                          id="alert-dialog-title"
                          color="primary"
                        >
                          Filter
                        </Typography>
                        <Divider
                          sx={{
                            borderColor: "black",
                            borderStyle: "solid",
                            marginY: 2,
                          }}
                        />
                        <div className="mb-1 d-flex flex-column text-start">
                          <label htmlFor="fromdate" className="form-label">
                            From
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id=""
                            aria-describedby="date"
                            value={fromdate}
                            onChange={(e) => setFromdate(e.target.value)}
                            max={defaultValue}
                          />
                        </div>
                        <div className="mb-3  d-flex flex-column text-start">
                          <label htmlFor="todate" className="form-label">
                            To
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id=""
                            aria-describedby="date"
                            onChange={(e) => setTodate(e.target.value)}
                            value={todate}
                            max={defaultValue}
                          />
                        </div>

                        <div
                          className="mb-3"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={{ fontSize: "15px" }}>
                              Disposition:
                            </Typography>
                            <Select
                              className="ms-3"
                              value={dispositionReason}
                              onChange={handleReasonChange}
                              style={{
                                height: "25px",
                                fontSize: "12px",
                              }}
                            >
                              {dispositionlist
                                ? dispositionlist.map((item) => (
                                    <MenuItem
                                      sx={{ fontSize: "12px" }}
                                      value={item.dispositionName}
                                      key={item.dispositionName}
                                    >
                                      {item.dispositionName}
                                    </MenuItem>
                                  ))
                                : ""}
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Button
                            // onClick={FilterApi}
                            variant="contained"
                            size="small"
                            style={{
                              fontSize: "10px",
                              width: "100%",
                              padding: "8px",
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      </Card>
                    </Popover>
                  </div>

                  <TextField
                    className="input-text"
                    variant="outlined"
                    size="small"
                    placeholder="Search Interaction details.."
                    onChange={(e) => setGlobalsearch(e.target.value)}
                    sx={{
                      marginLeft: "auto",
                      width: "30%",
                      marginRight: "8px",
                      fontSize: "10px",
                      height: "20px",
                      color: props.darkMode ? "white" : "black",
                    }}
                    InputProps={{
                      endAdornment: <SearchIcon fontSize="15px" />,
                    }}
                    inputProps={{
                      style: { fontSize: "12px" },
                    }}
                  />
                </Stack>
                <Box sx={{ width: "100vw" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Flag
                          </TableCell>

                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            ANI No
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          ></TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          ></TableCell>
                          {/* <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          ></TableCell> */}
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Caller Num
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Date
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Arrival Time
                          </TableCell>

                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Channel
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Call status
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Duration
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Disposition
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {interaction.map((item) => {
                          const connectedTime = item.connectedTime;
                          const disconnectedTime = item.disconnectedTime;

                          const diffInMilliseconds = moment(
                            disconnectedTime
                          ).diff(moment(connectedTime));
                          const duration = moment.duration(diffInMilliseconds);
                          const formatedDate = `${Math.floor(
                            duration.asMinutes()
                          )}.${Math.floor(duration.asSeconds()) / 10}mins`;

                          if (item.direction === "Outbound") {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                className={`dashboardMode ${
                                  props.darkMode ? "dark-mode" : "light-mode"
                                }`}
                                key={item.id} // Ensure each TableRow has a unique key
                              >
                                <>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    {flag ? (
                                      <Flag
                                        weight="bold"
                                        onClick={handelFlag}
                                      />
                                    ) : (
                                      <Flag
                                        weight="fill"
                                        color="red"
                                        onClick={handelFlag}
                                      />
                                    )}
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    {item.aniNumber}
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    <button
                                      onClick={() => {
                                        props.makeCall(item.callerNumber);
                                        // props.callActivitiesApi("Accept call", "Answered");
                                        props.setOutgoingCall(true);
                                        props.setIncomingCallAccepted(false);
                                      }}
                                      style={{
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <PhoneOutgoing size={15} color="blue" />
                                    </button>
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    <ChatCircleDots size={15} color="green" />
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    {item.callerNumber}
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    {moment(item.arrivalTime).format(
                                      "DD/MM/YY"
                                    )}
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    {moment(item.arrivalTime).format(
                                      "HH:MM:SS.sss"
                                    )}
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    {item.channel}
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    {item.callStatus}
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    {item.duration}
                                  </TableCell>
                                  <TableCell
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    {item.disposition}
                                  </TableCell>
                                  <TableCell
                                    sx={{ display: "flex" }}
                                    className={`dashboardMode ${
                                      props.darkMode
                                        ? "dark-mode"
                                        : "light-mode"
                                    }`}
                                  >
                                    <div>
                                      {item.recording && (
                                        <>
                                          {audioStates[item.id]?.pause ? (
                                            <Pause
                                              className="mx-1"
                                              onClick={() => handelPause1(item)}
                                              style={{
                                                fontSize: "15px",
                                                color: "#2091eb",
                                              }}
                                            />
                                          ) : (
                                            <PlayCircleIcon
                                              className="mx-1"
                                              onClick={() => handelPause1(item)}
                                              style={{
                                                fontSize: "15px",
                                                color: "#2091eb",
                                              }}
                                            />
                                          )}
                                        </>
                                      )}
                                      <DownloadIcon
                                        color="primary"
                                        style={{ fontSize: "16px" }}
                                        className="mx-1"
                                      />
                                      <FaShareAlt
                                        size={12}
                                        color="green"
                                        className="mx-1"
                                      />
                                      <PhoneDisconnect
                                        weight="fill"
                                        size={15}
                                        className="mx-1"
                                        color="red"
                                      />
                                    </div>
                                  </TableCell>
                                </>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    className={`dashboardMode ${
                      props.darkMode ? "dark-mode" : "light-mode"
                    }`}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </>
            )}
            {AgentSummaryTab === "Inbound" && (
              <>
                <Stack direction="row">
                  <IntersectThree size={20} />
                  <Typography
                    className="ms-2 mt-1"
                    color="primary"
                    sx={{ fontSize: 15 }}
                    gutterBottom
                  >
                    Agent Interaction Summary
                  </Typography>
                  <Button
                    variant="contained"
                    aria-describedby={id}
                    onClick={handleClick}
                    sx={{
                      marginLeft: "49%",
                      marginRight: "10px",
                      fontSize: "10px",
                      height: "32px",
                    }}
                  >
                    FILTER
                  </Button>
                  <div>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      sx={{
                        "& .MuiPopover-paper": {
                          marginTop: "-10px", // Adjust this value to set the space between the popover and the button
                        },
                      }}
                    >
                      <Card sx={{ p: 2, backgroundColor: "#f4f4f5" }}>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                          id="alert-dialog-title"
                          color="primary"
                        >
                          Filter
                        </Typography>
                        <Divider
                          sx={{
                            borderColor: "black",
                            borderStyle: "solid",
                            marginY: 2,
                          }}
                        />
                        <div className="mb-1 d-flex flex-column text-start">
                          <label htmlFor="fromdate" className="form-label">
                            From
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id=""
                            aria-describedby="date"
                            value={fromdate}
                            onChange={(e) => setFromdate(e.target.value)}
                            max={defaultValue}
                          />
                        </div>
                        <div className="mb-3  d-flex flex-column text-start">
                          <label htmlFor="todate" className="form-label">
                            To
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id=""
                            aria-describedby="date"
                            onChange={(e) => setTodate(e.target.value)}
                            value={todate}
                            max={defaultValue}
                          />
                        </div>

                        <div
                          className="mb-3"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={{ fontSize: "15px" }}>
                              Disposition:
                            </Typography>
                            <Select
                              className="ms-3"
                              value={dispositionReason}
                              onChange={handleReasonChange}
                              style={{
                                height: "25px",
                                fontSize: "12px",
                              }}
                            >
                              {dispositionlist
                                ? dispositionlist.map((item) => (
                                    <MenuItem
                                      sx={{ fontSize: "12px" }}
                                      value={item.dispositionName}
                                      key={item.dispositionName}
                                    >
                                      {item.dispositionName}
                                    </MenuItem>
                                  ))
                                : ""}
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Button
                            // onClick={FilterApi}
                            variant="contained"
                            size="small"
                            style={{
                              fontSize: "10px",
                              width: "100%",
                              padding: "8px",
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      </Card>
                    </Popover>
                  </div>
                  <TextField
                    className="input-text"
                    variant="outlined"
                    size="small"
                    placeholder="Search Interaction details.."
                    sx={{
                      marginLeft: "auto",
                      width: "30%",
                      marginRight: "8px",
                      fontSize: "10px",
                      height: "20px",
                      color: props.darkMode ? "white" : "black",
                    }}
                    InputProps={{
                      endAdornment: <SearchIcon fontSize="15px" />,
                    }}
                    inputProps={{
                      style: { fontSize: "12px" },
                    }}
                  />
                </Stack>
                <Box sx={{ width: "100vw" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Flag
                          </TableCell>

                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            ANI No
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          ></TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          ></TableCell>
                          {/* <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          ></TableCell> */}
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Caller Num
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Date
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Time
                          </TableCell>

                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Channel
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Call status
                          </TableCell>
                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Duration
                          </TableCell>

                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Disposition
                          </TableCell>

                          <TableCell
                            className={`dashboardMode ${
                              props.darkMode ? "dark-mode" : "light-mode"
                            }`}
                          >
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {interaction.map((item) => {
                          const connectedTime = item.connectedTime;
                          const disconnectedTime = item.disconnectedTime;

                          const diffInMilliseconds = moment(
                            disconnectedTime
                          ).diff(moment(connectedTime));
                          const duration = moment.duration(diffInMilliseconds);

                          const formatedDate = `${Math.floor(
                            duration.asMinutes()
                          )}.${Math.floor(duration.asSeconds()) / 10}mins`;

                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              className={`dashboardMode ${
                                props.darkMode ? "dark-mode" : "light-mode"
                              }`}
                            >
                              <>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  {flag ? (
                                    <Flag weight="bold" onClick={handelFlag} />
                                  ) : (
                                    <Flag
                                      weight="fill"
                                      color="red"
                                      onClick={handelFlag}
                                    />
                                  )}
                                </TableCell>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  {item.aniNumber}
                                </TableCell>

                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  <button
                                    onClick={() => {
                                      props.makeCall(item.callerNumber);
                                      props.callActivitiesApi(
                                        "Accept call",
                                        "Answered"
                                      );
                                      props.setOutgoingCall(true);
                                      props.setIncomingCallAccepted(false);
                                    }}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      padding: 0,
                                      cursor: "pointer",
                                    }}
                                  >
                                    <PhoneOutgoing size={15} color="blue" />
                                  </button>
                                </TableCell>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  <ChatCircleDots size={15} color="green" />
                                </TableCell>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  {item.callerNumber}
                                </TableCell>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  {moment(item.arrivalTime).format("DD/MM/YY")}
                                </TableCell>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  {moment(item.arrivalTime).format(
                                    "HH:MM:SS.sss"
                                  )}
                                </TableCell>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  {item.channel}
                                </TableCell>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  {item.callStatus}
                                </TableCell>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  {item.duration}
                                </TableCell>
                                <TableCell
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  {item.disposition}
                                </TableCell>
                                <TableCell
                                  sx={{ display: "flex" }}
                                  className={`dashboardMode ${
                                    props.darkMode ? "dark-mode" : "light-mode"
                                  }`}
                                >
                                  <div>
                                    {pause1 ? (
                                      <PlayCircleIcon
                                        className="mx-1"
                                        onClick={handelPause1}
                                        style={{
                                          fontSize: "15px",
                                          color: "#2091eb",
                                        }}
                                      />
                                    ) : (
                                      <Pause
                                        className="mx-1"
                                        onClick={handelPause1}
                                        style={{
                                          fontSize: "15px",
                                          color: "#2091eb",
                                        }}
                                      />
                                    )}
                                    <DownloadIcon
                                      color="primary"
                                      style={{ fontSize: "16px" }}
                                      className="mx-1"
                                    />
                                    <FaShareAlt
                                      size={12}
                                      color="green"
                                      className="mx-1"
                                    />
                                    <PhoneDisconnect
                                      weight="fill"
                                      size={15}
                                      className="mx-1"
                                      color="red"
                                    />
                                  </div>
                                </TableCell>
                              </>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    className={`dashboardMode ${
                      props.darkMode ? "dark-mode" : "light-mode"
                    }`}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Grid>

      {/* outbound filter */}
      <Dialog
        open={openOutboundFilter}
        onClose={CloseDialogOutbound}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="primary">
          Filter
        </DialogTitle>

        <DialogContent style={{ display: "flex", alignItems: "center" }}>
          <div className="mb-3 d-flex flex-column text-start">
            <label htmlFor="fromdate" className="form-label">
              From
            </label>
            <input
              type="date"
              className="form-control"
              id=""
              aria-describedby="date"
              value={fromdate}
              onChange={(e) => setFromdate(e.target.value)}
              max={defaultValue}
            />
          </div>
          <div className="mb-3 ms-4 d-flex flex-column text-start">
            <label htmlFor="todate" className="form-label">
              To
            </label>
            <input
              type="date"
              className="form-control"
              id=""
              aria-describedby="date"
              onChange={(e) => setTodate(e.target.value)}
              value={todate}
              max={defaultValue}
            />
          </div>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{
              marginTop: "-33px",
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "12px" }}>Disposition</Typography>
            <Select
              className="ms-3"
              value={dispositionReason}
              onChange={handleReasonChange}
              style={{
                height: "25px",
                fontSize: "12px",
              }}
            >
              {dispositionlist
                ? dispositionlist.map((item) => (
                    <MenuItem
                      sx={{ fontSize: "12px" }}
                      value={item.dispositionName}
                      key={item.dispositionName}
                    >
                      {item.dispositionName}
                    </MenuItem>
                  ))
                : ""}
            </Select>
          </div>

          <div>
            <Button
              onClick={FilterApi}
              variant="contained"
              size="small"
              style={{ fontSize: "10px" }}
            >
              Submit
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {/* Inbound filter */}

      <Dialog
        open={OpenInboundFilter}
        onClose={CloseDialogInbound}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="primary">
          Filter
        </DialogTitle>

        <DialogContent style={{ display: "flex", alignItems: "center" }}>
          <div className="mb-3 d-flex flex-column text-start">
            <label htmlFor="fromdate" className="form-label">
              From
            </label>
            <input
              type="date"
              className="form-control"
              id=""
              aria-describedby="date"
              value={fromdate}
              onChange={(e) => setFromdate(e.target.value)}
              max={defaultValue}
            />
          </div>
          <div className="mb-3 ms-4 d-flex flex-column text-start">
            <label htmlFor="todate" className="form-label">
              To
            </label>
            <input
              type="date"
              className="form-control"
              id=""
              aria-describedby="date"
              onChange={(e) => setTodate(e.target.value)}
              value={todate}
              max={defaultValue}
            />
          </div>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{
              marginTop: "-33px",
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "12px" }}>Disposition</Typography>
            <Select
              className="ms-3"
              value={dispositionReason}
              onChange={handleReasonChange}
              style={{
                height: "25px",
                fontSize: "12px",
              }}
            >
              {dispositionlist
                ? dispositionlist.map((item) => (
                    <MenuItem
                      sx={{ fontSize: "12px" }}
                      value={item.dispositionName}
                      key={item.dispositionName}
                    >
                      {item.dispositionName}
                    </MenuItem>
                  ))
                : ""}
            </Select>
          </div>

          <div>
            <Button
              onClick={FilterApi}
              variant="contained"
              size="small"
              style={{ fontSize: "10px" }}
            >
              Submit
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
  setOutgoingCall,
  setIncomingCallAccepted,
})(InteractionCard4);
