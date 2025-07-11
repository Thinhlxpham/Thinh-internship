import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CollectionContext } from "../../context/CollectionContext";
import Skeleton from "../ui/Skeleton";

export default function CollectionItems() {
  const { loading, collection, collectionEachItem } =
    useContext(CollectionContext);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sort, setSort] = useState("");
  const [sortItem, setSortItem] = useState([]);

  function handleLoadMore() {
    setVisibleCount((prevCount) => prevCount + 6);
  }

  useEffect(() => {
    let items = [...(collectionEachItem || [])];
    if (sort === "HIGH_TO_LOW") {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === "LOW_TO_HIGH") {
      items.sort((a, b) => a.price - b.price);
    }
    setSortItem(items);
  }, [sort, collectionEachItem]);

  function renderProduct(arr) {
    return arr.slice(0, visibleCount).map((item, index) => {
      return (
        <div className="item-column" key={index}>
          <Link to={`/item/${item.itemId}`} className="item">
            <figure className="item__img__wrapper">
              <img
                src={item.imageLink}
                alt={item.title}
                className="item__img"
              />
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
      );
    });
  }
  return (
    <>
      {loading ? (
        <section id="collection-items">
          <div className="row collection-items__row">
            <div className="collection-items__header">
              <div className="collection-items__header__left">
                <span className="collection-items__header__live">
                  <Skeleton width="50px" height="14px" borderRadius="4px" />
                </span>
                <span className="collection-items__header__results">
                  <Skeleton width="75px" height="14px" borderRadius="4px" />
                </span>
              </div>
              <div
                className="collection-items__header__sort"
                style={{ paddingLeft: "0" }}
              >
                <Skeleton width="100%" height="100%" borderRadius="4px" />
              </div>
            </div>
            <div className="collection-items__body">
              {new Array(12).fill(0).map((_, index) => (
                <div className="item-column" key={index}>
                  <Link to={"/item"} className="item">
                    <figure className="item__img__wrapper">
                      <Skeleton width="100%" height="100%" borderRadius="4px" />
                    </figure>
                    <div className="item__details">
                      <span className="item__details__name">
                        <Skeleton
                          width="30%"
                          height="14px"
                          borderRadius="4px"
                        />
                      </span>
                      <span className="item__details__price">
                        <Skeleton
                          width="20%"
                          height="14px"
                          borderRadius="4px"
                        />
                      </span>
                      <span className="item__details__last-sale">
                        <Skeleton
                          width="50%"
                          height="14px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section id="collection-items">
          <div className="row collection-items__row">
            <div className="collection-items__header">
              <div className="collection-items__header__left">
                <span className="collection-items__header__live">
                  <div className="green-pulse"></div>
                  Live
                </span>
                <span className="collection-items__header__results">
                  {collectionEachItem ? collectionEachItem.length : 0} Results
                </span>
              </div>
              <select
                value={sort}
                className="collection-items__header__sort"
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="" default>
                  Default
                </option>
                <option value="HIGH_TO_LOW">Price high to low</option>
                <option value="LOW_TO_HIGH">Price low to high</option>
              </select>
            </div>
            <div className="collection-items__body">
              {renderProduct(sortItem)}
            </div>
          </div>
          {collection?.items && visibleCount < collectionEachItem.length && (
            <button
              className="collection-page__button"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
        </section>
      )}
    </>
  );
}
