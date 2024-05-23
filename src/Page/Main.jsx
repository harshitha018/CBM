import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import NavBar from "../Component/NavBar";
import SideBar from "../Component/SideBar";
import DashBoard from "./Dashboard-component/DashBoard";
import { SimpleUser, SimpleUserOptions } from "sip.js/lib/platform/web";
import { useStopwatch } from "react-timer-hook";
import { UserAgent, Registerer, Inviter, SessionState } from "sip.js";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  setIncomingCall,
  setIncomingCallAccepted,
  setIncomingCallReject,
  setOutgoingCallReject,
  setOutgoingCall,
  setDisplayExtNum,
  setDisplayOutgoingExtNum,
  setvoiceseconds,
  setvoiceminutes,
  setvoicehours,
  setAnswerScreen,
  setCallStatus,
  setShowMute,
  setShowUnMute,
  setShowHold,
  setShowUnHold,
  setTransferCall,
  setShowTransferCall,
  setConference,
  setMergeCall,
  setCallActivity,
  setIsTransferInitiated,
} from "../redux/actions/action";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import DashBoardSupervisor from "./Dashboard-component-supervisor/DashBoardSupervisor";
import axios from "axios";
import { BaseUrl } from "./Constant/BaseUrl";
const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
    incomingCall: state.data.incomingCall,
    voiceseconds: state.data.voiceseconds,
    voiceminutes: state.data.voiceminutes,
    voicehours: state.data.voicehours,
    OutgoingCall: state.data.OutgoingCall,
    incomingCallAccepted: state.data.incomingCallAccepted,
    OutgoingCallReject: state.data.OutgoingCallReject,
    displayExtNum: state.data.displayExtNum,
    callStatus: state.data.callStatus,

    showMute: state.data.showMute,
    showUnMute: state.data.showUnMute,
    showHold: state.data.showHold,
    showUnHold: state.data.showUnHold,
    transferCall: state.data.transferCall,
    showTransferCall: state.data.showTransferCall,
    conference: state.data.conference,
    mergecall: state.data.mergecall,
    callActivity: state.data.callActivity,
    isTransferInitiated: state.data.isTransferInitiated,
    agentInteraction: state.data.agentInteraction,
  };
};

