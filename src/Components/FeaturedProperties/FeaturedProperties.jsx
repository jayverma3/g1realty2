import React from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import "./FeaturedProperties.css";

// Property images
import house1 from "../../assets/images/Houses/pexels-christa-grover-977018-2121121.jpg";
import house2 from "../../assets/images/Houses/pexels-davidmcbee-1546166.jpg";
import house3 from "../../assets/images/Houses/pexels-emrecan-2079234.jpg";
import house4 from "../../assets/images/Houses/pexels-expect-best-79873-323772.jpg";
import house5 from "../../assets/images/Houses/pexels-pixabay-259588.jpg";
import house6 from "../../assets/images/Houses/pexels-valeriiamiller-2587054.jpg";

const properties = [
  {
    id: 1,
    image: house1,
    title: "Charming Family Home",
    location: "Springfield, IL",
    price: 349900,
    beds: 4,
    baths: 3,
    area: 2350,
  },
  {
    id: 2,
    image: house2,
    title: "Modern Bungalow",
    location: "Oakwood, GA",
    price: 285000,
    beds: 3,
    baths: 2,
    area: 1680,
  },
  {
    id: 3,
    image: house3,
    title: "Spacious Suburban Home",
    location: "Maple Ridge, WA",
    price: 499900,
    beds: 5,
    baths: 4,
    area: 3120,
  },
  {
    id: 4,
    image: house4,
    title: "Cozy Cottage",
    location: "Lakeview, MN",
    price: 219500,
    beds: 2,
    baths: 1,
    area: 980,
  },
  {
    id: 5,
    image: house5,
    title: "Luxury Estate",
    location: "Riverview, CA",
    price: 1250000,
    beds: 6,
    baths: 5,
    area: 5200,
  },
  {
    id: 6,
    image: house6,
    title: "Townhouse Near Downtown",
    location: "Brookside, NY",
    price: 675000,
    beds: 3,
    baths: 3,
    area: 2100,
  },
];

const FeaturedProperties = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90, damping: 15 },
    },
  };

  return (
    <section className="featured-services-section">
      <motion.div
        className="services-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h2 className="properties-title">Featured Properties for Sale</h2>
        <p className="properties-subtitle">
          Hand-picked homes with modern amenities and prime locations.
        </p>
      </motion.div>
      <motion.div
        className="services-grid-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {properties.map((p) => (
          <motion.div
            className="property-card-item"
            key={p.id}
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow:
                "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="card-image-wrapper">
              <img src={p.image} alt={p.title} className="card-image" />
              <div className="price-badge">${p.price.toLocaleString()}</div>
            </div>
            <div className="card-content">
              <h3 className="card-title">{p.title}</h3>
              <p className="card-location">
                {p.location} • {p.area} sqft
              </p>
              <p className="card-features">
                {p.beds} bd • {p.baths} ba
              </p>
              <a href={`/listings`} className="card-button">
                View Listing <FaChevronRight className="card-button-icon" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProperties;
