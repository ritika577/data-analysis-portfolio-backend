const Project = require('../models/Project');

// @desc    Get all projects with optional filtering
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
    try {
        const { featured, category, status, search } = req.query;
        const query = {};

        // Apply filters if provided
        if (featured) query.featured = featured === 'true';
        if (category) query.category = category;
        if (status) query.status = status;
        
        // Apply search if provided
        if (search) {
            query.$text = { $search: search };
        }

        const projects = await Project.find(query)
            .sort({ featured: -1, createdAt: -1 });
            
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Server error while fetching projects' });
    }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Server error while fetching project' });
    }
};

// @desc    Create a new project
// @route   POST /api/projects
exports.createProject = async (req, res) => {
    try {
        const projectData = {
            title: req.body.title,
            description: req.body.description,
            shortDescription: req.body.shortDescription || '',
            technologies: req.body.technologies || [],
            image: req.body.image,
            link: req.body.link,
            githubLink: req.body.githubLink || '',
            featured: req.body.featured || false,
            category: req.body.category || 'web',
            status: req.body.status || 'completed',
            startDate: req.body.startDate || null,
            endDate: req.body.endDate || null,
            demoVideo: req.body.demoVideo || '',
            tags: req.body.tags || [],
            client: req.body.client || '',
            role: req.body.role || '',
            teamSize: req.body.teamSize || null,
            challenges: req.body.challenges || '',
            solution: req.body.solution || '',
            results: req.body.results || '',
            screenshots: req.body.screenshots || []
        };
        
        const project = new Project(projectData);
        const savedProject = await project.save();
        
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ error: messages });
        }
        res.status(500).json({ error: 'Error creating project' });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        // List of all updatable fields
        const updatableFields = [
            'title', 'description', 'shortDescription', 'technologies', 'image', 
            'link', 'githubLink', 'featured', 'category', 'status', 'startDate', 
            'endDate', 'demoVideo', 'tags', 'client', 'role', 'teamSize', 
            'challenges', 'solution', 'results', 'screenshots'
        ];
        
        // Update only the fields that are provided in the request
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                project[field] = req.body[field];
            }
        });
        
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ error: messages });
        }
        res.status(500).json({ error: 'Error updating project' });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ 
            success: true, 
            message: 'Project deleted successfully',
            id: req.params.id 
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Error deleting project' });
    }
};

// @desc    Search projects by keyword
// @route   GET /api/projects/search/:keyword
exports.searchProjects = async (req, res) => {
    try {
        const { keyword } = req.params;
        const projects = await Project.find(
            { $text: { $search: keyword } },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });
        
        res.json(projects);
    } catch (error) {
        console.error('Error searching projects:', error);
        res.status(500).json({ error: 'Error searching projects' });
    }
};
