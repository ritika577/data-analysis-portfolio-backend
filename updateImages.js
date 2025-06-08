const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Project = require('./models/Project');

// Sample project data with working image URLs
// Using the provided Cloudinary collection URL
const cloudinaryBaseUrl = 'https://collection.cloudinary.com/dsbxlxlmo/7dd36cc240239b04ab134bc1a7bf6d1d';

const sampleProjects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with user authentication, product catalog, and payment processing.",
    shortDescription: "Modern e-commerce solution with secure payments",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image: `${cloudinaryBaseUrl}/ecommerce.jpg`,
    link: "https://example.com/ecommerce",
    githubLink: "https://github.com/username/ecommerce",
    featured: true,
    category: "web",
    status: "completed",
    startDate: new Date("2023-01-15"),
    endDate: new Date("2023-04-20"),
    tags: ["ecommerce", "fullstack", "payments"],
    client: "Retail Corp",
    role: "Full Stack Developer",
    teamSize: 4,
    challenges: "Implementing secure payment processing and real-time inventory management.",
    solution: "Integrated Stripe for payments and implemented WebSockets for real-time updates.",
    results: "Increased conversion rate by 35% and reduced cart abandonment by 22%.",
    screenshots: [
      `${cloudinaryBaseUrl}/ecommerce-1.jpg`,
      `${cloudinaryBaseUrl}/ecommerce-2.jpg`
    ]
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    shortDescription: "Real-time task management for teams",
    technologies: ["React", "Node.js", "MongoDB", "Socket.IO"],
    image: `${cloudinaryBaseUrl}/taskapp.jpg`,
    link: "https://example.com/taskapp",
    githubLink: "https://github.com/username/taskapp",
    featured: true,
    category: "web",
    status: "completed",
    startDate: new Date("2023-05-10"),
    endDate: new Date("2023-07-15"),
    tags: ["productivity", "collaboration", "realtime"],
    client: "Internal Project",
    role: "Frontend Lead",
    teamSize: 3,
    challenges: "Ensuring real-time synchronization across multiple clients.",
    solution: "Implemented WebSockets for real-time updates and conflict resolution.",
    results: "Improved team productivity by 40% and reduced email communication by 60%.",
    screenshots: [
      `${cloudinaryBaseUrl}/taskapp-1.jpg`,
      `${cloudinaryBaseUrl}/taskapp-2.jpg`
    ]
  },
  {
    title: "Machine Learning Model for Sentiment Analysis",
    description: "A machine learning model that analyzes customer reviews and classifies sentiment.",
    shortDescription: "NLP model for sentiment analysis",
    technologies: ["Python", "TensorFlow", "NLTK", "Flask"],
    image: `${cloudinaryBaseUrl}/ml-project.jpg`,
    link: "https://example.com/sentiment-analysis",
    githubLink: "https://github.com/username/sentiment-analysis",
    featured: false,
    category: "machine-learning",
    status: "completed",
    startDate: new Date("2023-02-01"),
    endDate: new Date("2023-03-15"),
    tags: ["machine-learning", "nlp", "python"],
    client: "Tech Startup",
    role: "ML Engineer",
    teamSize: 2,
    challenges: "Achieving high accuracy in sentiment classification across different domains.",
    solution: "Fine-tuned BERT model and implemented domain adaptation techniques.",
    results: "Achieved 92% accuracy in sentiment classification across multiple domains.",
    screenshots: [
      `${cloudinaryBaseUrl}/ml-1.jpg`,
      `${cloudinaryBaseUrl}/ml-2.jpg`
    ]
  }
];

async function updateProjects() {
  try {
    // Clear existing projects
    await Project.deleteMany({});
    console.log('✅ Cleared existing projects');
    
    // Insert new projects
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Successfully created ${createdProjects.length} projects`);
    
    // Display the created projects
    console.log('\nCreated Projects:');
    createdProjects.forEach(project => {
      console.log(`- ${project.title} (ID: ${project._id})`);
      console.log(`  Image URL: ${project.image}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating projects:', error);
    process.exit(1);
  }
}

updateProjects();
