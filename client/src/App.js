import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Home, Detail, Form, Error404 } from "./views/viewsIndex.js";
import Nav from "./components/Nav/Nav.jsx";
import Loading from "./components/Loading/Loading.jsx";
import About from "./views/About/About.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Filters from "./components/Filters/Filters.jsx";
import Pagination from "./components/Pagination/Pagination.jsx";

const App = () => {
  const location = useLocation();
  // console.log("location.pathname !== '/' : ", location.pathname !== '/');
  const renderNavAndFooter = location.pathname !== '/';
  /* const renderNavAndFooter = location.pathname === '/home' || location.pathname === '/detail' || location.pathname === '/admin' || location.pathname === '/about' || location.pathname === '/home'; */

  return (
    <div>
      {renderNavAndFooter && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/admin" element={<Form />} />
        <Route path="about" element={<About />} />
        <Route path="/devloading" element={<Loading />} />
        <Route path="/devfilters" element={<Filters />} />
        <Route path="/devpagination" element={<Pagination />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {renderNavAndFooter && <Footer />}
    </div>
  );
};

export default App;
