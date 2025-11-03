import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert, Container } from 'react-bootstrap';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check if admin is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>🚫 Access Denied</Alert.Heading>
          <p>
            You don't have permission to access this page.
            Only administrators can access the Dashboard.
          </p>
          <hr />
          <p className="mb-0">
            <strong>Current user:</strong> {currentUser.email}
          </p>
        </Alert>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;
