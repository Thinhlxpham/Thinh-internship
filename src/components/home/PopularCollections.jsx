import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Aos from "aos";
// Carousel Swiper Import
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

export default function PopularCollections() {
  const { popularCollection, loading } = useContext(AppContext);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        Aos.refreshHard();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [loading, popularCollection]);
  return (
    loading !== true && (
      <section id="popular-collections">
        <div className="container">
          <div className="row">
            <h2
              className="popular-collections__title"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-once="false"
            >
              Popular Collections
            </h2>
            <div
              className="popular-collections__body"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-once="false"
            >
              <Swiper
                navigation={true}
                modules={[Navigation]}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  500: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {popularCollection.slice(0, 9).map((collection, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      to={`/collection/${collection.collectionId}`}
                      className="collection"
                    >
                      <img
                        src={collection.imageLink}
                        alt=""
                        className="collection__img"
                      />
                      <div className="collection__info">
                        <h3 className="collection__name">{collection.title}</h3>
                        <div className="collection__stats">
                          <div className="collection__stat">
                            <span className="collection__stat__label">
                              Floor
                            </span>
                            <span className="collection__stat__data">
                              {(
                                Math.round(collection.floor * 100) / 100
                              ).toString().length >= 4
                                ? Math.round(collection.floor * 100) / 100
                                : Math.round(collection.floor * 100) / 100 +
                                  "0"}{" "}
                              ETH
                            </span>
                          </div>
                          <div className="collection__stat">
                            <span className="collection__stat__label">
                              Total Volume
                            </span>
                            <span className="collection__stat__data">
                              {collection.totalVolume}k ETH
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    )
  );
}
