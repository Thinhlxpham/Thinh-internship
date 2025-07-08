import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import CollectionProp from "../components/ui/CollectionProp";
import CollectionSkeleton from "../components/ui/CollectionSkeleton";

export default function CollectionsPage() {
  const { loading, collections } = useContext(AppContext);
  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {loading
            ? new Array(12).fill(0).map((_, index) => (
                <div key={index} className="collection-column">
                  <CollectionSkeleton />
                </div>
              ))
            : collections.slice(0, visibleCount).map((collection, index) => (
                <div className="collection-column" key={collection.id || index}>
                  <CollectionProp collections={collection} />
                </div>
              ))}
        </div>
        {visibleCount < collections.length && (
          <button className="collections-page__button" onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
