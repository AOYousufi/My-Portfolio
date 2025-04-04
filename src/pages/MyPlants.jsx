import React from "react";
import {
  Container,
  Typography,
  Box,
  Link as MuiLink,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

function MyPlants() {
  return (
    <Container sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
      >
        My-Plants
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Collaboratively developed a plant care app using React Native and
          Express/MongoDB. Features include user login, reminders, and plant
          tracking through a scalable API architecture.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Technologies Used:</strong> React Native, Express, MongoDB.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Skills Gained:</strong> Mobile App Development, API
          Architecture, Collaborative Development.
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          href="https://github.com/ozairyousufi/my-plants"
          target="_blank"
          sx={{ m: 1 }}
        >
          GitHub Repo
        </Button>
        <Button
          variant="outlined"
          href="https://myplants.demo"
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

export default MyPlants;
