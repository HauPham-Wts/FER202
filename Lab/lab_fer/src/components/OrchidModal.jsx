// Modal Component for Orchid Details (Lab 2)
import { useEffect } from 'react';
import './OrchidModal.css';

const OrchidModal = ({ isOpen, orchid, onClose }) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !orchid) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-body">
          <div className="modal-image-section">
            <img 
              src={orchid.image} 
              alt={orchid.name}
              className="modal-image"
            />
            <div className="modal-badges">
              {orchid.isSpecial && (
                <span className="modal-badge special">⭐ Special</span>
              )}
              {orchid.isNatural && (
                <span className="modal-badge natural">🌿 Natural</span>
              )}
            </div>
          </div>

          <div className="modal-info-section">
            <h2 className="modal-title">{orchid.name}</h2>
            
            <div className="modal-rating">
              <div className="stars-large">{renderStars(orchid.rating)}</div>
              <span className="rating-text">{orchid.rating}/5 Stars</span>
            </div>

            <div className="modal-details">
              <div className="detail-item">
                <span className="detail-icon">🆔</span>
                <div className="detail-content">
                  <span className="detail-label">ID</span>
                  <span className="detail-value">{orchid.id}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">🏷️</span>
                <div className="detail-content">
                  <span className="detail-label">Category</span>
                  <span className="detail-value">{orchid.category}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <div className="detail-content">
                  <span className="detail-label">Origin</span>
                  <span className="detail-value">{orchid.origin}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">🎨</span>
                <div className="detail-content">
                  <span className="detail-label">Color</span>
                  <span className="detail-value color-value">{orchid.color}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">❤️</span>
                <div className="detail-content">
                  <span className="detail-label">Likes</span>
                  <span className="detail-value">{orchid.numberOfLike.toLocaleString()}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">✨</span>
                <div className="detail-content">
                  <span className="detail-label">Type</span>
                  <span className="detail-value">
                    {orchid.isNatural ? 'Natural Species' : 'Hybrid'}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-description">
              <h3>About this Orchid</h3>
              <p>
                The <strong>{orchid.name}</strong> is a {orchid.isNatural ? 'natural' : 'hybrid'} orchid 
                from the {orchid.category} family, originating from {orchid.origin}. 
                Known for its beautiful {orchid.color.toLowerCase()} coloring, this orchid 
                has received a rating of {orchid.rating} out of 5 stars and is loved by 
                {orchid.numberOfLike.toLocaleString()} orchid enthusiasts worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrchidModal;
