import Header from "../../Components/Header/Header";
import "./Contact.css";
import Footer from "../../Components/Footer/Footer";
import ContactForm from "../../Components/ContactForm/ContactForm";

const Contact = () => {
  return (
    <div className="contact">
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
