import React, { useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import photo from "../../assests/cbm_assests/assets2/images/47.png";
import { motion } from "framer-motion";
import { MdCallEnd } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { setIncomingCall, setAnswerScreen } from "../../redux/actions/action";
import { connect } from "react-redux";
import AnswerCallScreen from "./AnswerCallScreen";

const mapStateToProps = (state) => {

  return {
    incomingCallAccepted: state.data.incomingCallAccepted,
    incomingCallReject: state.data.incomingCallReject,
    incomingCall: state.data.incomingCall,
    displayExtNum: state.data.displayExtNum,
    answerScreen: state.data.answerScreen,
  };
};

const IncomingCallScreen = (props) => {
  const { endCall } = props;
  const parentRef = useRef();

  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  const handleDragStart = (event, info) => {
    setDragStartPos({ x: info.point.x, y: info.point.y });
  };

  return (
    <>
      <Box
        className="draggable_main"
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          className="incomingScreen"
          drag
          dragConstraints=".draggable_main"
          onDragStart={handleDragStart}
        >
          <Box className="card" p={1.5} sx={{ maxWidth: "25rem" }}>
            <Stack direction="row" alignItems="center">
              <div>
                <img src={photo} alt="" />
              </div>
              <div style={{ position: "relative" }}>
                <div className="ms-3 d-flex align-items-center">
                  <Stack direction="column" className="mx-2">
                    <Typography style={{ fontSize: "15px" }}>
                      Sangeeth Jose
                    </Typography>
                    <Typography style={{ fontSize: "12px" }}>
                      {" "}
                      {props.displayExtNum}
                    </Typography>
                  </Stack>
                  <div className="d-flex mt-3 mx-2">
                    <button
                      type="button"
                      className="btn btn-success mb-1"
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "23px",
                      }}
                      onClick={() => {
                        props.acceptCall();
                      }}
                    >
                      <IoMdCall color="white" size={17} />
                    </button>
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
                  </div>
                </div>
                <Typography
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    fontSize: "12px",
                    marginRight: "13px",
                    marginTop: "-5px",
                  }}
                >
                  Incoming call...
                </Typography>
              </div>
            </Stack>
          </Box>

         
        </motion.div>
      </Box>
    </>
  );
};

export default connect(mapStateToProps, {
  setIncomingCall,
  setAnswerScreen,
})(IncomingCallScreen);
