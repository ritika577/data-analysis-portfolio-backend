const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1 });
        res.json(skills);
    } catch (error) {
        console.error('Error getting skills:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single skill category
// @route   GET /api/skills/:id
// @access  Public
const getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (skill) {
            res.json(skill);
        } else {
            res.status(404).json({ message: 'Skill category not found' });
        }
    } catch (error) {
        console.error('Error getting skill by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a skill category
// @route   POST /api/skills
// @access  Public
const createSkill = async (req, res) => {
    try {
        const { category, skills, icon } = req.body;
        
        if (!category || !skills || !Array.isArray(skills)) {
            return res.status(400).json({ message: 'Please provide category and skills array' });
        }
        
        const skill = new Skill({
            category,
            skills,
            icon: icon || ''
        });
        
        const createdSkill = await skill.save();
        res.status(201).json(createdSkill);
    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ message: 'Error creating skill', error: error.message });
    }
};

// @desc    Update a skill category
// @route   PUT /api/skills/:id
// @access  Public
const updateSkill = async (req, res) => {
    try {
        const { category, skills, icon } = req.body;
        
        const skill = await Skill.findById(req.params.id);
        
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        
        if (category) skill.category = category;
        if (skills) skill.skills = skills;
        if (icon !== undefined) skill.icon = icon;
        
        const updatedSkill = await skill.save();
        res.json(updatedSkill);
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ message: 'Error updating skill', error: error.message });
    }
};

// @desc    Delete a skill category
// @route   DELETE /api/skills/:id
// @access  Public
const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        
        await skill.remove();
        res.json({ message: 'Skill category removed successfully' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ message: 'Error deleting skill', error: error.message });
    }
};

module.exports = {
    getSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
};
