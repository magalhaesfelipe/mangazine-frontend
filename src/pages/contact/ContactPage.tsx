import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import classes from "./style.module.css";

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className={classes.superContainer}>
        <div className={classes.container}>
          <div className={classes.headline}>
            <h1>CONTACT US</h1>
            <p>E-mail: mangazine@gmail.com</p>
          </div>
          <div className={classes.socials}>
            <h1>SOCIALS</h1>
            <p>Discord: mangazinesdfasfd</p>
          </div>
        </div>
      </div>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
