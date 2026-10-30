// import { Stack } from "@mui/material";
// import React from "react";
// import { BouncingSkeleton } from "../styles/StyledComponents";
import "./Loader.css";

const LayoutLoader = () => {
  return (
    <div className="loader">
      Loading
      <span></span>
    </div>
  );
};

// const TypingLoader = () => {
//   return (
//     <Stack
//       spacing={"0.5rem"}
//       direction={"row"}
//       padding={"0.5rem"}
//       justifyContent={"center"}
//     >
//       <BouncingSkeleton
//         variant="circular"
//         width={15}
//         height={15}
//         style={{
//           animationDelay: "0.1s",
//         }}
//       />
//       <BouncingSkeleton
//         variant="circular"
//         width={15}
//         height={15}
//         style={{
//           animationDelay: "0.2s",
//         }}
//       />
//       <BouncingSkeleton
//         variant="circular"
//         width={15}
//         height={15}
//         style={{
//           animationDelay: "0.4s",
//         }}
//       />
//       <BouncingSkeleton
//         variant="circular"
//         width={15}
//         height={15}
//         style={{
//           animationDelay: "0.6s",
//         }}
//       />
//     </Stack>
//   );
// };

const TypingLoader = () => {
  return (
    <div className="Tloader">
      <div className="Tloader-bar bar-1"></div>
      <div className="Tloader-bar bar-2"></div>
      <div className="Tloader-bar bar-3"></div>
      <div className="Tloader-bar bar-4"></div>
    </div>
  );
};

export { TypingLoader, LayoutLoader };
