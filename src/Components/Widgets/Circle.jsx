import { Box } from "@mui/system";

export default function Circle({ color, classes }) {
  return (
    <Box
      className={classes}
      sx={{
        backgroundColor: color,
        height: "12px",
        width: "12px",
        display: "inline-block",
        borderRadius: "50%",
      }}
    ></Box>
  );
}
