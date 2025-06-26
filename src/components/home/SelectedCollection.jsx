import React, { useContext, useEffect } from "react";
import VerifiedIcon from "../../assets/verified.png";

import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Skeleton from "../ui/Skeleton";
import Aos from "aos";

export default function SelectedCollection() {
  const { selected, loading } = useContext(AppContext);

  useEffect(() => {
    Aos.refresh();
  }, [selected]);

  return loading !== true ? (
    <header>
      <div className="selected-collection">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={selected.thumbnail}
          src={selected.videoLink}
          className="selected-collection__bg"
        />
        <div className="selected-collection__description">
          <img
            src={selected.logo}
            alt=""
            className="selected-collection__logo"
          />
          <h1 className="selected-collection__title">{selected.title}</h1>
          <Link
            to={`/user/${selected.creatorId}`}
            className="selected-collection__author"
          >
            By {selected.creator}
            <img
              src={VerifiedIcon}
              className="selected-collection__author__verified"
            />
          </Link>
          <div className="selected-collection__details">
            {selected.amountOfItems} items · {selected.floorPrice} ETH
          </div>
          <Link
            to={`/collection/${selected.collectionId}`}
            className="selected-collection__button"
          >
            <div className="green-pulse"></div>
            View Collection
          </Link>
        </div>
      </div>
    </header>
  ) : (
    <Skeleton width="100vw" height="50vh" borderRadius="4px" />
  );
}
