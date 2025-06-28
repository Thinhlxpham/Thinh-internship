import React, { useContext } from "react";
import VerifiedIcon from "../../assets/verified.png";
import TrendingCollection from "../../assets/trending-collection.avif";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";
import { AppContext } from "../../context/AppContext";

export default function Trending() {
  const { trending, loading } = useContext(AppContext);
  return loading !== true ? (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={`/collections`}>
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trending?.slice(0, 5).map((collection, index) => (
                  <Link
                    to={`/collection/${collection.collectionId}`}
                    key={index}
                    className="trending-collection"
                  >
                    <div className="trending-collection__rank">
                      {collection?.rank}
                    </div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={collection?.imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {collection?.title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {(Math.round(collection.floor * 100) / 100).toString()
                          .length >= 4
                          ? Math.round(collection.floor * 100) / 100
                          : Math.round(collection.floor * 100) / 100 + "0"}{" "}
                        ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {collection?.totalVolume} ETH
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trending?.slice(5, 10).map((product, index) => (
                  <Link
                    to={`/collection/${product.collectionId}`}
                    key={index}
                    className="trending-collection"
                  >
                    <div className="trending-collection__rank">
                      {product?.rank}
                    </div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={product.imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {product?.title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {(Math.round(product.floor * 100) / 100).toString()
                          .length >= 4
                          ? Math.round(product.floor * 100) / 100
                          : Math.round(product.floor * 100) / 100 + "0"}{" "}
                        ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {product?.totalVolume} ETH
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={`/collections`}>
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {new Array(5).fill(0).map((_, index) => (
                  <div key={index} className="trending-collection">
                    <div className="trending-collection__rank">{index + 1}</div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <Skeleton
                          width="100%"
                          height="100%"
                          borderRadius="4px"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        <Skeleton
                          width="120px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        <Skeleton
                          width="70px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        <Skeleton
                          width="70px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {new Array(5).fill(0).map((_, index) => (
                  <div key={index} className="trending-collection">
                    <div className="trending-collection__rank">{index + 1}</div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <Skeleton
                          width="100%"
                          height="100%"
                          borderRadius="4px"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        <Skeleton
                          width="120px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        <Skeleton
                          width="70px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        <Skeleton
                          width="70px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
