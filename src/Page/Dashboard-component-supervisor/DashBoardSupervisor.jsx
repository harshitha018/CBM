import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Button, Card } from "@mui/material";
import InteractionCard from "./InteractionCenter/InteractionCard.jsx";
import InteractionCard2 from "./InteractionCenter/InteractionCard2.jsx";
import InteractionCard3 from "./InteractionCenter/InteractionCard3.jsx";
import InteractionCard4 from "./InteractionCenter/InteractionCard4.jsx";
import InteractionCard5 from "./InteractionCenter/InteractionCard5.jsx";
import IncomingCallScreen from "../../Component/DialerComponent/IncomingCallScreen.jsx";
import AnswerCallScreen from "../../Component/DialerComponent/AnswerCallScreen.js";
import Drawer from "@mui/material/Drawer";
import { connect } from "react-redux";
import {
  setDarkMode,
  setIncomingCall,
  setIncomingCallAccepted,
  setIncomingCallReject,
} from "../../redux/actions/action.js";
import { AndroidLogo } from "@phosphor-icons/react";

const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
    incomingCall: state.data.incomingCall,
    incomingCallAccepted: state.data.incomingCallAccepted,
    incomingCallReject: state.data.incomingCallReject,
  };
};

const DashBoardSupervisor = (props) => {
  const [showInteractionCard3, setShowInteractionCard3] = useState(false); // State to manage InteractionCard3 visibility
  const [open, setOpen] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  const handleDragStart = (event, info) => {
    setDragStartPos({ x: info.point.x, y: info.point.y });
  };

  const toggleInteractionCard3 = () => {
    setShowInteractionCard3((prevState) => !prevState);
  };

  const {
    acceptCall,
    makeCall,
    endCall,
    // pauseAudio,
    // startAudio,
    reset,
    blindTransfer,
    attendedTransfer,
    delegate,
    setDialedNumber,
    dialedNumber,
    handleExtensionChange,
    Opentransferdialer,
    OpenConferencedialer,
    OpenSmallscreenDialer,
    setOpentransferdialer,
    setOpenConferencedialer,
    setOpenSmallscreenDialer,
  } = props;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box p={1} sx={{ zIndex: 0 }}>
      <Grid container spacing={0.5} direction={"row"}>
        <Grid xs={9}>
          <Grid container spacing={0.5} direction={"column"}>
            <InteractionCard />
            <InteractionCard4 />
          </Grid>
        </Grid>
        <Grid xs={3}>
          <InteractionCard2 />
        </Grid>

        {props.incomingCall && (
          <IncomingCallScreen acceptCall={acceptCall} endCall={endCall} />
        )}

        <AnswerCallScreen
          makeCall={makeCall}
          // pauseAudio={pauseAudio}
          reset={reset}
          // startAudio={startAudio}
          endCall={endCall}
          blindTransfer={blindTransfer}
          attendedTransfer={attendedTransfer}
          delegate={delegate}
          dialedNumber={dialedNumber}
          setDialedNumber={setDialedNumber}
          handleExtensionChange={handleExtensionChange}
          Opentransferdialer={Opentransferdialer}
          setOpentransferdialer={setOpentransferdialer}
          OpenConferencedialer={OpenConferencedialer}
          setOpenConferencedialer={setOpenConferencedialer}
          OpenSmallscreenDialer={OpenSmallscreenDialer}
          setOpenSmallscreenDialer={setOpenSmallscreenDialer}
        />

        <Button
          sx={{ position: "fixed", top: "50%", right: 0, zIndex: 999 }}
          onClick={toggleDrawer(true)}
        >
          <AndroidLogo size={32} />
        </Button>
      </Grid>

      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <Box sx={{ width: 400 }} role="presentation">
          <InteractionCard3 show={showInteractionCard3} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
  setIncomingCall,
  setIncomingCallAccepted,
  setIncomingCallReject,
})(DashBoardSupervisor);
