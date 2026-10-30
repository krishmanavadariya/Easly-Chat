import React, { useState } from "react";
import { color, motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  userExists,
  cloneNotExists,
  unverifyNotExists,
  unsetForgetPasswordEmail,
  forgetpassworduserNot,
  unsetpassword,
} from "../redux/reducers/auth";
import { Container, TextField, Typography, Button, Box } from "@mui/material";
import { server } from "../constants/config";
import { useNavigate } from "react-router-dom";
import "../components/layout/Loader.css";

const OTPVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userotps, setOtp] = useState("");
  const { colnuser, unverify, forgetpassword, email, conformpassword } =
    useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const otP = Number(userotps.valueOf());

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (forgetpassword === true) {
      const toastId = toast.loading("Forgeting Password...");
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.post(
          `${server}/api/v1/user/verifyfrogetotp`,
          { email, otP, conformpassword },
          config
        );

        toast.success(data.message, {
          id: toastId,
        });
        dispatch(forgetpassworduserNot());
        dispatch(unsetpassword());
        dispatch(unsetForgetPasswordEmail());
        navigate("/login");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    } else if (unverify === false) {
      const { username } = JSON.parse(localStorage.getItem("unverify"));
      const toastId = toast.loading("userverifiction...");
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.post(
          `${server}/api/v1/user/userverified`,
          { username, otP },
          config
        );

        toast.success(data.message, {
          id: toastId,
        });
        localStorage.removeItem("unverify");
        dispatch(userExists(data.user));
        dispatch(unverifyNotExists(true));
        navigate("/");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      const toastId = toast.loading("otpVerify...");
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { category, email } = JSON.parse(localStorage.getItem("otpuser"));

      try {
        const { data } = await axios.post(
          `${server}/api/v1/user/otp`,
          { email, category, otP },
          config
        );

        toast.success(data.message, {
          id: toastId,
        });
        localStorage.removeItem("otpuser");
        dispatch(userExists(colnuser));
        dispatch(cloneNotExists(null));
        navigate("/");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
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
              OTP Verification
            </Typography>
          </motion.div>
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <TextField
                label="Enter OTP"
                required
                variant="outlined"
                fullWidth
                margin="normal"
                value={userotps}
                onChange={handleChange}
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
              >
                Verify OTP
              </Button>
            </motion.div>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default OTPVerification;
