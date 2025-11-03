// Feedback Form Component - Lab 7
import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { FaStar, FaPaperPlane } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './FeedbackForm.css';

const FeedbackForm = ({ orchidId, onSubmit, existingFeedback }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Check if user already submitted feedback
  const userFeedback = existingFeedback?.find(
    fb => fb.author === currentUser?.email
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const feedbackData = {
        rating,
        comment: comment.trim(),
        author: currentUser.email,
        date: new Date().toISOString()
      };

      await onSubmit(feedbackData);
      
      // Reset form
      setRating(5);
      setComment('');
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If user already submitted feedback
  if (userFeedback) {
    return (
      <Alert variant="info">
        <Alert.Heading>✓ You already submitted feedback</Alert.Heading>
        <p className="mb-0">
          You rated this orchid <strong>{userFeedback.rating} stars</strong> on{' '}
          {new Date(userFeedback.date).toLocaleDateString()}
        </p>
      </Alert>
    );
  }

  // If user is not logged in
  if (!currentUser) {
    return (
      <Alert variant="warning">
        <Alert.Heading>🔒 Login Required</Alert.Heading>
        <p className="mb-0">
          Please log in to submit your feedback for this orchid.
        </p>
      </Alert>
    );
  }

  return (
    <Card className="feedback-form-card">
      <Card.Body>
        <h5 className="mb-3">✍️ Share Your Feedback</h5>
        
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Rating Input */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Your Rating</Form.Label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star-icon ${
                    star <= (hoveredRating || rating) ? 'active' : ''
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
              <span className="ms-3 text-muted">
                {rating} {rating === 1 ? 'star' : 'stars'}
              </span>
            </div>
          </Form.Group>

          {/* Comment Input */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Your Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Share your experience with this orchid..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isSubmitting}
              maxLength={500}
            />
            <Form.Text className="text-muted">
              {comment.length}/500 characters
            </Form.Text>
          </Form.Group>

          {/* Submit Button */}
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Posting as: <strong>{currentUser.email}</strong>
            </small>
            <Button 
              type="submit" 
              variant="primary"
              disabled={isSubmitting || !comment.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FeedbackForm;
