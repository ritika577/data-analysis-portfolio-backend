# Portfolio Backend API

This is the backend API for the portfolio website, built with Node.js, Express, and MongoDB.

## Features

- RESTful API endpoints for managing projects
- MongoDB database integration with Mongoose
- Full CRUD operations for projects
- Search and filtering capabilities
- Error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

## Running the Server

- Development mode (with auto-restart):
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

The server will be running at `http://localhost:5000` by default.

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a single project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project
- `GET /api/projects/search/:keyword` - Search projects

### Query Parameters

- `featured=true/false` - Filter featured projects
- `category=web|mobile|data-science|machine-learning|other` - Filter by category
- `status=completed|in-progress|planned` - Filter by status
- `search=keyword` - Search in title, description, technologies, and tags

## Project Model

```javascript
{
  title: String,                    // Project title (required)
  description: String,              // Detailed description (required)
  shortDescription: String,         // Short summary
  technologies: [String],            // Array of technologies used
  image: String,                     // Main image URL (required)
  link: String,                     // Project URL (required)
  githubLink: String,               // GitHub repository URL
  featured: Boolean,                 // Featured project flag
  category: String,                  // Project category
  status: String,                   // Project status
  startDate: Date,                  // Project start date
  endDate: Date,                    // Project end date
  demoVideo: String,                // Demo video URL
  tags: [String],                   // Project tags
  client: String,                   // Client name
  role: String,                     // Your role in the project
  teamSize: Number,                 // Team size
  challenges: String,               // Project challenges
  solution: String,                 // Your solution
  results: String,                  // Project results
  screenshots: [String],            // Array of screenshot URLs
  createdAt: Date,                  // Creation timestamp
  updatedAt: Date                   // Last update timestamp
}
```

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message"
}
```

## License

MIT
