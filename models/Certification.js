const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  issuingOrganization: {
    type: String,
    required: true,
    trim: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  expirationDate: {
    type: Date,
    default: null
  },
  credentialId: {
    type: String,
    trim: true
  },
  credentialUrl: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Certification', certificationSchema);