// About Page (Lab 3/4: Using React Bootstrap)
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaGlobe, FaBook, FaStar, FaLeaf } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <Container className="py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">🌸 About Orchid Paradise</h1>
        <p className="lead text-muted">
          Welcome to the world's most comprehensive orchid collection
        </p>
      </div>

      {/* Our Story */}
      <Row className="mb-5">
        <Col lg={12}>
          <h2 className="mb-3">Our Story</h2>
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
        </Col>
      </Row>

      {/* Features - Lab 4: Using Bootstrap Cards */}
      <h2 className="text-center mb-4">What Makes Us Special</h2>
      <Row className="g-4 mb-5">
        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <div className="display-4 mb-3"><FaGlobe className="text-primary" /></div>
              <Card.Title>Global Collection</Card.Title>
              <Card.Text>
                Orchids from around the world, representing diverse ecosystems and climates.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <div className="display-4 mb-3"><FaBook className="text-success" /></div>
              <Card.Title>Expert Information</Card.Title>
              <Card.Text>
                Detailed care guides and botanical information for each species.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <div className="display-4 mb-3"><FaStar className="text-warning" /></div>
              <Card.Title>Special Collections</Card.Title>
              <Card.Text>
                Rare and exotic orchids that are truly one-of-a-kind specimens.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <div className="display-4 mb-3"><FaLeaf className="text-success" /></div>
              <Card.Title>Natural Species</Card.Title>
              <Card.Text>
                Both wild species and carefully cultivated hybrids in our collection.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stats */}
      <h2 className="text-center mb-4">By The Numbers</h2>
      <Row className="g-4 mb-5 text-center">
        <Col md={3}>
          <Card className="border-primary shadow-sm">
            <Card.Body>
              <h2 className="display-3 text-primary mb-0">16+</h2>
              <p className="text-muted mb-0">Orchid Species</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-success shadow-sm">
            <Card.Body>
              <h2 className="display-3 text-success mb-0">12</h2>
              <p className="text-muted mb-0">Countries</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-danger shadow-sm">
            <Card.Body>
              <h2 className="display-3 text-danger mb-0">3K+</h2>
              <p className="text-muted mb-0">Total Likes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-warning shadow-sm">
            <Card.Body>
              <h2 className="display-3 text-warning mb-0">100%</h2>
              <p className="text-muted mb-0">Passion</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mission */}
      <Card className="shadow-sm mb-5">
        <Card.Body className="p-4">
          <h2 className="mb-3">Our Mission</h2>
          <p>
            At Orchid Paradise, we believe that orchids are more than just plants – 
            they are living works of art that connect us to nature's incredible diversity. 
            Our mission is threefold:
          </p>
          <ul className="list-unstyled">
            <li className="mb-2">
              <strong>✅ Educate:</strong> Provide comprehensive information about orchid 
              species, their origins, and care requirements.
            </li>
            <li className="mb-2">
              <strong>💡 Inspire:</strong> Share the breathtaking beauty of orchids to 
              inspire appreciation for botanical diversity.
            </li>
            <li className="mb-2">
              <strong>🌍 Preserve:</strong> Promote awareness about conservation of rare 
              and endangered orchid species.
            </li>
          </ul>
        </Card.Body>
      </Card>

      {/* CTA */}
      <Card className="bg-primary text-white text-center shadow">
        <Card.Body className="p-5">
          <h2 className="mb-3">Join Our Community</h2>
          <p className="mb-4">
            Become part of a global community of orchid enthusiasts. Share your passion, 
            learn from experts, and discover new species.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button href="/" variant="light" size="lg">
              Explore Collection
            </Button>
            <Button href="/contact" variant="outline-light" size="lg">
              Contact Us
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
