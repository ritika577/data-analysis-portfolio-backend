const express = require('express');
const router = express.Router();
const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');
const { authenticate } = require('../middleware/auth');

// Apply authentication to all routes
router.use(authenticate);

// All routes now require authentication
router.route('/')
  .get(getSkills)
  .post(createSkill);

router.route('/:id')
  .get(getSkillById)
  .put(updateSkill)
  .delete(deleteSkill);

module.exports = router;
