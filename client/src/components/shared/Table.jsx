import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";
import { matBlack } from "../../constants/color";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem 4rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "80%",
          overflow: "hidden",
          height: "80%",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
          backdropFilter: "blur(15px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: "80%",
          }}
          sx={{
            border: "none",
            ".MuiDataGrid-columnHeaders": {
              bgcolor: "rgba(0, 0, 0, 0.7)",
              color: "white",
            },
            ".MuiDataGrid-cell": {
              bgcolor: "rgba(255, 255, 255, 0.2)",
              color: "black",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
