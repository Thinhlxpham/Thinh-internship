import Footer from "./components/Footer";
import Nav from "./components/Nav";
import CollectionPage from "./pages/CollectionPage";
import CollectionsPage from "./pages/CollectionsPage";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import UserPage from "./pages/UserPage";
import axios from "axios";
import { useEffect, useState } from "react";

import { AppContext } from "./context/AppContext";
import Aos from "aos";

function App() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  async function fetchAPISelected() {
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/selectedCollection"
      );
      setSelected(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAPISelected();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Aos.init({
        disable: false,
        startEvent: "DOMContentLoaded",
        initClassName: "aos-init",
        animatedClassName: "aos-animate",
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 50,
        delay: 0,
        duration: 600,
        easing: "ease",
        once: true,
        mirror: false,
        anchorPlacement: "top-bottom",
      });
      Aos.refreshHard();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) {
      Aos.refresh();
    }
  }, [loading]);
  return (
    <AppContext.Provider value={{ loading, selected }}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route
            path="/collection/:collectionId"
            element={<CollectionPage />}
          />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
        </Routes>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
