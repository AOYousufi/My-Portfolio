import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

function WorkExperience() {
  return (
    <Container sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
      >
        Work Experience
      </Typography>
      <Box>
        <List>
          <ListItem sx={{ mb: 2 }}>
            <ListItemText
              primary="Unitemps – Website Developer"
              secondary="Stoke-on-Trent, UK (Feb 2025 - March 2025) – Created wireframes, attended weekly meetings, and ensured brand consistency."
            />
          </ListItem>
          <ListItem sx={{ mb: 2 }}>
            <ListItemText
              primary="Marks & Spencer – Customer Service Assistant"
              secondary="Stone, UK (Dec 2024 - Feb 2025) – Collaborated with colleagues to meet operational goals and managed task prioritisation."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}

export default WorkExperience;
