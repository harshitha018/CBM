import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
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
} from "@mui/material";
import {
  Alarm,
  ArrowsLeftRight,
  ArrowsOutSimple,
  ChatDots,
  DotsThree,
  EnvelopeSimple,
  List,
  Microphone,
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
      <Grid xs={12}>
        <Box
          className={`card dashboardMode ${
            props.darkMode ? "dark-mode" : "light-mode"
          } ms-1`}
          sx={{ height: "47vh", marginTop: "6px" }}
        >
          {!closeCard && (
            <Card
              className={` dashboardMode ${
                props.darkMode ? "dark-mode" : "light-mode"
              } `}
              sx={{ minWidth: 275 }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="body1"
                  className="ms-1"
                  sx={{ fontSize: 14 }}
                  gutterBottom
                >
                  <List size={16} />
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

              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <PhoneCall size={16} />
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    INTERACTIONS
                  </Typography>
                  <Pen size={16} />
                </Stack>

                <Stack direction="row">
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    {props.displayExtNum}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    {props.callStatus}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    {/* {moment(props.callActivity.createdDate).format('MMMM Do YYYY, h:mm:ss a')} */}
                    {moment(props.callActivity.createdDate).format(
                      "MMMM Do YYYY"
                    )}
                  </Typography>
                </Stack>
              </CardContent>

              <CardActions
                className={` dashboardMode ${
                  props.darkMode ? "dark-mode" : "light-mode"
                } `}
                sx={{
                  backgroundColor: "#ECEAEA",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" spacing={5.5} alignItems="center">
                  <Microphone size={16} />
                  <PhonePlus size={16} />
                  <UserPlus size={16} />
                  {/* <ArrowsLeftRight size={16} /> */}
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      handleinteractionTransfer();
                    }}
                  >
                    <ArrowsLeftRight size={20} />
                  </button>
                  <DotsThree size={25} />
                  <button
                    type="button"
                    className="btn btn-light"
                    // style={{
                    //   marginLeft: "115px",
                    // }}
                    onClick={() => endCall()}
                  >
                    <PhoneDisconnect size={16} color="red" />
                  </button>
                </Stack>
              </CardActions>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent
                  className="interactioncard_collapse"
                  sx={{
                    fontSize: "12px",
                    height: "70%",
                    overflowY: "scroll",
                    background: "whitesmoke",
                    zIndex: 999,
                    position: "relative",
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
            </Card>
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

          <Stack
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
          </Stack>
        </Box>
      </Grid>

      {/*interaction Transfer dialer */}
      {props.interactiontransferdialer && (
        <Box className="dialpad_main" sx={{zIndex: 9999}}>
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
                  console.log("TransferdialedNumber",props.dialedNumber)
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
})(InteractionCard);
