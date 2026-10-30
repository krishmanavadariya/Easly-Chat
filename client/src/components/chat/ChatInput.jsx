import React, { useState, useEffect } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  ErrorOutline as ErrorOutlineIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { orange, grayColor } from "../../constants/color";
import { InputBox } from "../styles/StyledComponents";
import filterMessage from "../../utils/filterMessage";

const ChatInput = ({
  message,
  setMessage,
  onSendMessage,
  onFileOpen,
  disabled = false,
  externalWarning = "",
  onClearExternalWarning,
}) => {
  const [inlineWarning, setInlineWarning] = useState("");

  // Sync external warning (e.g. from socket server error event)
  useEffect(() => {
    if (externalWarning) {
      setInlineWarning(externalWarning);
    }
  }, [externalWarning]);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setMessage(newText);

    // If message is modified and no longer contains banned words, clear warning
    if (inlineWarning) {
      const check = filterMessage(newText);
      if (!check.isBanned) {
        setInlineWarning("");
        if (onClearExternalWarning) onClearExternalWarning();
      }
    }
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();

    if (!message || !message.trim()) return;

    // Client-side validation before emit
    const filterResult = filterMessage(message);
    if (filterResult.isBanned) {
      setInlineWarning(
        filterResult.warning || "Your message contains inappropriate content."
      );
      return;
    }

    // Clear any previous warning
    setInlineWarning("");
    if (onClearExternalWarning) onClearExternalWarning();

    // Call send handler
    onSendMessage(message);
  };

  return (
    <form
      style={{
        height: "10%",
        position: "relative",
      }}
      onSubmit={handleSend}
    >
      {/* Inline Warning State UI */}
      {inlineWarning && (
        <Box
          sx={{
            position: "absolute",
            bottom: "100%",
            left: "1rem",
            right: "1rem",
            marginBottom: "0.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.5rem 1rem",
            borderRadius: "0.75rem",
            backgroundColor: "#ffebee",
            border: "1px solid #ef5350",
            boxShadow: "0 2px 10px rgba(211, 47, 47, 0.15)",
            zIndex: 10,
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <ErrorOutlineIcon fontSize="small" sx={{ color: "#d32f2f" }} />
            <Typography
              variant="body2"
              sx={{ color: "#d32f2f", fontWeight: 600, fontSize: "0.875rem" }}
            >
              {inlineWarning}
            </Typography>
          </Stack>
          <IconButton
            size="small"
            onClick={() => {
              setInlineWarning("");
              if (onClearExternalWarning) onClearExternalWarning();
            }}
            sx={{ color: "#d32f2f", padding: "2px" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Stack
        direction="row"
        height="100%"
        padding="1rem"
        alignItems="center"
        position="relative"
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "1.5rem",
            rotate: "30deg",
            zIndex: 1,
          }}
          onClick={onFileOpen}
          disabled={disabled}
        >
          <AttachFileIcon />
        </IconButton>

        <InputBox
          placeholder="Type Message Here..."
          value={message}
          onChange={handleInputChange}
          disabled={disabled}
          sx={{
            transition: "all 0.2s ease-in-out",
            ...(inlineWarning
              ? {
                  border: "1.5px solid #d32f2f !important",
                  backgroundColor: "#fff8f8 !important",
                }
              : {}),
          }}
        />

        <IconButton
          type="submit"
          disabled={disabled || !message.trim()}
          sx={{
            rotate: "-30deg",
            bgcolor: orange,
            color: "white",
            marginLeft: "1rem",
            padding: "0.5rem",
            "&:hover": {
              bgcolor: "error.dark",
            },
            "&:disabled": {
              bgcolor: "rgba(0, 0, 0, 0.12)",
              color: "rgba(0, 0, 0, 0.26)",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </form>
  );
};

export default ChatInput;
