import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";
import Footer from "./components/Footer";
import Library from "./pages/Library";
import Pokemondata from "./pages/Pokemondata";


function App() {
  return (
    <>
  
    
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/Pokemondata" element={<Pokemondata />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
