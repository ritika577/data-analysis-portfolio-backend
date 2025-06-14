const Certification = require('../models/Certification');
const asyncHandler = require('express-async-handler');

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
const getCertifications = asyncHandler(async (req, res) => {
  const certifications = await Certification.find({}).sort({ issueDate: -1 });
  res.json(certifications);
});

// @desc    Get single certification
// @route   GET /api/certifications/:id
// @access  Public
const getCertificationById = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);
  
  if (certification) {
    res.json(certification);
  } else {
    res.status(404);
    throw new Error('Certification not found');
  }
});

// @desc    Create a certification
// @route   POST /api/certifications
// @access  Private/Admin
const createCertification = asyncHandler(async (req, res) => {
  const {
    title,
    issuingOrganization,
    issueDate,
    expirationDate,
    credentialId,
    credentialUrl,
    skills,
    image
  } = req.body;

  const certification = new Certification({
    title,
    issuingOrganization,
    issueDate,
    expirationDate,
    credentialId,
    credentialUrl,
    skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
    image
  });

  const createdCertification = await certification.save();
  res.status(201).json(createdCertification);
});

// @desc    Update a certification
// @route   PUT /api/certifications/:id
// @access  Private/Admin
const updateCertification = asyncHandler(async (req, res) => {
  const {
    title,
    issuingOrganization,
    issueDate,
    expirationDate,
    credentialId,
    credentialUrl,
    skills,
    image
  } = req.body;

  const certification = await Certification.findById(req.params.id);

  if (certification) {
    certification.title = title || certification.title;
    certification.issuingOrganization = issuingOrganization || certification.issuingOrganization;
    certification.issueDate = issueDate || certification.issueDate;
    certification.expirationDate = expirationDate !== undefined ? expirationDate : certification.expirationDate;
    certification.credentialId = credentialId !== undefined ? credentialId : certification.credentialId;
    certification.credentialUrl = credentialUrl || certification.credentialUrl;
    certification.skills = Array.isArray(skills) 
      ? skills 
      : (skills ? skills.split(',').map(skill => skill.trim()) : certification.skills);
    certification.image = image || certification.image;

    const updatedCertification = await certification.save();
    res.json(updatedCertification);
  } else {
    res.status(404);
    throw new Error('Certification not found');
  }
});

// @desc    Delete a certification
// @route   DELETE /api/certifications/:id
// @access  Private/Admin
const deleteCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);

  if (certification) {
    await certification.remove();
    res.json({ message: 'Certification removed' });
  } else {
    res.status(404);
    throw new Error('Certification not found');
  }
});

// Export all controller functions
module.exports = {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification
};
