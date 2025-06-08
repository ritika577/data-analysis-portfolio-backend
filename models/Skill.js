const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    skills: [{
        type: String,
        required: true
    }],
    icon: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
skillSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Skill', skillSchema);
