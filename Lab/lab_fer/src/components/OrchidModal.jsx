// Modal Component for Orchid Details (Lab 2 + Lab 4: Using React Bootstrap Modal)
import { Modal, Badge, ListGroup, Row, Col, Card } from 'react-bootstrap';
import { FaStar, FaHeart, FaMapMarkerAlt, FaPalette, FaTag, FaLeaf } from 'react-icons/fa';

const OrchidModal = ({ isOpen, orchid, onClose }) => {
  if (!orchid) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={index < rating ? 'text-warning' : 'text-muted'} />
    ));
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="xl" centered scrollable>
      <Modal.Header closeButton className="bg-light border-0">
        <Modal.Title className="w-100">
          <h3 className="mb-0">{orchid.name}</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Row className="g-4">
          {/* Left Column - Images & Video */}
          <Col lg={5} md={12}>
            <Card className="border-0 shadow-sm overflow-hidden mb-3">
              <Card.Img 
                src={orchid.image} 
                alt={orchid.name}
                style={{ height: '350px', objectFit: 'cover', width: '100%' }}
              />
              <Card.Body className="p-3">
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  {orchid.isSpecial && (
                    <Badge bg="warning" text="dark" className="px-3 py-2">
                      ⭐ Special
                    </Badge>
                  )}
                  {orchid.isNatural && (
                    <Badge bg="success" className="px-3 py-2">
                      <FaLeaf className="me-1" /> Natural
                    </Badge>
                  )}
                </div>
              </Card.Body>
            </Card>
            
            {orchid.video && (
              <Card className="border-0 shadow-sm overflow-hidden">
                <Card.Header className="bg-primary text-white fw-bold py-2">
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
          </Col>

          {/* Right Column - Information */}
          <Col lg={7} md={12}>
            {/* Rating Section */}
            <Row className="mb-4 pb-3 border-bottom">
              <Col xs={7}>
                <div className="mb-2" style={{ fontSize: '1.6rem' }}>
                  {renderStars(orchid.rating)}
                </div>
                <p className="mb-0 text-muted">{orchid.rating} out of 5 stars</p>
              </Col>
              <Col xs={5} className="text-end">
                <FaHeart className="text-danger mb-2" style={{ fontSize: '2.5rem' }} />
                <h3 className="mb-0 fw-bold">{orchid.numberOfLike.toLocaleString()}</h3>
                <small className="text-muted">Likes</small>
              </Col>
            </Row>

            {/* Details Section */}
            <Card className="border shadow-sm mb-3">
              <Card.Header className="bg-primary text-white py-2">
                <h6 className="mb-0 fw-bold">📋 Orchid Details</h6>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="py-3">
                  <Row className="align-items-center">
                    <Col xs={2} className="text-center">
                      <FaTag className="text-primary" size={22} />
                    </Col>
                    <Col xs={10}>
                      <div>
                        <strong className="d-block text-muted small mb-1">Category</strong>
                        <Badge bg="primary" className="px-3 py-2">{orchid.category}</Badge>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="py-3">
                  <Row className="align-items-center">
                    <Col xs={2} className="text-center">
                      <FaMapMarkerAlt className="text-danger" size={22} />
                    </Col>
                    <Col xs={10}>
                      <div>
                        <strong className="d-block text-muted small mb-1">Origin</strong>
                        <h6 className="mb-0">{orchid.origin}</h6>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="py-3">
                  <Row className="align-items-center">
                    <Col xs={2} className="text-center">
                      <FaPalette className="text-info" size={22} />
                    </Col>
                    <Col xs={10}>
                      <div>
                        <strong className="d-block text-muted small mb-1">Color</strong>
                        <Badge bg="info" text="dark" className="px-3 py-2">{orchid.color}</Badge>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="py-3">
                  <Row className="align-items-center">
                    <Col xs={2} className="text-center">
                      <FaLeaf className="text-success" size={22} />
                    </Col>
                    <Col xs={10}>
                      <div>
                        <strong className="d-block text-muted small mb-1">Type</strong>
                        <Badge bg={orchid.isNatural ? 'success' : 'secondary'} className="px-3 py-2">
                          {orchid.isNatural ? 'Natural Species' : 'Hybrid'}
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {/* About Section */}
            <Card className="border-0 bg-light">
              <Card.Body className="p-3">
                <h6 className="fw-bold mb-3">💬 About this Orchid</h6>
                {orchid.description ? (
                  <p className="mb-0">{orchid.description}</p>
                ) : (
                  <>
                    <p className="mb-2">
                      The <strong>{orchid.name}</strong> is a {orchid.isNatural ? 'naturally occurring' : 'hybrid'} orchid 
                      from the <strong>{orchid.category}</strong> family, originating from <strong>{orchid.origin}</strong>. 
                    </p>
                    <p className="mb-0">
                      Known for its beautiful <strong>{orchid.color.toLowerCase()}</strong> coloring, this orchid 
                      has received an impressive rating of <strong>{orchid.rating} out of 5 stars</strong> and is loved by 
                      <strong> {orchid.numberOfLike.toLocaleString()}</strong> orchid enthusiasts worldwide.
                    </p>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default OrchidModal;
