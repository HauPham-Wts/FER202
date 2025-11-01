// Contact Component - Lab 5
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully! (This is a demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <h2 className="contact__title">Get In Touch</h2>
        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__info-item">
              <span className="icon">📧</span>
              <div className="text">
                <h4>Email</h4>
                <p>trang@example.com</p>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="icon">📱</span>
              <div className="text">
                <h4>Phone</h4>
                <p>+84 123 456 789</p>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="icon">📍</span>
              <div className="text">
                <h4>Location</h4>
                <p>Ho Chi Minh City, Vietnam</p>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button type="submit" className="contact__form-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
