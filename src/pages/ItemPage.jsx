import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ItemContext } from "../context/ItemContext";
import Skeleton from "../components/ui/Skeleton";

export default function ItemPage() {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [itemId, setItemId] = useState("");
  const { id } = useParams();
  const [hours, setHours] = useState("2h");
  const [minutes, setMinutes] = useState("38min");
  const [seconds, setSeconds] = useState("59s");
  const [recommented, setRecommented] = useState({});
  const [timeRemaining, setTimerRemaining] = useState(null);

  const animateId = useRef(null);

  async function fetchItemData() {
    try {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/item/${id}`
      );
      const itemData = data.data;
      setItem(itemData);
      setTimerRemaining(itemData.expiryDate);
      setItemId(itemData.id);
      if (itemData.collectionId) {
        const { data: recData } = await axios.get(
          `https://remote-internship-api-production.up.railway.app/collection/${itemData.collectionId}`
        );
        setRecommented(recData.data);
      } else {
        setRecommented({});
      }
    } catch (error) {
      console.error("Error fetching item or recommended items:", error);
      setRecommented({});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemData();
    return () => {
      if (animateId.current) {
        cancelAnimationFrame(animateId.current);
      }
    };
  }, [id]);
  useEffect(() => {
    if (!timeRemaining) return;

    function updateTimer() {
      const now = Date.now();
      let timeRemainingSeconds = (timeRemaining - now) / 1000;
      timeRemainingSeconds = Math.max(0, timeRemainingSeconds);

      const hoursVal = Math.floor(timeRemainingSeconds / 3600);
      const minutesVal = Math.floor((timeRemainingSeconds % 3600) / 60);
      const secondsVal = Math.floor(timeRemainingSeconds % 60);

      setHours(hoursVal);
      setMinutes(minutesVal);
      setSeconds(secondsVal);

      if (timeRemainingSeconds > 0) {
        animateId.current = requestAnimationFrame(updateTimer);
      }
    }

    animateId.current = requestAnimationFrame(updateTimer);

    return () => {
      if (animateId.current) {
        cancelAnimationFrame(animateId.current);
      }
    };
  }, [timeRemaining]);

  return (
    <>
      <ItemContext.Provider value={{ loading, recommented, itemId }}>
        <section id="item-info">
          <div className="container">
            <div className="row item-page__row">
              <div className="item-page__left">
                <figure className="item-page__img__wrapper">
                  <div className="item-page__img__details">
                    <FontAwesomeIcon
                      icon={faEthereum}
                      className="item-page__img__icon"
                    />
                    <div className="item-page__img__likes">
                      <span className="item-page__img__likes__text">
                        {loading ? (
                          <Skeleton
                            height="15px"
                            width="40px"
                            borderRadius="4px"
                          />
                        ) : (
                          item.favorites
                        )}
                      </span>
                    </div>
                  </div>
                  {loading ? (
                    <div>
                      <Skeleton
                        height="1000px"
                        width="100%"
                        borderRadius="25px"
                      />
                    </div>
                  ) : (
                    <img
                      src={item.imageLink}
                      alt=""
                      className="item-page__img"
                    />
                  )}
                </figure>
              </div>
              <div className="item-page__right">
                {loading ? (
                  <Skeleton height="15px" width="125px" borderRadius="4px" />
                ) : (
                  <Link
                    to={`/collection/${item.collectionId}`}
                    className="item-page__collection light-blue"
                  >
                    {item.collection}
                  </Link>
                )}
                <h1
                  className="item-page__name"
                  style={loading ? { marginTop: "25px" } : {}}
                >
                  {loading ? (
                    <Skeleton height="15px" width="250px" borderRadius="4px" />
                  ) : (
                    item.title
                  )}
                </h1>
                {loading ? (
                  <span className="item-page__owner">
                    <Skeleton height="15px" width="125px" borderRadius="4px" />
                  </span>
                ) : (
                  <span className="item-page__owner">
                    Owned by{" "}
                    <Link
                      to={`/user/${item.ownerId}`}
                      className="light-blue item-page__owner__link"
                    >
                      {item.owner}
                    </Link>
                  </span>
                )}
                {loading ? (
                  <div className="item-page__details">
                    <div className="item-page__detail">
                      <Skeleton height="15px" width="75px" borderRadius="4px" />
                    </div>
                    <div className="item-page__detail">
                      <Skeleton height="15px" width="75px" borderRadius="4px" />
                    </div>
                    <div className="item-page__detail">
                      <Skeleton height="15px" width="75px" borderRadius="4px" />
                    </div>
                  </div>
                ) : (
                  <div className="item-page__details">
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {item.views} views
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {item.favorites} favorites
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faShapes}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">PFPs</span>
                    </div>
                  </div>
                )}
                {loading ? (
                  <div className="item-page__sale">
                    <div className="item-page__sale__header">
                      <Skeleton
                        height="15px"
                        width="200px"
                        borderRadius="4px"
                      />
                    </div>
                    <div className="item-page__sale__body">
                      <Skeleton height="15px" width="75px" borderRadius="4px" />
                      <div
                        className="item-page__sale__price"
                        style={
                          loading ? { marginTop: "20px", gap: "20px" } : {}
                        }
                      >
                        <Skeleton
                          height="15px"
                          width="150px"
                          borderRadius="4px"
                        />
                        <Skeleton
                          height="15px"
                          width="150px"
                          borderRadius="4px"
                        />
                      </div>
                      <div className="item-page__sale__buttons">
                        <div
                          className="item-page__sale__buy"
                          style={loading ? { marginTop: "10px" } : {}}
                        >
                          <Skeleton
                            height="50px"
                            width="100%"
                            borderRadius="4px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="item-page__sale">
                    <div className="item-page__sale__header">
                      <div className="green-pulse"></div>
                      <span>
                        Sale ends in{" "}
                        <span className="timer__hours">{hours}h </span>
                        <span className="timer__minutes">{minutes}m </span>
                        <span className="timer__seconds">{seconds}s</span>
                      </span>
                    </div>
                    <div className="item-page__sale__body">
                      <span className="item-page__sale__label">
                        Current price
                      </span>
                      <div className="item-page__sale__price">
                        <span className="item-page__sale__price__eth">
                          {item.ethPrice} ETH
                        </span>
                        <span className="item-page__sale__price__dollars">
                          {item.usdPrice}
                        </span>
                      </div>
                      <div className="item-page__sale__buttons">
                        <div className="item-page__sale__buy">
                          <button className="item-page__sale__buy__button disabled">
                            Buy now
                          </button>
                          <button className="item-page__sale__buy__icon disabled">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </button>
                        </div>
                        <button className="item-page__sale__offer disabled">
                          <FontAwesomeIcon icon={faTag} />
                          Make offer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <RecommendedItems />
      </ItemContext.Provider>
    </>
  );
}
