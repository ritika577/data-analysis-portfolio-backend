const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Project = require('./models/Project');

async function checkProjects() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connection.once('open', () => {
            console.log('✅ Connected to MongoDB');
        });

        const projects = await Project.find({});
        console.log('\n📋 Projects in database:');
        console.log(JSON.stringify(projects, null, 2));
        
        console.log('\n🔍 First project details:');
        if (projects.length > 0) {
            console.log('Title:', projects[0].title);
            console.log('Image URL:', projects[0].image);
            console.log('Screenshots:', projects[0].screenshots);
        } else {
            console.log('No projects found in the database');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error checking projects:', error);
        process.exit(1);
    }
}

checkProjects();
