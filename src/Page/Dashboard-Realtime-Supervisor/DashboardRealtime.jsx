import React from "react";
import NavBar from "../../Component/NavBar";
import SideBar from "../../Component/SideBar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function DashboardRealtime() {
  return (
    <Grid container direction={"row"}>
      {/* <Snackbar
    >
    </Snackbar> */}
      <Grid item xs={0.5}>
        <SideBar />
      </Grid>
      <Grid item xs={11.5}>
        <Grid container spacing={0.4} direction={"column"}>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
{/* Charts */}
          <Grid item xs={12}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Word of the Day
                      </Typography>
                      <Typography variant="h5" component="div">
                        benevolent
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                      </Typography>
                      <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>


  {/* Agent activity */}
           
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DashboardRealtime;
