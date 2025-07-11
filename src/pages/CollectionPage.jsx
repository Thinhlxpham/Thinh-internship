import React, { useEffect, useState } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import { useParams } from "react-router-dom";
import { CollectionContext } from "../context/CollectionContext";
import axios from "axios";

export default function CollectionPage() {
  const { collectionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [collectionEachItem, setCollectionEachItem] = useState([]);

  async function fetchAPICollection() {
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/collection/${collectionId}`
    );

    let eachCollection = data.data;
    setCollection(eachCollection);
    setCollectionEachItem(eachCollection.items);
    setLoading(false);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAPICollection();
  }, []);

  return (
    <>
      <CollectionContext.Provider
        value={{ loading, collection, collectionEachItem }}
      >
        <CollectionHeader />
        <CollectionInfo />
        <CollectionItems />
      </CollectionContext.Provider>
    </>
  );
}
