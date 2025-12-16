import React from "react";
import "./ThreeImageText.css";

const services = [
  {
    id: 1,
    title: "Transaction Services",
    description:
      "Facilitating commercial, residential, and industrial property transactions with expertise and efficiency.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Project Marketing",
    description:
      "Strategically marketing properties to maximize visibility and attract potential buyers or tenants.",
    image:
      "https://images.unsplash.com/photo-1685219789185-15f3fab44379?auto=format&fit=crop&w=400&h=200&q=100",
  },
  {
    id: 3,
    title: "Valuation & Consulting",
    description:
      "Expert valuation and consulting services for accurate property assessments and investment guidance.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  },
];

const ThreeImageText = () => {
  return (
    <section className="three-image-text-container">
      <h2 className="main-heading">Comprehensive Property Services</h2>
      <p className="subheading">
        Offering expert real estate consultancy and property management services
        in Ahmedabad, Gujarat, India.
      </p>
      <div className="cards-container">
        {services.map(({ id, title, description, image }) => (
          <div key={id} className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-text">
              <h3 className="card-title">{title}</h3>
              <p className="card-description">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeImageText;
