const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticate } = require('../middleware/auth');

// Apply authentication to all routes
router.use(authenticate);

// All routes now require authentication
router.route('/')
  .get(projectController.getProjects)
  .post(projectController.createProject);

// Search route (requires authentication)
router.get('/search/:keyword', projectController.searchProjects);

// Single project operations (all require authentication)
router.route('/:id')
  .get(projectController.getProjectById)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;