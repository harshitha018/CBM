import React from "react";
// import Card from "@mui/material/Card";

// import CardContent from "@mui/material/CardContent";

import Collapse from "@mui/material/Collapse";

import Typography from "@mui/material/Typography";

import Checkbox from "@mui/material/Checkbox";

import UserIcon from "./missedCallAssets/user.png";
import IncomingCAllIcon from "./missedCallAssets/incoming-call.png";
import MissedCAllIcon from "./missedCallAssets/missed-call.png";
import OutgoingCAllIcon from "./missedCallAssets/outgoing-call.png";
import CallNotification from "./notificationAssets/phone.png";
import SlillIcon from "./notificationAssets/abilities.png";
import PreviewDialIcon from "./notificationAssets/dial.png";

const NotificationComp = () => {
  

  return (
    <>
      <div className="container">
        <div className="card" style={{ height: "70px" }}>
          <div className="card-body d-flex align-items-center">
            <div style={{ flexShrink: 0 }}>
              <img
                src={CallNotification}
                alt="CallNotification"
                style={{ height: "40px" }}
              />
            </div>
            <div className="d-inline-block ml-3" style={{ flexGrow: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                Your supervisor (Sarath.k / 3001) has changed your role to
                Inbound from Outbound
              </div>
            </div>
            <div className="d-inline-block ml-3 ">
              <div
                style={{
                  fontSize: "12px",
                  color: "gray",
                  position: "absolute",
                  right: "20px",
                  top: "2px",
                }}
              >
                1 day ago
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ height: "70px" }}>
          <div className="card-body d-flex align-items-center">
            <div style={{ flexShrink: 0 }}>
              <img
                src={CallNotification}
                alt="CallNotification"
                style={{ height: "40px" }}
              />
            </div>
            <div className="d-inline-block ml-3" style={{ flexGrow: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                Your supervisor (Sarath.k / 3001) has changed your role to Blend
              </div>
            </div>
            <div className="d-inline-block ml-3 ">
              <div
                style={{
                  fontSize: "12px",
                  color: "gray",
                  position: "absolute",
                  right: "20px",
                  top: "2px",
                }}
              >
                1 hour ago
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ height: "70px" }}>
          <div className="card-body d-flex align-items-center">
            <div style={{ flexShrink: 0 }}>
              <img src={SlillIcon} alt="SlillIcon" style={{ height: "40px" }} />
            </div>
            <div className="d-inline-block ml-3" style={{ flexGrow: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                You have been assigned additional skillset (Sales) with
                Profiency level = 2
              </div>
            </div>
            <div className="d-inline-block ml-3 ">
              <div
                style={{
                  fontSize: "12px",
                  color: "gray",
                  position: "absolute",
                  right: "20px",
                  top: "2px",
                }}
              >
                30 min ago
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ height: "70px" }}>
          <div className="card-body d-flex align-items-center">
            <div style={{ flexShrink: 0 }}>
              <img
                src={PreviewDialIcon}
                alt="PreviewDialIcon"
                style={{ height: "40px" }}
              />
            </div>
            <div className="d-inline-block ml-3" style={{ flexGrow: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                You have been assigned a new Preview calling list
                (Campaign_Name) with list length = 70
              </div>
            </div>
            <div className="d-inline-block ml-3 ">
              <div
                style={{
                  fontSize: "12px",
                  color: "gray",
                  position: "absolute",
                  right: "20px",
                  top: "2px",
                }}
              >
                5 hours ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationComp;
