// Feedback List Component - Lab 7
import { Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { FaStar, FaTrash, FaUser } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './FeedbackList.css';

const FeedbackList = ({ feedback = [], onDelete }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!feedback || feedback.length === 0) {
    return (
      <Card className="feedback-list-card">
        <Card.Body className="text-center py-5">
          <p className="text-muted mb-0">
            💬 No feedback yet. Be the first to share your thoughts!
          </p>
        </Card.Body>
      </Card>
    );
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={index < rating ? 'star-filled' : 'star-empty'} 
      />
    ));
  };

  const canDelete = (feedbackAuthor) => {
    // User can delete their own feedback or admin can delete any
    return currentUser && (
      currentUser.email === feedbackAuthor || 
      isAdmin
    );
  };

  return (
    <Card className="feedback-list-card">
      <Card.Header className="bg-white">
        <h5 className="mb-0">
          💬 Community Feedback ({feedback.length})
        </h5>
      </Card.Header>
      <ListGroup variant="flush">
        {feedback.map((fb, index) => (
          <ListGroup.Item key={index} className="feedback-item">
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                {/* Author and Date */}
                <div className="d-flex align-items-center mb-2">
                  <FaUser className="text-primary me-2" />
                  <strong>{fb.author}</strong>
                  <Badge bg="light" text="dark" className="ms-2">
                    {new Date(fb.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="rating mb-2">
                  {renderStars(fb.rating)}
                  <span className="ms-2 text-muted">
                    ({fb.rating}/5)
                  </span>
                </div>

                {/* Comment */}
                <p className="comment-text mb-0">
                  {fb.comment}
                </p>
              </div>

              {/* Delete Button */}
              {canDelete(fb.author) && onDelete && (
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => onDelete(index)}
                  title="Delete feedback"
                >
                  <FaTrash />
                </Button>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default FeedbackList;
