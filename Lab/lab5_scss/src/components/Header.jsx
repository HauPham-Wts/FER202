// Header Component - Lab 5
const Header = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header__content">
        <img 
          src="https://i.pravatar.cc/300?img=68" 
          alt="Profile" 
          className="header__avatar"
        />
        <h1 className="header__title">Pham Thuy Trang</h1>
        <p className="header__subtitle">Full Stack Developer & UI/UX Enthusiast</p>
        <p className="header__description">
          Passionate about creating beautiful, functional, and user-friendly web experiences.
          Specialized in React, Node.js, and modern web technologies.
        </p>
        <div className="header__buttons">
          <button className="header__btn header__btn--primary" onClick={() => scrollToSection('contact')}>
            Contact Me
          </button>
          <button className="header__btn" onClick={() => scrollToSection('projects')}>
            View Projects
          </button>
        </div>
      </div>
      <div className="header__scroll" onClick={() => scrollToSection('about')}>
        <span>Scroll Down</span>
        <span className="header__scroll-icon">↓</span>
      </div>
    </header>
  );
};

export default Header;
