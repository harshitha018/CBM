import { Button, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import moment from "moment";
import { setChangestatus } from '../../redux/actions/action';
import { AsterikConnectivityLogin } from '../../utils/api';
import axios from 'axios';

const AgentCurrentStatus = () => {
    const AgentStatus = useSelector(state=>state.data.status)
    const AsterikLogin = useSelector(state =>state.data.asterikLogin)


    const userDetails = JSON.parse(localStorage.getItem("userinformation"));
    const accessToken = userDetails.accessToken
    const pbxNumber = userDetails.pbxExt
    const userName = userDetails.userName
    console.log(AsterikLogin)
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const [statuslist, setStatuslist] = useState([]);
    const [currentTimeforReady, setCurrentTimeforReady] = useState(
        moment().startOf("day")
      );
      const [currentTimeforBreak, setCurrentTimeforBreak] = useState(
        moment().startOf("day")
      );
    
    const open = Boolean(anchorEl);
    const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);

    const formattedTimeforReady = currentTimeforReady.format("HH:mm:ss");
    const formattedTimeforBreak = currentTimeforBreak.format("HH:mm:ss");
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
    const reasoncodeList = async () => {
        try {
          const response = await axios.post(
            BaseUrl + "/agent/userStatus/list",
            { type: "skill" },
            {
              headers: {
                "Content-Type": "application/json",
                TenantID: localStorage.getItem("TenantId"),
              },
            }
          );
          console.log(response.data.status);
          if (response.data.status === "OK") {
            // setStatuslist(response.data.dataList);
            setStatuslist(["Tea","Meeting"])
          }
        } catch (error) {
          console.error("Error fetching reason codes:", error);
        }
      };
    
      const handelUpdateStatus = async (item) => {
        dispatch(setChangestatus(item))
        try {
          const response = await axios.post(
            `${BaseUrl}/agent/updateStatus?agentId=${userDetails.userId}&status=${item}`,
    
            {
              headers: {
                "Content-Type": "application/json",
                TenantID: localStorage.getItem("TenantId"),
              },
            }
          );
          console.log(response.data.status);
          if (response.data.status === "OK") {
            // dispatch(setChangestatus(response.data.data.status))
          }
        } catch (error) {
          console.error("Error fetching reason codes:", error);
        }
      };

      const handleSubmenuClick = (event) => {
        console.log(event);
        setSubmenuAnchorEl(event.currentTarget);
      };
    
      const handleSubmenuClose = () => {
        setSubmenuAnchorEl(null);
      };
    

      useEffect(() => {
        let intervalIdReady = null;
        let intervalIdBreak = null;
      
        // Reset timers when status changes
        setCurrentTimeforReady(moment().startOf("day")); // Reset 'Ready' timer
        setCurrentTimeforBreak(moment().startOf("day")); // Reset 'Break' timer
      
        // Clear previous intervals if they exist
        if (intervalIdReady) {
          clearInterval(intervalIdReady);
        }
        if (intervalIdBreak) {
          clearInterval(intervalIdBreak);
        }
      
        // Start the timer for 'Ready' status
        if (AgentStatus === "Ready") {
          intervalIdReady = setInterval(() => {
            setCurrentTimeforReady((prevTime) => prevTime.add(1, "second"));
          }, 1000);
        }
      
        // Start the timer for other statuses
        if (AgentStatus !== "Ready" && statuslist && statuslist.length > 0) {
          intervalIdBreak = setInterval(() => {
            setCurrentTimeforBreak((prevTime) => prevTime.add(1, "second"));
          }, 1000);
        }
      
        // Cleanup function to clear intervals
        return () => {
          if (intervalIdReady) {
            clearInterval(intervalIdReady);
          }
          if (intervalIdBreak) {
            clearInterval(intervalIdBreak);
          }
        };
      }, [AgentStatus, statuslist]);
      useEffect(() => {
        reasoncodeList();
      }, []);
      useEffect(() => {
        console.log(AsterikConnectivityLogin)
        console.log(AgentStatus)
        console.log(pbxNumber)
        console.log(userName)
        console.log(accessToken)
        const connectToAsterisk = async () => {
          try {
            const response = await axios.post(
              AsterikConnectivityLogin,
              {
                "queueId": "",
                "pbxExt": pbxNumber,
                "agentName": userName,
                "action": AgentStatus === "Not Ready" ? "pause" : null,
                "reason": "",
                "actionId": ""
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  TenantID: localStorage.getItem("TenantId"),
                  Authorization: "Bearer " + accessToken
                }
              }
            );
            // Handle the response from Asterisk Connectivity login
            if (response.status === 200) {
              console.log("Login successful:", response.data);
            } else {
              console.log("Login failed with status:", response.status);
            }
          } catch (error) {
            console.error("Error during Asterisk Connectivity login:", error);
          }
        };
      
        connectToAsterisk();
      }, []);
      console.log(statuslist)
      console.log(AgentStatus)
    
  return (
    <div className="card-body">
    <div className="d-flex justify-content-between align-items-center">
      <div>
        {/* Status */}
        <Button
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          size="small"
          sx={{
            fontSize: "9px",
            borderRadius: "5px",
            width: "auto",
            height: "20px",
            marginLeft: "5px",
          }}
          color={AgentStatus == "Ready" ? "success" : "error"}
        >
          {AgentStatus}
        </Button>

        <Menu
          id="dropdown-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "dropdown-button",
          }}
        >
          {AgentStatus !== "Ready" && (
            <MenuItem
              onClick={() => {
                handleClose();
                handelUpdateStatus("Ready");
              }}
            >
              {/* ready */}
              <div className="d-flex w-100 justify-content-between">
                <div style={{ fontSize: "12px" }}>Ready</div>
                <div
                  className="my-auto mx-2"
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    backgroundColor: "green",
                  }}
                ></div>
              </div>
            </MenuItem>
          )}
      
          {AgentStatus !== "Not Ready" && (
            <MenuItem onClick={handleSubmenuClick}>
              <div className="d-flex w-100 justify-content-between">
                <div>
                  <span style={{ fontSize: "12px" }}>
                    Not Ready
                  </span>
                </div>
                <div
                  className="my-auto mx-2"
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    backgroundColor: "red",
                  }}
                ></div>
              </div>
            </MenuItem>
          )}
        </Menu>

        <Menu
          id="submenu"
          anchorEl={submenuAnchorEl}
          open={Boolean(submenuAnchorEl)}
          onClose={handleSubmenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
        {/* statuslist */}
          {["Tea break","Discussionn"].map((item) => {
            return (
              <MenuItem
                sx={{ width: "18vw" }}
                onClick={() => {
                  handleSubmenuClose();
                  // handelUpdateStatus(item.statusName);
                  handelUpdateStatus("Not Ready")
                  handleClose();
                }}
              >
                <div className="d-flex w-100 justify-content-between">
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {/* {item.statusName} */}
                    {item}
                  </div>
                  <div
                    className="my-auto"
                    style={{
                      height: "8px",
                      width: "8px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                    }}
                  ></div>
                </div>
              </MenuItem>
            );
          })}
        </Menu>
      </div>

      <span
        className="mx-2"
        style={{
          color: "black",
          fontSize: "12px",
          marginTop: "4px",
        }}
      >
        {AgentStatus == "Ready" && (
          <span>{formattedTimeforReady}</span>
        )}
        {AgentStatus !== "Ready" && (
          <span>{formattedTimeforBreak}</span>
        )}
      </span>
    </div>
  </div>
  )
}

export default AgentCurrentStatus
