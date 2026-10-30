import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  forgetpassworduser,
  setForgetPasswordEmail,
  setpassword,
} from "../redux/reducers/auth";
import { Container, TextField, Typography, Button, Box } from "@mui/material";
import { server } from "../constants/config";
import { useNavigate } from "react-router-dom";
import "../components/layout/Loader.css";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [conformpassword, setConfrompassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hendalemail = (e) => {
    setEmail(e.target.value);
  };

  const hendalusername = (e) => {
    setUsername(e.target.value);
  };

  const hendalconfromPassword = (e) => {
    setConfrompassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Sending otp...");
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/forgetpassword`,
        { email, username, conformpassword },
        config
      );

      toast.success(data.message, {
        id: toastId,
      });
      dispatch(forgetpassworduser(true));
      dispatch(setpassword(conformpassword));
      dispatch(setForgetPasswordEmail(email));
      navigate("/otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              color="#a3cef1"
            >
              Forget Password
            </Typography>
          </motion.div>
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <TextField
                label="Enter Email"
                type="email"
                variant="outlined"
                required
                fullWidth
                margin="normal"
                value={email}
                onChange={hendalemail}
              />
              <TextField
                label="Enter User Name"
                variant="outlined"
                required
                fullWidth
                margin="normal"
                value={username}
                onChange={hendalusername}
              />
              <TextField
                label="Enter Your Conform Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={conformpassword}
                onChange={hendalconfromPassword}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Forget Password"}
              </Button>
            </motion.div>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgetPassword;
