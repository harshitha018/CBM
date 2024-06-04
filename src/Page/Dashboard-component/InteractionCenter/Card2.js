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
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Textarea } from "@mui/joy";
import { Notebook } from "@phosphor-icons/react";
import { connect } from "react-redux";
import { setDarkMode } from "../../../redux/actions/action";
import axios from "axios";
import { BaseUrl } from "../../Constant/BaseUrl";
import InteractionCard5 from "./InteractionCard5";
import { ToastContainer, toast } from "react-toastify";
import ShadowIconInput from "../../../Component/shared-components/fields/ShadowIconInput";
import ShadowIconSelect from "../../../Component/shared-components/fields/ShadowIconSelect";
import Card5 from "./Card5";
import ShadowIconDatePicker from "../../../Component/shared-components/fields/ShadowIconDatePicker";
import EditIcon from '@mui/icons-material/Edit';

const mapStateToProps = (state) => {
  return {
    darkMode: state.data.darkMode,
    displayExtNum: state.data.displayExtNum,
    incomingCallAccepted: state.data.incomingCallAccepted,
  };
};

const theme = createTheme({
  typography: {
    fontSize: 12, // Change this value to adjust the font size
  },
});

const Card2 = (props) => {
  const [selectedBranch, setSelectedBranch] = useState("Branch");
  const [selectedCategory, setSelectedCategory] = useState("Customer category");
  const [selectedReason, setSelectedReason] = useState("Reason");
  const [dispositionlist, setDispositionlist] = useState([]);
  const [statusEdit,setStatusEdit] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState(false)
  const sample1 =["firstname","lastname","whatsappnum","mobilenum","emailid"]

  const sample2 = [
    "firstname",
    "lastname",
    "whatsappnum",
    "mobilenum",
    "emailid",
    "alt",
    "city",
    "address",
    "aging",
    "deliquentdebt",
    "dispositionreason",
  ]
  const [leadDeliquentData, setLeadDeliquentData] =useState({
    firstname:"",
    lastname:"",
    whatsappnum:"",
    mobilenum:"",
    emailid:"",
    alt:"",
    city:"",
    address:"",
    category:"",
    dueamount:"",
    duedate:"",
    aging:"",
    deliquentdebt:"",
    dispositionreason:"",
    stickyagent:"" 
  })

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleReasonChange = (event) => {
    setDispositionReason(event.target.value);
  };

  // disposition api
  const dispositionList = async () => {
    try {
      const response = await axios.post(
        BaseUrl + "/agent/userDisposition/list",
        { type: "skill" },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      );
      console.log(response.data.dataList);
      if (response.data.status === "OK") {
        setDispositionlist(response.data.dataList);
      }
    } catch (error) {
      console.error("Error fetching reason codes:", error);
    }
  };

  // create api
  const createUser = async () => {
    try {
      const response = await axios.post(
        BaseUrl + "/agent/createCustomer",
        {
          firstName: firstname,
          lastName: lastname,
          mobileNumber: mobilenumber,
          emailId: emailId,
          altGuarantorNumber: altguarantorNumber,
          city: city,
          customerAddress: customeraddress,
          segment: segment,
          dueAmount: dueamount,
          dueDate: duedate,
          aging: aging,
          delinquentDebtAmount: delinquentDebtAmount,
          dispositionReason: dispositionReason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      );

      if (response.data.status) {
        setFirstname("");
        setLastname("");
        setMobilenumber("");
        setEmailid("");
        setAltguarantornumber("");
        setCity("");
        setCustomeraddress("");
        setSegment("");
        setDueamount("");
        setDuedate("");
        setAging("");
        setDelinquentDebtAmount("");
        setDispositionReason("");
        console.log(response);
        toast.success(response.data.message);
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching reason codes:", error);
    }
  };

  // edit customer api
  const editcustomerdetails = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/agent/customer?mobileNumber=${props.displayExtNum}`,
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      );
      if (response) {
        console.log("editcustomerrrr", response);
        setLeadDeliquentData(
        {  firstname: response.data.data.firstName,
          lastname: response.data.data.lastName,
          whatsappnum: string,
          mobilenum: string,
          emailid: response.data.data.emailId,
          alt: response.data.data.altGuarantorNumber,
          city: response.data.data.city,
          address: response.data.data.customerAddress,
          category: response.data.data.segment,
          dueamount: response.data.data.dueAmount,
          duedate: response.data.data.dueDate,
          aging: response.data.data.aging,
          deliquentdebt: response.data.data.delinquentDebtAmount,
          dispositionreason: response.data.data.dispositionReason,
          stickyagent: response.data.data.stickyNotes,}
        )

        // setFirstname(response.data.data.firstName);
        // setLastname(response.data.data.lastName);
        // setMobilenumber(response.data.data.mobileNumber);
        // setEmailid(response.data.data.emailId);
        // setAltguarantornumber(response.data.data.altGuarantorNumber);
        // setCity(response.data.data.city);
        // setCustomeraddress(response.data.data.customerAddress);
        // setSegment(response.data.data.segment);
        // setDueamount(response.data.data.dueAmount);
        // setDuedate(response.data.data.dueDate);
        // setAging(response.data.data.aging);
        // setDelinquentDebtAmount(response.data.data.delinquentDebtAmount);
        // setDispositionReason(response.data.data.dispositionReason);
        // setStickyAgent(response.data.data.stickyNotes);
      } else {
      }
    } catch (error) {
      console.error("Error in editcustomerrrr :", error);
    }
  };

  useEffect(() => {
    dispositionList();
  }, []);

  useEffect(() => {
    if (props.incomingCallAccepted) {
      editcustomerdetails();
    }
  }, [props.incomingCallAccepted]);


  const handleInputChange = (field) => (event) => {
    setLeadDeliquentData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };


  console.log(leadDeliquentData)

  return (
    <div className="ml-1">
      <ToastContainer />
      <Grid xs={12}>
        <Paper  className={`dashboardMode ${props.darkMode ? "dark-mode" : "light-mode"} `}>
        <Box
          className={`${
            props.darkMode ? "dark-mode" : "light-mode"
          }`}
          // sx={{ height: "95vh" }}
          sx={{ height: "34vh" }}
        >
         <Box>
         <Stack direction="row align-item-center justify-content-between" sx={{marginX:1}}>
              <div className="flex gap-1 justify-center items-center">
                <Notebook size={18} className="ms-2" />
                <Typography
                  className=""
                  color="primary"
                  sx={{ fontSize: 12, width: "150px"
                  }}
                >
                  Lead/Delinquent Details
                </Typography>
              </div>

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
                  {/* <EditIcon  onClick={createUser} color="black"/> */}
                  <span>
                  <EditIcon  onClick={()=>setStatusEdit(true)} color="black"/>
                  </span>
              </Grid>
        </Stack>

          {/* here the code  className="Customerdetails" */}
        {/*optimizing */}
        <div className="grid grid-cols-5 gap-3 mx-3 py-2">
        <ShadowIconInput 
          label={sample1[0]}
          value={leadDeliquentData?.firstname} 
          onChange={handleInputChange('firstname')} 
          className="w-full" 
          disabled={!Boolean(statusEdit && sample1[0])}
        />
    <ShadowIconInput 
      label={sample1[1]} 
      value={leadDeliquentData?.lastname} 
      onChange={handleInputChange('lastname')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[1])}
    />
    <ShadowIconInput 
      label={sample1[2]}
      value={leadDeliquentData?.whatsappnum} 
      onChange={handleInputChange('whatsappnum')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[2])}
    />
    <ShadowIconSelect 
      label="Disposition" 
      className="w-full" 
      disable={!statusEdit}
      value={leadDeliquentData?.lastname} 
      options={dispositionlist}
    />
    <ShadowIconDatePicker 
      label="Due date" 
      value={leadDeliquentData?.duedate} 
      onChange={(data)=>{setLeadDeliquentData((prev)=>({...prev,duedate:data}))}}
      className="w-full" 
      disabled={!statusEdit}
    />
    <ShadowIconInput 
    value={leadDeliquentData?.mobilenum} 
    label={sample1[3]}
      onChange={handleInputChange('mobilenum')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[3])}
    />
    <ShadowIconInput 
          label={sample1[4]}
    value={leadDeliquentData?.alt} 
      // label="Alt/ Guarantor num" 
      onChange={handleInputChange('alt')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[4])}
    />
    <ShadowIconInput 
    label={sample1[5]}
      // label="Email" 
      value={leadDeliquentData?.emailid} 
      onChange={handleInputChange('emailid')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[5])}
    />
    <ShadowIconInput 
    label={sample1[6]}
      // label="City" 
      value={leadDeliquentData?.city} 
      onChange={handleInputChange('city')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[6])}
      // disabled={!statusEdit && sample1[6]}
    />
    <ShadowIconInput 
    label={sample1[7]}
      // label="Customer address" 
      value={leadDeliquentData?.address} 
      onChange={handleInputChange('address')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[7])}
    />
    <ShadowIconInput 
    label={sample1[8]}
      // label="Customer category" 
      value={leadDeliquentData?.category} 
      onChange={handleInputChange('category')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[8])}
    />
    <ShadowIconInput 
    label={sample1[9]}
      // label="Due amount" 
      value={leadDeliquentData?.dueamount} 
      onChange={handleInputChange('dueamount')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[9])}
    />
    <ShadowIconInput 
    label={sample1[10]}
      // label="Aging" 
      value={leadDeliquentData?.aging} 
      onChange={handleInputChange('aging')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[10])}
    />
    <ShadowIconInput 
    label={sample1[11]}
      // label="Delinquent debt" 
      value={leadDeliquentData?.deliquentdebt} 
      onChange={handleInputChange('deliquentdebt')} 
      className="w-full" 
      disabled={!Boolean(statusEdit && sample1[12])}
    />
     {statusEdit && <Button
      variant="contained"
      className=""
      onClick={createUser}
      sx={{
      fontSize: "10px",
      height: "25px",
      marginRight: "5px",
      }}
      >
        Submit
      </Button>}
    
  </div>

          </Box>
        {/* end the code  */}
        </Box>
        </Paper>
        <Paper className={`dashboardMode ${props.darkMode ? "dark-mode" : "light-mode"}`} elevation={10} sx={{marginY:"10px"}}>
        {/* <InteractionCard5 /> */}
        <Card5/>
        </Paper>
        {/* </Stack> */}
        </Grid>
    </div>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(Card2);
