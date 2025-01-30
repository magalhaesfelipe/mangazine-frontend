import Footer from "../../components/Footer";
import Header from "../../components/Header";

const About = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-[#0c0c0c]">
        {" "}
        {/* container */}
        <Header />
        <div className="container2">
          {" "}
          {/* No Tailwind class for container2, might be unnecessary */}
          <main className="mt-[180px] w-[676px] text-gray-300 leading-[1.5] flex flex-col">
            {" "}
            {/* text */}
            <h1 className="mb-10 text-4xl font-bold">ABOUT MANGAZINE</h1>{" "}
            {/* headline */}
            <p className="font-['var(--font1)'] text-lg font-normal">
              {" "}
              {/* text p */}
              Welcome to <strong className="font-bold">MANGAZINE</strong>, your
              ultimate destination for discovering and keeping track of
              everything you love to read. Whether you’re into{" "}
              <strong className="font-bold">mangas</strong>,{" "}
              <strong className="font-bold">comics</strong>,{" "}
              <strong className="font-bold">books</strong>,{" "}
              <strong className="font-bold">manhwa</strong>, or{" "}
              <strong className="font-bold">magazines</strong>, we’ve got you
              covered. At Mangazine, our goal is to be a comprehensive source of
              information, connect people through culture, and share amazing
              works from diverse authors around the world.
            </p>
            <div className="mt-10">
              {" "}
              {/* box */}
              <h2 className="mb-5 text-2xl font-bold">What We Offer</h2>
              <p className="font-['var(--font1)'] text-lg font-normal">
                {" "}
                {/* text p */}
                <strong className="font-bold">
                  • Extensive Database:
                </strong>{" "}
                Explore detailed information about a wide range of reading
                materials including mangas, comics, manhwa, books, and
                magazines.
              </p>
              <p className="font-['var(--font1)'] text-lg font-normal mt-5">
                {" "}
                {/* text p with margin */}
                <strong className="font-bold">• Readlist:</strong> Keep track of
                what you’re reading with our intuitive readlist feature. Never
                lose your place in a story again.
              </p>
              <p className="font-['var(--font1)'] text-lg font-normal mt-5">
                {" "}
                {/* text p with margin */}
                <strong className="font-bold">• Custom Lists:</strong> Create
                and manage your own lists based on your preferences. Organize
                your reading journey the way you want.
              </p>
              <p className="font-['var(--font1)'] text-lg font-normal mt-5">
                {" "}
                {/* text p with margin */}
                <strong className="font-bold">• Rating System:</strong> Rate the
                titles you’ve read and see what others think. Your ratings help
                others discover great reads.
              </p>
              <p className="font-['var(--font1)'] text-lg font-normal mt-5">
                {" "}
                {/* text p with margin */}
                <strong className="font-bold">• Top Rankings:</strong> Check out
                the top 100 best-ranked titles overall, or filter by category to
                find the best mangas, books, comics, and more.
              </p>
            </div>
            <div className="mt-10">
              {" "}
              {/* box */}
              <h2 className="mb-5 text-2xl font-bold">Our Mission</h2>
              <p className="font-['var(--font1)'] text-lg font-normal">
                {" "}
                {/* text p */}
                At Mangazine, we believe in the power of stories to bring people
                together. Our mission is to be a trusted source of information,
                fostering a community where readers can connect, share, and
                celebrate the culture of reading. We strive to highlight and
                share the incredible works of authors from various backgrounds,
                giving them a platform to reach a wider audience.
              </p>
            </div>
            <div className="mt-10">
              {" "}
              {/* box */}
              <p className="font-['var(--font1)'] text-lg font-normal">
                {" "}
                {/* text p */}
                Join us at Mangazine and embark on a journey through the
                wonderful world of reading. Discover, track, and share your love
                for stories with a community that celebrates art and writing.
              </p>
            </div>
          </main>
        </div>
        <div className="mt-7 mb-3">
          {" "}
          {/* footerContainer */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
