// Profile/About Me Page - Lab 5
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { FaCode, FaLightbulb, FaRocket, FaHeart } from 'react-icons/fa';
import '../scss/Profile.scss';

const Profile = () => {
  const skills = {
    frontend: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SCSS', 'Bootstrap', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API'],
    tools: ['Git', 'GitHub', 'VS Code', 'Vite', 'npm', 'Postman'],
    other: ['Responsive Design', 'UI/UX', 'Agile', 'Problem Solving']
  };

  const stats = [
    { number: '50+', label: 'Projects Done', className: 'stat-success' },
    { number: '3+', label: 'Years Experience', className: 'stat-info' },
    { number: '100+', label: 'Happy Clients', className: 'stat-warning' },
    { number: '1000+', label: 'Code Commits', className: 'stat-danger' }
  ];

  const aboutCards = [
    {
      icon: <FaCode />,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code following best practices and design patterns.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Creative Solutions',
      description: 'Turning complex problems into simple, elegant solutions with innovative thinking.'
    },
    {
      icon: <FaRocket />,
      title: 'Fast Performance',
      description: 'Optimizing applications for speed and efficiency to deliver the best user experience.'
    },
    {
      icon: <FaHeart />,
      title: 'Passion Driven',
      description: 'Loving what I do and constantly learning new technologies and frameworks.'
    }
  ];

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <section className="profile-hero">
        <div className="profile-avatar animate-fade-in-up">
          <img 
            src="https://avatars.githubusercontent.com/u/1?v=4" 
            alt="Profile Avatar"
          />
        </div>
        <h1 className="profile-name animate-fade-in-up delay-1">
          Pham Van Hau
        </h1>
        <p className="profile-title animate-fade-in-up delay-2">
          Full Stack Developer | React Enthusiast | UI/UX Designer
        </p>
        <div className="profile-social animate-fade-in-up delay-3">
          <a href="#" className="social-link" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="#" className="social-link" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#" className="social-link" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" className="social-link" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="profile-about">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          {aboutCards.map((card, index) => (
            <div key={index} className="about-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-icon">
                {card.icon}
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="profile-skills">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-container">
          <div className="skill-category">
            <h3 className="category-title">Frontend Development</h3>
            <div className="skills-grid">
              {skills.frontend.map((skill, index) => (
                <span key={index} className={`skill-item level-${(index % 5) + 1}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="category-title">Backend Development</h3>
            <div className="skills-grid">
              {skills.backend.map((skill, index) => (
                <span key={index} className={`skill-item level-${(index % 5) + 1}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="category-title">Tools & Technologies</h3>
            <div className="skills-grid">
              {skills.tools.map((skill, index) => (
                <span key={index} className={`skill-item level-${(index % 5) + 1}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="category-title">Other Skills</h3>
            <div className="skills-grid">
              {skills.other.map((skill, index) => (
                <span key={index} className={`skill-item level-${(index % 5) + 1}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="profile-stats">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.className} animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="profile-contact">
        <h2 className="section-title">Let's Work Together</h2>
        <p className="section-description">
          I'm always interested in hearing about new projects and opportunities.
        </p>
        <div className="contact-buttons">
          <button className="contact-button primary">
            Get In Touch
          </button>
          <button className="contact-button">
            Download CV
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
