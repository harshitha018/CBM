import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Grid } from "@mui/material";
import axios from "axios";
// import { Phone, PhoneOutgoing } from "@phosphor-icons/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { makeCall } from "../../redux/actions/action";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import SideBar from "../../Component/SideBar";
import NavBar from "../../Component/NavBar";
import { BaseUrlUAT } from "../Constant/BaseUrl";
import { PhoneAndroid } from "@mui/icons-material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { PhoneOutgoing } from "react-feather";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { button } from "@nextui-org/react";

const mapStateToProps = (state) => {
  return {};
};

const PreviewDialer = (props) => {
  const [previewList, setPreviewList] = useState([]);
  const [robotdialing, setrobotdialing] = useState(false);
  const gridRef = useRef(null);

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
              "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoia2lyYW5tIiwiVXNlckRldGFpbHMiOnsiYXV0b2dlblVzZXJzSWQiOjEsImVtYWlsIjoia2lyYW4ubUBpbXBlcml1bWFwcC5jb20iLCJlbXBsb3llZUlkIjoia2lyYW5tIiwiZmlyc3ROYW1lIjoiS2lyYW4iLCJsYXN0TmFtZSI6Ik0iLCJtb2JpbGVOdW1iZXIiOiI5MTY0MTMzNzQ4IiwicGFzc3dvcmQiOiIkMmEkMTAkeEFPZzNYTS9TUElNOHlaamxpYUhvLld0UXpuOFdHdmdtQ041SE16V1NaZWduWUhBLjVweUMiLCJzdGF0dXMiOiJBQ1RJVkUiLCJhdXRvZ2VuVXNlcnNEZXRhaWxzSWQiOiIzMDAxIiwidXNlcmdyb3VwTmFtZSI6InNhbGVzcyIsInJvbGVzIjpbeyJhdXRvZ2VuUm9sZXNJZCI6bnVsbCwicmVjQWRkRHQiOm51bGwsInJlY1VwZGF0ZUR0IjpudWxsLCJyb2xlc05hbWUiOiJBZ2VudCIsImRlc2NyaXB0aW9uIjpudWxsLCJyb2xlQ3JlYXRlU3RhdHVzIjpudWxsLCJzdGF0dXMiOm51bGwsImNyZWF0ZWRCeSI6bnVsbCwidXBkYXRlZEJ5IjpudWxsLCJ1c2VyU2NyZWVuTWFwIjpudWxsfV0sImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJBZ2VudCJ9XSwicm9sZXNMaXN0IjpbIkFnZW50Il0sInBieEV4dCI6IjMwMDEiLCJza2lsbFNldCI6ImFnZW50IiwiZGlzcG9zaXRpb24iOiJDT0xMRUNUSU9OIiwidXNlcmdyb3VwdHlwZSI6bnVsbCwiZW5hYmxlZCI6dHJ1ZSwidXNlcm5hbWUiOm51bGwsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWV9LCJpYXQiOjE3MTczODg4MjUsImV4cCI6MTcxNzM5MjQyNX0.JYWbvo5_DSsgvRJ2W3n0zW7gdl__MXaIavcn9QMH46EKY4TcO5fZu5wNgpPvDEB72Dy_IpZB_D_zuOtxWxdyeA",
          },
        }
      );
      console.log("previewdialerList", response);
      if (response.data.message === "Success") {
        setPreviewList(response.data.value.Test10);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    previewdialerList();
  }, []);

  // const ActionCellRenderer = (props) => {
  //   console.log("Rendering ActionCellRenderer", props);
  //   return (
  //     <button
  //       onClick={() => {
  //         if (props.data.customerMobileNumber) {
  //           props.makeCall(props.data.customerMobileNumber);
  //         } else {
  //           toast.error("Customer number is missing");
  //         }
  //       }}
  //       style={{
  //         background: "none",
  //         border: "none",
  //         padding: 0,
  //         cursor: "pointer",
  //       }}
  //     >
  //       <PhoneOutgoing size={15} color="blue" />
  //     </button>
  //   );
  // };

  const ActionButtonRenderer = ({ onClick }) => (
    alert("hii"), (<button onClick={onClick}>Action</button>)
  );

  // const columnDefs = [
  //   {
  //     headerName: "Select",
  //     field: "select",
  //     checkboxSelection: true,
  //     headerCheckboxSelection: true,
  //   },
  //   { field: "mapDynamicFields.FirstName", headerName: "First Name" },
  //   { field: "customerMobileNumber", headerName: "Mobile" },
  //   {
  //     field: "mapDynamicFields.GuarantorMobile",
  //     headerName: "Guarantor Mobile",
  //   },
  //   { field: "mapDynamicFields.Segment", headerName: "Segment" },
  //   { field: "mapDynamicFields.DueAmount", headerName: "Due Amount" },
  //   { field: "mapDynamicFields.DueDate", headerName: "Due Date" },
  //   { field: "mapDynamicFields.Aging", headerName: "Aging(days)" },
  //   { field: "mapDynamicFields.DelinquentDebt", headerName: "Delinquent Debt" },
  //   { field: "callStatus", headerName: "Call Status" },
  //   {
  //     headerName: "Action",
  //     cellRendererFramework: ActionCellRenderer,
  //     // cellRendererParams: {
  //     //   onClick: (event) => {
  //     //     console.log("Action button clicked");
  //     //   },
  //     // },
  //   },
  // ];

  const ActionCellRenderer = (props) => {
    return (
      <button
        onClick={() => {
          alert(`Calling ${props.data.make}`);
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
    );
  };

  const IconCellRenderer = (props) => {
    const iconType = props.value;
    let icon;
   
    switch (iconType) {
      case 'edit':
        icon = <i className="fas fa-edit"></i>;
        break;
      case 'delete':
        icon = <i className="fas fa-trash-alt"></i>;
        break;
      default:
        icon = <i className="fas fa-info-circle"></i>;
    }
   
    return <span>{icon}</span>;
  };
  

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    {
      headerName: "Actions",
      field: "action",
      cellRendererFramework: IconCellRenderer,
    }
  ];

  const rowData = [
    { id: 1, name: 'John Doe', action: 'edit' },
    { id: 2, name: 'Jane Smith', action: 'delete' },
  ];
   



  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    menuTabs: ["filterMenuTab"],
  };

  const handletoggleRobot = () => {
    setrobotdialing(!robotdialing);
    console.log("handletoggleRobot", robotdialing);
  };

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

                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={robotdialing}
                      onChange={handletoggleRobot}
                    />
                  </div>
                </Box>
                <Box
                  className="ag-theme-alpine"
                  sx={{ height: 550, width: "100%" }}
                >
                  <AgGridReact
                    ref={gridRef}
                    rowSelection="multiple" // Set row selection to multiple
                    // rowData={previewList}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    domLayout="autoHeight"
                    // frameworkComponents={{
                    //   actionButtonRenderer: ActionButtonRenderer,
                    // }}
                  
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default connect(mapStateToProps, {
  makeCall,
})(PreviewDialer);
