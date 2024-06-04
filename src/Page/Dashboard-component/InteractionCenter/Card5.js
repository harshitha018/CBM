import React, { useEffect, useState } from "react";

import {
  Button,
  Stack,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  CalendarCheck,
  EnvelopeSimple,
  HourglassMedium,
  MapPin,
  NotePencil,
  ProjectorScreenChart,
  Timer,
  User,
} from "@phosphor-icons/react";

import { MdOutlineLocalPhone } from "react-icons/md";
import { connect } from "react-redux";
import { setDarkMode } from "../../../redux/actions/action";
import ShadowIconDatePicker from "../../../Component/shared-components/fields/ShadowIconDatePicker";
import TimeInput from "../../../Component/shared-components/fields/TimeFormat1";
import ShadowIconSelect from "../../../Component/shared-components/fields/ShadowIconSelect";
import ShadowIconInput from "../../../Component/shared-components/fields/ShadowIconInput";
import Swal from "sweetalert2";
import { CampaignListByDialPlan, DialPlanList } from "../../../utils/api";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
  };
};

const Card5 = (props) => {
  const userDetails = JSON.parse(localStorage.getItem("userinformation"));
  const accessToken = userDetails.accessToken
  const userName = userDetails.userName
  const [enteredScheduleData,setEnteredScheduleData]= useState({
    "scheduledTime": new Date(),
    "scheduledDate": "",
    "type": "",
    "digitalNotification": "",
    "dialplanOrQueue": "",
    "campaign": "",
    "agent": "agent123"
  })
  const [dialPlanList, setDialPlanList] =  useState(null)
  const [campaignlist,setCampaignList] = useState(null)
  const [currentAgent,setCurrentAgent] = useState(true)

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleWaitingListChange = (e) => {
    setSelectedWaitingList(e.target.value);
  };

  const handleLoactionChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleAvailablityChange = (e) => {
    setSelectedAvailablity(e.target.value);
  };

  const typeOptions = [{label:"callback", value:"callback"}]
  const notificationOptions = [{label:"sms", value:"sms"}]
  const dialPlanOption = dialPlanList?.map((item)=>({label:item,value:item}))
  const campaignOptions = campaignlist?.map((item)=>({label:item,value:item}))

  const handleChangeSchedule = (data,field) =>{
    setEnteredScheduleData((prev)=>({
      ...prev,
      [field]:data
    }))
  }

  const handleSchedule = (data)=>{
    console.log(data)
    Swal.fire({
      title: "Success",
      text: "Your call have been scheduled",
      icon: "success"
    });
  }
  useEffect(() => {
    console.log(DialPlanList,"dialPlanListttttttttttttt")
    console.log(accessToken)
    const fetchDialPlanList = async () => {
      try {
        const response = await axios.get(DialPlanList, {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
            Authorization: "Bearer " + accessToken
          },
        });
        setDialPlanList(response.data.value)
      } catch (error) {
        console.error("Error fetching the dial plan list:", error);
      }
    };
    fetchDialPlanList();
  }, []);

  useEffect(()=>{
    console.log(CampaignListByDialPlan +`?dialplan=${enteredScheduleData?.dialplanOrQueue?.value}`)
    if(enteredScheduleData?.digitalNotification){
      const fetchCampaignist = async () => {
        try {
          const response = await axios.get(CampaignListByDialPlan +`?dialplan=${enteredScheduleData?.dialplanOrQueue?.value}`, {
            headers: {
              "Content-Type": "application/json",
              TenantID: localStorage.getItem("TenantId"),
              Authorization: "Bearer " + accessToken
            },
          });
          setCampaignList(response.data.value)
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching the dial plan list:", error);
        }
      };
      fetchCampaignist();
    }
  },[enteredScheduleData?.digitalNotification,enteredScheduleData?.dialplanOrQueue?.value])
console.log(currentAgent)
  console.log(enteredScheduleData)
  console.log(enteredScheduleData?.dialplanOrQueue?.value)
  return (
    <>
        <Box
          className={`${
            props.darkMode ? "dark-mode" : "light-mode"
          }`}
          sx={{ height: "16vh" }}
          p={1}
        >
          <Stack direction="row align-item-center justify-content-between"  sx={{marginX:1}}>
            <Grid className="flex justify-center items-center gap-1">
              <NotePencil size={15} />
              <Typography
                color="primary"
                sx={{ fontSize: 12 }}
              >
                Schedule Callback / Survey / Remainders
              </Typography>
            </Grid>
        
            <Grid className="d-flex ms-auto">
                <Grid
                  item
                  // xs={1.5}
                  // sm={2}
                  // md={1.5}
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    className="ms-2"
                    onClick={()=>handleSchedule(enteredScheduleData)}
                    sx={{
                      fontSize: "10px",
                      height: "25px",
                      // marginRight: "10px",
                    }}
                  >
                    Schedule
                  </Button>
                </Grid>
            </Grid>
           
          </Stack>
          <div className="flex gap-2  p-2">
          <ShadowIconDatePicker label="Date" value={enteredScheduleData.scheduledTime} onChange={(data)=>{handleChangeSchedule(data,"date")}}/>
          <TimeInput value={enteredScheduleData.scheduledDate} />
          <ShadowIconSelect label="Type" value={enteredScheduleData.type} options={typeOptions} onChange={(data)=>{handleChangeSchedule(data,"type")}}/>
          <ShadowIconSelect label="Notification" value={enteredScheduleData.digitalNotification} options={notificationOptions} onChange={(data)=>{handleChangeSchedule(data,"digitalNotification")}}/>
          <ShadowIconSelect label="Dail plan / IVR" value={enteredScheduleData.dialplanOrQueue} options={dialPlanOption} onChange={(data)=>{handleChangeSchedule(data,"dialplanOrQueue")}}/>
          <ShadowIconSelect label="campaign" value={enteredScheduleData.sale} options={campaignOptions} onChange={(data)=>{handleChangeSchedule(data, "campaign")}}/>
          <input type="checkbox" defaultChecked onClick={()=>{setCurrentAgent(!currentAgent)}}/>
          </div>

        </Box>
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(Card5);
