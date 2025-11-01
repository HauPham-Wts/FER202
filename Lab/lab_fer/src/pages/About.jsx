// About Page (Lab 3/4)
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <header className="about-hero">
          <h1 className="about-title">🌸 About Orchid Paradise</h1>
          <p className="about-lead">
            Welcome to the world's most comprehensive orchid collection
          </p>
        </header>

        <section className="about-story">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, Orchid Paradise has grown from a small passion project into 
              one of the world's leading orchid databases. Our mission is to share the beauty 
              and diversity of orchids with enthusiasts around the globe.
            </p>
            <p>
              With over 16 carefully curated species in our collection, we showcase the 
              magnificent variety of orchids from different corners of the world. Each orchid 
              in our database has been carefully documented with detailed information about 
              its origin, characteristics, and care requirements.
            </p>
          </div>
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1583147610146-26e9e7ab3da1?w=600" 
              alt="Orchid Garden" 
            />
          </div>
        </section>

        <section className="about-features">
          <h2>What Makes Us Special</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🌍</span>
              <h3>Global Collection</h3>
              <p>Orchids from around the world, representing diverse ecosystems and climates.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📚</span>
              <h3>Expert Information</h3>
              <p>Detailed care guides and botanical information for each species.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⭐</span>
              <h3>Special Collections</h3>
              <p>Rare and exotic orchids that are truly one-of-a-kind specimens.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🌿</span>
              <h3>Natural Species</h3>
              <p>Both wild species and carefully cultivated hybrids in our collection.</p>
            </div>
          </div>
        </section>

        <section className="about-stats">
          <h2>By The Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">16+</span>
              <span className="stat-label">Orchid Species</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">12</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">3K+</span>
              <span className="stat-label">Total Likes</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Passion</span>
            </div>
          </div>
        </section>

        <section className="about-mission">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <p>
              At Orchid Paradise, we believe that orchids are more than just plants – 
              they are living works of art that connect us to nature's incredible diversity. 
              Our mission is threefold:
            </p>
            <ul>
              <li>
                <strong>Educate:</strong> Provide comprehensive information about orchid 
                species, their origins, and care requirements.
              </li>
              <li>
                <strong>Inspire:</strong> Share the breathtaking beauty of orchids to 
                inspire appreciation for botanical diversity.
              </li>
              <li>
                <strong>Preserve:</strong> Promote awareness about conservation of rare 
                and endangered orchid species.
              </li>
            </ul>
          </div>
        </section>

        <section className="about-cta">
          <h2>Join Our Community</h2>
          <p>
            Become part of a global community of orchid enthusiasts. Share your passion, 
            learn from experts, and discover new species.
          </p>
          <div className="cta-buttons">
            <a href="/" className="cta-button primary">Explore Collection</a>
            <a href="/contact" className="cta-button secondary">Contact Us</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
