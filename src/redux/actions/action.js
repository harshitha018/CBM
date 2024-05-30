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
  SET_OPEN_SURVEY
} from "./type.js";

export const setDarkMode = (val) => (dispatch) => {
  dispatch({ type: SET_DARKMODE, val });
};

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
