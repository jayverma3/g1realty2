import React from "react";
import "./AboutUs.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import AboutUs from "../../Components/AboutUs/About_heading_one";
import OurCommitment from "../../Components/OurCommitment/OurCommitment";

const AboutPage = () => {
  return (
    <div className="about">
      <Header />
      <AboutUs />
      <OurCommitment />
      <Footer />
    </div>
  );
};

export default AboutPage;
