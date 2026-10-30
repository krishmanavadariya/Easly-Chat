import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender._id === user._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        background: sameSender
          ? "linear-gradient(135deg, rgba(70, 70, 70, 0.8), rgba(120, 120, 120, 0.6))"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(200, 200, 200, 0.6))",
        color: sameSender ? "white" : "black",
        borderRadius: sameSender ? "20px 20px 0 20px" : "20px 20px 20px 0",
        padding: "1rem",
        width: "fit-content",
        backdropFilter: "blur(15px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        transition: "background 0.3s, transform 0.3s",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
