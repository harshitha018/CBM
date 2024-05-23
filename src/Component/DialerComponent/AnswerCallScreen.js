import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  TextField,
  Card,
} from "@mui/material";
import photo from "../../assests/cbm_assests/assets2/images/47.png";
import {
  ArrowsLeftRight,
  ArrowsOutSimple,
  GitMerge,
  Microphone,
  Minus,
  PauseCircle,
  PlayCircle,
  UserPlus,
  X,
  SpeakerSimpleSlash,
  MicrophoneSlash,
} from "@phosphor-icons/react";
import { TiArrowMinimise } from "react-icons/ti";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdMerge } from "react-icons/md";
import { HiMiniArrowsPointingOut } from "react-icons/hi2";
import { GoUnmute } from "react-icons/go";
import { MdDialpad } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import { motion } from "framer-motion";
import { IoMdCall } from "react-icons/io";
// import { PauseCircle, PlayCircle } from "@mui/icons-material";
import {
  setDisplayExtNum,
  setvoicehours,
  setvoiceminutes,
  setvoiceseconds,
  setOutgoingCall,
  setAnswerScreen,
  setIncomingCall,
  setShowMute,
  setShowUnMute,
  setShowHold,
  setShowUnHold,
  setTransferCall,
  setShowTransferCall,
  setConference,
  setMergeCall,
  setIsTransferInitiated,
} from "../../redux/actions/action";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    displayExtNum: state.data.displayExtNum,
    displayOutgoingExtNum: state.data.displayOutgoingExtNum,
    voiceseconds: state.data.voiceseconds,
    voiceminutes: state.data.voiceminutes,
    voicehours: state.data.voicehours,
    incomingCallReject: state.data.incomingCallReject,
    OutgoingCall: state.data.OutgoingCall,
    incomingCall: state.data.incomingCall,
    answerScreen: state.data.answerScreen,
    incomingCallAccepted: state.data.incomingCallAccepted,

    showMute: state.data.showMute,
    showUnMute: state.data.showUnMute,
    showHold: state.data.showHold,
    showUnHold: state.data.showUnHold,
    transferCall: state.data.transferCall,
    showTransferCall: state.data.showTransferCall,
    conference: state.data.conference,
    mergecall: state.data.mergecall,
  };
};

