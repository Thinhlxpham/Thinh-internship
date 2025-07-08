import React from "react";
import { Link } from "react-router-dom";

const CollectionProp = ({ collections }) => {
  return (
    <>
      <Link
        to={`/collection/${collections?.id || collections?.collectionId}`}
        className="collection"
      >
        <img
          src={collections?.imageLink}
          alt={collections?.title}
          className="collection__img"
        />
        <div className="collection__info">
          <h3 className="collection__name">{collections?.title}</h3>
          <div className="collection__stats">
            <div className="collection__stat">
              <span className="collection__stat__label">Floor</span>
              <span className="collection__stat__data">
                {(Math.round(collections?.floor * 100) / 100).toFixed(2)} ETH
              </span>
            </div>
            <div className="collection__stat">
              <span className="collection__stat__label">Total Volume</span>
              <span className="collection__stat__data">
                {collections?.totalVolume.includes("K") ||
                collections?.totalVolume.includes("M")
                  ? collections?.totalVolume
                  : collections?.totalVolume + "K"}{" "}
                ETH
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CollectionProp;
