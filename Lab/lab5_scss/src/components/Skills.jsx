// Skills Component - Lab 5
const Skills = () => {
  const skills = [
    { name: 'HTML5', icon: '🌐', level: 95 },
    { name: 'CSS3/SCSS', icon: '🎨', level: 90 },
    { name: 'JavaScript', icon: '⚡', level: 88 },
    { name: 'React.js', icon: '⚛️', level: 85 },
    { name: 'Node.js', icon: '🟢', level: 80 },
    { name: 'MongoDB', icon: '🍃', level: 75 },
    { name: 'Git/GitHub', icon: '📦', level: 85 },
    { name: 'UI/UX Design', icon: '✨', level: 78 }
  ];

  return (
    <section className="skills" id="skills">
      <div className="skills__container">
        <h2 className="skills__title">My Skills</h2>
        <div className="skills__grid">
          {skills.map((skill, index) => (
            <div key={index} className="skills__card">
              <div className="skills__card-icon">{skill.icon}</div>
              <h3 className="skills__card-name">{skill.name}</h3>
              <div className="skills__card-level">
                <div className="bar" style={{ width: `${skill.level}%` }}></div>
              </div>
              <span className="skills__card-percent">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
