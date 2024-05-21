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
  SET_MERGECALL,
  SET_CALL_ACTIVITY,
  SET_AGENT_INTERACTION,
  SET_MAKING_TRANSFERCALL,
  SET_OPEN_SURVEY
} from "../redux/actions/type";

export const initialState = {
  darkMode: false,
  incomingCall: false,
  incomingCallAccepted: false,
  incomingCallReject: false,
  OutgoingCallReject: false,
  OutgoingCall: false,
  displayExtNum: "",
  displayOutgoingExtNum: "",
  voiceseconds: "",
  voiceminutes: "",
  voicehours: "",
  answerScreen: false,
  status: "Not Ready",
  callStatus: "",

  showMute: true,
  showUnMute: false,

  showHold: false,
  showUnHold: false,

  transferCall: false,
  showTransferCall: false,
  isTransferInitiated: false,
  conference: false,
  mergecall: false,
  callActivity: "",
  agentInteraction: false,

  makingTransferCall: false,
  conference: false,
  mergecall: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DARKMODE: {
      return {
        ...state,
        darkMode: action.val,
      };
    }

    case SET_CALL_STATUS: {
      return {
        ...state,
        callStatus: action.val,
      };
    }

    
    case SET_OPEN_SURVEY: {
      return {
        ...state,
        opensurvey: action.val,
      };
    }

    case SET_CHANGE_STATUS: {
      return {
        ...state,
        status: action.val,
      };
    }

    case SET_INCOMING_CALL: {
      return {
        ...state,
        incomingCall: action.val,
      };
    }

    case SET_INCOMING_CALL_ACCEPTED: {
      return { ...state, incomingCallAccepted: action.payload };
    }

    case SET_INCOMING_CALL_REJECT: {
      return { ...state, incomingCallReject: action.payload };
    }

    case SET_OUTGOING_CALL_REJECT: {
      return { ...state, OutgoingCallReject: action.payload };
    }

    case SET_OUTGOING_CALL: {
      return {
        ...state,
        OutgoingCall: action.val,
      };
    }

    case SET_DISPLAY_EXT_NUM: {
      return {
        ...state,
        displayExtNum: action.val,
      };
    }

    case SET_DISPLAY_OUTGOING_EXT_NUM: {
      return {
        ...state,
        displayOutgoingExtNum: action.val,
      };
    }

    case SET_VOICE_SECONDS: {
      return {
        ...state,
        voiceseconds: action.val,
      };
    }
    case SET_VOICE_MINUTES: {
      return {
        ...state,
        voiceminutes: action.val,
      };
    }
    case SET_VOICE_HOURS: {
      return {
        ...state,
        voicehours: action.val,
      };
    }

    case SET_ANSWER_SCREEN: {
      return {
        ...state,
        answerScreen: action.val,
      };
    }

    case SET_SHOW_MUTE: {
      return {
        ...state,
        showMute: action.val,
      };
    }

    case SET_SHOW_UNMUTE: {
      return {
        ...state,
        showUnMute: action.val,
      };
    }

    case SET_SHOW_HOLD: {
      return {
        ...state,
        showHold: action.val,
      };
    }

    case SET_SHOW_UNHOLD: {
      return {
        ...state,
        showUnHold: action.val,
      };
    }

    case SET_TRANSFERCALL: {
      return {
        ...state,
        transferCall: action.val,
      };
    }

    case SET_SHOW_TRANSFERCALL: {
      return { ...state, showTransferCall: action.val };
    }

    case SET_IS_TRANSFER_INITIATED: {
      return { ...state, isTransferInitiated: action.val };
    }

    case SET_CONFERENCE: {
      return {
        ...state,
        conference: action.val,
      };
    }

    case SET_MERGECALL: {
      return {
        ...state,
        mergecall: action.val,
      };
    }

    case SET_CALL_ACTIVITY: {
      return {
        ...state,
        callActivity: action.val,  
      };
    }

    case SET_AGENT_INTERACTION: {
      return {
        ...state,
        agentInteraction: action.val,
      };
    }

    case SET_MAKING_TRANSFERCALL: {
      return {
        ...state,
        makingTransferCall: action.val,
      };
    }

    default:
      return state;
  }
};
