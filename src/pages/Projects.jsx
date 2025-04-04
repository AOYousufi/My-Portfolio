import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Virtual Exhibition",
    description:
      "A responsive web app integrating Harvard & V&A museum APIs with advanced filtering and pagination.",
    path: "/projects/virtual-exhibition",
  },
  {
    title: "NC-News",
    description:
      "A full-stack news app featuring article browsing, voting, commenting, and user authentication.",
    path: "/projects/nc-news",
  },
  {
    title: "My-Plants",
    description:
      "A collaborative plant care app with login, reminders, and plant tracking using scalable API architecture.",
    path: "/projects/my-plants",
  },
];

function Projects() {
  return (
    <Container sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
      >
        Projects
      </Typography>
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2">{project.description}</Typography>
              </CardContent>
              <CardActions sx={{ mt: "auto" }}>
                <Button size="small" component={Link} to={project.path}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Projects;
