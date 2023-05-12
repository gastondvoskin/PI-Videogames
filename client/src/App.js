import { Routes, Route } from "react-router-dom";
import { Landing, Home, Detail, Form } from "./views/viewsIndex.js";
import Nav from "./components/Nav/Nav.jsx";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
