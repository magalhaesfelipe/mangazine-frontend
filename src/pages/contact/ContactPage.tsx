import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className="bg-red-500 h-full w-[90%]">
        {" "}
        {/* ultraContainer */}
        <div className="mt-[15%] flex flex-col items-center w-full">
          {" "}
          {/* superContainer */}
          <div className="w-[80%]">
            {" "}
            {/* container */}
            <div className="text-center text-white mb-[7%]">
              {" "}
              {/* headline */}
              <h1 className="text-[60px] font-bold">CONTACT US</h1>{" "}
              {/* h1 styling */}
              <p className="mt-[50px] text-lg">
                E-mail: mangazine@gmail.com
              </p>{" "}
              {/* p styling */}
            </div>
            <div className="flex flex-col items-center text-white">
              {" "}
              {/* socials */}
              <h1 className="text-[60px] font-bold">SOCIALS</h1>{" "}
              {/* h1 styling */}
              <p className="mt-[50px] text-lg">
                {" "}
                {/* p styling */}
                Join our Discord Server:
                <a
                  href="https://discord.gg/eZQ83wzQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  https://discord.gg/eZQ83wzQ
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[10%] mb-[5%] relative">
          {" "}
          {/* footerContainer */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
