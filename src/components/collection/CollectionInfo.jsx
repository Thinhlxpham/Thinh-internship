import React, { useContext } from "react";
import { CollectionContext } from "../../context/CollectionContext";
import Skeleton from "../ui/Skeleton";

export default function CollectionInfo() {
  const { loading, collection } = useContext(CollectionContext);

  return (
    <>
      {loading ? (
        <div>
          <Skeleton width="100%" height="14px" borderRadius="4px" />
          <Skeleton width="100%" height="14px" borderRadius="4px" />
          <Skeleton width="75%" height="14px" borderRadius="4px" />
        </div>
      ) : (
        <section id="collection-info">
          <div className="row">
            <div className="collection-info__wrapper">
              <p className="collection-info__description">
                {collection.description}
              </p>
              <div className="collection-info__details">
                <span className="collection-info__detail">
                  Items
                  <span className="collection-info__detail__data"> 30k</span>
                </span>
                ·
                <span className="collection-info__detail">
                  Created
                  <span className="collection-info__detail__data">
                    {" "}
                    {collection.createdDate}
                  </span>
                </span>
                ·
                <span className="collection-info__detail">
                  Creator earnings
                  <span className="collection-info__detail__data">
                    {" "}
                    {collection.creatorEarnings}%
                  </span>
                </span>
                ·
                <span className="collection-info__detail">
                  Chain
                  <span className="collection-info__detail__data">
                    {" "}
                    {collection.chain}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
