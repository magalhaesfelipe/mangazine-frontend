import Footer from "../../components/Footer";
import Header from "../../components/Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        {" "}
        {/* container */}
        <div>
          {" "}
          {/* No Tailwind class for container2, might be unnecessary */}
          <main className="mt-[180px] w-[676px] text-gray-300 leading-[1.5] flex flex-col">
            {" "}
            {/* text */}
            <h1 className="mb-10 text-4xl font-bold">ABOUT MANGAZINE</h1>{" "}
            {/* headline */}
            <p className="font-sans text-lg font-light">
              {" "}
              {/* text p */}
              <strong className="font-bold">MANGAZINE</strong> is a platform for
              readers who would like to keep track of what they are reading.
              from <strong className="font-bold">books</strong>, to{" "}
              <strong className="font-bold">graphic novels</strong>,{" "}
              <strong className="font-bold">manga</strong> and{" "}
              <strong className="font-bold">comics</strong>. The whole app is
              open source, you can check all the code on GitHub. It's a solo
              project, and so far the focus has been on books. But soon there
              will be content about other media such as manga and graphic
              novels.
            </p>
            <div className="mt-10">
              <h2 className="mb-5 text-2xl font-bold">Features</h2>
              <p className="font-sans text-lg font-light">
                <strong className="font-bold">• Titles Search: </strong>
                Quick search for reading material.
              </p>
              <p className="font-sans text-lg font-light mt-5">
                <strong className="font-bold">• Readlist:</strong> Quickly add
                or remove titles from your readlist.
              </p>
              <p className="  text-lg font-light mt-5">
                <strong className="font-bold">• Custom Lists:</strong> Create
                and manage personalized lists.
              </p>
              <p className="font-sans text-lg font-light mt-5">
                <strong className="font-bold">• Rating System: </strong>
                Rate titles from 1 to 10 and also check their average rating.
              </p>
              <p className="font-sans text-lg font-light mt-5">
                <strong className="font-bold">• Alternative Covers: </strong>A
                section with alternative covers(if any) on the Details page.
              </p>
              <p className="font-sans text-lg font-light mt-5">
                <strong className="font-bold">• Author Section: </strong>A
                section with information about the Author, that also includes
                photos of him/she(if any) on the Details page.
              </p>
            </div>
            <div className="mt-10">
              <h2 className="mb-5 text-2xl font-bold">
                About the Platform so Far
              </h2>
              <p className="font-sans font-light text-lg ">
                Initially, the site was designed to have its own database
                storing data about these reading media. However, as it is a solo
                project, it would take a lot of time to manually add new titles
                and make
              </p>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
