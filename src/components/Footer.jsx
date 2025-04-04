import React from "react";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#0f1115",
        color: "#00fff7",
        py: 3,
        textAlign: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        mt: 4,
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Ahmad Ozair Yousufi. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link
          href="mailto:ozairyousufi1400@gmail.com"
          underline="hover"
          sx={{ color: "#00fff7" }}
        >
          ozairyousufi1400@gmail.com
        </Link>{" "}
        | Stone, UK
      </Typography>
    </Box>
  );
}

export default Footer;
