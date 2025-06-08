const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    shortDescription: {
        type: String,
        required: false
    },
    technologies: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    link: {
        type: String,
        required: [true, 'Project link is required']
    },
    githubLink: {
        type: String,
        required: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'data-science', 'machine-learning', 'other'],
        default: 'web'
    },
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'planned'],
        default: 'completed'
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    demoVideo: {
        type: String,
        required: false
    },
    tags: [{
        type: String,
        required: false
    }],
    client: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    teamSize: {
        type: Number,
        required: false
    },
    challenges: {
        type: String,
        required: false
    },
    solution: {
        type: String,
        required: false
    },
    results: {
        type: String,
        required: false
    },
    screenshots: [{
        type: String,
        required: false
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Text index for search functionality
projectSchema.index({
    title: 'text',
    description: 'text',
    technologies: 'text',
    tags: 'text'
});

module.exports = mongoose.model('Project', projectSchema);
