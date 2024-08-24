import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Auth } from "./pages/auth/AuthPage.js";
import CreateTitle from "./pages/create-title/CreateTitlePage.js";
import ListContent from "./pages/list-content/ListContentPage.js";
import Lists from "./pages/lists/ListsPage.js";
import Home from "./pages/home/HomePage.js";
import Details from "./pages/details/DetailsPage.js";
import CreateList from "./pages/create-list/CreateListPage";
import "./general.css";
import Readlist from "./pages/readlist/ReadlistPage.js";
import RatingPrompt from "./components/rating-prompt/RatingPrompt.js";
import ProtectedRoute from "./components/protected-route/ProtectedRoute.js";
import About from "./pages/about/AboutPage.js";
import AdminRoute from "./components/admin-route/AdminRoute.js";
import ScrollbarTest from "./components/ScrollbarTest.js";
import ContactPage from "./pages/contact/ContactPage.js";
import TermsPage from "./pages/terms/TermsPage.js";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:titleId" element={<Details />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/readlist"
            element={<ProtectedRoute element={Readlist} />}
          />
          <Route path="/Lists" element={<ProtectedRoute element={Lists} />} />
          <Route
            path="/list/:listId"
            element={<ProtectedRoute element={ListContent} />}
          />
          <Route
            path="/rating"
            element={<ProtectedRoute element={RatingPrompt} />}
          />
          <Route
            path="/create-list"
            element={<ProtectedRoute element={CreateList} />}
          />

          <Route
            path="/create-title"
            element={<AdminRoute element={CreateTitle} />}
          />

          {/* // Example of props being passed to the component through the wrapper component 'ProtectedRoute'
              <Route
               path="/create-title"
               element={<ProtectedRoute element={CreateTitle} someProp="examplePropValue"/>}
              />
            */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
