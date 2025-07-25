import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";
import axios from "axios";

export default function UserPage() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [userItems, setUserItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sort, setSort] = useState("");
  const [sortedItems, setSortedItems] = useState([]);

  async function fetchUser() {
    setLoading(true);
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/user/${userId}`
    );
    let userData = data.data;
    setUser(userData);

    if (userData) {
      let userItemsData = userData.items;
      setUserItems(userItemsData);
    }
    setLoading(false);
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  function renderItems(arr) {
    return arr?.slice(0, visibleCount).map((item, index) => (
      <div className="item-column" key={index}>
        <Link to={`/item/${item.itemId}`} className="item">
          <figure className="item__img__wrapper">
            <img src={item.imageLink} alt={item.title} className="item__img" />
          </figure>
          <div className="item__details">
            <span className="item__details__name">{item.title}</span>
            <span className="item__details__price">{item.price} ETH</span>
            <span className="item__details__last-sale">
              Last sale: {item.lastSale} ETH
            </span>
          </div>
          <div className="item__see-more">
            <button className="item__see-more__button">See More</button>
            <div className="item__see-more__icon">
              <FontAwesomeIcon icon={faShoppingBag} />
            </div>
          </div>
        </Link>
      </div>
    ));
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUser();
  }, [userId]);

  useEffect(() => {
    let items = [...(userItems || [])];
    if (sort === "HIGH_TO_LOW") {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === "LOW_TO_HIGH") {
      items.sort((a, b) => a.price - b.price);
    }
    setSortedItems(items);
  }, [sort, userItems]);

  return (
    <>
      {loading ? (
        <>
          <header id="user-header">
            <Skeleton width="100%" height="100%" />
          </header>

          <section id="user-info">
            <div className="row">
              <div className="user-info__wrapper">
                <figure className="user-info__img__wrapper">
                  <Skeleton width="100%" height="100%" />
                </figure>
                <h1 className="user-info__name">
                  {" "}
                  <Skeleton width="250px" height="15px" borderRadius="4px" />
                </h1>
                <div className="user-info__details">
                  <Skeleton width="300px" height="15px" borderRadius="4px" />
                  <Skeleton width="100px" height="15px" borderRadius="4px" />
                </div>
              </div>
            </div>
          </section>

          <section id="user-items">
            <div className="row user-items__row">
              <div className="user-items__header">
                <div className="user-items__header__left">
                  <span className="user-items__header__text">
                    <Skeleton width="125px" height="15px" borderRadius="4px" />
                  </span>
                </div>
                <select className="user-items__header__sort">
                  <option value="">Recently purchased</option>
                  <option value="">Price high to low</option>
                  <option value="">Price low to high</option>
                </select>
              </div>
              <div className="user-items__body">
                {new Array(10).fill(0).map((_, index) => (
                  <div className="item-column" key={index}>
                    <div className="item">
                      <figure className="item__img__wrapper">
                        <Skeleton
                          width="100%"
                          height="100%"
                          borderRadius="4px"
                        />
                      </figure>
                      <div className="item__details">
                        <span className="item__details__name">
                          <Skeleton
                            width="75px"
                            height="15px"
                            borderRadius="4px"
                          />
                        </span>
                        <span className="item__details__price">
                          <Skeleton
                            width="50px"
                            height="15px"
                            borderRadius="4px"
                          />
                        </span>
                        <span className="item__details__last-sale">
                          <Skeleton
                            width="100px"
                            height="15px"
                            borderRadius="4px"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <header
            style={{
              backgroundImage: `url('${user.imageLink}')`,
            }}
            id="user-header"
          ></header>

          <section id="user-info">
            <div className="row">
              <div className="user-info__wrapper">
                <figure className="user-info__img__wrapper">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="user-info__img"
                  />
                </figure>
                <h1 className="user-info__name">{user.name}</h1>
                <div className="user-info__details">
                  <span className="user-info__wallet">
                    <FontAwesomeIcon
                      icon={faEthereum}
                      className="user-info__wallet__icon"
                    />
                    <span className="user-info__wallet__data">
                      {user.walletCode}
                    </span>
                  </span>
                  <span className="user-info__year">
                    <span className="user-info__year__data">
                      Joined {user.creationDate}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section id="user-items">
            <div className="row user-items__row">
              <div className="user-items__header">
                <div className="user-items__header__left">
                  <span className="user-items__header__text">
                    {userItems.length} items
                  </span>
                </div>
                <select
                  className="user-items__header__sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="" default>
                    Recently purchased
                  </option>
                  <option value="HIGH_TO_LOW">Price high to low</option>
                  <option value="LOW_TO_HIGH">Price low to high</option>
                </select>
              </div>
              <div className="user-items__body">{renderItems(sortedItems)}</div>
            </div>
            {visibleCount < userItems.length && (
              <button
                className="collection-page__button"
                onClick={handleLoadMore}
              >
                Load more
              </button>
            )}
          </section>
        </>
      )}
    </>
  );
}
