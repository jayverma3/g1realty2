import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Clock,
  Users,
  Wrench,
  MessageSquare,
  Calendar,
  Settings,
  Sparkles,
  ThumbsUp,
  ClipboardList,
  Gem,
} from "lucide-react";
import "./About_heading.css";

const services = [
  {
    id: 1,
    title: "Skilled Craftsmanship",
    icon: <Award size={36} className="text-yellow-400" />,
  },
  {
    id: 2,
    title: "Licensed & Insured",
    icon: <ShieldCheck size={36} className="text-yellow-400" />,
  },
  {
    id: 4,
    title: "18+ Years of Experience",
    icon: <Users size={36} className="text-yellow-400" />,
  },
  {
    id: 5,
    title: "Full-Service Solutions",
    icon: <Wrench size={36} className="text-yellow-400" />,
  },
  {
    id: 6,
    title: "Clear Communication",
    icon: <MessageSquare size={36} className="text-yellow-400" />,
  },
  {
    id: 7,
    title: "On-Time, On-Budget",
    icon: <Calendar size={36} className="text-yellow-400" />,
  },
  {
    id: 8,
    title: "Customized for You",
    icon: <Settings size={36} className="text-yellow-400" />,
  },
  {
    id: 9,
    title: "Clean & Respectful Crews",
    icon: <Sparkles size={36} className="text-yellow-400" />,
  },
  {
    id: 10,
    title: "Customer Satisfaction Guaranteed",
    icon: <ThumbsUp size={36} className="text-yellow-400" />,
  },
  {
    id: 11,
    title: "Free Estimates",
    icon: <ClipboardList size={36} className="text-yellow-400" />,
  },
  {
    id: 12,
    title: "Quality Materials",
    icon: <Gem size={36} className="text-yellow-400" />,
  },
];

const About_heading = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="ah-three-image-text-container">
      <motion.h2
        className="ah-main-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Why Choose G-1 Services?
      </motion.h2>

      <motion.p
        className="ah-subheading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        We have a solution for all your property needs, from basement finishing
        to roofing services. Our team of experts is dedicated to delivering
        high-quality workmanship and exceptional customer service. Whether
        you're looking to enhance your home's interior or exterior, we have the
        skills and experience to bring your vision to life.
      </motion.p>
      <motion.div
        className="ah-cards-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map(({ id, title, icon }) => (
          <motion.div
            key={id}
            className="ah-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="ah-card-icon">{icon}</div>
            <div className="ah-card-text">
              <h3 className="ah-card-title">{title}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default About_heading;
