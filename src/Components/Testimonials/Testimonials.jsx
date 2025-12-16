import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    quote:
      "G1 Realty helped us find our dream home. The process was seamless and the team was a pleasure to work with.",
    author: "Jane Doe, Happy Homeowner",
  },
  {
    quote:
      "The attention to detail and quality of work is unmatched. We couldn't be happier with our new house.",
    author: "John Smith, Satisfied Customer",
  },
  {
    quote:
      "A truly professional and talented team for showcasing the houses. They transformed our vision and exceeded all our expectations.",
    author: "The Johnsons, Repeat Clients",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">What Our Clients Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <span className="testimonial-author">- {testimonial.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
