// Contact Page (Lab 3)
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <header className="contact-header">
          <h1 className="contact-title">📬 Get In Touch</h1>
          <p className="contact-subtitle">
            Have questions about our orchids? We'd love to hear from you!
          </p>
        </header>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div className="info-details">
                <h3>Address</h3>
                <p>123 Orchid Garden Street<br />Paradise City, PC 12345</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📞</span>
              <div className="info-details">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div className="info-details">
                <h3>Email</h3>
                <p>info@orchidparadise.com</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div className="info-details">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br />
                   Saturday: 10:00 AM - 4:00 PM<br />
                   Sunday: Closed</p>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">📌</a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send Us a Message</h2>
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more..."
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </button>

              {submitted && (
                <div className="success-message">
                  Thank you for contacting us! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
