// Single source of truth for project cards, case studies and route smoke checks.
export const PROJECTS = [
  {
    id: 'nc-news',
    path: '/projects/nc-news',
    title: 'NC News',
    subtitle: 'Full-stack publishing platform',
    description: 'A full-stack news and discussion platform with accounts, publishing, search, voting, saved articles, notifications and moderation.',
    overview: 'An end-to-end React and Express application backed by PostgreSQL. I developed and extended the frontend and REST API, with particular focus on safe permissions, data consistency and release quality.',
    highlights: [
      'Authentication, account profiles and server-enforced ownership for publishing and discussion.',
      'Search, trending topics, personalised feeds, article collections and notifications.',
      'Soft deletion, moderation history, database migrations and structured error handling.',
      'Automated PostgreSQL integration tests, browser journeys and accessibility checks.',
    ],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Jest', 'Playwright'],
    github: 'https://github.com/AOYousufi/NC-News-BE',
    repositories: [
      { label: 'Frontend source', url: 'https://github.com/AOYousufi/NC-news-FE' },
      { label: 'Backend source', url: 'https://github.com/AOYousufi/NC-News-BE' },
    ],
    live: 'https://nc-news-sultan.netlify.app/',
    accent: '#4ab8c0',
    icon: '◈',
    category: 'Full Stack',
    collaboration: 'Personal full-stack project expanded from Northcoders coursework.',
  },
  {
    id: 'virtual-exhibition',
    path: '/projects/virtual-exhibition',
    title: 'Virtual Exhibition',
    subtitle: 'Museum collections and discovery',
    description: 'A collaborative museum-discovery web app integrating Harvard Art Museums and Victoria & Albert Museum data.',
    overview: 'A team-built web experience for discovering and exploring artworks from museum collections. The work involved React interfaces and coordinating data across external museum APIs and an application backend.',
    highlights: [
      'Integrated artwork data from the Harvard Art Museums and V&A APIs.',
      'Built responsive discovery views with filtering and pagination.',
      'Worked collaboratively across frontend and backend codebases.',
    ],
    stack: ['React', 'Node.js', 'Express', 'REST APIs', 'CSS3'],
    github: 'https://github.com/AOYousufi/Virtual-Exhibition',
    repositories: [
      { label: 'Frontend source', url: 'https://github.com/AOYousufi/Virtual-Exhibition' },
      { label: 'Backend source', url: 'https://github.com/AOYousufi/SE-Exhibiton-BE' },
    ],
    live: 'https://mueseumexhibition.netlify.app/',
    accent: '#5b8fff',
    icon: '◉',
    category: 'Full Stack',
    collaboration: 'Collaborative project.',
  },
  {
    id: 'my-plants',
    path: '/projects/my-plants',
    title: 'My Plants',
    subtitle: 'React Native plant care',
    description: 'A collaborative React Native plant-care app with accounts, plant collections and watering reminders supported by a MongoDB API.',
    overview: 'A mobile-first team project focused on making plant care easier to track. The application combines React Native screens with a Node/Express backend and MongoDB data.',
    highlights: [
      'Plant tracking and collections with user account support.',
      'Watering reminders and plant identification functionality.',
      'Mobile development using React Native and Expo with API integration.',
    ],
    stack: ['React Native', 'Expo', 'Express', 'MongoDB'],
    github: 'https://github.com/AOYousufi/my-plants-FE',
    repositories: [
      { label: 'Mobile source', url: 'https://github.com/AOYousufi/my-plants-FE' },
      { label: 'Backend source', url: 'https://github.com/AOYousufi/my-plants-BE' },
    ],
    live: null,
    accent: '#a78bfa',
    icon: '◎',
    category: 'Mobile',
    collaboration: 'Collaborative project; source repositories available.',
  },
];

export function findProjectById(id) {
  return PROJECTS.find((project) => project.id === id);
}
