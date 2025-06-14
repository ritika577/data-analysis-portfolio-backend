const express = require('express');
const {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification
} = require('../controllers/certificationController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Apply authentication to all routes
router.use(authenticate);

// All routes now require authentication
router.route('/')
  .get(getCertifications)
  .post(createCertification);

router.route('/:id')
  .get(getCertificationById)
  .put(updateCertification)
  .delete(deleteCertification);

module.exports = router;
