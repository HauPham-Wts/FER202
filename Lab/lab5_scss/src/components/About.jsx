// About Component - Lab 5
const About = () => {
  return (
    <section className="about" id="about">
      <h2 className="about__title">About Me</h2>
      <div className="about__content">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800" 
          alt="Coding" 
          className="about__image"
        />
        <div className="about__text">
          <h3>Hi, I'm Trang! 👋</h3>
          <p>
            I'm a passionate full-stack developer with over 3 years of experience in building 
            web applications. I love turning complex problems into simple, beautiful, and 
            intuitive solutions.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to 
            open source projects, or sharing my knowledge through blog posts and tutorials.
          </p>
          <ul>
            <li>
              <span className="label">📅 Birthday:</span>
              <span className="value">January 15, 2003</span>
            </li>
            <li>
              <span className="label">🎓 Degree:</span>
              <span className="value">Bachelor in Computer Science</span>
            </li>
            <li>
              <span className="label">📧 Email:</span>
              <span className="value">trang@example.com</span>
            </li>
            <li>
              <span className="label">📱 Phone:</span>
              <span className="value">+84 123 456 789</span>
            </li>
            <li>
              <span className="label">🌍 Location:</span>
              <span className="value">Ho Chi Minh City, Vietnam</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
