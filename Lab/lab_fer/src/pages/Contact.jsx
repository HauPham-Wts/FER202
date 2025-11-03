// Contact Page (Lab 3 & Lab 4 - Bootstrap Form)
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setSubmitted(true);
    setValidated(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">📬 Get In Touch</h1>
          <p className="lead text-muted">
            Have questions about our orchids? We'd love to hear from you!
          </p>
        </div>

        <Row className="g-4">
          {/* Contact Information */}
          <Col lg={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <h4 className="mb-4">Contact Information</h4>
                
                <div className="mb-4">
                  <div className="d-flex align-items-start mb-3">
                    <FaMapMarkerAlt className="text-primary me-3 mt-1" size={24} />
                    <div>
                      <h6 className="mb-1">Address</h6>
                      <p className="text-muted mb-0">
                        Ho Chi Minh City<br />
                        Viet Nam
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <FaPhone className="text-primary me-3 mt-1" size={24} />
                    <div>
                      <h6 className="mb-1">Phone</h6>
                      <p className="text-muted mb-0">+84 (123) 456-789</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <FaEnvelope className="text-primary me-3 mt-1" size={24} />
                    <div>
                      <h6 className="mb-1">Email</h6>
                      <p className="text-muted mb-0">info@orchidparadise.com</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <FaClock className="text-primary me-3 mt-1" size={24} />
                    <div>
                      <h6 className="mb-1">Business Hours</h6>
                      <p className="text-muted mb-0">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="mb-3">Follow Us</h6>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm" className="rounded-circle" style={{ width: '40px', height: '40px' }}>
                      <FaFacebook />
                    </Button>
                    <Button variant="outline-danger" size="sm" className="rounded-circle" style={{ width: '40px', height: '40px' }}>
                      <FaInstagram />
                    </Button>
                    <Button variant="outline-info" size="sm" className="rounded-circle" style={{ width: '40px', height: '40px' }}>
                      <FaTwitter />
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="rounded-circle" style={{ width: '40px', height: '40px' }}>
                      <FaPinterest />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col lg={8}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <h4 className="mb-4">Send Us a Message</h4>
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>Subject <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a subject.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Message <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell us more..."
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a message.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      We'll get back to you within 24-48 hours.
                    </Form.Text>
                  </Form.Group>

                  <Button 
                    variant={submitted ? 'success' : 'primary'} 
                    type="submit" 
                    size="lg" 
                    className="w-100"
                    disabled={submitted}
                  >
                    {submitted ? (
                      <>✓ Message Sent!</>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {submitted && (
                    <Alert variant="success" className="mt-3 mb-0">
                      <strong>Thank you!</strong> Your message has been sent successfully. We'll get back to you soon.
                    </Alert>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
