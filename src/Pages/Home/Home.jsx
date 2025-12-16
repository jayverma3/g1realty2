import Header from "../../Components/Header/Header";
import "./Home.css";
import Footer from "../../Components/Footer/Footer";
import Video_with_title from "../../Components/Video_with_title/Video_with_title";
import Imageandtext from "../../Components/ImageAndText/ImageAndText";
import FeaturedProperties from "../../Components/FeaturedProperties/FeaturedProperties";
import ContactForm from "../../Components/ContactForm/ContactForm";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Video_with_title />
      <Imageandtext />
      <FeaturedProperties />

      <Footer />
    </div>
  );
};

export default Home;
