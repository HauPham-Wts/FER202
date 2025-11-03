// Navigation Component (Lab 3 + Lab 4: Using React Bootstrap)
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaHome, FaLeaf, FaInfoCircle, FaEnvelope, FaSun, FaMoon, FaUser, FaTachometerAlt, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser, logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/natural', label: 'Natural', icon: <FaLeaf /> },
    ...(isAdmin ? [{ path: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> }] : []), // Lab 7: Dashboard (only for admin)
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> } // Lab 5: Profile page
  ];

  return (
    <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <span className="me-2">🌸</span>
          Orchid Paradise
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {navItems.map(item => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                active={location.pathname === item.path}
                className="mx-2"
              >
                <span className="me-1">{item.icon}</span>
                {item.label}
              </Nav.Link>
            ))}
            
            <Button 
              variant={isDarkMode ? 'outline-light' : 'outline-dark'}
              size="sm"
              onClick={toggleTheme}
              className="ms-3"
              title="Toggle Theme"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </Button>

            {/* Auth Section */}
            {currentUser ? (
              <Dropdown align="end" className="ms-2">
                <Dropdown.Toggle 
                  variant={isDarkMode ? 'outline-light' : 'outline-dark'}
                  size="sm"
                  id="user-dropdown"
                  className="d-flex align-items-center"
                >
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName}
                      className="rounded-circle me-2"
                      width="24"
                      height="24"
                    />
                  ) : (
                    <FaUser className="me-2" />
                  )}
                  {currentUser.displayName || 'User'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.ItemText>
                    <small className="text-muted">{currentUser.email}</small>
                    {isAdmin && (
                      <div>
                        <span className="badge bg-danger mt-1">Admin</span>
                      </div>
                    )}
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant={isDarkMode ? 'outline-light' : 'outline-primary'}
                size="sm"
                as={Link}
                to="/login"
                className="ms-2"
              >
                <FaSignInAlt className="me-1" />
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
