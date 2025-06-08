require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const sampleProjects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with user authentication, product catalog, and payment processing.",
    shortDescription: "Modern e-commerce solution with secure payments",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image: "https://via.placeholder.com/800x600/4a6cf7/ffffff?text=E-commerce+Platform",
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
      "https://via.placeholder.com/800x600/f3f4f6/4b5563?text=Homepage",
      "https://via.placeholder.com/800x600/e5e7eb/4b5563?text=Product+Page"
    ]
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    shortDescription: "Real-time task management for teams",
    technologies: ["React", "Node.js", "MongoDB", "Socket.IO"],
    image: "https://via.placeholder.com/800x600/10b981/ffffff?text=Task+App",
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
      "https://via.placeholder.com/800x600/f3f4f6/4b5563?text=Dashboard",
      "https://via.placeholder.com/800x600/e5e7eb/4b5563?text=Task+Board"
    ]
  },
  {
    title: "Machine Learning Model for Sentiment Analysis",
    description: "A machine learning model that analyzes customer reviews and classifies sentiment.",
    shortDescription: "NLP model for sentiment analysis",
    technologies: ["Python", "TensorFlow", "NLTK", "Flask"],
    image: "https://via.placeholder.com/800x600/8b5cf6/ffffff?text=ML+Sentiment",
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
      "https://via.placeholder.com/800x600/f3f4f6/4b5563?text=Model+Architecture",
      "https://via.placeholder.com/800x600/e5e7eb/4b5563?text=Results+Dashboard"
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    
    // Insert sample projects
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`Successfully seeded ${createdProjects.length} projects`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
