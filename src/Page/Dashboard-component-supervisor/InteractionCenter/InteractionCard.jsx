import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";

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
  const [expanded, setExpanded] = useState(false);
  const [alarmTab, setAlarmTab] = useState(5);

  const [closeCard, setCloseCard] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          sx={{ height: "44vh", marginTop: "4px" }}
        >
          {!closeCard && (
            <Card
              className={` dashboardMode ${
                props.darkMode ? "dark-mode" : "light-mode"
              } `}
              sx={{ minWidth: 275
             }}
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
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    CONNECTED
                  </Typography>
                  <User size={16} />
                </Stack>
                <Stack direction="row">
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    +109724023790
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    BasicQueue
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography component="div" sx={{ fontSize: 10 }}>
                    1:43
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
                <Stack direction="row" spacing={6.4} alignItems="center">
                  <Microphone size={16} />
                  <PhonePlus size={16} />
                  <UserPlus size={16} />
                  <ArrowsLeftRight size={16} />
                  <DotsThree size={25} />
                  <PhoneDisconnect size={16} />
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
            spacing={5}
            p={1}
            alignItems="center"
            sx={{ position: "absolute", bottom: 0 }}
          >
            <Tabs value={alarmTab} onChange={ChangeAlarmTab} aria-label="tabs">
              <Tab className={` dashboardMode ${
            props.darkMode ? "dark-mode" : "light-mode"
          } `}  icon={<Alarm size={16} />} />
              <Tab className={` dashboardMode ${
            props.darkMode ? "dark-mode" : "light-mode"
          } `}  icon={<ChatDots size={16} />} />
              <Tab className={` dashboardMode ${
            props.darkMode ? "dark-mode" : "light-mode"
          } `}  icon={<EnvelopeSimple size={16} />} />
              <Tab className={` dashboardMode ${
            props.darkMode ? "dark-mode" : "light-mode"
          } `}  icon={<WhatsappLogo size={16} color="green" />} />
            </Tabs>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(InteractionCard);
