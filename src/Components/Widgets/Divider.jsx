import { Box } from "@mui/material";
import React from "react";

export default function Divider({ classes, colorOne, colorTwo }) {
  return (
    <Box className={`DF JCC AIC ${classes}`}>
      <Box
        sx={{
            backgroundColor: colorOne,
            height: "5px",
            width: "50px",
            display: "inline-block",
        }}
        ></Box>
      <Box
        sx={{
            backgroundColor: colorTwo,
            height: "5px",
            width: "50px",
            display: "inline-block",
        }}
        ></Box>
        </Box>
  );
}
