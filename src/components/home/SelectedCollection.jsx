import React, { useState, useEffect } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SelectedCollection() {
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  async function fetchAPICollection() {
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/selectedCollection"
      );
      setSelected(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAPICollection();
    console.log(selected);
  }, []);

  return (
    <header>
      <div className="selected-collection">
        {selected.videoLink && selected.thumbnail && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={selected.thumbnail}
            src={selected.videoLink}
            className="selected-collection__bg"
          />
        )}
        <div className="selected-collection__description">
          {selected.logo && (
            <img
              src={selected.logo}
              alt=""
              className="selected-collection__logo"
            />
          )}
          <h1 className="selected-collection__title">{selected.title}</h1>
          {selected.creator && (
            <Link to={"/user"} className="selected-collection__author">
              By {selected.creator}
              <img
                src={VerifiedIcon}
                className="selected-collection__author__verified"
              />
            </Link>
          )}
          {selected.amountOfItems && selected.floorPrice && (
            <div className="selected-collection__details">{`${selected.amountOfItems} items ${selected.floorPrice} ETH`}</div>
          )}
          {selected.collectionId && (
            <Link to={"/collection"} className="selected-collection__button">
              <div className="green-pulse">
                <span className="relative z-10">View Collection</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