const Main = (props) => {
  const userDetails = JSON.parse(localStorage.getItem("userinformation"));

  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];

  const [simpleUser, setsimpleUser] = useState();
  const { voiceseconds, voiceminutes, voicehours } = props;

  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  props.setvoiceseconds(seconds);
  props.setvoiceminutes(minutes);
  props.setvoicehours(hours);

  const userAgentRef = useRef(null);
  const invitationRef = useRef(null);
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const originalCallRef = useRef(null);
  const transferedRef = useRef(null);
  const sessionRef = useRef(null);
  const [isWebRTCConnected, setIsWebRTCConnected] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [OpenMakecalldialer, setOpenMakecalldialer] = useState(false);
  const [dialedNumber, setDialedNumber] = useState("");

  const [Opentransferdialer, setOpentransferdialer] = useState(false);
  const [OpenConferencedialer, setOpenConferencedialer] = useState(false);
  const [OpenSmallscreenDialer, setOpenSmallscreenDialer] = useState(false);
  const [AgentDialedNumber, setAgentDialedNumber] = useState("");
  const [interactiontransferdialer, setinteractiontransferdialer] =
    useState(false);
  const [domain, setDomain] = useState("cognicx.callanywhere.co.in");
  const [port, setPort] = useState(8089);
  const [fromdate, setFromdate] = useState(defaultValue);
  const [direction, setDirection] = useState("Outbound");

  const localValue = JSON.parse(localStorage.getItem("userinformation"));
  const userRole = localValue[0].roles;

  const handleWebRTCDisconnect = () => {
    setIsWebRTCConnected(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleExtensionChange = (event) => {
    setDialedNumber(event.target.value);
  };

  // ACCEPT/DISCONNECT API //
  const callActivitiesApi = async (activitystatus, Callstatusvalue2) => {
    // if (callType) {
    // }
    const callerid = JSON.parse(localStorage.getItem("Callerid"));
    console.log("vvvvvvvvvvvvvvvvvv", props.displayExtNum);

    await axios
      .post(
        BaseUrl + "/agent/activity",

        {
          agentId: userDetails[0].userId,
          sipId: callerid,
          callerNumber: props.displayExtNum,
          callStatus: Callstatusvalue2,
          activity: activitystatus,
          direction: direction,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      )
      .then((res) => {
        console.log("activityRESPONSE", res);
        if (res.data.status) {
          props.setCallActivity(res.data.data);
        } else {
          console.log("activityERROR");
        }
      })
      .catch((err) => {
        console.log("callActivitiesApi", err);
      });
  };

  // AGENTINTERACTION SAVE //
  const agentInteractionSave = async (Callstatusvalue2) => {
    const callerid = JSON.parse(localStorage.getItem("Callerid"));
    const currentDate = new Date();

    // Arrival time: current time
    const arrivalTime = currentDate.toISOString();

    // Connected time: 5 minutes after arrival time
    const connectedTime = new Date(currentDate);
    connectedTime.setMinutes(connectedTime.getMinutes() + 5);
    const connectedTimeISOString = connectedTime.toISOString();

    // Disconnected time: 5 minutes after connected time
    const disconnectedTime = new Date(connectedTime);
    disconnectedTime.setMinutes(disconnectedTime.getMinutes() + 5);
    const disconnectedTimeISOString = disconnectedTime.toISOString();

    await axios
      .post(
        BaseUrl + "/agent/agentinteraction",
        {
          aniNumber: 3001,
          agentId: userDetails[0].userId,
          sipId: callerid,
          callerNumber: props.displayExtNum,
          date: fromdate
            ? `${fromdate}T00:00:00.000Z`
            : `${defaultValue}T00:00:00.000Z`,
          arrivalTime: arrivalTime,
          connectedTime: connectedTimeISOString,
          disconnectedTime: disconnectedTimeISOString,
          skillGroup: "Support",
          channel: "Voice",
          callStatus: Callstatusvalue2,
          recording: "",
          download: true,
          disposition: "Call Back",
          direction: direction,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      )
      .then((res) => {
        console.log("agentInteractionSave", res);
      })
      .catch((err) => {
        console.log("agentInteractionSaveERRORR", err);
      });
  };

  useEffect(() => {
    if (props.agentInteraction) {
      agentInteractionSave();
    }
  }, [props.agentInteraction]);

  // MUTE/UNMUTE FUNTIONALITY //

  // MUTE/UNMUTE API //
  const mediaElement = document.getElementById("localAudio");
  const remoteAudioElement = document.getElementById("remoteAudio");
  const remoteStream = new MediaStream();

  const muteUnmute = async (muteActivity, muteStatus) => {
    console.log("mute unmute trigger");

    try {
      const OutgoingcallID = localStorage.getItem("outgoingcallID");
      const dialedNumber = localStorage.getItem("dialedNumber");
      const tenantId = localStorage.getItem("TenantId");
      const userId = userDetails[0].userId;

      const response = await axios.post(
        BaseUrl + "/agent/activity",
        {
          agentId: userId,
          sipId: OutgoingcallID,
          callerNumber: dialedNumber,
          callStatus: muteStatus,
          activity: muteActivity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: tenantId,
          },
        }
      );

      console.log("muteAPIII", response.data);

      if (response.data.status) {
        if (muteStatus === "Mute") {
          props.setShowMute(false);
        } else {
          props.setShowMute(true);
        }
      } else {
        console.log("muteeeeeerr");
      }
    } catch (error) {
      console.error("Error muting/unmuting:", error);
    }
  };

  // HOLD/UNHOLD API //
  const holdUnhold = async (holdActivity, holdStatus) => {
    try {
      const OutgoingcallID = localStorage.getItem("outgoingcallID");
      const dialedNumber = localStorage.getItem("dialedNumber");
      const tenantId = localStorage.getItem("TenantId");
      const userId = userDetails[0].userId;
      const callerid = JSON.parse(localStorage.getItem("Callerid"));

      const response = await axios.post(
        BaseUrl + "/agent/activity",
        {
          agentId: userId,
          sipId: OutgoingcallID,
          callerNumber: dialedNumber,
          callStatus: holdStatus,
          activity: holdActivity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: tenantId,
          },
        }
      );

      if (response.data.status) {
        console.log("holdAPIII", response);
        if (holdStatus === "Hold") {
          simpleUser.hold();

          props.setShowHold(false);
          console.log("inside if");
        } else {
          simpleUser.unhold();

          props.setShowHold(true);
          console.log("inside else");
        }
      } else {
        console.log("HOldddddddddddddddd");
      }
    } catch (error) {
      console.error("Error holding/unholding:", error);
    }
  };

  // TRANSFER API //
  const transferCallApi = async (transferActivity, transferStatus) => {
    try {
      const OutgoingcallID = localStorage.getItem("outgoingcallID");
      const dialedNumber = localStorage.getItem("dialedNumber");
      const tenantId = localStorage.getItem("TenantId");
      const userId = userDetails[0].userId;
      const TransferedNum = localStorage.setItem(
        "TransferdialedNumber",
        dialedNumber
      );

      console.log("TransferdialedNumberAPIii", TransferedNum);

      const response = await axios.post(
        BaseUrl + "/agent/activity",
        {
          agentId: userId,
          sipId: OutgoingcallID,
          callerNumber: dialedNumber,
          callStatus: transferStatus,
          activity: transferActivity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: tenantId,
          },
        }
      );

      if (response.data.status) {
        console.log("TransferAPI", response);
        if (transfer === "Transfer") {
          // SimpleUser.hold();

          props.setTransferCall(false);
          console.log("inside if");
        } else {
          // SimpleUser.unhold();

          props.setTransferCall(true);
          console.log("inside else");
        }
      } else {
        console.log("transferrrrrrrrrrr");
      }
    } catch (error) {
      console.error("Error transfer/nottransfer:", error);
    }
  };

  // CONFERENCE API //
  const ConferenceCallApi = async (conferenceActivity, conferenceStatus) => {
    try {
      const OutgoingcallID = localStorage.getItem("outgoingcallID");
      const dialedNumber = localStorage.getItem("dialedNumber");
      const tenantId = localStorage.getItem("TenantId");
      const userId = userDetails[0].userId;
      const callerid = JSON.parse(localStorage.getItem("Callerid"));
      const ConferencedNum = localStorage.setItem(
        "ConferencedNum",
        dialedNumber
      );

      const response = await axios.post(
        BaseUrl + "/agent/activity",
        {
          agentId: userId,
          sipId: OutgoingcallID,
          callerNumber: ConferencedNum,
          callStatus: conferenceStatus,
          activity: conferenceActivity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: tenantId,
          },
        }
      );

      if (response.data.status) {
        console.log("conferenceAPI", response);
        if (conferenceStatus === "conference") {
          props.setConference(false);
          console.log("inside if");
        } else {
          props.setConference(true);
          console.log("inside else");
        }
      } else {
        console.log("conferenceeeeeee");
      }
    } catch (error) {
      console.error("Error conference/notconference:", error);
    }
  };

  // WEBRTC //

  function setupRemoteMedia(invitation) {
    invitation.sessionDescriptionHandler.peerConnection
      .getReceivers()
      .forEach((receiver) => {
        if (receiver.track && receiver.track.kind === "audio") {
          remoteStream.addTrack(receiver.track);
        }
        console.log("receiverrrrrrrrrr", remoteStream);
      });

    if (mediaElement && remoteAudioElement) {
      // Add null checks
      mediaElement.srcObject = remoteStream;
      remoteAudioElement.srcObject = remoteStream;
      console.log("remoteAudioElement", remoteAudioElement.srcObject);
      console.log("localAudioooooooooo", mediaElement.srcObject);

      remoteAudioElement.autoplay = true;
      remoteAudioElement.onerror = (error) => {
        console.log("error during remote audio playack", error);
      };

      remoteAudioElement.onplay = () => {
        console.log("Remote audio playback started successfully");
      };

      mediaElement
        .play()
        .then(() => {
          console.log("Audio playback started successfully");
        })
        .catch((error) => {
          console.error("Error starting audio playback:", error);
        });
    }
  }

  const cleanupMedia = () => {
    if (mediaElement) {
      mediaElement.srcObject = null;
      mediaElement.pause();
      console.log("srcObjectnnnnnnnnn2222222", mediaElement.srcObject);
    } else {
      console.error("Media element is null. Cleanup aborted.");
    }
  };

  const initializeUserAgent = async () => {
    const transportOptions = {
      server: `wss://${domain}:${port}/ws`,
    };
    const uri = UserAgent.makeURI(`sip:3001@${domain}:${port}`);

    function getAudioElement(id) {
      console.log("getAudioElement", id);
      const el = document.getElementById(id);
      if (!(el instanceof HTMLAudioElement)) {
        throw new Error(`Element "${id}" not found or not an audio element.`);
      }
      console.log("ellllllll", el);
      return el;
    }

    const options = {
      aor: `sip:3001@${domain}`,
      media: {
        local: { audio: getAudioElement("localAudio") },
        constraints: { audio: true, video: false },
        remote: { audio: getAudioElement("remoteAudio") },
      },
    };

    function onInvite(invitation) {
      console.log("invitationnnnnnnnnnnnnnn", invitation);
      invitation.stateChange.addListener((_state) => {
        console.log(`Session state changed to ${invitation._state}`);
        switch (invitation._state) {
          case "Initial":
            props.setIncomingCall(true);
            break;
          case "Establishing":
            break;
          case "Established":
            setupRemoteMedia(invitation);
            break;
          case "Terminating":
          case "Terminated":
            cleanupMedia();
            endCall();

            break;
          default:
            throw new Error("Unknown session state.");
        }
      });

      console.log("invitationnnnnnnnnnnn", invitation);
      const callerid = localStorage.setItem(
        "Callerid",
        JSON.stringify(invitation.incomingInviteRequest.message.callId)
      );

      invitationRef.current = invitation;
      localAudioRef.current = invitation;

      {
        invitation.incomingInviteRequest.message.method === "INVITE"
          ? props.setIncomingCall(true)
          : props.setIncomingCall(false);
      }

      {
        invitation.incomingInviteRequest.message.from._displayName
          ? props.setDisplayExtNum(
              invitation.incomingInviteRequest.message.from._displayName
            )
          : "";
      }
    }

    const userAgentOptions = {
      authorizationPassword: "3001",
      authorizationUsername: "3001",

      delegate: {
        onInvite,
        onDisconnect: handleWebRTCDisconnect,
      },
      transportOptions,
      uri,
      domain,
    };
    const userAgent = new UserAgent(userAgentOptions);

    try {
      const registerer = new Registerer(userAgent);

      userAgent.start().then(() => {
        registerer.register();
      });
      userAgentRef.current = userAgent;

      // Connect to the WebSocket server
      const server = `wss://${domain}:${port}/ws`;
      simpleUser = new SimpleUser(server, options);
      setsimpleUser(simpleUser);
      await simpleUser.connect();
      console.log("WebRTC Connected Successfully");
      setIsWebRTCConnected(true);

      // const registerer = new Registerer(userAgent);
      // userAgent
      //   .start()
      //   .then(() => {
      //     registerer.register();
      //     console.log("UserAgent registered successfully.");
      //   })
      //   .catch((error) => {
      //     console.log("Error in registered UserAgent", error);
      //   });

      // const server = `wss://${domain}:${port}/ws`;
      // const simpleUser = new SimpleUser(server, options);

      // simpleUser
      //   .connect()
      //   .then(() => {
      //     console.log("WebRTC Connected Successfully");
      //     setIsWebRTCConnected(true);
      //   })
    } catch (error) {
      console.error("Error starting UserAgent:", error);
      setIsWebRTCConnected(false);
    }
  };

  useEffect(() => {
    initializeUserAgent();
  }, []);

  // WEBRTC //

  const makeCall = (dialedNumber) => {
    localStorage.getItem("dialedNumber", dialedNumber);
    console.log("Dialed Number:", dialedNumber);
    const targetUri = `sip:${dialedNumber}@${domain}:${port}`;
    const target = UserAgent.makeURI(targetUri);
    const inviter = new Inviter(userAgentRef.current, target);
    console.log("makecall444444", userAgentRef, inviter, target);
    // const OutgoingcallID = localStorage.setItem(
    //   "outgoingcallID",
    //   JSON.stringify(inviter.outgoingRequestMessage.callId)
    // );
    // console.log("OutgoingcallID", OutgoingcallID);
    inviter.stateChange.addListener((_state) => {
      console.log("inviterrrrrrrrrrrrrrrr", inviter._state);
      switch (inviter._state) {
        case "Initial":
          setDirection("Outbound");
          break;
        case "Establishing":
          setDirection("Outbound");
          break;
        case "Established":
          setDirection("Outbound");
          setupRemoteMedia(inviter);
          callActivitiesApi("Accept call", "Answered");
          break;
        case "Terminating":
        case "Terminated":
          cleanupMedia();
          endCall();
          break;
        default:
          throw new Error("Unknown session state.");
      }
    });
    inviter.invite();
    invitationRef.current = inviter;
    localAudioRef.current = inviter;
    transferedRef.current = inviter;
    reset();
    console.log("targetUriiiiiiiiiiiiiiiiiiiii", transferedRef);
  };

  // BLIND TRANSFER //
  const blindTransfer = () => {
    const targetUri = `sip:${dialedNumber}@${domain}:${port}`;
    const target = UserAgent.makeURI(targetUri);
    sessionRef.current.refer(target);
  };

  // Attended TRANSFER //
  const attendedTransfer = () => {
    const transferTargetUri = `sip:${localStorage.getItem(
      "TransferdialedNumber"
    )}@${domain}:${port}`;
    const transferTarget = UserAgent.makeURI(transferTargetUri);
    const transferInviter = new Inviter(userAgentRef.current, transferTarget);
    transferInviter.invite();
    invitationRef.current = transferInviter;
    console.log("initialSessioninitialSession", invitationRef, transferInviter);
    props.setShowTransferCall(true);
    if (props.transferCall) {
      transferCallApi("transfered", "Transfer");
    } else {
      transferCallApi("Not transfered", "Not Transfer");
    }
  };

  useEffect(() => {
    // Assuming `userAgentRef.current` represents the original call session
    if (userAgentRef.current) {
      originalCallRef.current = userAgentRef.current;
    }
  }, [userAgentRef.current]);

  // Handle an Incoming REFER //
  const delegate = {
    onRefer: (referral) => {
      if (shouldAcceptReferral(referral)) {
        referral.accept().then(() => {
          referral.makeInviter().invite();
        });
      } else {
        referral.reject();
      }
    },
  };

  const acceptCall = () => {
    if (invitationRef.current && localAudioRef.current) {
      invitationRef.current.stateChange.addListener((_state) => {
        console.log("inviterrrrrrrrrrrrrrrr", _state);
        switch (_state) {
          case "Initial":
            break;
          case "Establishing":
            break;
          case "Established":
            setupRemoteMedia(invitationRef.current);
            console.log("Invitation object:", invitationRef.current); // Add this line
            break;
          case "Terminating":
          case "Terminated":
            cleanupMedia();
            endCall();
            break;
          default:
            throw new Error("Unknown session state.");
        }
      });
      invitationRef.current = invitationRef.current;
      localAudioRef.current = invitationRef.current;
      invitationRef.current.accept();
      // localAudioRef.current.accept();
      props.setIncomingCall(false);
      props.setIncomingCallAccepted(true);
      props.setCallActivity("Accept call");
      props.setCallStatus("Answered");
      callActivitiesApi("Accept call", "Answered");
      setDirection("Inbound");

      start();
    }
  };

  const endCall = () => {
    if (
      (invitationRef.current && props.incomingCallAccepted) ||
      (invitationRef.current && props.OutgoingCall)
    ) {
      invitationRef.current.bye();

      // invitationRef.current.reject();
      props.setIncomingCallAccepted(false);
      props.setOutgoingCall(false);
      props.setCallActivity("Disconnect Call");
      props.setCallStatus("Disconnected");
      callActivitiesApi("Disconnect call", "Disconnected");
      agentInteractionSave("Answered");
      setDirection("Inbound");

      reset();
    } else if (invitationRef.current && props.incomingCall) {
      invitationRef.current.reject();
      props.setIncomingCallReject(true);
      props.setIncomingCall(false);
      props.setCallActivity("Disconnect Call");
      props.setCallStatus("Disconnected");
      // callActivitiesApi("Disconnect call", "Disconnected");
      setDirection("Inbound");

      reset();
    } else {
      console.log("no call to end");
    }
    console.log("endcallinvitatation", invitationRef);
  };

  // const endCall = () => {
  //   if (!invitationRef.current) {
  //     console.log("No invitation to end.");
  //     return;
  //   }

  //   const { state } = invitationRef.current;

  //   if (
  //     (state && props.incomingCallAccepted) ||
  //     (state && props.OutgoingCall)
  //   ) {
  //     invitationRef.current.bye();
  //     props.setIncomingCallAccepted(false);
  //     props.setOutgoingCall(false);
  //     props.setCallActivity("Disconnect Call");
  //     props.setCallStatus("Disconnected");
  //     callActivitiesApi("Disconnect call", "Disconnected");
  //     agentInteractionSave("Answered");
  //     reset();
  //   } else if (state && props.incomingCall) {

  //     invitationRef.current.reject();
  //     props.setIncomingCallReject(true);
  //     props.setIncomingCall(false);
  //     props.setCallActivity("Disconnect Call");
  //     props.setCallStatus("Disconnected");
  //     callActivitiesApi("Disconnect call", "Disconnected");
  //     // agentInteractionSave("Answered");
  //     reset();
  //   } else if (state && props.OutgoingCall) {

  //     invitationRef.current.cancel();
  //     props.setOutgoingCall(false);
  //     props.setCallActivity("Disconnect Call");
  //     props.setCallStatus("Disconnected");
  //     callActivitiesApi("Disconnect call", "Disconnected");
  //     agentInteractionSave("Answered");
  //     reset();
  //   } else {

  //     console.log("No call to end. Current state:", state);
  //   }

  //   console.log("endCall invitation", invitationRef);
  // };

  const endCallTransfer = () => {
    if (invitationRef.current && props.showTransferCall) {
      invitationRef.current.bye();
      props.setShowTransferCall(false);
      props.setIncomingCallAccepted(false);

      reset();
      localStorage.removeItem("TransferdialedNumber");
    } else {
      // transferedRef.current.reject();
      invitationRef.current.bye();

      props.setShowTransferCall(false);
      props.setIncomingCallAccepted(false);
      localStorage.removeItem("TransferdialedNumber");
    }
    invitationRef.current = null;
  };

  const completeTransfer = () => {
    endCallTransfer(); // End the transferred call

    // Additional logic to ensure the original call remains active
    if (originalCallRef.current) {
      // Check if the original call session exists
      console.log("Original call remains active:", originalCallRef.current);
      // Ensure original call session remains active
      // Additional logic can be added here if needed to reinforce the original call state
    } else {
      console.warn("Original call session not found.");
    }
  };

  if (userRole.length === 1) {
    return (
      <Grid container direction={"row"}>
        <audio ref={invitationRef} id="remoteAudio" />
        <audio ref={localAudioRef} id="localAudio" />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            elevation={6}
            variant="filled"
            severity="warning"
          >
            WebRTC Disconnected. Please check your network connection.
          </MuiAlert>
        </Snackbar>
        <Grid item xs={0.5}>
          <SideBar />
        </Grid>
        <Grid item xs={11.5}>
          <Grid container spacing={0.4} direction={"column"}>
            <Grid item xs={12}>
              <NavBar
                makeCall={makeCall}
                dialedNumber={dialedNumber}
                setDialedNumber={setDialedNumber}
                handleExtensionChange={handleExtensionChange}
                OpenMakecalldialer={OpenMakecalldialer}
                setOpenMakecalldialer={setOpenMakecalldialer}
              />
            </Grid>
            <Grid item xs={12}>
              <DashBoard
                acceptCall={acceptCall}
                makeCall={makeCall}
                endCall={endCall}
                muteUnmute={muteUnmute}
                holdUnhold={holdUnhold}
                transferCallApi={transferCallApi}
                isTransferInitiated={props.isTransferInitiated}
                setIsTransferInitiated={setIsTransferInitiated}
                ConferenceCallApi={ConferenceCallApi}
                callActivitiesApi={callActivitiesApi}
                // muteBrowserAudio={muteBrowserAudio}
                callActivity={props.callActivity}
                endCallTransfer={endCallTransfer}
                completeTransfer={completeTransfer}
                voiceseconds={voiceseconds}
                voiceminutes={voiceminutes}
                voicehours={voicehours}
                seconds={seconds}
                minutes={minutes}
                hours={hours}
                blindTransfer={blindTransfer}
                attendedTransfer={attendedTransfer}
                delegate={delegate}
                handleExtensionChange={handleExtensionChange}
                dialedNumber={dialedNumber}
                setDialedNumber={setDialedNumber}
                Opentransferdialer={Opentransferdialer}
                setOpentransferdialer={setOpentransferdialer}
                OpenConferencedialer={OpenConferencedialer}
                setOpenConferencedialer={setOpenConferencedialer}
                OpenSmallscreenDialer={OpenSmallscreenDialer}
                setOpenSmallscreenDialer={setOpenSmallscreenDialer}
                interactiontransferdialer={interactiontransferdialer}
                setinteractiontransferdialer={setinteractiontransferdialer}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container direction={"row"}>
        <audio ref={invitationRef} id="remoteAudio" />
        <audio ref={localAudioRef} id="localAudio" />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            elevation={6}
            variant="filled"
            severity="warning"
          >
            WebRTC Disconnected. Please check your network connection.
          </MuiAlert>
        </Snackbar>
        <Grid item xs={0.5}>
          <SideBar />
        </Grid>
        <Grid item xs={11.5}>
          <Grid container spacing={0.4} direction={"column"}>
            <Grid item xs={12}>
              <NavBar
                makeCall={makeCall}
                dialedNumber={dialedNumber}
                setDialedNumber={setDialedNumber}
                handleExtensionChange={handleExtensionChange}
                OpenMakecalldialer={OpenMakecalldialer}
                setOpenMakecalldialer={setOpenMakecalldialer}
              />
            </Grid>
            <Grid item xs={12}>
              <DashBoardSupervisor
                acceptCall={acceptCall}
                makeCall={makeCall}
                endCall={endCall}
                // pauseAudio={pauseAudio}
                // startAudio={startAudio}
                voiceseconds={voiceseconds}
                voiceminutes={voiceminutes}
                voicehours={voicehours}
                seconds={seconds}
                minutes={minutes}
                hours={hours}
                blindTransfer={blindTransfer}
                attendedTransfer={attendedTransfer}
                delegate={delegate}
                handleExtensionChange={handleExtensionChange}
                dialedNumber={dialedNumber}
                setDialedNumber={setDialedNumber}
                Opentransferdialer={Opentransferdialer}
                setOpentransferdialer={setOpentransferdialer}
                OpenConferencedialer={OpenConferencedialer}
                setOpenConferencedialer={setOpenConferencedialer}
                OpenSmallscreenDialer={OpenSmallscreenDialer}
                setOpenSmallscreenDialer={setOpenSmallscreenDialer}
                interactiontransferdialer={interactiontransferdialer}
                setinteractiontransferdialer={setinteractiontransferdialer}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default connect(mapStateToProps, {
  setIncomingCall,
  setIncomingCallAccepted,
  setIncomingCallReject,
  setOutgoingCallReject,
  setOutgoingCall,
  setDisplayExtNum,
  setDisplayOutgoingExtNum,
  setvoiceseconds,
  setvoiceminutes,
  setvoicehours,
  setAnswerScreen,
  setCallStatus,

  setShowMute,
  setShowUnMute,
  setShowHold,
  setShowUnHold,
  setTransferCall,
  setShowTransferCall,
  setConference,
  setMergeCall,
  setCallActivity,
  setIsTransferInitiated,
})(Main);
