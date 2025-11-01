// Presentational Component - OrchidCard
import { useNavigate } from 'react-router-dom';
import './OrchidCard.css';

const OrchidCard = ({ orchid, onDetailClick }) => {
  const navigate = useNavigate();

  // Function to render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  const handleDetailClick = () => {
    if (onDetailClick) {
      onDetailClick(orchid);
    }
  };

  const handleViewPage = () => {
    navigate(`/detail/${orchid.id}`);
  };

  return (
    <div className="orchid-card">
      <div className="card-image-wrapper">
        <img 
          src={orchid.image} 
          alt={orchid.name}
          className="card-image"
          loading="lazy"
        />
        {orchid.isSpecial && (
          <span className="badge special-badge">⭐ Special</span>
        )}
        {orchid.isNatural && (
          <span className="badge natural-badge">🌿 Natural</span>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="orchid-name">{orchid.name}</h3>
        
        <div className="orchid-info">
          <div className="info-row">
            <span className="info-label">🏷️ Category:</span>
            <span className="info-value">{orchid.category}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">📍 Origin:</span>
            <span className="info-value">{orchid.origin}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">🎨 Color:</span>
            <span className="info-value color-tag">{orchid.color}</span>
          </div>
          
          <div className="info-row rating-row">
            <span className="info-label">Rating:</span>
            <div className="stars">{renderStars(orchid.rating)}</div>
          </div>
          
          <div className="info-row likes-row">
            <span className="likes">
              ❤️ {orchid.numberOfLike} likes
            </span>
          </div>
        </div>

        <div className="card-actions">
          <button className="detail-button" onClick={handleDetailClick}>
            <span>Quick View</span>
            <span className="arrow">👁️</span>
          </button>
          <button className="detail-button primary" onClick={handleViewPage}>
            <span>View Details</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrchidCard;