const AnswerCallScreen = (props) => {
  // console.log("showTransferCall", props.showTransferCall);

  const {
    endCall,
    blindTransfer,
    attendedTransfer,
    delegate,
    dialedNumber,
    setDialedNumber,
    ConferenceCallApi,
    isTransferInitiated,
  } = props;
  const parentRef = useRef();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleTransferDialpad = () => {
    props.setOpentransferdialer(!props.Opentransferdialer);
  };

  const handleConferenceDialpad = () => {
    props.setOpenConferencedialer(!props.OpenConferencedialer);
  };

  const handleSmallscreenDialpad = () => {
    props.setOpenSmallscreenDialer(!props.OpenSmallscreenDialer);
  };

  const CloseTransferDialpad = () => {
    props.setOpentransferdialer(false);
  };

  const CloseConferenceDialpad = () => {
    props.setOpenConferencedialer(false);
  };

  const CloseSmallScreenDialpad = () => {
    props.setOpenSmallscreenDialer(false);
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

  const handleCall = () => {
    props.setOpenDialer(false);
  };

  const toggleScreen = () => {
    setIsSmallScreen(!isSmallScreen);
  };

  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  const handleDragStart = (event, info) => {
    setDragStartPos({ x: info.point.x, y: info.point.y });
  };




  return (
    <>
      {/* Main answer screen after incoming */}

      {/* inbound call screen */}
      {props.incomingCallAccepted ? (
        isSmallScreen ? (
          <motion.div
            className="answerScreen_smallScreen"
            drag
            dragConstraints=".draggable_main"
            onDragStart={handleDragStart}
          >
            <Box className="answerScreen_smallScreen">
              <Stack direction="row" alignItems="center">
                <Box className="ms-2">
                  <img src={photo} alt="" />
                </Box>
                <Box className="ms-3">
                  <Stack direction="column" className="mx-2">
                    <Typography
                      variant="caption"
                      className="d-inline-block text-truncate"
                      style={{
                        fontSize: "15px",
                        color: "black !important",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                      }}
                    >
                      {props.displayExtNum}
                    </Typography>
                    <Typography
                      variant="caption"
                      gutterBottom
                      style={{ fontSize: "12px", color: "black" }}
                    >
                      <span>{props.voicehours}</span>:
                      <span>{props.voiceminutes}</span>:
                      <span>{props.voiceseconds}</span>
                    </Typography>

                    {/* Container for buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Button
                        type="button"
                        className="call-btn mb-1 d-flex mx-auto"
                        onClick={handleSmallscreenDialpad}
                        style={{ marginRight: "8px" }}
                      >
                        <MdDialpad className="icon" size={15} color="black" />
                      </Button>

                      <button
                        type="button"
                        className="btn btn-danger ms-2"
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: "23px",
                        }}
                        onClick={() => endCall()}
                      >
                        <MdCallEnd color="white" size={17} />
                      </button>
                    </Box>
                  </Stack>
                  <Box className="position-absolute top-0 end-0 p-2 me-2">
                    <HiMiniArrowsPointingOut
                      size={16}
                      onClick={toggleScreen}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                </Box>
              </Stack>
            </Box>
          </motion.div>
        ) : (
          <motion.div
            className="answerScreen"
            drag
            dragConstraints=".draggable_main"
            onDragStart={handleDragStart}
          >
            <Box className="answerScreen">
              <Box className="p-3 d-flex flex-column justify-content-center align-items-center">
                <Box className="p-2">
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img src={photo} alt="" />
                  </Stack>
                  <Stack className="call_names mt-2 d-flex flex-column justify-content-center align-items-center mb-3">
                    {props.conference ? (
                      <>
                        <Typography>
                          <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                            {/* {localStorage.getItem("dialedNumber")} */}
                            {props.displayExtNum}
                          </span>
                        </Typography>

                        <Typography>
                          <span style={{ fontWeight: "bold" }}>
                            {localStorage.getItem("ConferencedNum")}
                          </span>
                        </Typography>

                        <Typography variant="body2">
                          {" "}
                          <span>{props.voicehours}</span>:
                          <span>{props.voiceminutes}</span>:
                          <span>{props.voiceseconds}</span>
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography>
                          <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                            {props.displayExtNum}
                          </span>
                        </Typography>
                        <Typography variant="body2">
                          {" "}
                          <span>{props.voicehours}</span>:
                          <span>{props.voiceminutes}</span>:
                          <span>{props.voiceseconds}</span>
                        </Typography>
                      </>
                    )}
                    <Typography
                      variant="caption"
                      gutterBottom
                      style={{ fontSize: "8px" }}
                    >
                      IVR Exit Point: CARD MENU PAYMENT OPTIONS incoming
                    </Typography>
                  </Stack>
                </Box>
                <Grid container justifyContent="center" spacing={2} mb={4}>
                  <Grid item>
                    <Stack
                      direction="column"
                      alignItems="center"
                      sx={{
                        borderRadius: "50% !important",
                        height: "70px",
                        paddingBottom: "0px",
                        paddingRight: "0px",
                        paddingLeft: "0px",
                      }}
                    >
                      {props.showMute ? (
                        <Button
                          type="button"
                          id="muteButton"
                          className="call-btn"
                          onClick={() => {
                            props.muteUnmute("muted", "Mute");
                            // props.muteBrowserAudio();
                          }}
                        >
                          <Microphone color="black" size={20} />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          id="muteButton"
                          className="call-btn"
                          onClick={() => {
                            props.muteUnmute("unmuted", "unMute");
                            // props.muteBrowserAudio();
                          }}
                        >
                          <MicrophoneSlash color="black" size={20} />
                        </Button>
                      )}
                      <Typography variant="caption">
                        {props.showMute ? "UnMute" : "Mute"}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item>
                    <Stack direction="column" alignItems="center">
                      {props.showHold ? (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            props.holdUnhold("Call on progress", "Hold");
                          }}
                        >
                          <PlayCircle
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            props.holdUnhold("Call on Hold", "UnHold");
                          }}
                        >
                          <PauseCircle
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      )}
                      <Typography variant="caption">
                        {props.showHold ? "Unhold" : "Hold"}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center" spacing={2}>
                  <Grid item>
                    <Stack direction="column" alignItems="center">
                      {props.transferCall ? (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            handleTransferDialpad();
                          }}
                        >
                          <ArrowsLeftRight
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            handleTransferDialpad();
                          }}
                        >
                          <ArrowsLeftRight
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      )}

                      <Typography variant="caption">
                        {props.transferCall ? "Not Transfer" : "Transfer"}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Stack direction="column" alignItems="center">
                      {props.conference ? (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            handleConferenceDialpad();
                            // props.conferenceCallApi(
                            //   "call on conference",
                            //   "conference"
                            // );
                          }}
                        >
                          <HiOutlineUserAdd
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            handleConferenceDialpad();
                            // props.conferenceCallApi("call on Merge", "Merged");
                          }}
                        >
                          <MdMerge color="black" size={20} className="icon" />
                        </Button>
                      )}
                      <Typography variant="caption">
                        {props.conference ? "Merged" : "conference"}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <Box className="position-absolute top-0 end-0 p-2">
                  <TiArrowMinimise
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSmallScreen(true);
                    }}
                  />
                </Box>

                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "23px",
                  }}
                  onClick={() => {
                    if (props.showTransferCall == true) {
                      props.endCallTransfer();
                    } else {
                      props.endCall();
                    }
                  }}
                >
                  <MdCallEnd color="white" size={17} />
                </button>
              </Box>
            </Box>
          </motion.div>
        )
      ) : (
        ""
      )}

      {/* outbound  answer screen */}
      {props.OutgoingCall ? (
        isSmallScreen ? (
          <motion.div
            className="answerScreen_smallScreen"
            drag
            dragConstraints=".draggable_main"
            onDragStart={handleDragStart}
          >
            <Box className="answerScreen_smallScreen">
              <Stack direction="row" alignItems="center">
                <Box className="ms-2">
                  <img src={photo} alt="" />
                </Box>
                <Box className="ms-3">
                  <Stack direction="column" className="mx-2">
                    <Typography
                      variant="caption"
                      className="d-inline-block text-truncate"
                      style={{
                        fontSize: "15px",
                        color: "black !important",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                      }}
                    >
                      {localStorage.getItem("dialedNumber")}
                    </Typography>
                    <Typography
                      variant="caption"
                      gutterBottom
                      style={{ fontSize: "12px", color: "black" }}
                    >
                      <span>{props.voicehours}</span>:
                      <span>{props.voiceminutes}</span>:
                      <span>{props.voiceseconds}</span>
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Button
                        type="button"
                        className="call-btn mb-1 d-flex mx-auto"
                        onClick={handleSmallscreenDialpad}
                        style={{ marginRight: "8px" }}
                      >
                        <MdDialpad className="icon" size={15} color="black" />
                      </Button>

                      <button
                        type="button"
                        className="btn btn-danger ms-2"
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: "23px",
                        }}
                        onClick={() => endCall()}
                      >
                        <MdCallEnd color="white" size={17} />
                      </button>
                    </Box>
                  </Stack>
                  <Box className="position-absolute top-0 end-0 p-2 me-2">
                    <HiMiniArrowsPointingOut
                      size={16}
                      onClick={toggleScreen}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                </Box>
              </Stack>
            </Box>
          </motion.div>
        ) : (
          <motion.div
            className="answerScreen"
            drag
            dragConstraints=".draggable_main"
            onDragStart={handleDragStart}
          >
            <Box className="answerScreen">
              <Box className="p-3 d-flex flex-column justify-content-center align-items-center">
                <Box className="p-2">
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img src={photo} alt="" />
                  </Stack>
                  <Stack className="call_names mt-2 d-flex flex-column justify-content-center align-items-center mb-3">
                    {props.transferCall ? (
                      <>
                        <Typography>
                          <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                            {localStorage.getItem("dialedNumber")}
                          </span>
                        </Typography>

                        <Typography>
                          <span style={{ fontWeight: "bold" }}>
                            {localStorage.getItem("TransferdialedNumber", props.dialedNumber)}
                          </span>
                        </Typography>

                        <Typography variant="body2">
                          {" "}
                          <span>{props.voicehours}</span>:
                          <span>{props.voiceminutes}</span>:
                          <span>{props.voiceseconds}</span>
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography>
                          <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                            {localStorage.getItem("dialedNumber")}
                          </span>
                        </Typography>
                        <Typography variant="body2">
                          {" "}
                          <span>{props.voicehours}</span>:
                          <span>{props.voiceminutes}</span>:
                          <span>{props.voiceseconds}</span>
                        </Typography>
                      </>
                    )}

                    <Typography
                      variant="caption"
                      gutterBottom
                      style={{ fontSize: "8px" }}
                    >
                      IVR Exit Point: CARD MENU PAYMENT OPTIONS outgoingg
                    </Typography>
                  </Stack>
                </Box>
                <Grid container justifyContent="center" spacing={2} mb={4}>
                  <Grid item>
                    <Stack
                      direction="column"
                      alignItems="center"
                      sx={{
                        borderRadius: "50% !important",
                        height: "70px",
                        paddingBottom: "0px",
                        paddingRight: "0px",
                        paddingLeft: "0px",
                      }}
                    >
                      {props.showMute ? (
                        <Button
                          type="button"
                          id="muteButton"
                          className="call-btn"
                          onClick={() => {
                            props.muteUnmute("muted", "Mute");
                            // props.muteBrowserAudio();
                          }}
                        >
                          <Microphone color="black" size={20} />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          id="muteButton"
                          className="call-btn"
                          onClick={() => {
                            props.muteUnmute("unmuted", "unMute");
                            // props.muteBrowserAudio();
                          }}
                        >
                          <MicrophoneSlash color="black" size={20} />
                        </Button>
                      )}

                      <Typography variant="caption">
                        {props.showMute ? "UnMute" : "Mute"}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item>
                    <Stack direction="column" alignItems="center">
                      {props.showHold ? (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            props.holdUnhold("Call on progress", "Hold");
                            // alert("inside hold");
                          }}
                        >
                          <PlayCircle
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            props.holdUnhold("Call on Hold", "UnHold");
                            // alert("inside UNhold");
                          }}
                        >
                          <PauseCircle
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      )}

                      <Typography variant="caption">
                        {props.showHold ? "Unhold" : "Hold"}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center" spacing={2}>
                  <Grid item>
                    <Stack direction="column" alignItems="center">
                      {props.transferCall ? (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            handleTransferDialpad();
                          }}
                        >
                          <ArrowsLeftRight
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            handleTransferDialpad();
                          }}
                        >
                          <ArrowsLeftRight
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      )}

                      <Typography variant="caption">
                        {props.transferCall ? "Not Transfer" : "Transfer"}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Stack direction="column" alignItems="center">
                      {props.conference ? (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            handleConferenceDialpad();
                            props.ConferenceCallApi(
                              "call on conference",
                              "conference"
                            );
                          }}
                        >
                          <HiOutlineUserAdd
                            color="black"
                            size={20}
                            className="icon"
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="call-btn"
                          onClick={() => {
                            handleConferenceDialpad();
                            props.ConferenceCallApi("call on Merge", "Merged");
                          }}
                        >
                          <MdMerge color="black" size={20} className="icon" />
                        </Button>
                      )}
                      <Typography variant="caption">
                        {props.conference ? "Merged" : "conference"}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <Box className="position-absolute top-0 end-0 p-2">
                  <TiArrowMinimise
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSmallScreen(true);
                    }}
                  />
                </Box>

                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "23px",
                  }}
                  onClick={() => {
                    if (props.showTransferCall == true) {
                      props.endCallTransfer();
                    } else {
                      props.endCall();
                    }
                  }}
                  // onClick={() => endCall()}
                >
                  <MdCallEnd color="white" size={17} />
                </button>
              </Box>
            </Box>
          </motion.div>
        )
      ) : (
        ""
      )}

      {/* Transfer dialer pad */}
      {props.Opentransferdialer ? (
        <Box className="dialpad_main">
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
              {/* <Button
                className="dialpad-btn"
                onClick={() => {
                  props.attendedTransfer();
                  handleTransferDialpad();

                  localStorage.setItem(
                    "TransferdialedNumber",
                    props.dialedNumber
                  );
                }}
                style={{ color: "white", background: "green" }}
                fullWidth
              >
                Call
              </Button> */}
              {props.isTransferInitiated ? (
                <Button
                  className="dialpad-btn"
                  // onClick={props.attendedTransfer}
                  onClick={() => {
                    props.completeTransfer();
                  }}
                  style={{ color: "white", background: "red" }}
                  fullWidth
                >
                  Complete Transfer
                </Button>
              ) : (
                <Button
                  className="dialpad-btn"
                  onClick={() => {
                    alert("attend transfer");
                    // handleTransfer();
                    props.attendedTransfer();
                    props.setIsTransferInitiated(true); // Update state to indicate transfer is initiated
                    localStorage.setItem(
                      "TransferdialedNumber",
                      props.dialedNumber
                    );
                  }}
                  style={{ color: "white", background: "green" }}
                  fullWidth
                >
                  {isTransferInitiated ? "Attend Transfer" : "Call"}
                </Button>
              )}
            </Grid>
          </Card>
        </Box>
      ) : (
        ""
      )}

      {/* conference  dialer pad */}
      {props.OpenConferencedialer && (
        <Box className="dialpad_main">
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
                  onClick={CloseConferenceDialpad}
                >
                  <X size={20} />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} m={2}>
              <Button
                className="dialpad-btn"
                onClick={() => {
                  handleConferenceDialpad();
                  props.ConferenceCallApi("call on conference", "conference");
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

      {/* Small Screen dialer */}
      {props.OpenSmallscreenDialer && (
        <Box className="dialpad_main">
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
                  onClick={CloseSmallScreenDialpad}
                >
                  <X size={20} />
                </Button>
              </Grid>
            </Grid>
            <Grid style={{ marginLeft: "8px", display: "flex" }}>
              <Grid item xs={6} md={6} m={1}>
                {props.isTransferInitiated ? (
                  <Button
                    className="dialpad-btn"
                    onClick={() => {
                      props.attendedTransfer();
                      // handleTransferDialpad();
                      setOpentransferdialer(false);
                      localStorage.getItem(
                        "TransferdialedNumber",
                        props.dialedNumber
                      );
                    }}
                    style={{
                      color: "white",
                      background: "green",
                      width: "100%",
                    }}
                  >
                    Complete Transfer
                  </Button>
                ) : (
                  <Button
                    className="dialpad-btn"
                    onClick={() => {
                      props.attendedTransfer();
                      handleTransferDialpad();
                      localStorage.getItem(
                        "TransferdialedNumber",
                        props.dialedNumber
                      );
                    }}
                    style={{
                      color: "white",
                      background: "green",
                      width: "100%",
                    }}
                  >
                    Transfer
                  </Button>
                )}
              </Grid>
              <Grid item xs={6} md={6} m={1}>
                <Button
                  className="dialpad-btn"
                  onClick={() => {
                    props.ConferenceCallApi();
                    handleConferenceDialpad();
                  }}
                  style={{ color: "white", background: "green", width: "100%" }}
                >
                  Conference
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      )}
    </>
  );
};

export default connect(mapStateToProps, {
  setDisplayExtNum,
  setvoicehours,
  setvoiceminutes,
  setvoiceseconds,
  setOutgoingCall,
  setIncomingCall,
  setAnswerScreen,

  setShowMute,
  setShowUnMute,
  setShowHold,
  setShowUnHold,
  setTransferCall,
  setShowTransferCall,
  setConference,
  setMergeCall,
  setIsTransferInitiated,
})(AnswerCallScreen);
