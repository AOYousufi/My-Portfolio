import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

function Education() {
  return (
    <Container sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
      >
        Education
      </Typography>
      <Box>
        <List>
          {[
            {
              primary: "Staffordshire University",
              secondary:
                "Undergraduate – Software Development BSc (Hons) (09/2024 – 06/2028)",
            },
            {
              primary: "Northcoders",
              secondary:
                "Junior Software Developer (06/2024 – 08/2024) – Full-stack development, Agile practices, Version Control, Database Management, TDD",
            },
            {
              primary: "Rana University",
              secondary:
                "Bachelor’s in Software Engineering (unfinished) (01/2022 – 06/2023)",
            },
          ].map((edu, idx) => (
            <ListItem key={idx} sx={{ mb: 2 }}>
              <ListItemText primary={edu.primary} secondary={edu.secondary} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default Education;
