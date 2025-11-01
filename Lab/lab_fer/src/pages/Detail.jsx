// Detail Page Component (Lab 3)
import { useParams, useNavigate } from 'react-router-dom';
import { orchids } from '../data/ListOfOrchids';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const orchid = orchids.find(o => o.id === id);

  if (!orchid) {
    return (
      <div className="detail-page not-found">
        <div className="not-found-content">
          <h1>🌸 Orchid Not Found</h1>
          <p>Sorry, we couldn't find the orchid you're looking for.</p>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <div className="detail-page">
      <button onClick={() => navigate('/')} className="back-button-top">
        ← Back to Home
      </button>

      <div className="detail-container">
        <div className="detail-hero">
          <div className="hero-image-wrapper">
            <img 
              src={orchid.image} 
              alt={orchid.name}
              className="hero-image"
            />
            <div className="hero-badges">
              {orchid.isSpecial && (
                <span className="hero-badge special">⭐ Special Orchid</span>
              )}
              {orchid.isNatural && (
                <span className="hero-badge natural">🌿 Natural Species</span>
              )}
            </div>
          </div>

          <div className="hero-content">
            <div className="category-tag">{orchid.category}</div>
            <h1 className="hero-title">{orchid.name}</h1>
            
            <div className="hero-rating">
              <div className="stars-display">{renderStars(orchid.rating)}</div>
              <span className="rating-score">{orchid.rating}/5 Stars</span>
            </div>

            <div className="hero-stats">
              <div className="stat-box">
                <span className="stat-icon">❤️</span>
                <div className="stat-info">
                  <span className="stat-value">{orchid.numberOfLike.toLocaleString()}</span>
                  <span className="stat-label">Likes</span>
                </div>
              </div>
              <div className="stat-box">
                <span className="stat-icon">📍</span>
                <div className="stat-info">
                  <span className="stat-value">{orchid.origin}</span>
                  <span className="stat-label">Origin</span>
                </div>
              </div>
              <div className="stat-box">
                <span className="stat-icon">🎨</span>
                <div className="stat-info">
                  <span className="stat-value">{orchid.color}</span>
                  <span className="stat-label">Color</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-sections">
          <section className="info-section">
            <h2>📋 Detailed Information</h2>
            <div className="info-grid">
              <div className="info-card">
                <span className="info-icon">🆔</span>
                <div className="info-text">
                  <span className="info-title">ID</span>
                  <span className="info-value">{orchid.id}</span>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon">🏷️</span>
                <div className="info-text">
                  <span className="info-title">Category</span>
                  <span className="info-value">{orchid.category}</span>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon">📍</span>
                <div className="info-text">
                  <span className="info-title">Origin Country</span>
                  <span className="info-value">{orchid.origin}</span>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon">🎨</span>
                <div className="info-text">
                  <span className="info-title">Primary Color</span>
                  <span className="info-value">{orchid.color}</span>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon">✨</span>
                <div className="info-text">
                  <span className="info-title">Type</span>
                  <span className="info-value">
                    {orchid.isNatural ? 'Natural Species' : 'Hybrid'}
                  </span>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon">⭐</span>
                <div className="info-text">
                  <span className="info-title">Status</span>
                  <span className="info-value">
                    {orchid.isSpecial ? 'Special Collection' : 'Regular'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="description-section">
            <h2>📖 About This Orchid</h2>
            <div className="description-content">
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
              {orchid.isSpecial && (
                <div className="special-note">
                  <span className="note-icon">⭐</span>
                  <p>
                    <strong>Special Collection:</strong> This orchid is part of our exclusive special collection, 
                    featuring rare and extraordinary specimens that showcase the pinnacle of orchid beauty.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="care-section">
            <h2>🌱 Care Tips</h2>
            <div className="care-grid">
              <div className="care-card">
                <span className="care-icon">💧</span>
                <h3>Watering</h3>
                <p>Water thoroughly when the potting medium is nearly dry. Ensure good drainage to prevent root rot.</p>
              </div>
              <div className="care-card">
                <span className="care-icon">☀️</span>
                <h3>Light</h3>
                <p>Provide bright, indirect light. Avoid direct sunlight which can burn the leaves.</p>
              </div>
              <div className="care-card">
                <span className="care-icon">🌡️</span>
                <h3>Temperature</h3>
                <p>Maintain temperatures between 60-80°F (15-27°C) with good air circulation.</p>
              </div>
              <div className="care-card">
                <span className="care-icon">💨</span>
                <h3>Humidity</h3>
                <p>Keep humidity levels around 50-70% for optimal growth and flowering.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Detail;
