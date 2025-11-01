// Footer Component - Lab 5
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__social">
          <a href="#" className="footer__social-link">📘</a>
          <a href="#" className="footer__social-link">🐦</a>
          <a href="#" className="footer__social-link">📷</a>
          <a href="#" className="footer__social-link">💼</a>
          <a href="#" className="footer__social-link">💻</a>
        </div>
        <p className="footer__text">
          © {currentYear} Pham Thuy Trang. Made with <span className="footer__love">❤️</span> using React & SCSS
        </p>
        <p className="footer__text">Lab 5 - CSS Preprocessor (SCSS)</p>
      </div>
    </footer>
  );
};

export default Footer;
