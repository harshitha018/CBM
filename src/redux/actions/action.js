import { UserAgent, Registerer, Inviter, SessionState } from "sip.js";

import {
  SET_DARKMODE,
  SET_INCOMING_CALL,
  SET_INCOMING_CALL_ACCEPTED,
  SET_INCOMING_CALL_REJECT,
  SET_OUTGOING_CALL_REJECT,
  SET_OUTGOING_CALL,
  SET_DISPLAY_EXT_NUM,
  SET_DISPLAY_OUTGOING_EXT_NUM,
  SET_VOICE_SECONDS,
  SET_VOICE_MINUTES,
  SET_VOICE_HOURS,
  SET_ANSWER_SCREEN,
  SET_CHANGE_STATUS,
  SET_CALL_STATUS,
  SET_SHOW_MUTE,
  SET_SHOW_UNMUTE,
  SET_SHOW_HOLD,
  SET_SHOW_UNHOLD,
  SET_TRANSFERCALL,
  SET_SHOW_TRANSFERCALL,
  SET_IS_TRANSFER_INITIATED,
  SET_CONFERENCE,
  SET_SHOW_CONFERENCE,
  SET_IS_CONFERENCE_INITIATED,
  SET_MERGECALL,
  SET_CALL_ACTIVITY,
  SET_AGENT_INTERACTION,
  SET_MAKING_TRANSFERCALL,
  SET_OPEN_SURVEY,
  SET_MAKECALL_API,
  SET_ASTERIK_LOGIN
} from "./type.js";
import { useEffect, useRef } from "react";

export const setDarkMode = (val) => (dispatch) => {
  dispatch({ type: SET_DARKMODE, val });
};

export const setAsterikLogin = (val) =>(dispatch)=>{
  dispatch({type:SET_ASTERIK_LOGIN, val})
}
export const setOpensurvey = (val) => (dispatch) => {
  dispatch({ type: SET_OPEN_SURVEY, val });
};

export const setCallStatus = (val) => (dispatch) => {
  dispatch({ type: SET_CALL_STATUS, val });
};

export const setIncomingCall = (val) => (dispatch) => {
  dispatch({ type: SET_INCOMING_CALL, val });
};

export const setChangestatus = (val) => (dispatch) => {
    console.log(val);
  dispatch({ type: SET_CHANGE_STATUS, val });
};

export const setIncomingCallAccepted = (accepted) => ({
  type: SET_INCOMING_CALL_ACCEPTED,
  payload: accepted,
});

export const setIncomingCallReject = (cancelled) => ({
  type: SET_INCOMING_CALL_REJECT,
  payload: cancelled,
});

export const setOutgoingCallReject = (cancelled) => ({
  type: SET_OUTGOING_CALL_REJECT,
  payload: cancelled,
});

export const setOutgoingCall = (val) => (dispatch) => {
  dispatch({ type: SET_OUTGOING_CALL, val });
};


export const setDisplayExtNum = (val) => (dispatch) => {
  dispatch({ type: SET_DISPLAY_EXT_NUM, val });
};

export const setDisplayOutgoingExtNum = (val) => (dispatch) => {
  dispatch({ type: SET_DISPLAY_OUTGOING_EXT_NUM, val });
};


export const setvoiceseconds = (val) => (dispatch) => {
  dispatch({ type: SET_VOICE_SECONDS, val });
};
export const setvoiceminutes = (val) => (dispatch) => {
  dispatch({ type: SET_VOICE_MINUTES, val });
};
export const setvoicehours = (val) => (dispatch) => {
  dispatch({ type: SET_VOICE_HOURS, val });
};

export const setAnswerScreen = (val) => (dispatch) => {
  dispatch({ type: SET_ANSWER_SCREEN, val });
};

export const setShowMute = (val) => (dispatch) => {
  dispatch({ type: SET_SHOW_MUTE, val });
};

export const setShowUnMute = (val) => (dispatch) => {
  dispatch({ type: SET_SHOW_UNMUTE, val });
};

export const setShowHold = (val) => (dispatch) => {
  dispatch({ type: SET_SHOW_HOLD, val });
};

export const setShowUnHold = (val) => (dispatch) => {
  dispatch({ type: SET_SHOW_UNHOLD, val });
};

export const setTransferCall = (val) => (dispatch) => {
  dispatch({ type: SET_TRANSFERCALL, val });
};



export const setShowTransferCall = (val) => (dispatch) => {
  dispatch({ type: SET_SHOW_TRANSFERCALL, val });
};

export const setIsTransferInitiated = (val) => (dispatch) => {
  dispatch({ type: SET_IS_TRANSFER_INITIATED, val });
};

export const setIsConferenceInitiated = (val) => (dispatch) => {
  dispatch({ type: SET_IS_CONFERENCE_INITIATED, val });
};

export const setMakingTransferCall = (val) => (dispatch) => {
  dispatch({ type: SET_MAKING_TRANSFERCALL, val });
};

export const setConference = (val) => (dispatch) => {
  dispatch({ type: SET_CONFERENCE, val });
}; 

export const setShowConference = (val) => (dispatch) => {
  dispatch({ type: SET_SHOW_CONFERENCE, val });
}; 

export const setMergeCall = (val) => (dispatch) => {
  dispatch({ type: SET_MERGECALL, val });
};

export const setCallActivity = (val) => (dispatch) => {
  dispatch({ type: SET_CALL_ACTIVITY, val });
};

export const setAgentInteraction = (val) => (dispatch) => {
  dispatch({ type: SET_AGENT_INTERACTION, val });
};

export const setMakecallApi = (val) => (dispatch) => {
  dispatch({ type: SET_MAKECALL_API, val });
};

// const userAgentRef = useRef(null);


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

    simpleUser.session = simpleUser.session || null; // Ensure session is defined
    console.log("simpleUser session:", simpleUser.session);
  } catch (error) {
    console.error("Error starting UserAgent:", error);
    setIsWebRTCConnected(false);
  }
};


// useEffect(() => {
//   initializeUserAgent();
// }, []);




export const makeCall = (dialedNumber) => {
  console.log("ookyyyyyy", dialedNumber);
  localStorage.setItem("dialedNumber", dialedNumber);
  console.log("Dialed Number:", dialedNumber);
  const targetUri = `sip:${dialedNumber}@${"cognicx.callanywhere.co.in"}:${8089}`;
  const target = UserAgent.makeURI(targetUri);
  const inviter = new Inviter(userAgent, target);
  console.log("makecall444444", userAgent, inviter, target,UserAgent);
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
        break;
      default:
        throw new Error("Unknown session state.");
    }
  });
  inviter.invite();
  invitationRef.current = inviter;
  localAudioRef.current = inviter;
  transferedRef.current = inviter;
  props.makecallApi("make call", "call made");
  props.setOutgoingCall(true);

  reset();
  console.log("targetUriiiiiiiiiiiiiiiiiiiii", transferedRef);
};