import React, { useState } from "react";
import { Grid, Box, Button, Card, Stack, Paper } from "@mui/material";
import InteractionCard from "./InteractionCenter/InteractionCard";
import InteractionCard2 from "./InteractionCenter/InteractionCard2";
import InteractionCard3 from "./InteractionCenter/InteractionCard3";
import InteractionCard4 from "./InteractionCenter/InteractionCard4";
import InteractionCard5 from "./InteractionCenter/InteractionCard5";
import IncomingCallScreen from "../../Component/DialerComponent/IncomingCallScreen";
import AnswerCallScreen from "../../Component/DialerComponent/AnswerCallScreen";
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

const DashBoard = (props) => {
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
    callActivitiesApi,
    makeCall,
    endCall,
    muteUnmute,
    holdUnhold,
    transferCallApi,
    ConferenceCallApi,
    muteBrowserAudio,
    callActivity,
    toggleMute,
    endCallTransfer,
    holdCall,
    unholdCall,
    handleMuteplay,
    handleMutepause,
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
    interactiontransferdialer,
    setinteractiontransferdialer,
    isTransferInitiated,
    setIsTransferInitiated,
  } = props;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box p={1} sx={{ zIndex: 0 }}>
      <Grid container >
        <Grid xs={3} md={4}>
          {/* <Grid container spacing={0.5} direction={"column"}> */}
            <InteractionCard
              callActivity={props.callActivity}
              endCall={endCall}
              interactiontransferdialer={interactiontransferdialer}
              setinteractiontransferdialer={setinteractiontransferdialer}
              dialedNumber={dialedNumber}
              setDialedNumber={setDialedNumber}
              attendedTransfer={attendedTransfer}
            />
          
          {/* </Grid> */}
        </Grid>
        <Grid container xs={7.5} md={8} >
          <InteractionCard2 />
        </Grid>
        <Grid xs={12} md={12} >
          <InteractionCard4 
          makeCall={makeCall}
          dialedNumber={dialedNumber}
          callActivitiesApi={callActivitiesApi}
          />
        </Grid>

        {props.incomingCall && (
          <IncomingCallScreen
            acceptCall={acceptCall}
            callActivitiesApi={callActivitiesApi}
            endCall={endCall}
          />
        )}

        <AnswerCallScreen
          makeCall={makeCall}
          muteUnmute={muteUnmute}
          holdUnhold={holdUnhold}
          transferCallApi={transferCallApi}
          ConferenceCallApi={ConferenceCallApi}
          isTransferInitiated={props.isTransferInitiated}
          setIsTransferInitiated={props.setIsTransferInitiated}
          muteBrowserAudio={muteBrowserAudio}
          toggleMute={toggleMute}
          endCallTransfer={endCallTransfer}
          holdCall={holdCall}
          unholdCall={unholdCall}
          handleMuteplay={handleMuteplay}
          handleMutepause={handleMutepause}
          reset={reset}
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
})(DashBoard);
