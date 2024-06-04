import { Button, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector,useDispatch } from 'react-redux';
import { CampaignListForOutBound } from '../../utils/api';
import axios from 'axios';

const ScheduleType = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [outBoundCampaignList, setOutboundCampaignList] = useState(null)
  // const dispatch = useDispatch()

  const AgentStatus = useSelector(state=>state.data.status)
  const userDetails = JSON.parse(localStorage.getItem("userinformation"));
  const accessToken = userDetails.accessToken


  useEffect(() => {
    const fetchCampaignList = async () => {
      try {
        console.log('Starting API call');
        console.log(CampaignListForOutBound)
        console.log(localStorage.getItem("TenantId"))
        const response = await axios.get(
          CampaignListForOutBound +`?userGroup=saless`,
          {
            headers: {
              "Content-Type": "application/json",
              TenantID: localStorage.getItem("TenantId"),
              Authorization:
              "Bearer " + accessToken
            },
          }
        );
        console.log('API call made');
        console.log(response.data.status);
        console.log(response.data.value)
        if (response.data.status === 200) {
          setOutboundCampaignList(response.data.value)
        }
      } catch (error) {
        console.error('Error fetching campaign list:', error);
      }
    };

    fetchCampaignList();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };

  const handleSubmenuClick = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleClickSubmenu = (event) =>{
    
  }

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };
console.log(AgentStatus,"Thisssssssssssss")
console.log(outBoundCampaignList)
console.log(accessToken)
  return (
    <div>
      <Button
        onClick={handleClick}
        sx={{
          fontSize: "10px",
          color: "white",
          backgroundColor: "lightgray",
          padding: 0,
          borderRadius: "5px",
          paddingLeft: "2px",
          height: "20px",
          "&:hover": {
            color: "black",
          },
        }}
      >
        Campaign{" "}
        <span className="p-0">
          <ArrowDropDownIcon />
        </span>
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
        <MenuItem onClick={handleClose}>
          <div className="d-flex w-100 justify-content-between">
            <div style={{ fontSize: "12px" }}>Inbound</div>
          </div>
        </MenuItem>
        <MenuItem onClick={handleSubmenuClick}>
          <div className="d-flex w-100 justify-content-between">
            <div>
              <span style={{ fontSize: "12px" }}>Outbound</span>
            </div>
          </div>
        </MenuItem>
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
        {outBoundCampaignList?.map(({campaignId,campaignName}) => (
          <MenuItem
            key={campaignId}
            sx={{ width: "18vw" }}
            onClick={() => {
              handleClickSubmenu()
              handleSubmenuClose();
              // Add your handling logic here if needed
              handleClose();
            }}
          >
            <div className="d-flex w-100 justify-content-between">
              <div style={{ fontSize: "11px", fontWeight: "bold" }}>
                {campaignName}
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ScheduleType;
