// Navigation Component (Lab 3)
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/natural', label: 'Natural', icon: '🌿' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📬' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🌸</span>
          <span className="logo-text">Orchid Paradise</span>
        </Link>

        <ul className="nav-menu">
          {navItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button 
          className="theme-toggle-nav" 
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
