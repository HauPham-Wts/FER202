// Detail Page Component (Lab 3 + Lab 4: Using React Bootstrap Tabs)
// Lab 6: Updated to use Redux for data fetching
// Lab 7: Added Feedback feature
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrchids, addFeedback, deleteFeedback, clearSuccess, clearError } from '../redux/orchidsSlice';
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab, ListGroup, Alert } from 'react-bootstrap';
import { FaStar, FaHeart, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orchids, loading, success, error } = useSelector((state) => state.orchids);
  
  const orchid = orchids.find(o => o.id === id);

  useEffect(() => {
    if (orchids.length === 0) {
      dispatch(fetchOrchids());
    }
  }, [dispatch, orchids.length]);

  // Auto-hide success/error messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Handle feedback submission
  const handleFeedbackSubmit = async (feedbackData) => {
    await dispatch(addFeedback({ orchidId: id, feedbackData }));
  };

  // Handle feedback deletion
  const handleFeedbackDelete = async (feedbackIndex) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      await dispatch(deleteFeedback({ orchidId: id, feedbackIndex }));
    }
  };

  if (!orchid && loading) {
    return (
      <Container className="py-5 text-center">
        <h1 className="display-4">🌸 Loading...</h1>
      </Container>
    );
  }

  if (!orchid) {
    return (
      <Container className="py-5 text-center">
        <h1 className="display-4">🌸 Orchid Not Found</h1>
        <p className="lead">Sorry, we couldn't find the orchid you're looking for.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          <FaArrowLeft className="me-2" /> Back to Home
        </Button>
      </Container>
    );
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={index < rating ? 'text-warning' : 'text-muted'} />
    ));
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        {/* Success/Error Messages */}
        {success && (
          <Alert variant="success" dismissible onClose={() => dispatch(clearSuccess())}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <Row className="g-4">
          <Col lg={5}>
            <div className="position-sticky" style={{ top: '20px' }}>
              <Card className="shadow border-0 overflow-hidden mb-4">
                <Card.Img 
                  variant="top" 
                  src={orchid.image} 
                  alt={orchid.name}
                  style={{ height: '450px', objectFit: 'cover' }}
                />
                <Card.Body className="bg-white p-3">
                  <Badge bg="primary" className="px-3 py-2">{orchid.category}</Badge>
                </Card.Body>
              </Card>

              {orchid.video && (
                <Card className="shadow border-0 overflow-hidden">
                  <Card.Header className="bg-primary text-white fw-bold py-3">
                    📹 Video Presentation
                  </Card.Header>
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={orchid.video}
                      title={`${orchid.name} video`}
                      allowFullScreen
                      style={{ border: 'none' }}
                    ></iframe>
                  </div>
                </Card>
              )}
            </div>
          </Col>
          
          <Col lg={7}>
            <Card className="shadow border-0 mb-4">
              <Card.Body className="p-4">
                <h1 className="display-5 fw-bold mb-3">{orchid.name}</h1>
                
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 border-top border-bottom">
                  <div className="d-flex align-items-center">
                    <div className="me-2" style={{ fontSize: '1.5rem' }}>
                      {renderStars(orchid.rating)}
                    </div>
                    <span className="text-muted fs-5">({orchid.rating}/5)</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaHeart className="text-danger me-2" size={24} />
                    <span className="fs-5 fw-bold">{orchid.numberOfLike.toLocaleString()}</span>
                    <span className="text-muted ms-2">Likes</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Lab 4: Tabs Component */}
            <Card className="shadow border-0">
              <Tabs defaultActiveKey="info" className="px-3 pt-3">
            <Tab eventKey="info" title="📋 Information">
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}><strong>� ID:</strong></Col>
                        <Col sm={8}>{orchid.id}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}><strong>🏷️ Category:</strong></Col>
                        <Col sm={8}><Badge bg="primary">{orchid.category}</Badge></Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}><strong><FaMapMarkerAlt /> Origin:</strong></Col>
                        <Col sm={8}>{orchid.origin}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}><strong>🎨 Color:</strong></Col>
                        <Col sm={8}><Badge bg="info" text="dark">{orchid.color}</Badge></Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}><strong>✨ Type:</strong></Col>
                        <Col sm={8}>
                          <Badge bg={orchid.isNatural ? 'success' : 'secondary'}>
                            {orchid.isNatural ? 'Natural Species' : 'Hybrid'}
                          </Badge>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}><strong>⭐ Status:</strong></Col>
                        <Col sm={8}>
                          <Badge bg={orchid.isSpecial ? 'warning' : 'secondary'} text="dark">
                            {orchid.isSpecial ? 'Special Collection' : 'Regular'}
                          </Badge>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="description" title="📖 About">
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  {orchid.description ? (
                    <>
                      <p className="lead">{orchid.description}</p>
                      <hr />
                      <p>
                        This <strong>{orchid.isNatural ? 'naturally occurring' : 'hybrid'}</strong> orchid 
                        belongs to the <strong>{orchid.category}</strong> genus and has garnered 
                        <strong> {orchid.numberOfLike.toLocaleString()} likes</strong> from our community.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        The <strong>{orchid.name}</strong> is a {orchid.isNatural ? 'naturally occurring' : 'hybrid'} orchid 
                        species belonging to the <strong>{orchid.category}</strong> genus. This magnificent orchid originates 
                        from <strong>{orchid.origin}</strong>, where it thrives in its natural habitat.
                      </p>
                      <p>
                        Known for its stunning <strong>{orchid.color.toLowerCase()}</strong> coloring, this orchid has 
                        captured the hearts of orchid enthusiasts worldwide. With an impressive rating of 
                        <strong> {orchid.rating} out of 5 stars</strong>, it stands as a testament to its beauty and 
                        appeal among collectors.
                      </p>
                      <p>
                        This orchid has garnered <strong>{orchid.numberOfLike.toLocaleString()} likes</strong> from 
                        our community, making it {orchid.isSpecial ? 'one of our most special and sought-after specimens' : 
                        'a beloved addition to any collection'}.
                      </p>
                    </>
                  )}
                  {orchid.isSpecial && (
                    <div className="alert alert-warning mt-3">
                      <strong>⭐ Special Collection:</strong> This orchid is part of our exclusive special collection, 
                      featuring rare and extraordinary specimens.
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            {/* Lab 7: Feedback Tab */}
            <Tab eventKey="feedback" title="💬 Feedback">
              <div className="feedback-section">
                <Row className="g-4">
                  <Col lg={12}>
                    <FeedbackForm 
                      orchidId={orchid.id}
                      onSubmit={handleFeedbackSubmit}
                      existingFeedback={orchid.feedback || []}
                    />
                  </Col>
                  <Col lg={12}>
                    <FeedbackList 
                      feedback={orchid.feedback || []}
                      onDelete={handleFeedbackDelete}
                    />
                  </Col>
                </Row>
              </div>
            </Tab>
          </Tabs>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detail;
