import React, { useState } from "react";
import "./ContactUsCard.css";
import contactImage from "../../assets/images/email-6370595_1280.jpg"; // Replace with actual image path if different

const ContactUsCard = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <section className="contact-us-card-container">
      <div className="text-section">
        <h2>Contact Us</h2>
        <p>
          Get in touch for real estate consulting and property services in
          Ahmedabad, Gujarat, India.
        </p>
      </div>
      <form className="form-section" onSubmit={handleSubmit}>
        <label htmlFor="firstName">Your First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="email">Your Email Address*</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="message">Your Message*</label>
        <textarea
          id="message"
          name="message"
          placeholder="Type your message here"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Your Inquiry</button>
      </form>
      <div className="image-section">
        <img src={contactImage} alt="Contact Us" />
      </div>
    </section>
  );
};

export default ContactUsCard;
