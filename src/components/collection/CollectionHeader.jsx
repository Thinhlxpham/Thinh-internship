import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CollectionContext } from "../../context/CollectionContext";
import Skeleton from "../ui/Skeleton";

export default function CollectionHeader() {
  const { loading, collection } = useContext(CollectionContext);
  return (
    <>
      {loading ? (
        <Skeleton width="100vw" height="37vh" borderadius="4px" />
      ) : (
        <header
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), 
        url(${collection.imageLink})`,
          }}
          id="collection-header"
        >
          <div className="row collection-header__row">
            <div className="collection-header__content">
              <div className="collection-header__left">
                <img
                  src={collection.logo}
                  alt={collection.title}
                  className="collection-header__img"
                />
                <div className="collection-header__name">
                  {collection.title}
                </div>
                <Link
                  to={`/user/${collection?.creatorId}`}
                  className="collection-header__author"
                >
                  {collection?.creatorId}
                </Link>
              </div>
              <div className="collection-header__right">
                <div className="collection-header__columns">
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">{collection.totalVolume}</span>{" "}
                      ETH
                    </span>
                    <span className="collection-header__column__label">
                      Total volume
                    </span>
                  </div>
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">{collection.floor}</span> ETH
                    </span>
                    <span className="collection-header__column__label">
                      Floor price
                    </span>
                  </div>
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">{collection.bestOffer}</span>{" "}
                      ETH
                    </span>
                    <span className="collection-header__column__label">
                      Best offer
                    </span>
                  </div>
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">1%</span>
                    </span>
                    <span className="collection-header__column__label">
                      {collection.listed}
                    </span>
                  </div>
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">{collection.owners}</span>
                    </span>
                    <span className="collection-header__column__label">
                      Owners (Unique)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
