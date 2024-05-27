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

const InteractionCard2 = (props) => {
  const [selectedBranch, setSelectedBranch] = useState("Branch");
  const [selectedCategory, setSelectedCategory] = useState("Customer category");
  const [selectedReason, setSelectedReason] = useState("Reason");
  const [dispositionlist, setDispositionlist] = useState([]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [emailId, setEmailid] = useState("");
  const [altguarantorNumber, setAltguarantornumber] = useState("");
  const [city, setCity] = useState("");
  const [customeraddress, setCustomeraddress] = useState("");
  const [segment, setSegment] = useState("");
  const [dueamount, setDueamount] = useState("");
  const [duedate, setDuedate] = useState("");
  const [aging, setAging] = useState("");
  const [delinquentDebtAmount, setDelinquentDebtAmount] = useState("");
  const [dispositionReason, setDispositionReason] = useState("");
  const [stickyAgent, setStickyAgent] = useState(false);

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
        console.log("aaaaaaa", response);
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
        setFirstname(response.data.data.firstName);
        setLastname(response.data.data.lastName);
        setMobilenumber(response.data.data.mobileNumber);
        setEmailid(response.data.data.emailId);
        setAltguarantornumber(response.data.data.altGuarantorNumber);
        setCity(response.data.data.city);
        setCustomeraddress(response.data.data.customerAddress);
        setSegment(response.data.data.segment);
        setDueamount(response.data.data.dueAmount);
        setDuedate(response.data.data.dueDate);
        setAging(response.data.data.aging);
        setDelinquentDebtAmount(response.data.data.delinquentDebtAmount);
        setDispositionReason(response.data.data.dispositionReason);
        setStickyAgent(response.data.data.stickyNotes);
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

  return (
    <>
      <ToastContainer />
      <Grid xs={12}>
        <Paper>
        <Box
          className={`${
            props.darkMode ? "dark-mode" : "light-mode"
          }`}
          // sx={{ height: "95vh" }}
          sx={{ height: "34vh" }}
        >
            <Stack direction="row" justifyContent="space-between"
            alignItems="center" sx={{marginX:"8px", paddingY:"3px"}}>
              <Grid className="flex gap-2">
                <Notebook size={15} className="" />
                <Typography
                  className=""
                  color="primary"
                  sx={{ fontSize: 12, whiteSpace: "nowrap" }}
                  gutterBottom
                >
                  Lead/Delinquent Details
                </Typography>
              </Grid>

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
                  className=""
                  onClick={createUser}
                  sx={{
                    fontSize: "10px",
                    height: "25px",
                    marginRight: "5px",
                  }}
                >
                  Create
                </Button>
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
                  className="d-flex ms-auto"
                >
                  <Button
                    variant="contained"
                    className=""
                    onClick={createUser}
                    sx={{
                      fontSize: "10px",
                      height: "25px",
                      marginRight: "5px",
                    }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Stack>

          {/* here the code  className="Customerdetails" */}
          {/* <Grid container className="Customerdetails" spacing={0.5}>
            <Grid item xs={2.3} sm={1} md={2.3}>
              <div>
                <Typography
                  variant="body1"
                  component="p"
                  className="ms-2"
                  sx={{ fontSize: "10px", display: "block" }}
                >
                  First Name
                </Typography>
              </div>
              <TextField
                value={firstname}
                variant="outlined"
                size="small"
                className="ms-2"
                sx={{
                  fontSize: "10px",
                  height: "25px",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={2.3} sm={1} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Last Name
              </Typography>
              <TextField
                value={lastname}
                variant="outlined"
                className="ms-2"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={2.3} sm={1} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                WhatsApp No.
              </Typography>
              <TextField
                variant="outlined"
                className="ms-2"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
              />
            </Grid>
            <Grid item xs={2.3} sm={1} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Mobile Number
              </Typography>
              <TextField
                value={mobilenumber}
                className="ms-2"
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                onChange={(e) => setMobilenumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={2.3} sm={1} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Alt / Guarantor No.
              </Typography>
              <TextField
                value={altguarantorNumber}
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                className="ms-2"
                onChange={(e) => setAltguarantornumber(e.target.value)}
              />
            </Grid>

            <Grid item xs={2.3} sm={1} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Email
              </Typography>
              <TextField
                value={emailId}
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                className="ms-2"
                onChange={(e) => setEmailid(e.target.value)}
              />
            </Grid>

            <Grid item xs={2.3} sm={1} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                City
              </Typography>
              <TextField
                value={city}
                className="ms-2"
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={2.3} sm={2} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Customer Address
              </Typography>
              <TextField
                value={customeraddress}
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                className="ms-2"
                onChange={(e) => setCustomeraddress(e.target.value)}
              />
            </Grid>

            <Grid item xs={2.3} sm={2} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Customer category
              </Typography>
              <TextField
                value={segment}
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                className="ms-2"
                onChange={(e) => setSegment(e.target.value)}
              />
            </Grid>

            <Grid item xs={2.3} sm={2} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Due Amount
              </Typography>
              <TextField
                value={dueamount}
                className="ms-2"
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                onChange={(e) => setDueamount(e.target.value)}
              />
            </Grid>

            <Grid item xs={2.3} sm={2} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Due Date
              </Typography>
              <TextField
                value={duedate}
                variant="outlined"
                className="ms-2"
                size="small"
                sx={{
                  "& input[type='date']": {
                    fontSize: "10px",
                    height: "25px",
                    width: "136px",
                  },
                }}
                type="date"
                onChange={(e) => setDuedate(e.target.value)}
              />
            </Grid>

            <Grid item xs={2.3} sm={2} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Aging
              </Typography>
              <TextField
                value={aging}
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                className="ms-2"
                onChange={(e) => setAging(e.target.value)}
              />
            </Grid>

            <Grid item xs={2.3} sm={2} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Delinquent Debt
              </Typography>
              <TextField
                value={delinquentDebtAmount}
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", height: "25px" }}
                className="ms-2"
                onChange={(e) => setDelinquentDebtAmount(e.target.value)}
              />
            </Grid>

            <Grid item xs={2.3} sm={2} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{
                  fontSize: "10px",
                  display: "block",
                  marginBottom: "-3px",
                }}
              >
                Disposition
              </Typography>
              <Select
                value={dispositionReason}
                onChange={handleReasonChange}
                className="ms-2"
                // size="small"
                style={{
                  height: "25px",
                  fontSize: "10px",
                  width: "144px",
                  background: "#faf9f6",
                }}
              >
                {dispositionlist.map((item) => (
                  <MenuItem
                    sx={{ fontSize: "10px" }}
                    value={item.dispositionName}
                  >
                    {item.dispositionName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={2.3} sm={2} md={2.3}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{
                  fontSize: "10px",
                  marginBottom: "-1px",
                  display: "block",
                }}
              >
                Sticky Agent
              </Typography>

              <TextField
                variant="outlined"
                size="small"
                className="ms-2"
                sx={{
                  fontSize: "10px",
                  height: "25px",
                  color: props.darkMode ? "#ffffff" : "#000000",
                }}
                InputProps={{
                  endAdornment: (
                    <div
                      className="form-check"
                      style={{ marginRight: "-15px" }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={stickyAgent}
                        onChange={(e) => setStickyAgent(e.target.checked)}
                      />
                    </div>
                  ),
                  style: {
                    height: "25px",
                    background: "#faf9f6",
                  },
                }}
              />
            </Grid>

            {/* <Grid item xs={1.5} sm={2} md={1.5}>
              <Typography
                variant="body1"
                component="span"
                className="ms-2"
                sx={{ fontSize: "10px", display: "block" }}
              >
                Comments
              </Typography>
              <Textarea
                aria-label="minimum height"
                className="ms-2"
                minRows={1}
                sx={{ fontSize: "10px", height: "15px" }}
                placeholder="Write a notes..."
              />
            </Grid> */}
          {/* </Grid>  */} 
        
        {/*optimizing */}
        <div className="grid grid-cols-5 gap-2 mx-3 mt-2">
          <ShadowIconInput label="First Name"/>
          <ShadowIconInput label="Last Name"/>
          <ShadowIconInput label="Whats app num"/>
          <ShadowIconInput label="Mobile num"/>
          <ShadowIconInput label="Alt/ Guarantor num"/>
          <ShadowIconInput label="Email"/>
          <ShadowIconInput label="city"/>
          <ShadowIconInput label="Customer address"/>
          <ShadowIconInput label="Customer category"/>
          <ShadowIconInput label="Due amount"/>
          <ShadowIconInput label="Due date"/>
          <ShadowIconInput label="Aging"/>
          <ShadowIconInput label="Duelinquent date"/>
          <ShadowIconSelect label="Disposition"/>
          <ShadowIconInput label="Sticky agent"/>
          </div>
        {/* end the code  */}
        </Box>
        </Paper>
        <Paper elevation={10} sx={{marginY:"10px"}}>
        {/* <InteractionCard5 /> */}
        <Card5/>
        </Paper>
        {/* </Stack> */}
        </Grid>
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(InteractionCard2);
