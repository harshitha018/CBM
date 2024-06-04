import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Button, Stack, Typography, Grid, Box } from "@mui/material";
import {
  BookOpenText,
  DotsThree,
  Info,
  PaintBrush,
} from "@phosphor-icons/react";
import { connect } from "react-redux";
import { setDarkMode } from "../../../redux/actions/action";

const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
  };
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
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
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const InteractionCard3 = (props) => {
  const {show, setShowInteractionCard3,onClick, text} = props

  const [selectedAssistTab, setSelectedAssistTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedAssistTab(newValue);
  };

  return (
    <>
      <Grid xs={4} >
        <Box
          className={`card dashboardMode ${
            props.darkMode ? "dark-mode" : "light-mode"
          } ms-1`}
          sx={{ height: "100vh", width:"64vh"}}
        >
          <Tabs
            value={selectedAssistTab}
            onChange={handleTabChange}
            aria-label="tabs"
            variant="fullWidth"
          >
            <Tab label="Smart Assist" />
            <Tab label="Agent Assist" />
          </Tabs>
          <Box className="smart_assist" sx={{ p: 2 }}>
            {selectedAssistTab === 0 && (
              <>
                <Stack direction="row">
                  <BookOpenText size={20} />
                  <Typography
                    className="ms-2"
                    color="primary"
                    sx={{ fontSize: 15 }}
                    gutterBottom
                  >
                    Knowledge article suggestions
                  </Typography>
                </Stack>
                <Card
                  className={` dashboardMode ${
                    props.darkMode ? "dark-mode" : "light-mode"
                  } mt-2`}
                  sx={{ minWidth: 275, height: "auto" }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="primary"
                        gutterBottom
                      >
                        Membership Tiers
                      </Typography>
                      <DotsThree size={25} />
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography component="div" sx={{ fontSize: 10 }}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum is simply dummy text
                        of the printing and typesetting industry. Lorem Ipsum is
                        simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry.
                      </Typography>
                      <PaintBrush size={65} />
                    </Stack>
                  </CardContent>
                  <CardActions
                    className={`dashboardMode ${
                      props.darkMode ? "dark-mode" : "light-mode"
                    }`}
                    sx={{
                      backgroundColor: "RGB(236 234 234)",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Info size={20} />

                      <Typography sx={{ fontSize: 11 }}>
                        94% conference
                      </Typography>
                      <Typography sx={{ fontSize: 11 }}>Received?</Typography>
                      <Grid>
                        <Button variant="text">
                          <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                        </Button>
                      </Grid>
                      <Grid>
                        <Button variant="text">
                          <Typography sx={{ fontSize: "12px", color: "red" }}>
                            No
                          </Typography>
                        </Button>
                      </Grid>
                    </Stack>
                  </CardActions>
                </Card>

                <Card className={` dashboardMode ${
                    props.darkMode ? "dark-mode" : "light-mode"
                  } mt-1`} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="primary"
                        gutterBottom
                      >
                        Membership Tiers
                      </Typography>
                      <DotsThree size={25} />
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        component="div"
                        sx={{ fontSize: 10 }}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </Typography>
                      <PaintBrush size={20} />
                    </Stack>
                  </CardContent>
                  <CardActions
                    className={`dashboardMode ${
                      props.darkMode ? "dark-mode" : "light-mode"
                    }`}
                    sx={{
                      backgroundColor: "RGB(236 234 234)",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Info size={20} />
                      <Typography sx={{ fontSize: 11 }}>
                        94% conference
                      </Typography>
                      <Typography sx={{ fontSize: 11 }}>Received?</Typography>
                      <Typography sx={{ fontSize: 11 }}>Yes</Typography>
                      <Typography sx={{ fontSize: 11 }}>No</Typography>
                    </Stack>
                  </CardActions>
                </Card>

                <Card className={` dashboardMode ${
                    props.darkMode ? "dark-mode" : "light-mode"
                  } mt-1`} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="primary"
                        gutterBottom
                      >
                        Membership Tiers
                      </Typography>
                      <DotsThree size={25} />
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        component="div"
                        sx={{ fontSize: 10 }}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </Typography>
                      <PaintBrush size={20} />
                    </Stack>
                  </CardContent>
                  <CardActions
                   className={`dashboardMode ${
                    props.darkMode ? "dark-mode" : "light-mode"
                  }`}
                    sx={{
                      backgroundColor: "RGB(236 234 234)",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Info size={20} />
                      <Typography sx={{ fontSize: 11 }}>
                        94% conference
                      </Typography>
                      <Typography sx={{ fontSize: 11 }}>Received?</Typography>
                      <Typography sx={{ fontSize: 11 }}>Yes</Typography>
                      <Typography sx={{ fontSize: 11 }}>No</Typography>
                    </Stack>
                  </CardActions>
                </Card>
              </>
            )}
            {selectedAssistTab === 1 && (
              <Typography variant="body1">
                This is the content of Agent Assist tab.
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(InteractionCard3);
