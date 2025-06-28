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
  const [loading, setLoading] = useState();
  const [selected, setSelected] = useState([]);
  const [trending, setTrending] = useState([]);
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
  async function fetchAPITrending() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/trendingNFTs"
    );
    let trendingData = data.data;
    setTrending(trendingData);

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    fetchAPISelected();
    fetchAPITrending();
  }, []);

  return (
    <AppContext.Provider value={{ loading, selected, trending }}>
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
