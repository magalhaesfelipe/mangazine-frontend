import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Auth } from "./pages/auth/AuthPage.js";
import ListContentPage from "./pages/list-content/ListContentPage.js";
import ListsPage from "./pages/lists/ListsPage.js";
import HomePage from "./pages/home/HomePage.js";
import DetailsPage from "./pages/details/DetailsPage.js";
import CreateListPage from "./pages/create-list/CreateListPage.js";
import ReadlistPage from "./pages/readlist/ReadlistPage.js";
import RatingPrompt from "./components/RatingPrompt.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import AboutPage from "./pages/about/AboutPage.js";
import AdminRoute from "./components/AdminRoute.js";
import ContactPage from "./pages/contact/ContactPage.js";
import CreateItemPage from "./pages/create-items/ChooseCreateItemPage.js";
import MangaForm from "./pages/create-items/forms/manga/MangaForm.js";
import AuthorSearchBar from "./pages/create-items/forms/components/AuthorSearchbar.js";
import AuthorSection from "./pages/details/components/AuthorSection.js";
import BookForm from "./pages/create-items/forms/book/BookForm.js";
import AuthorForm from "./pages/create-items/forms/author/AuthorForm.js";
import "./App.css";
import StarRate from "./components/StarRate.js";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/details/:itemId/:itemType" element={<DetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/create-item" element={<CreateItemPage />} />
          <Route path="/create-manga" element={<MangaForm />} />
          <Route path="/create-book" element={<BookForm />} />
          <Route path="/create-author" element={<AuthorForm />} />

          <Route path="/search-author" element={<AuthorSearchBar />} />
          <Route path="/authorsec" element={<AuthorSection />} />
          <Route path="star" element={<StarRate />} />

          <Route
            path="/readlist"
            element={<ProtectedRoute element={ReadlistPage} />}
          />
          <Route
            path="/Lists"
            element={<ProtectedRoute element={ListsPage} />}
          />
          <Route
            path="/list/:listId"
            element={<ProtectedRoute element={ListContentPage} />}
          />
          <Route
            path="/rating"
            element={<ProtectedRoute element={RatingPrompt} />}
          />
          <Route
            path="/create-list"
            element={<ProtectedRoute element={CreateListPage} />}
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
