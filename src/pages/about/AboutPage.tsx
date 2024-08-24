import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import classes from "./style.module.css";

const About = () => {
  return (
    <>
    
    <div className={classes.container}>
      <Header />
      <div className={classes.container2}>
        <main className={classes.text}>
          <h1 className={classes.headline}>ABOUT MANGAZINE</h1>
          <p>
            Welcome to{" "}
            <stronger style={{ fontWeight: "bolder" }}>MANGAZINE</stronger>,
            your ultimate destination for discovering and keeping track of
            everything you love to read. Whether you’re into{" "}
            <stronger style={{ fontWeight: "Bolder" }}>mangas</stronger>,{" "}
            <stronger style={{ fontWeight: "Bolder" }}>comics</stronger>,{" "}
            <stronger style={{ fontWeight: "Bolder" }}>books</stronger>,{" "}
            <stronger style={{ fontWeight: "Bolder" }}>manhwa</stronger>, or{" "}
            <stronger style={{ fontWeight: "Bolder" }}>magazines</stronger>,
            we’ve got you covered. At Mangazine, our goal is to be a
            comprehensive source of information, connect people through culture,
            and share amazing works from diverse authors around the world.
          </p>
          <div>
            <div className={classes.box}>
              <h2>What We Offer</h2>
              <p>
                <stronger style={{ fontWeight: "bolder" }}>
                  • Extensive Database:
                </stronger>{" "}
                Explore detailed information about a wide range of reading
                materials including mangas, comics, manhwa, books, and
                magazines.
              </p>

              <p>
                <stronger style={{ fontWeight: "bolder" }}>
                  • Readlist:
                </stronger>{" "}
                Keep track of what you’re reading with our intuitive readlist
                feature. Never lose your place in a story again.
              </p>
              <p>
                <stronger style={{ fontWeight: "bolder" }}>
                  • Custom Lists:
                </stronger>{" "}
                Create and manage your own lists based on your preferences.
                Organize your reading journey the way you want.
              </p>
              <p>
                <stronger style={{ fontWeight: "bolder" }}>
                  • Rating System:
                </stronger>{" "}
                Rate the titles you’ve read and see what others think. Your
                ratings help others discover great reads.
              </p>
              {/* <p>
                <stronger style={{ fontWeight: "bolder" }}>
                  • Comments:
                </stronger>{" "}
                Share your opinions by commenting on titles. Engage with the
                community by discussing your favorite reads and commenting on
                others' lists.
              </p> */}
              <p>
                <stronger style={{ fontWeight: "bolder" }}>
                  • Top Rankings:
                </stronger>{" "}
                Check out the top 100 best-ranked titles overall, or filter by
                category to find the best mangas, books, comics, and more.
              </p>
              {/* <p>
                <stronger style={{ fontWeight: "bolder" }}>
                  • Community Connection:
                </stronger>{" "}
                Connect with fellow readers from around the globe. Share your
                passion for reading and discover new works through the
                recommendations and reviews of others.
              </p> */}
            </div>
          </div>
          <div className={classes.box}>
            <h2>Our Mission</h2>
            <p>
              {" "}
              At Mangazine, we believe in the power of stories to bring people
              together. Our mission is to be a trusted source of information,
              fostering a community where readers can connect, share, and
              celebrate the culture of reading. We strive to highlight and share
              the incredible works of authors from various backgrounds, giving
              them a platform to reach a wider audience.
            </p>
          </div>
          <div className={classes.box}>
            <p>
              Join us at Mangazine and embark on a journey through the wonderful
              world of reading. Discover, track, and share your love for stories
              with a community that celebrates art and writing.
            </p>
          </div>
        </main>
      </div>
    </div>
    <div className={classes.footerContainer}>
    <Footer />

    </div>
    </>
  );
};

export default About;
