import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

// Import Swiper Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function NewCollections() {
  const { newCollection, loading } = useContext(AppContext);
  return (
    loading !== true && (
      <section id="new-collections">
        <div className="container">
          <div className="row">
            <h2 className="new-collections__title">New Collections</h2>
            <div className="new-collections__body">
              <Swiper
                module={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={5}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                grabCursor={true}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="new-collections__swiper"
              />

              {newCollection.slice(0, 9).map((collection, index) => (
                <SwiperSlide key={index}>
                  <div className="collection-column">
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
                              {collection.totalVolume} ETH
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  );
}
