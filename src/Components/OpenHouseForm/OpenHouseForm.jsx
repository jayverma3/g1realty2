import React, { useState } from "react";
import "./OpenHouseForm.css";
import LineScroller from "../LineScroller/LineScroller";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Home,
  MapPin,
  Phone,
  Mail,
  User,
  DollarSign,
  Calendar,
  Building,
  MessageSquare,
  Info,
  ArrowRight,
  PartyPopper,
} from "lucide-react";

// Animated bubbles background
const Bubbles = () => (
  <div className="bubbles-background">
    {Array.from({ length: 15 }).map((_, i) => (
      <div key={i} className="bubble" />
    ))}
  </div>
);

// Helper components defined outside the main component to prevent re-creation on render
const InputField = ({ icon, ...props }) => (
  <div className="input-wrapper">
    <span className="input-icon">{icon}</span>
    <input {...props} className="input-field" />
  </div>
);

const SelectField = ({ icon, children, ...props }) => (
  <div className="input-wrapper">
    <span className="input-icon">{icon}</span>
    <select {...props} className="input-field select-field">
      {children}
    </select>
  </div>
);

const RadioToggle = ({ name, value, onChange, options }) => (
  <div className="radio-toggle">
    {options.map((option) => (
      <label
        key={option}
        className={`radio-option ${value === option ? "active" : ""}`}
      >
        <input
          type="radio"
          name={name}
          value={option}
          checked={value === option}
          onChange={onChange}
          className="sr-only"
        />
        {option}
      </label>
    ))}
  </div>
);

