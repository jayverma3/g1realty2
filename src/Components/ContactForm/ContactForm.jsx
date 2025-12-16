import React from "react";
import "./ContactForm.css";
import agentImage from "../../assets/images/blank-profile-picture-973460_1280.webp"; // Placeholder image

const ContactForm = () => {
  return (
    <section className="contact-form-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="contact-title">
            Your Path to Simple, Stress-Free Financing
          </h2>
          <p className="contact-description">
            If you're in the market to buy, sell, refinance, or even build your
            dream home, you have a lot riding on your mortgage specialist. As
            market conditions and programs change frequently, you need to make
            sure you're dealing with a top professional who is able to give you
            quick and accurate lending advice.
          </p>
          <button className="btn rates-btn">Today's Rates</button>
        </div>
        <div className="agent-info">
          <img src={agentImage} alt="Agent" className="agent-image" />
          <h3 className="agent-name">Agent name</h3>
          <p className="agent-title">Senior Officer</p>
          <p className="agent-nmls">NMLS# 739669</p>
          <div className="agent-contact-details">
            <p>
              <strong>Union</strong>
            </p>
            <p>789 W. Ann Arbor Trail</p>
            <p>Plymouth, MI 48170</p>
            <p>
              <strong>Phone:</strong> (734) 306-8225
            </p>
            <p>
              <strong>Email:</strong> mstotz@global1realty.com
            </p>
          </div>
        </div>
      </div>
      <div className="form-container-contactpage">
        <h2 className="form-title">Contact Me About</h2>
        <form>
          <div className="form-group checkbox-group">
            <label>Query</label>
            <div>
              <input
                type="checkbox"
                id="pre-qualified"
                name="application_type"
                value="pre-qualified"
              />
              <label htmlFor="pre-qualified">Home</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="home-loan"
                name="application_type"
                value="home-loan"
              />
              <label htmlFor="home-loan">Realtor</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Comments, questions, feedback..."
            ></textarea>
          </div>
          <h3 className="form-subsection-title">About You</h3>
          <div className="form-group name-group">
            <div>
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" required />
            </div>
            <div>
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@website.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(###) ###-####"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="best-way">The best way to reach me is</label>
            <select id="best-way" name="best-way">
              <option>Select an option</option>
              <option>Phone</option>
              <option>Email</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="best-time">The best time to reach me is</label>
            <select id="best-time" name="best-time">
              <option>Select an option</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>
          <div className="form-group terms-group">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms">
              By providing your cellular telephone, you are consenting to allow
              Global 1 Realty LLC to contact you with marketing communications
              via voice call, AI voice call, text message, or similar automated
              means. To opt out, you can reply 'stop' at any time or reply
              'help' for assistance. Message and data rates may apply. Message
              frequency may vary. For more information see our Privacy Policy.
            </label>
          </div>
          <button type="submit" className="btn submit-btn">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
