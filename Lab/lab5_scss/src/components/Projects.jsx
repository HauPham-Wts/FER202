// Projects Component - Lab 5
const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600',
      tags: ['React', 'Firebase', 'Material-UI'],
      link: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather statistics using OpenWeather API.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600',
      tags: ['React', 'API', 'Chart.js'],
      link: '#'
    },
    {
      title: 'Social Media Clone',
      description: 'A social networking platform with user profiles, posts, comments, likes, and real-time notifications.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
      tags: ['React', 'Express', 'Socket.io'],
      link: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern and responsive portfolio website with smooth animations, dark mode, and contact form integration.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600',
      tags: ['React', 'SCSS', 'Framer Motion'],
      link: '#'
    },
    {
      title: 'Blog Platform',
      description: 'Full-featured blogging platform with markdown support, categories, tags, search functionality, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      link: '#'
    }
  ];

  return (
    <section className="projects" id="projects">
      <h2 className="projects__title">My Projects</h2>
      <div className="projects__grid">
        {projects.map((project, index) => (
          <div key={index} className="projects__card">
            <img src={project.image} alt={project.title} className="projects__card-image" />
            <h3 className="projects__card-title">{project.title}</h3>
            <p className="projects__card-description">{project.description}</p>
            <div className="projects__card-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <button className="projects__card-button">
              View Project <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
