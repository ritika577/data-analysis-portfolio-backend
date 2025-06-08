const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// CRUD routes for projects
router.route('/')
    .get(projectController.getProjects)    // Get all projects with optional filtering
    .post(projectController.createProject); // Create a new project

// Search route
router.get('/search/:keyword', projectController.searchProjects);

// Single project operations
router.route('/:id')
    .get(projectController.getProjectById)     // Get single project
    .put(projectController.updateProject)      // Update project
    .delete(projectController.deleteProject);  // Delete project

module.exports = router;
