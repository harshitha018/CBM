import React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Collapse from "@mui/material/Collapse";

import Typography from "@mui/material/Typography";

import Checkbox from "@mui/material/Checkbox";
import "./misscallcomp.css";

const MissedcallComp = () => {
  const [age, setAge] = React.useState("");
 

  return (
    <>
      <div className="container d-flex justify-content-center">
        <Card sx={{ maxWidth: 300 }}>
          <div style={{ height: "35px", background: "#0b3363" }}>
            <Typography
              className="h-100 text-white d-flex justify-content-center align-items-center"
              sx={{ fontSize: "11px" }}
            >
              SCHELDULE CALLBACK/SURVEY/REMINDERS
            </Typography>
          </div>

          <CardContent sx={{ width: "20vw" }}>
            <div className="row">
              <div className="col-md-6">
                <Typography
                  className="mx-auto fw-700 "
                  sx={{ fontSize: "12px" }}
                >
                  Date
                </Typography>
                <Typography className="mx-auto my-1 " sx={{ fontSize: "12px" }}>
                  Type
                </Typography>
                <Typography className="mx-auto my-3 " sx={{ fontSize: "12px" }}>
                  Digital Notification
                </Typography>
                <Typography className="mx-auto my-1 " sx={{ fontSize: "12px" }}>
                  Dail Plan/Queue
                </Typography>
                <Typography className="mx-auto my-1 " sx={{ fontSize: "12px" }}>
                  Sticky Agent
                  <Checkbox size="small" defaultChecked />
                </Typography>
                <Typography className="mx-auto my-1 " sx={{ fontSize: "12px" }}>
                  Assign Campaign
                </Typography>
              </div>
              <div className="col-md-6">
                <Typography className="mx-auto" sx={{ fontSize: "12px" }}>
                  Time
                </Typography>
                <div>
                  <select
                    className="form-select form-select-sm w-100 custome_select"
                    style={{ height: "28px" }}
                  >
                    <option style={{ fontSize: "12px" }}>Callback</option>
                    <option style={{ fontSize: "12px" }}>Appointment</option>
                    <option style={{ fontSize: "12px" }}>Reminder Call</option>
                    <option style={{ fontSize: "12px" }}>Survey</option>
                  </select>
                </div>
                <div className="my-1">
                  <select
                    className="form-select form-select-sm w-100 custome_select "
                    style={{ height: "28px" }}
                  >
                    <option style={{ fontSize: "12px" }}>None</option>
                    <option style={{ fontSize: "12px" }}>SMS</option>
                    <option style={{ fontSize: "12px" }}>IVR-TTS Blast</option>
                    <option style={{ fontSize: "12px" }}>IVR-Call(AL)</option>
                    <option style={{ fontSize: "12px" }}>Whatsapp</option>
                    <option style={{ fontSize: "12px" }}>Pre-Due IVR</option>
                    <option style={{ fontSize: "12px" }}>Post-Dur IVR</option>
                    <option style={{ fontSize: "12px" }}>Marketing</option>
                  </select>
                </div>
                <div className="my-2">--</div>
                <div className="my-2">
                  <span style={{ fontSize: "12px" }}>Monish</span>
                </div>
                <div className="my-2">
                  <span style={{ fontSize: "12px" }}>Survey Campaign</span>
                </div>
              </div>
            </div>
          </CardContent>

          <Collapse timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </>
  );
};

export default MissedcallComp;
