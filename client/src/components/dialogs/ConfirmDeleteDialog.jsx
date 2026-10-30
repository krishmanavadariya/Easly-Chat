import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#333",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            color: "#555",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#ff4081",
            borderColor: "#ff4081",
            "&:hover": {
              backgroundColor: "rgba(255, 64, 129, 0.1)",
            },
          }}
        >
          No
        </Button>
        <Button
          onClick={deleteHandler}
          sx={{
            color: "#f44336",
            borderColor: "#f44336",
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.1)",
            },
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
