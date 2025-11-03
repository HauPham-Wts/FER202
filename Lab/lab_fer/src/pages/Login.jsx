import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const { currentUser, signInWithGoogle, error: authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container>
        <div className="login-wrapper">
          <Card className="login-card">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h1 className="login-title mb-2">🌸 Orchid Manager</h1>
                <p className="text-muted">Sign in to manage your orchid collection</p>
              </div>

              {(error || authError) && (
                <Alert variant="danger" className="mb-3">
                  {error || authError}
                </Alert>
              )}

              <Button
                variant="light"
                size="lg"
                className="w-100 google-btn"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaGoogle className="me-2" />
                    Sign in with Google
                  </>
                )}
              </Button>

              <div className="text-center mt-4">
                <small className="text-muted">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </small>
              </div>
            </Card.Body>
          </Card>

          <div className="text-center mt-3">
            <Button variant="link" className="back-to-home-btn" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
