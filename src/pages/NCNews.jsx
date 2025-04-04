import React from "react";
import {
  Container,
  Typography,
  Box,
  Link as MuiLink,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

function NCNews() {
  return (
    <Container sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
      >
        NC-News
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Built a full-stack news app featuring article browsing, voting,
          commenting, and user authentication using React on the front-end and
          Express/Node.js with PostgreSQL on the back-end.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Technologies Used:</strong> React, Node.js, Express,
          PostgreSQL.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Skills Gained:</strong> Full-stack Development, RESTful API
          Integration, Database Management.
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          href="https://github.com/ozairyousufi/nc-news"
          target="_blank"
          sx={{ m: 1 }}
        >
          GitHub Repo
        </Button>
        <Button
          variant="outlined"
          href="https://ncnews.demo"
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

export default NCNews;
