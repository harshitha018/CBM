import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
import {
  Button,
  Stack,
  Typography,
  Grid,
  Box,
  IconButton,
  Collapse,
  Tab,
  Tabs,
  TextField,
  List as ListIcon,
  Paper,
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CallEndRoundedIcon from "@mui/icons-material/CallEndRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  Alarm,
  ArrowsLeftRight,
  ArrowsOutSimple,
  ChatDots,
  DotsThree,
  EnvelopeSimple,
  Pen,
  PhoneCall,
  PhoneDisconnect,
  PhonePlus,
  User,
  UserPlus,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { connect } from "react-redux";
import { setDarkMode } from "../../../redux/actions/action";
import CustomButton from "../../../Component/shared-components/liveInteractionButton/Button";

const Buttontheme = createTheme({
  shape: {
    borderRadius: 8,
  },
});
const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
    displayExtNum: state.data.displayExtNum,
    callStatus: state.data.callStatus,
    callActivity: state.data.callActivity,
  };
};

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  "& .expandIcon": {
    transform: expand ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease-in-out", // Adjust animation duration as needed
  },
}));

const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const InteractionCard = (props) => {
  const {
    callActivity,
    interactiontransferdialer,
    setinteractiontransferdialer,
  } = props;

  const { endCall } = props;

  const [expanded, setExpanded] = useState(false);
  const [alarmTab, setAlarmTab] = useState(5);

  const [closeCard, setCloseCard] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleinteractionTransfer = () => {
    props.setinteractiontransferdialer(!interactiontransferdialer);
  };

  const CloseTransferDialpad = () => {
    props.setinteractiontransferdialer(false);
  };

  const handleDelete = () => {
    props.setDialedNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const handleNumberClick = (num) => {
    props.setDialedNumber((prevNumber) => prevNumber + num);
  };

  const handleClear = () => {
    props.setDialedNumber("");
  };

  const ChangeAlarmTab = (e, newValue) => {
    if (newValue === alarmTab) {
      setExpanded(false);
    } else {
      setAlarmTab(newValue);
      setCloseCard(true);
    }
  };

  const handleOpenCard = () => {
    setCloseCard(false);
    setAlarmTab(5);
  };

  return (
    <>
      <Paper elevation={10} sx={{marginRight:"5px"}}>       
        <div
          className={` ${
            props.darkMode ? "dark-mode" : "light-mode"
          } `}
          style={{ height: "52vh" }}
        >
          {!closeCard && (
            <Box
              className={` ${
                props.darkMode ? "dark-mode" : "light-mode"
              } `}
              sx={{ minWidth: 275 }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                marginX={2}
              >
                <Typography
                  variant="body1"
                  className="ms-1"
                  sx={{ fontSize: 14 }}
                  gutterBottom
                >
                  <ReorderIcon sx={{fontSize:16}} color="lightgray" />
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight:700}} gutterBottom>
                    Live interaction
                  </Typography>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ArrowsOutSimple size={16} />
                </ExpandMore>
              </Stack>
              {/* <Paper elevation={5}> */}
              <Box sx={{marginX:"15px", border:"0.5px solid lightgray", borderRadius:"10px"}}>
              <Box sx={{borderTopLeftRadius:"10%", borderTopRightRadius:"10%" , paddingX:"5px"}}>
                <Stack direction="row"  justifyContent="space-between" sx={{paddingTop:"4px"}}>
                <Stack direction="row" spacing={3}>
                  <Box sx={{display:'flex',alignItems:"center", justifyContent:"center"}}>
                  <Avatar alt="Remy Sharp" sx={{ width: 45, height: 45 }}><AccountCircleSharpIcon/></Avatar>
                  </Box>
                  <div>
                  <Typography  sx={{ fontSize: 17, fontWeight:500}} >Aarumugaselvan</Typography>
                  <Typography variant="caption"  sx={{ fontSize: 13}} display={"block"} >+91-8300756165</Typography>
                  <Typography variant="caption" sx={{ fontSize: 13}} display={"block"}>(Basic queue)</Typography>
                  </div>
                  <Box>
                  </Box>
                </Stack>
                <Stack direction="column-reverse" justifyContent="space-between"  alignItems="center" >
                  <Box>
                  <p style={{fontSize:"40px", paddingY:"0px",fontWeight:700,color:"#FC3D3D"}}>05:00</p>
                  </Box>
                  <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={1}
                >
                  <PhoneCall size={16} />
                  <Pen size={16} />
                </Stack>

                </Stack>
                </Stack>
                {/* <Stack>
                  <Box>
                  <Avatar alt="Remy Sharp" src={<AccountCircleSharpIcon/>} />
                  </Box>
                  <Box>

                  </Box>
                </Stack> */}

                {/* <Stack direction="row">
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    {props.displayExtNum}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    {props.callStatus}
                  </Typography>
                </Stack> */}
                {/* <Stack direction="row">
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    {/* {moment(props.callActivity.createdDate).format('MMMM Do YYYY, h:mm:ss a')} */}
                {/* {moment(props.callActivity.createdDate).format(
                      "MMMM Do YYYY"
                    )}
                  </Typography>
                </Stack> */}
              </Box>
              <Divider />
              <Box
                className={` dashboardMode ${
                  props.darkMode ? "dark-mode" : "light-mode"
                } `}
                sx={{
                  backgroundColor: "#F1F1F1",
                  border: "0.5px solid lightgray",
                  // borderTopColor: "lightgray",
                  display: "flex",
                  paddingY: "7px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
              <div className="flex justify-center items-center">
              <Stack   direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              // sx={{marginLeft:1}}
              >
                <CustomButton >
                  <KeyboardVoiceIcon sx={{fontSize:30}}/>
                </CustomButton>
                <CustomButton>
                  <PhonePausedIcon sx={{fontSize:30}}/>
                </CustomButton>
                <CustomButton>
                  <PersonAddAlt1Icon sx={{fontSize:30}}/>
                </CustomButton>
                  {/* <ArrowsLeftRight size={16} /> */}
                  <CustomButton
                    onClick={() => {
                      handleinteractionTransfer();
                    }}
                  >
                    <SyncAltIcon sx={{ fontSize: 30 }} />
                  </CustomButton>
                  <CustomButton>
                    <MoreVertIcon sx={{ fontSize: 30}} />
                  </CustomButton>
                  <ThemeProvider theme={Buttontheme}>
                    <CustomButton
                      backgroundColor="#FC3D3D"
                      borderRadius="100%"
                      onClick={() => endCall()}
                    >
                      <CallEndRoundedIcon
                        style={{ fill: "white", "&:hover": { color: "red" } }}
                        sx={{ fontSize: 30 }}
                      />
                    </CustomButton>
                  </ThemeProvider>
              </Stack>
              </div>
              </Box>
              </Box>
              {/* </Paper> */}
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent
                  className="interactioncard_collapse"
                  sx={{
                    fontSize: "12px",
                    height: "13vh",
                    overflowY: "scroll",
                    background: "whitesmoke",
                    zIndex: 999,
                    // position: "relative",
                  }}
                >
                  <Typography
                    paragraph
                    className={`dashboardMode ${
                      props.darkMode ? "dark-mode" : "light-mode"
                    } `}
                    sx={{ fontSize: "12px" }}
                  >
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                </CardContent>
              </Collapse>
            </Box>
          )}
     
          {/* Tabs content */}
          {alarmTab === 0 && (
            <>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Box m={1}>
                    <Typography variant="body1" sx={{ fontSize: "12px" }}>
                      Channel Name:
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "12px" }}>
                      Arrived call:
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "12px" }}>
                      Call attended by:
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "12px" }}>
                      Call attended by:
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "12px" }}>
                      Disposition:
                    </Typography>
                  </Box>
                </Grid>
                <Grid item p={1} sx={{ marginBottom: "70px" }}>
                  <X size={16} onClick={handleOpenCard} />
                </Grid>
              </Grid>
            </>
          )}
          {alarmTab === 1 && (
            <>
              <Grid alignItems="center" justifyContent="space-between">
                <Grid item p={1} sx={{ marginBottom: "70px" }}>
                  <X size={16} onClick={handleOpenCard} />
                </Grid>
              </Grid>
            </>
          )}
          {alarmTab === 2 && (
            <>
              <Grid alignItems="center" justifyContent="space-between">
                <Grid item p={1} sx={{ marginBottom: "70px" }}>
                  <X size={16} onClick={handleOpenCard} />
                </Grid>
              </Grid>
            </>
          )}
          {alarmTab === 3 && (
            <>
              <Grid alignItems="center" justifyContent="space-between">
                <Grid item p={1} sx={{ marginBottom: "70px" }}>
                  <X size={16} onClick={handleOpenCard} />
                </Grid>
              </Grid>
            </>
          )}

        {/* <Stack
            direction="row"
            display="flex"
            spacing={2.5}
            p={1}
            alignItems="center"
            sx={{ position: "absolute", bottom: 0, width: "100%" }}
          >
            <Tabs value={alarmTab} onChange={ChangeAlarmTab} aria-label="tabs"
              >
              <Tab
                className={`dashboardMode ${
                  props.darkMode ? "dark-mode" : "light-mode"
                } `}
                icon={<Alarm size={16} />}
              />
              <Tab
                className={` dashboardMode ${
                  props.darkMode ? "dark-mode" : "light-mode"
                } `}
                icon={<ChatDots size={16} />}
              />
              <Tab
                className={` dashboardMode ${
                  props.darkMode ? "dark-mode" : "light-mode"
                } `}
                icon={<EnvelopeSimple size={16} />}
              />
              <Tab
                className={` dashboardMode ${
                  props.darkMode ? "dark-mode" : "light-mode"
                } `}
                icon={<WhatsappLogo size={16} color="green" />}
              />
            </Tabs>
          </Stack> */}
        </div>
      {/*interaction Transfer dialer */}
      {props.interactiontransferdialer && (
        <Box className="dialpad_main" sx={{ zIndex: 999 }}>
          <Card className="dialpad-card" style={{ borderRadius: "10px" }}>
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
                  onClick={CloseTransferDialpad}
                >
                  <X size={20} />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} m={2}>
              <Button
                className="dialpad-btn"
                onClick={() => {
                  props.attendedTransfer();
                  handleinteractionTransfer();

                  localStorage.getItem(
                    "TransferdialedNumber",
                    props.dialedNumber
                  );
                  console.log("TransferdialedNumber", props.dialedNumber);
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
      </Paper>
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(InteractionCard);