const OpenHouseForm = () => {
  const [formData, setFormData] = useState({
    contact: { fullName: "", phone: "", email: "", contactMethod: "Phone" },
    buying: { isBuying: "No", homeType: "", budget: "", moveInTimeline: "" },
    selling: {
      isSelling: "No",
      sellAddress: "",
      sellValue: "",
      sellTimeline: "",
    },
    financing: { preApproved: "No", lender: "" },
    additional: { referralSource: "", features: "", comments: "" },
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "consent") {
      setFormData((prev) => ({ ...prev, consent: checked }));
      return;
    }
    const [section, field] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please agree to the consent terms before submitting.");
      return;
    }

    try {
      const response = await fetch(
        "https://global1realty.com/api/contact_form_handler.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(result.error || "Submission failed");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="form-wrapper">
        <LineScroller />
        <Bubbles />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="success-card"
        >
          <div className="success-icon-wrapper">
            <PartyPopper size={40} className="success-icon" />
          </div>
          <h2 className="success-title">Thank You!</h2>
          <p className="success-message">
            Your submission has been received. A representative will contact you
            soon.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <LineScroller />
      <Bubbles />
      <div className="form-container">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="form-card"
        >
          <header className="form-header">
            <div className="form-icon-background">
              <Home size={32} />
            </div>
            <h1 className="form-title">Open House Registration</h1>
            <p className="form-subtitle">
              Welcome! Let's get you signed in for the open house.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="form-body">
            {/* CONTACT INFO */}
            <section className="form-section">
              <h2 className="section-title">
                <User size={20} /> Contact Information
              </h2>
              <div className="grid-2">
                <InputField
                  icon={<User size={18} />}
                  type="text"
                  name="contact.fullName"
                  placeholder="Full Name"
                  value={formData.contact.fullName}
                  onChange={handleChange}
                  required
                />
                <InputField
                  icon={<Phone size={18} />}
                  type="tel"
                  name="contact.phone"
                  placeholder="Phone Number"
                  value={formData.contact.phone}
                  onChange={handleChange}
                  required
                />
                <InputField
                  icon={<Mail size={18} />}
                  type="email"
                  name="contact.email"
                  placeholder="Email Address"
                  value={formData.contact.email}
                  onChange={handleChange}
                  required
                  className="col-span-2"
                />
                <InputField
                  icon={<MapPin size={18} />}
                  type="text"
                  name="selling.sellAddress"
                  placeholder="Property Address"
                  value={formData.selling.sellAddress}
                  onChange={handleChange}
                  className="col-span-2"
                />
              </div>
            </section>

            {/* BUYING */}
            <section className="form-section">
              <h2 className="section-title">
                <Home size={20} /> Buying Details
              </h2>
              <label className="section-label">Are you looking to buy?</label>
              <RadioToggle
                name="buying.isBuying"
                value={formData.buying.isBuying}
                onChange={handleChange}
                options={["Yes", "No"]}
              />
              {formData.buying.isBuying === "Yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid-2 mt-4"
                >
                  <SelectField
                    icon={<Home size={18} />}
                    name="buying.homeType"
                    value={formData.buying.homeType}
                    onChange={handleChange}
                  >
                    <option value="">Ideal Home Type</option>
                    <option>Single-Family</option>
                    <option>Condo/Townhouse</option>
                    <option>Multi-Family</option>
                    <option>Other</option>
                  </SelectField>
                  <SelectField
                    icon={<DollarSign size={18} />}
                    name="buying.budget"
                    value={formData.buying.budget}
                    onChange={handleChange}
                  >
                    <option value="">Budget Range</option>
                    <option>&lt;$250K</option>
                    <option>$250K - $500K</option>
                    <option>$500K - $750K</option>
                    <option>$750K - $1M</option>
                    <option>$1M+</option>
                  </SelectField>
                  <SelectField
                    icon={<Calendar size={18} />}
                    name="buying.moveInTimeline"
                    value={formData.buying.moveInTimeline}
                    onChange={handleChange}
                    className="col-span-2"
                  >
                    <option value="">Move-in Timeline</option>
                    <option>ASAP</option>
                    <option>1-3 Months</option>
                    <option>3-6 Months</option>
                    <option>6+ Months</option>
                  </SelectField>
                </motion.div>
              )}
            </section>

            {/* SELLING */}
            <section className="form-section">
              <h2 className="section-title">
                <MapPin size={20} /> Selling Details
              </h2>
              <label className="section-label">
                Do you have a home to sell?
              </label>
              <RadioToggle
                name="selling.isSelling"
                value={formData.selling.isSelling}
                onChange={handleChange}
                options={["Yes", "No"]}
              />
              {formData.selling.isSelling === "Yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid-2 mt-4"
                >
                  <InputField
                    icon={<MapPin size={18} />}
                    type="text"
                    name="selling.sellAddress"
                    placeholder="Property Address"
                    value={formData.selling.sellAddress}
                    onChange={handleChange}
                    className="col-span-2"
                  />
                  <SelectField
                    icon={<DollarSign size={18} />}
                    name="selling.sellValue"
                    value={formData.selling.sellValue}
                    onChange={handleChange}
                  >
                    <option value="">Estimated Value</option>
                    <option>$200K - $300K</option>
                    <option>$300K - $400K</option>
                    <option>$400K - $500K</option>
                    <option>$500K+</option>
                  </SelectField>
                  <SelectField
                    icon={<Calendar size={18} />}
                    name="selling.sellTimeline"
                    value={formData.selling.sellTimeline}
                    onChange={handleChange}
                  >
                    <option value="">Selling Timeline</option>
                    <option>ASAP</option>
                    <option>1-3 Months</option>
                    <option>3-6 Months</option>
                    <option>6+ Months</option>
                  </SelectField>
                </motion.div>
              )}
            </section>

            {/* FINANCING */}
            <section className="form-section">
              <h2 className="section-title">
                <Building size={20} /> Financing
              </h2>
              <label className="section-label">Are you pre-approved?</label>
              <RadioToggle
                name="financing.preApproved"
                value={formData.financing.preApproved}
                onChange={handleChange}
                options={["Yes", "No"]}
              />
              {formData.financing.preApproved === "Yes" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <InputField
                    icon={<Building size={18} />}
                    type="text"
                    name="financing.lender"
                    placeholder="Price"
                    value={formData.financing.lender}
                    onChange={handleChange}
                  />
                </motion.div>
              )}
            </section>

            {/* ADDITIONAL 
            <section className="form-section">
              <h2 className="section-title">
                <Info size={20} /> Additional Information
              </h2>
              <SelectField
                icon={<Info size={18} />}
                name="additional.referralSource"
                value={formData.additional.referralSource}
                onChange={handleChange}
              >
                <option value="">How did you hear about us?</option>
                <option>Zillow</option>
                <option>Realtor.com</option>
                <option>Social Media</option>
                <option>Referral</option>
                <option>Sign</option>
                <option>Other</option>
              </SelectField>
              <div className="input-wrapper mt-3">
                <span className="input-icon">
                  <MessageSquare size={18} />
                </span>
                <textarea
                  name="additional.comments"
                  placeholder="Comments or Questions..."
                  value={formData.additional.comments}
                  onChange={handleChange}
                  className="input-field textarea-field"
                  rows="4"
                />
              </div>
            </section>
              */}
            {/* CONSENT */}
            <section className="form-section consent-section">
              <label className="consent-label">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="consent-checkbox"
                />
                <span className="consent-text">
                  I agree to receive communications from{" "}
                  <strong>Global One Realty</strong> regarding my inquiry.
                </span>
              </label>
            </section>

            {/* SUBMIT */}
            <div className="form-submit">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="submit-btn"
                disabled={!formData.consent}
              >
                Sign In & Explore
                <ArrowRight size={20} className="submit-icon" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OpenHouseForm;
