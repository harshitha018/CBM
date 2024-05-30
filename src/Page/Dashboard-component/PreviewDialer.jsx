import React, { useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useForkRef,
  Grid,
  TableContainer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BaseUrlUAT } from "../Constant/BaseUrl";
import axios from "axios";
import { useState } from "react";
import SideBar from "../../Component/SideBar";
import NavBar from "../../Component/NavBar";
import { PhoneOutgoing } from "@phosphor-icons/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { makeCall } from "../../redux/actions/action";



const mapStateToProps = (state) => {
  return {
    
  };
};



const PreviewDialer = (props) => {
const {makeCall} = props;

  const [previewList, setPreviewList] = useState([]);

  // previewdialer api //
  const previewdialerList = async () => {
    try {
      const response = await axios.get(
        BaseUrlUAT +
          "/campaign/getPreviewAgentBasedContactDetail?agent_userid=Test10",
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoia2lyYW5tIiwiVXNlckRldGFpbHMiOnsiYXV0b2dlblVzZXJzSWQiOjEsImVtYWlsIjoia2lyYW4ubUBpbXBlcml1bWFwcC5jb20iLCJlbXBsb3llZUlkIjoia2lyYW5tIiwiZmlyc3ROYW1lIjoiS2lyYW4iLCJsYXN0TmFtZSI6Ik0iLCJtb2JpbGVOdW1iZXIiOiI5MTY0MTMzNzQ4IiwicGFzc3dvcmQiOiIkMmEkMTAkeEFPZzNYTS9TUElNOHlaamxpYUhvLld0UXpuOFdHdmdtQ041SE16V1NaZWduWUhBLjVweUMiLCJzdGF0dXMiOiJBQ1RJVkUiLCJhdXRvZ2VuVXNlcnNEZXRhaWxzSWQiOiIzMDAxIiwidXNlcmdyb3VwTmFtZSI6IlByb2R1Y3Rpb24iLCJyb2xlcyI6W3siYXV0b2dlblJvbGVzSWQiOm51bGwsInJlY0FkZER0IjpudWxsLCJyZWNVcGRhdGVEdCI6bnVsbCwicm9sZXNOYW1lIjoiQWdlbnQiLCJkZXNjcmlwdGlvbiI6bnVsbCwicm9sZUNyZWF0ZVN0YXR1cyI6bnVsbCwic3RhdHVzIjpudWxsLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwidXNlclNjcmVlbk1hcCI6bnVsbH1dLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQWdlbnQifV0sInJvbGVzTGlzdCI6WyJBZ2VudCJdLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6bnVsbCwiYWNjb3VudE5vbkxvY2tlZCI6dHJ1ZSwiYWNjb3VudE5vbkV4cGlyZWQiOnRydWUsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6dHJ1ZX0sImlhdCI6MTcxNzA2MDQxMywiZXhwIjoxNzE3MDY0MDEzfQ.EJZxZ9k_gIedWmmpTmDUux7cVBRlqYLDxHlaQ_2znuEnV5FCFvHJCs9pllha6Z1Mih8RKXYZM_BEFZ1i87GQvQ",
          },
        }
      );
      console.log("previewdialerList", response);
      if (response.data.message === "Success") {
        setPreviewList(response.data.value.Test10);
      }
    } catch (error) {
      console.log("errro", error);
    }
  };

  useEffect(() => {
    previewdialerList();
  }, []);

  return (
    <>
      <Grid container direction={"row"}>
        <Grid item xs={0.5}>
          <SideBar />
        </Grid>
        <Grid item xs={11.5}>
          <Grid container spacing={0.4} direction={"column"}>
            <Grid item xs={12}>
              <NavBar />
            </Grid>
            <Grid item xs={12} className="ms-2">
              <Box
                sx={{
                  maxWidth: 1200,
                  borderRadius: 2,
                  p: 0,
                  boxShadow: 24,
                  width: "100%",
                  backgroundColor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#1e40af",
                    padding: "16px",
                    borderRadius: "4px 4px 0 0",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    sx={{ color: "#fff", margin: 0 }}
                  >
                    <h5>Preview Campaign List</h5>
                  </Typography>

                  <IconButton
                    aria-label="close"
                    onClick={() => setOpenRotary(false)}
                    sx={{ color: "#fff" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Card>
                    <CardContent>
                      <button
                        type="button"
                        className="btn btn-primary d-flex mx-4 ms-auto"
                        sx={{
                          height: "28px",
                          width: "96px",
                          fontSize: "11px",
                        }}
                      >
                        Robot Dialing
                      </button>
                      <Box
                        className="mt-1"
                        sx={{
                          maxHeight: 550, // Adjust the height as needed
                          overflow: "auto",
                          "&::-webkit-scrollbar": {
                            width: 0,
                            height: 0,
                          },
                          msOverflowStyle: "none", // IE and Edge
                          scrollbarWidth: "none", // Firefox
                        }}
                      >
                        <TableContainer>
                          <Table>
                            <TableHead
                              sx={{
                                backgroundColor: "#1e3a8a",
                                position: "sticky",
                                // top: -1,
                              }}
                            >
                              <TableRow>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Select
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  First Name
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Mobile
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Guarantor Mobile
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Segment
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Due Amount
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Due Date
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Aging(days)
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Delinquent Debt
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Call status
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: "#fff",
                                    border: "1px solid #cbd5e1",
                                  }}
                                >
                                  Action
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody sx={{ height: "100px" }}>
                              {previewList.map((item) => {
                                return (
                                  <TableRow>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      <div
                                        className="form-check"
                                        style={{ marginRight: "-15px" }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id="flexCheckDefault"
                                          // checked={stickyAgent}
                                          // onChange={(e) => setStickyAgent(e.target.checked)}
                                        />
                                      </div>
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      {item.mapDynamicFields.FirstName}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      {item.customerMobileNumber}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      {item.mapDynamicFields.GuarantorMobile}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      {item.mapDynamicFields.Segment}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      {item.mapDynamicFields.DueAmount}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      {item.mapDynamicFields.DueDate}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      {item.mapDynamicFields.Aging}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      {item.mapDynamicFields.DelinquentDebt}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      callStatus
                                      {item.callStatus}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#000",
                                        border: "1px solid #cbd5e1",
                                      }}
                                    >
                                      <button
                                        onClick={() => {
                                          if (item.customerMobileNumber) {
                                            props.makeCall(
                                              item.customerMobileNumber
                                            );
                                          } else {
                                            alert("previewdialer");
                                            toast.error(
                                              "customer number is missing"
                                            );
                                          }
                                        }}
                                        style={{
                                          background: "none",
                                          border: "none",
                                          padding: 0,
                                          cursor: "pointer",
                                        }}
                                      >
                                        <PhoneOutgoing size={15} color="blue" />
                                      </button>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};


export default connect(mapStateToProps, {
  makeCall
})(PreviewDialer);
