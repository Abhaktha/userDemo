import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import LoadCountryPieChart from "./country-chart";
import Card from "@material-ui/core/Card";

function MobileViewUserList(props) {
    return (
        <Container>
            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
                paddingTop={2}
            >

                <Grid item xs={12}>
                    <Card style={{
                        width: "100%", height: "100%",
                        margin: "auto",
                        display: "block",
                        transition: "0.3s",
                        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                        "&:hover": {
                            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                        }
                    }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <LoadCountryPieChart popularCountires={props.popularCountires} />
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card
                        title="User List Table"
                        style={{
                            width: "100%", height: "100%",
                            margin: "auto",
                            display: "block",
                            transition: "0.3s",
                            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                            "&:hover": {
                                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                            }
                        }}>

                        <Box sx={{ flexGrow: 1 }} height="50vh" >
                            <div style={{
                                width: "100%", height: "100%",
                            }}>
                                <div style={{ width: "100%", height: "100%" }}>
                                    <div
                                        className="ag-theme-balham"
                                        id="myGrid"
                                        style={{
                                            boxSizing: "border-box",
                                            width: "100%", height: props.height
                                        }}
                                    >
                                        <AgGridReact
                                            rowData={props.users}
                                            columnDefs={props.columnDefs}
                                            defaultColDef={props.defaultColDef}
                                            onGridReady={props.onGridReady}
                                            paginationPageSize="20"
                                            pagination={true}
                                            rowHeight={40}
                                        ></AgGridReact>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default MobileViewUserList;