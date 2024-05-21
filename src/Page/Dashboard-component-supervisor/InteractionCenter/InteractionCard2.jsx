import React, { useState, useEffect } from "react";

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
} from "@mui/material";

import { Textarea } from "@mui/joy";
import { Notebook } from "@phosphor-icons/react";
import { connect } from "react-redux";
import { setDarkMode } from "../../../redux/actions/action";

import axios from "axios";
import { BaseUrl } from "../../Constant/BaseUrl";

const mapStateToProps = (state) => {
  // console.log("firstname",state)
  return {
    darkMode: state.data.darkMode,
    displayExtNum: state.data.displayExtNum,
    incomingCallAccepted: state.data.incomingCallAccepted,
  };
};

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
      <Grid xs={12}>
        <Box
          className={`card dashboardMode ${
            props.darkMode ? "dark-mode" : "light-mode"
          } ms-1`}
          sx={{ height: "44vh" }}
        >
          <Box>
            <Stack direction="row">
              <Notebook size={20} className="mt-1 ms-3" />
              <Typography
                className="ms-2 mt-1"
                color="primary"
                sx={{ fontSize: 15 }}
                gutterBottom
              >
                Lead/Delinquent Details
              </Typography>
            </Stack>
          </Box>
          <Grid container spacing={1} className="Customerdetails">
            <Grid item xs={6}>
              <Stack
                container
                direction="column"
                spacing={2}
                p={1}
                className="mx-2"
              >
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  First Name
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Last Name
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  WhatsApp Number
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Mobile Number
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Alt / Guarantor Number
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Email
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  City
                </Typography>

                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Customer Address
                </Typography>

                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Customer category
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Due Amount
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Due Date
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Aging
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Delinquent Debt
                </Typography>

                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Comments
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  className="stickyy_agentt"
                  sx={{ fontSize: "12px" }}
                >
                  Sticky Agent
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  Disposition
                </Typography>
              </Stack>
            </Grid>
            {/* Second Column - Inputs */}
            {/* <ThemeProvider theme={theme}> */}
            <Grid item xs={6}>
              <Stack container direction="column" spacing={1.1} p={1}>
                <TextField
                  value={firstname}
                  variant="outlined"
                  size="small"
                  sx={{
                    fontSize: "12px",
                    height: "20px",
                    color: props.darkMode ? "#ffffff" : "#000000",
                  }}
                  onChange={(e) => setFirstname(e.target.value)}
                />

                <TextField
                  value={lastname}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                />
                <TextField
                  value={mobilenumber}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  onChange={(e) => setMobilenumber(e.target.value)}
                />
                <TextField
                  value={altguarantorNumber}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  className="my-3"
                  onChange={(e) => setAltguarantornumber(e.target.value)}
                />
                <TextField
                  value={emailId}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  onChange={(e) => setEmailid(e.target.value)}
                />
                <TextField
                  value={city}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                  value={customeraddress}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  onChange={(e) => setCustomeraddress(e.target.value)}
                />
                <TextField
                  value={segment}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  onChange={(e) => setSegment(e.target.value)}
                />
                <TextField
                  value={dueamount}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  onChange={(e) => setDueamount(e.target.value)}
                />
                <TextField
                  value={duedate}
                  variant="outlined"
                  size="small"
                  sx={{
                    "& input[type='date']": {
                      fontSize: "12px",
                      height: "25px",
                    },
                  }}
                  type="date"
                  onChange={(e) => setDuedate(e.target.value)}
                />
                <TextField
                  value={aging}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  onChange={(e) => setAging(e.target.value)}
                />
                <TextField
                  value={delinquentDebtAmount}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "12px", height: "25px" }}
                  onChange={(e) => setDelinquentDebtAmount(e.target.value)}
                />
                <Textarea
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Write a notes here..."
                />
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={stickyAgent}
                    onClick={(e) =>setStickyAgent(e.target.checked)}
                  />
                </div>

                <Select
                  value={dispositionReason}
                  onChange={handleReasonChange}
                  style={{
                    height: "25px",
                    fontSize: "12px",
                  }}
                >
                  {dispositionlist.map((item) => (
                    <MenuItem
                      sx={{ fontSize: "12px" }}
                      value={item.dispositionName}
                    >
                      {item.dispositionName}
                    </MenuItem>
                  ))}
                </Select>

                <Grid p={1} className="ms-4 ms-auto">
                  <Button variant="contained" onClick={createUser}>
                    Create
                  </Button>
                </Grid>
              </Stack>
            </Grid>
            {/* </ThemeProvider> */}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default connect(mapStateToProps, {
  setDarkMode,
})(InteractionCard2);
