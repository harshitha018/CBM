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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
 
  setShowUnMute,
  setShowHold,
  setShowUnHold,
  setTransferCall,
  setShowTransferCall,
  setConference,
  setShowConference,
  setMergeCall,
  setCallStatus,
  setCallActivity,
  setIsTransferInitiated,
  setIsConferenceInitiated,
} from "../redux/actions/action";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import DashBoardSupervisor from "./Dashboard-component-supervisor/DashBoardSupervisor";
import axios from "axios";
import { BaseUrl } from "./Constant/BaseUrl";
import PreviewDialer from "./Dashboard-component/PreviewDialer";
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

    showUnMute: state.data.showUnMute,
    showHold: state.data.showHold,
    showUnHold: state.data.showUnHold,
    transferCall: state.data.transferCall,
    showTransferCall: state.data.showTransferCall,
    conference: state.data.conference,
    showConference: state.data.showConference,
    mergecall: state.data.mergecall,
    callActivity: state.data.callActivity,
    isTransferInitiated: state.data.isTransferInitiated,
    agentInteraction: state.data.agentInteraction,
    makecallApi: state.data.makecallApi,
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
  const domain = "cognicx.callanywhere.co.in"
  const port = 8089
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
  // const [domain, setDomain] = useState("cognicx.callanywhere.co.in");
  // const [port, setPort] = useState(8089);
  const [fromdate, setFromdate] = useState(defaultValue);
  const [direction, setDirection] = useState("Outbound");
  const [showMute, setShowMute] = useState(false);
  // console.log("vvvvvvvvvvvvvvvvvv", showMute);


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
    const sipId = JSON.parse(localStorage.getItem("Sipid"));

    await axios
      .post(
        BaseUrl + "/agent/activity",

        {
          agentId: userDetails[0].userId,
          sipId: sipId,
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

  // MAKECALL API //
  const makecallApi = async (makecallActivity, makecallstatus) => {
    const dialedNumber = localStorage.getItem("dialedNumber");
    const OutgoingSipID = localStorage.getItem("outgoingSipID");

    await axios
      .post(
        BaseUrl + "/agent/activity",

        {
          agentId: userDetails[0].userId,
          sipId: OutgoingSipID,
          callerNumber: dialedNumber,
          callStatus: makecallstatus,
          activity: makecallActivity,
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
        console.log("makecallRESPONSE", res);
        if (res.data.status) {
          props.setCallActivity(res.data.data);
        } else {
          console.log("makecallERRORELSE_STATE");
        }
      })
      .catch((err) => {
        console.log("makecallERROR", err);
      });
  };

  // AGENTINTERACTION SAVE //
  const agentInteractionSave = async (Callstatusvalue2) => {
    const sipId = JSON.parse(localStorage.getItem("Sipid"));
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
          aniNumber: 3002,
          agentId: userDetails[0].userId,
          sipId: sipId,
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
  
  // MUTE/UNMUTE API //
  const mediaElement = document.getElementById("localAudio");
  const remoteAudioElement = document.getElementById("remoteAudio");
  const remoteStream = new MediaStream();

  const muteUnmute = async (muteActivity, muteStatus, invitation) => {
    console.log("mute unmute trigger");

    try {
      const OutgoingSipID = localStorage.getItem("outgoingSipID");
      const dialedNumber = localStorage.getItem("dialedNumber");
      const tenantId = localStorage.getItem("TenantId");
      const userId = userDetails[0].userId;

      const response = await axios.post(
        BaseUrl + "/agent/activity",
        {
          agentId: userId,
          sipId: OutgoingSipID,
          callerNumber: dialedNumber,
          callStatus: muteStatus,
          activity: muteActivity,
          direction: direction,
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
        const mediaElement = document.getElementById("localAudio");
        const remoteAudioElement = document.getElementById("remoteAudio");
        // Mute or unmute the local audio element
        if (muteStatus === "Mute") {
          alert("mute audio");
          if (mediaElement) {
            mediaElement.muted = true;
            console.log("Local audio element muted:", mediaElement.muted);
          }
          setShowMute(true);
        } else {
          alert("UNmute audio");
          if (mediaElement) {
            mediaElement.muted = false;
            console.log("Local audio element unmuted:", mediaElement.muted);
          }
          setShowMute(false);
          setupRemoteMedia(invitation);
        }
      } else {
        console.log("Error muting/unmuting:", response.data.message);
      }
    } catch (error) {
      console.error("Error muting/unmuting:", error);
    }
  };
  // HOLD/UNHOLD API //
  const holdUnhold = async (holdActivity, holdStatus) => {

    if (!simpleUser || !simpleUser.session) {
      console.error("No active session found to hold/unhold.");
      return;
    }

    try {
      const OutgoingSipID = localStorage.getItem("outgoingSipID");
      const dialedNumber = localStorage.getItem("dialedNumber");
      const tenantId = localStorage.getItem("TenantId");
      const userId = userDetails[0].userId;
      const sipId = JSON.parse(localStorage.getItem("Sipid"));

      const response = await axios.post(
        BaseUrl + "/agent/activity",
        {
          agentId: userId,
          sipId: OutgoingSipID,
          callerNumber: dialedNumber,
          callStatus: holdStatus,
          activity: holdActivity,
          direction: direction,
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
         await simpleUser.hold();

          props.setShowHold(false);
          console.log("Call placed on hold.");
        } else {
        await simpleUser.unhold();

          props.setShowHold(true);
          console.log("Call resumed on hold.");
        }
      } else {
        console.log("Failed to update hold status in API.");
      }
    } catch (error) {
      console.error("Error holding/unholding:", error);
    }
  };

  // TRANSFER API //
  const transferCallApi = async (
    transferActivity,
    transferStatus,
    transferdialerNumber
  ) => {
    try {
      const TransferSipID = localStorage.getItem("TransferSipID");
      const tenantId = localStorage.getItem("TenantId");
      const userId = userDetails[0].userId;
      console.log("TransferSipIDddddddddddddddddd", TransferSipID);

      const response = await axios.post(
        BaseUrl + "/agent/activity",
        {
          agentId: userId,
          sipId: TransferSipID,
          callerNumber: transferdialerNumber,
          callStatus: transferStatus,
          activity: transferActivity,
          direction: direction,
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
      const ConferenceSipID = localStorage.getItem("ConferenceSipID");
      const dialedNumber = localStorage.getItem("dialedNumber");
      const tenantId = localStorage.getItem("TenantId");
      const userId = userDetails[0].userId;
      const sipId = JSON.parse(localStorage.getItem("Sipid"));
      console.log("ConferenceeeeeeSipIDddddddddddddddddd", ConferenceSipID);

      const response = await axios.post(
        BaseUrl + "/agent/activity",
        {
          agentId: userId,
          sipId: ConferenceSipID,
          callerNumber: conferencedialerNumber,
          callStatus: conferenceStatus,
          activity: conferenceActivity,
          direction: direction,
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

  // Mute or unmute the local WebRTC audio tracks
  // MUTE/UNMUTE FUNTIONALITY //
  const handleMuteButtonClick = (muteStatus) => {
    if (invitationRef.current) {
      alert(`triggering ${muteStatus}`);
      muteUnmute("muteActivity", muteStatus, invitationRef.current);
    } else {
      console.error("Invitation is not available");
    }
  }; 

  const setupRemoteMedia = (invitation) => {
    const remoteStream = new MediaStream();
    const mediaElement = document.getElementById("localAudio");
    const remoteAudioElement = document.getElementById("remoteAudio");

    remoteStream.getTracks().forEach(track => {
      track.stop();
      remoteStream.removeTrack(track);
    });

    invitation.sessionDescriptionHandler.peerConnection
      .getReceivers()
      .forEach((receiver) => {

        if (!showMute || (receiver.track && receiver.track.kind === "audio")) {
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
    const uri = UserAgent.makeURI(`sip:3002@${domain}:${port}`);

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
      aor: `sip:3002@${domain}`,
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
      const sipId = localStorage.setItem(
        "Sipid",
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
      authorizationPassword: "3002",
      authorizationUsername: "3002",

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
console.log("registerrr",registerer)
      userAgent.start().then(() => {
        registerer.register();
      });
      userAgentRef.current = userAgent;

      // Connect to the WebSocket server
      const server = `wss://${domain}:${port}/ws`;
    let simpleUser = new SimpleUser(server, options);
      setsimpleUser(simpleUser);
      await simpleUser.connect();
      console.log("WebRTC Connected Successfully");
      console.log("iswgggggggggggggg",isWebRTCConnected)
      setIsWebRTCConnected(true);

      simpleUser.session = simpleUser.session || null; // Ensure session is defined
      console.log("simpleUser session:", simpleUser.session);
    } catch (error) {
      console.error("WebRTC DisConnected :", error);
      setIsWebRTCConnected(false);
    }
  };

  useEffect(() => {
    initializeUserAgent();
  }, []);

  // WEBRTC //

  const makeCall = (dialedNumber) => {
    console.log("itemmmmmminmakecall", dialedNumber);
    localStorage.setItem("dialedNumber", dialedNumber);
    console.log("Dialed Number:", dialedNumber);
    const targetUri = `sip:${dialedNumber}@${domain}:${port}`;
    const target = UserAgent.makeURI(targetUri);
    const inviter = new Inviter(userAgentRef.current, target);
    console.log("makecall444444", userAgentRef, inviter, target);
    const OutgoingSipID = localStorage.setItem(
      "outgoingSipID",
      JSON.stringify(inviter.outgoingRequestMessage.callId)
    );
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
          // callActivitiesApi("Accept call", "Answered");
          break;
        case "Terminating":
        case "Terminated":
          cleanupMedia();
          endCall();
          props.setOutgoingCall(false);
          break;
        default:
          throw new Error("Unknown session state.");
      }
    });
    inviter.invite();
    invitationRef.current = inviter;
    localAudioRef.current = inviter;
    transferedRef.current = inviter;
    makecallApi("make call", "call made");
    props.setOutgoingCall(true);

    reset();
    console.log("targetUriiiiiiiiiiiiiiiiiiiii", transferedRef);
  };

  // BLIND TRANSFER //
  // const blindTransfer = (transferdialerNumber) => {
  //   alert("inside blind")
  //   const targetUri = `sip:${transferdialerNumber}@${domain}:${port}`;
  //   const target = UserAgent.makeURI(targetUri);
  //   // sessionRef.current.refer(target);
  //   invitationRef.current(target);

  // };

  // const blindTransfer = (transferdialerNumber) => {
  //   alert("inside blindTransfer");
  //   const targetUri = `sip:${transferdialerNumber}@${domain}:${port}`;
  //   const target = UserAgent.makeURI(targetUri);

  //   if (invitationRef.current) {
  //     invitationRef.current
  //       .refer(target)
  //       .then(() => {
  //         console.log("Transfer initiated successfully");
  //         if (props.transferCall == true) {
  //           console.log("insde if");
  //           transferCallApi(
  //             "Blind Transfered",
  //             "Complete blind transfer",
  //             localStorage.getItem("TransferdialedNumber")
  //           );
  //           invitationRef.current.bye();
  //         } else {
  //           console.log("insde else");
  //           transferCallApi(
  //             "No active blind transfered",
  //             "Not complete the blind transfer",
  //             localStorage.getItem("TransferdialedNumber")
  //           );
  //           invitationRef.current.bye();
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error initiating transfer:", error);
  //       });
  //   } else {
  //     console.error("No current session to transfer");
  //   }
  // };

  const blindTransfer = (transferdialerNumber) => {
    alert("inside blindTransfer");
    const targetUri = `sip:${transferdialerNumber}@${domain}:${port}`;
    const target = UserAgent.makeURI(targetUri);

    if (invitationRef.current) {
      // Check if the session is active before attempting the transfer
      if (invitationRef.current.state !== SessionState.Terminated) {
        invitationRef.current
          .refer(target)
          .then(() => {
            console.log("Transfer initiated successfully");
            if (props.transferCall === true) {
              console.log("inside if");
              transferCallApi(
                "Blind Transferred",
                "Complete blind transfer",
                localStorage.getItem("TransferdialedNumber")
              );
              invitationRef.current.bye();
            } else {
              console.log("inside else");
              transferCallApi(
                "No active blind transferred",
                "Not complete the blind transfer",
                localStorage.getItem("TransferdialedNumber")
              );
              invitationRef.current.bye();
            }
          })
          .catch((error) => {
            console.error("Error initiating transfer:", error);
          });
      } else {
        console.error("Cannot transfer: Session is already terminated");
      }
    } else {
      console.error("No current session to transfer");
    }
  };

  // Attended TRANSFER //
  const attendedTransfer = (transferdialerNumber) => {
    alert("inside attendedTransfer");
    console.log("inside attendedTransfer", transferdialerNumber);
    const transferTargetUri = `sip:${transferdialerNumber}@${domain}:${port}`;
    const transferTarget = UserAgent.makeURI(transferTargetUri);
    const transferInviter = new Inviter(userAgentRef.current, transferTarget);
    transferInviter.invite();
    invitationRef.current = transferInviter;
    console.log("attendedREFFFFFF", invitationRef);
    console.log("attendedINVITer", transferInviter);
    props.setShowTransferCall(true);
    const TransferSipID = localStorage.setItem(
      "TransferSipID",
      JSON.stringify(transferInviter.outgoingRequestMessage.callId)
    );
    if (props.transferCall) {
      transferCallApi(
        "Transfer Completed",
        "Completed Transfer",
        localStorage.getItem("TransferdialedNumber")
      );
      props.setIsTransferInitiated(true);
    } else {
      transferCallApi(
        "No active transfer to complete",
        localStorage.getItem("TransferdialedNumber")
      );
    }
  };

  // COMPLETE TRANSFER //
  const completeTransfer = () => {
    alert("inside complet");
    if (invitationRef.current) {
      transferCallApi(
        "Transfer Completed",
        "Completed Transfer",
        localStorage.getItem("TransferdialedNumber")
      );
      props.setShowTransferCall(false);
      props.setIsTransferInitiated(false);
      invitationRef.current.bye();
      reset();
      localStorage.removeItem("TransferdialedNumber");
    } else {
      console.log("No active transfer to complete");
    }
  };

  // CONFERENCE FUNCTION //
  const conferencefuntion = (conferencedialerNumber) => {
    alert("conferencceeeeeeee", conferencedialerNumber);
    const confTargetUri = `sip:${conferencedialerNumber}@${domain}:${port}`;
    const confTarget = UserAgent.makeURI(confTargetUri);
    const confInviter = new Inviter(userAgentRef.current, confTarget);
    confInviter.invite();
    invitationRef.current = confInviter;
    console.log("conferenceeFuntionnnnnn", confInviter);

    // const conferenceSIpID = localStorage.setItem("conferenceSIpID",JSON.stringify())
    props.setShowConference(true);

    const ConferenceSipID = localStorage.setItem(
      "ConferenceSipID",
      JSON.stringify(confInviter.outgoingRequestMessage.callId)
    );
    if (props.conference) {
      ConferenceCallApi(
        "Conference Completed",
        "Completed Conference",
        localStorage.getItem("conferencedialerNumber")
      );
    } else {
      ConferenceCallApi(
        "No active transfer to complete",
        localStorage.getItem("conferencedialerNumber")
      );
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
      (invitationRef.current && props.OutgoingCall) ||
      (invitationRef.current && props.showTransferCall) ||
      (invitationRef.current && props.showConference)
    ) {
      invitationRef.current.bye();
      props.setIncomingCallAccepted(false);
      props.setIncomingCall(false);
      props.setOutgoingCall(false);
      props.setShowTransferCall(false);
      props.setShowConference(false);
      props.setCallActivity("Disconnect Call");
      props.setCallStatus("Disconnected");
      callActivitiesApi("Disconnect call", "Disconnected");
      agentInteractionSave("Answered");
      if (props.OutgoingCall) {
        setDirection("Outbound");
      } else if (props.incomingCallAccepted) {
        setDirection("Inbound");
      }

      reset();
      localStorage.removeItem("TransferdialedNumber");
    } else if (invitationRef.current && props.incomingCall) {
      invitationRef.current.reject();
      props.setIncomingCallReject(true);
      props.setIncomingCallAccepted(false);
      props.setIncomingCall(false);
      props.setOutgoingCall(false);
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
      transferedRef.current.reject();

      props.setShowTransferCall(false);
      props.setIncomingCallAccepted(false);
      localStorage.removeItem("TransferdialedNumber");
    }
    invitationRef.current = null;
  };

  if (userRole.length === 1) {
    return (
      <>
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
                  handleMuteButtonClick={handleMuteButtonClick}
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
                  conferencefuntion={conferencefuntion}
                  delegate={delegate}
                  handleExtensionChange={handleExtensionChange}
                  showMute={showMute}
                  setShowMute={setShowMute}
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
      </>
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

  setShowUnMute,
  setShowHold,
  setShowUnHold,
  setTransferCall,
  setShowTransferCall,
  setConference,
  setShowConference,
  setMergeCall,
  setCallActivity,
  setIsTransferInitiated,
  setIsConferenceInitiated,
})(Main);
