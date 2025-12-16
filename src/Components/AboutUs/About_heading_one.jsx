import React from "react";
import { motion } from "framer-motion";
import "./About_heading_one.css";
import { services } from "./data";

const About_heading_one = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const cardHoverEffect = {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <motion.section
      className="ah-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 className="ah-main-heading" variants={itemVariants}>
        About Global 1 Realty LLC
      </motion.h2>
      <motion.hr className="ah-divider" variants={itemVariants} />
      <motion.p className="ah-subheading" variants={itemVariants}>
        At <strong>Global 1 Realty LLC</strong>, we are dedicated to helping
        individuals, families, and investors find the perfect place to call
        home. With a strong focus on trust, transparency, and results, we
        proudly serve our clients with personalized real estate solutions
        tailored to their unique goals.
      </motion.p>
      <motion.p className="ah-subheading" variants={itemVariants}>
        Whether you’re <strong>buying</strong>, <strong>selling</strong>, or
        <strong> investing</strong>, our experienced team provides expert
        guidance through every step of the process — from market analysis and
        property searches to negotiations and closing.
      </motion.p>
      <motion.p className="ah-subheading" variants={itemVariants}>
        We specialize in <strong>residential</strong>,{" "}
        <strong>commercial</strong>, and <strong>investment properties</strong>,
        offering deep local market knowledge and strategic insights that help
        our clients make confident, informed decisions.
      </motion.p>
      <motion.p className="ah-subheading" variants={itemVariants}>
        At G1 Realty LLC, we believe real estate is more than transactions —
        it’s about building lasting relationships. Our commitment to integrity,
        professionalism, and exceptional service ensures a smooth and rewarding
        experience from start to finish.
      </motion.p>
      <motion.p className="ah-subheading ah-italic" variants={itemVariants}>
        Let’s find your next home together.
      </motion.p>

      <motion.div className="ah-cards-container" variants={containerVariants}>
        {services.map(({ id, title, icon }) => (
          <motion.div
            key={id}
            className="ah-card"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div className="ah-card-icon">{icon}</div>
            <div className="ah-card-text">
              <h3 className="ah-card-title">{title}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default About_heading_one;
