import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoadCountryPieChart from "./country-chart";
import BarChart from "./country-bar-chart";

function UserList(props) {
  return (
    <Box sx={{ flexGrow: 1 }} height={props.aggridHeight} >
      <Grid container spacing={2} padding={2}>
        <Grid item xs={6} md={9}>
          <props.Item>
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
          </props.Item>
        </Grid>
        <Grid item xs={6} md={3}>
          <props.Item>
            <LoadCountryPieChart popularCountires={props.popularCountires} />
            {props.width > 1900 && props.innerHeight > 1006 && <div style={{
              alignItems:'center',
              padding: '20px',
              paddingTop: '50px'
            }}>
              <BarChart popularCountires={props.popularCountires} />
            </div>}
          </props.Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserList;