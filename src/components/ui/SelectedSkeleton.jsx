import React from "react";
import Skeleton from "./Skeleton";

export default function SelectedSkeleton() {
  return (
    <>
      <div className="collection">
        <Skeleton height="180px" width="100%" borderRadius="4px" />
        <div className="collection__info">
          <h3 className="collection__name"></h3>
          <div className="collection__stats--skeleton">
            <div className="collection__stat">
              <span className="collection__stat__label">
                <Skeleton height="18px" width="35%" borderRadius="4px" />
              </span>
              <span className="collection__stat__data">
                <Skeleton height="18px" width="75%" borderRadius="4px" />
              </span>
            </div>
            <div className="collection__stat">
              <span className="collection__stat__label">
                <Skeleton height="18px" width="35%" borderRadius="4px" />
              </span>
              <span className="collection__stat__data">
                <Skeleton height="18px" width="75%" borderRadius="4px" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
