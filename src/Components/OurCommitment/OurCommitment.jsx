import React from "react";
import { motion } from "framer-motion";
import { Users, Gem, ShieldCheck } from "lucide-react";
import "./OurCommitment.css";
import commitmentImage from "../../assets/images/modern-residential-district-with-green-roof-balcony-generated-by-ai.jpg"; // Assuming you have an image here

const commitments = [
  {
    icon: <Users size={32} className="oc-icon" />,
    title: "Client-Focused Relationships",
    description:
      "We build long-term relationships by understanding your goals and providing personalized guidance at every stage of the real estate journey.",
  },
  {
    icon: <Gem size={32} className="oc-icon" />,
    title: "High-Value Opportunities",
    description:
      "We identify quality properties and investment opportunities that deliver lasting value, growth, and peace of mind.",
  },
  {
    icon: <ShieldCheck size={32} className="oc-icon" />,
    title: "Strategic & Secure Transactions",
    description:
      "From market analysis to closing, we proactively manage every detail to ensure a smooth, secure, and successful transaction.",
  },
];

const OurCommitment = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="oc-section">
      <div className="oc-container">
        <motion.div
          className="oc-image-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <img
            src={commitmentImage}
            alt="Our Commitment to Excellence"
            className="oc-image"
          />
        </motion.div>
        <motion.div
          className="oc-content-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="oc-main-title" variants={itemVariants}>
            Our Commitment to Excellence
          </motion.h2>
          <motion.p className="oc-description" variants={itemVariants}>
            We are dedicated to delivering exceptional real estate service,
            ensuring every transaction is handled with care, precision, and your
            best interests in mind. Our experienced team combines market
            expertise, strategic insight, and clear communication to achieve
            results you can trust.
          </motion.p>
          <div className="oc-commitments-list">
            {commitments.map((item, index) => (
              <motion.div
                className="oc-commitment-item"
                key={index}
                variants={itemVariants}
              >
                <div className="oc-icon-wrapper">{item.icon}</div>
                <div className="oc-item-text">
                  <h3 className="oc-item-title">{item.title}</h3>
                  <p className="oc-item-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurCommitment;
