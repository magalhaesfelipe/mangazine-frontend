import Searchbar from "./components/Searchbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = () => {
  // useEffect(() => {
  //   if (user) {
  //     const checkAndCreateUser = async () => {
  //       try {
  //         const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${user.id}`);

  //         console.log("User already exists: ", response.data);
  //       } catch (error) {
  //         if (error.response && error.response.status === 404) {
  //           console.log("User does not exists, creating a new one...");
  //           const userData = {
  //             userId: user.id,
  //             email: user.emailAddresses[0].emailAddress,
  //             name: user.username,
  //           };

  //           try {
  //             const createUser = await axios.post(
  //               `${import.meta.env.VITE_API_URL}/users/`,
  //               userData,
  //             );

  //             if (createUser.status === 201) {
  //               console.log("User created successfully");
  //             } else {
  //               console.error("Failed to create user");
  //             }
  //           } catch (creationError) {
  //             console.error("Error creating user: ", creationError);
  //           }
  //         } else {
  //           console.error("Error checking user existence: ", error);
  //         }
  //       }
  //     };

  //     checkAndCreateUser();
  //   }
  // }, [user]);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <main className="mt-10 flex flex-col items-center justify-center">
          <h1 className="font mb-10 p-0 font-['Impact'] text-5xl font-light text-zinc-200">
            Welcome to Mangazine
          </h1>
          <div className="">
            <Searchbar placeholder="Search titles here" />
          </div>
        </main>
        <div className="mt-[30%] mb-[3%]"></div>
      </div>
      <div className="mt-70 flex flex-col">
        {" "}
        <div className="grow"></div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
