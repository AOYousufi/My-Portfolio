import React from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        textAlign: "center",
        color: "#fff",
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Avatar
          alt="Ahmad Ozair Yousufi"
          src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          sx={{
            width: 140,
            height: 140,
            margin: "0 auto 20px auto",
            border: "4px solid #00fff7",
          }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Ahmad Ozair Yousufi
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "#00fff7",
            fontFamily: "monospace",
            mb: 3,
          }}
        >
          Junior Software Developer
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Passionate and proactive Junior Developer pursuing a degree in
          Software Development at Staffordshire University. I love building
          futuristic, elegant, and user-centric experiences through code.
        </Typography>
        <Box>
          <Button
            variant="contained"
            component={Link}
            to="/projects"
            sx={{
              m: 1,
              bgcolor: "#00fff7",
              color: "#0f1115",
              "&:hover": { bgcolor: "#00c6c6" },
            }}
          >
            View Projects
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/education"
            sx={{
              m: 1,
              borderColor: "#00fff7",
              color: "#00fff7",
              "&:hover": { borderColor: "#00c6c6", color: "#00c6c6" },
            }}
          >
            Education
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
