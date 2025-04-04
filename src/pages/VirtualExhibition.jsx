import React from "react";
import {
  Container,
  Typography,
  Box,
  Link as MuiLink,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

function VirtualExhibition() {
  return (
    <Container sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
      >
        Virtual Exhibition
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Developed a responsive web app using JavaScript, React, Node.js, and
          Express. Integrated Harvard & V&A museum APIs with advanced filtering
          and pagination, focusing on performance and accessibility.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Technologies Used:</strong> JavaScript, React, Node.js,
          Express, APIs.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Skills Gained:</strong> API Integration, Responsive Design,
          Performance Optimisation.
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          href="https://github.com/ozairyousufi/virtual-exhibition"
          target="_blank"
          sx={{ m: 1 }}
        >
          GitHub Repo
        </Button>
        <Button
          variant="outlined"
          href="https://virtualexhibition.demo"
          target="_blank"
          sx={{ m: 1 }}
        >
          Live Demo
        </Button>
      </Box>
      <MuiLink component={Link} to="/projects" sx={{ color: "#00fff7" }}>
        ← Back to Projects
      </MuiLink>
    </Container>
  );
}

export default VirtualExhibition;
