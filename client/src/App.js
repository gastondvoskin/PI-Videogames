import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Home, Detail, Form } from "./views/viewsIndex.js";
import Nav from "./components/Nav/Nav.jsx";
import Loading from "./components/Loading/Loading.jsx";

const App = () => {
  const location = useLocation();
  // console.log("location.pathname !== '/' : ", location.pathname !== '/');
  const renderNav = location.pathname !== '/';

  return (
    <div>
      {renderNav && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/devloading" element={<Loading />} />
      </Routes>
    </div>
  );
};

export default App;
