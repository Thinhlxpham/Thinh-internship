import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../../context/ItemContext";

// Swiper Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Skeleton from "../ui/Skeleton";

import "swiper/css";
import "swiper/css/navigation";

export default function RecommendedItems() {
  const { loading, itemId, recommented } = useContext(ItemContext);

  const itemsArr = Array.isArray(recommented?.items) ? recommented.items : [];
  const carouselItems = itemsArr
    .filter((item) => item.itemId !== itemId)
    .slice(0, 10);

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <FontAwesomeIcon icon={faTableCells} />
              <h3 className="recommended-items__header__title">
                More from this collection
              </h3>
            </div>

            <Swiper
              modules={[Navigation]}
              navigation
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                500: { slidesPerView: 2, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
              }}
            >
              {loading
                ? new Array(6).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="carousel-slide">
                        <figure className="item__img__wrapper">
                          <Skeleton
                            height="100%"
                            width="100%"
                            borderRadius="4px"
                          />
                        </figure>
                        <div className="item__details">
                          <span className="item__details__name">
                            <Skeleton
                              height="15px"
                              width="75px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="item__details__price">
                            <Skeleton
                              height="15px"
                              width="40px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="item__details__last-sale">
                            <Skeleton
                              height="15px"
                              width="100px"
                              borderRadius="4px"
                            />
                          </span>
                        </div>
                        <div className="item__see-more">
                          <button className="item__see-more__button">
                            See More
                          </button>
                          <div className="item__see-more__icon">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                : carouselItems.map((item) => (
                    <SwiperSlide key={item.itemId}>
                      <Link
                        to={`/item/${item.itemId}`}
                        className="carousel-slide item"
                      >
                        <figure className="item__img__wrapper">
                          <img
                            src={item.imageLink}
                            alt={item.title}
                            className="item__img"
                          />
                        </figure>
                        <div className="item__details">
                          <span className="item__details__name">
                            {item.title}
                          </span>
                          <span className="item__details__price">
                            {item.price ?? 0} ETH
                          </span>
                          <span className="item__details__last-sale">
                            Last sale: {item.lastSale ?? 0} ETH
                          </span>
                        </div>
                        <div className="item__see-more">
                          <button className="item__see-more__button">
                            See More
                          </button>
                          <div className="item__see-more__icon">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
            </Swiper>

            <div
              className="recommended-items__footer"
              style={{ marginTop: "20px" }}
            >
              {loading ? (
                <Skeleton height="25px" width="150px" borderRadius="4px" />
              ) : (
                <Link
                  to={`/collection/${recommented?.id || ""}`}
                  className="recommended-items__footer__button"
                >
                  View Collection
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
