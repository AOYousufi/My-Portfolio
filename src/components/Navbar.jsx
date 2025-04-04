import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#0f1115",
        boxShadow: "0 2px 12px rgba(0, 255, 247, 0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "#00fff7",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          Ahmad Ozair Yousufi
        </Typography>
        {[
          { label: "Home", to: "/" },
          { label: "Projects", to: "/projects" },
          { label: "Education", to: "/education" },
          { label: "Work", to: "/work-experience" },
        ].map((item) => (
          <Button
            key={item.label}
            color="inherit"
            component={RouterLink}
            to={item.to}
            sx={{ color: "#00fff7", mx: 1, textTransform: "none" }}
          >
            {item.label}
          </Button>
        ))}
        <Button
          color="inherit"
          href="https://github.com/AOYousufi"
          target="_blank"
          sx={{ color: "#00fff7", mx: 1, textTransform: "none" }}
        >
          GitHub
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
