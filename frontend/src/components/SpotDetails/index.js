import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getOneSpotThunk} from "../../store/spotsReducer";
import "./SpotDetails.css";

import SpotReviews from "../SpotReviews";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const spot = useSelector((state) => {
    return state.spots[spotId];
  });

  console.log("SPOT", spot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  if (!spot.SpotImages) return null;

  const spotReviews = () => {
    if (spot.numReviews === 0) {
      return null;
    } else if (spot.numReviews === 1) {
      <div>1 · Review</div>;
    } else {
      <div>{spot.numReviews} · Reviews</div>;
    }
  };

  return (
    <div>
      <div>
        <h1>{spot.name}</h1>
        <div>
          Location: {spot.city}, {spot.state}, {spot.country}
        </div>
        <div className="img-container">
          <div>
            <img
              className="spot-preview-img"
              src={spot.SpotImages[0].url}
              alt="spot image preview"
            />
          </div>
          <div className="side-imgs">
            <img
              className="side-preview"
              src={
                spot.SpotImages[1]
                  ? spot.SpotImages[1].url
                  : "https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-vector-cloud-icon-png-image_1576641.jpg"
              }
              alt="img 2"
            />
            <img
              className="side-preview"
              src={
                spot.SpotImages[2]
                  ? spot.SpotImages[2].url
                  : "https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-vector-cloud-icon-png-image_1576641.jpg"
              }
              alt="img 3"
            />
            <img
              className="side-preview"
              src={
                spot.SpotImages[3]
                  ? spot.SpotImages[3].url
                  : "https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-vector-cloud-icon-png-image_1576641.jpg"
              }
              alt="img 4"
            />
            <img
              className="side-preview"
              src={
                spot.SpotImages[4]
                  ? spot.SpotImages[4].url
                  : "https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-vector-cloud-icon-png-image_1576641.jpg"
              }
              alt="img 5"
            />
          </div>
        </div>
      </div>
      <div className="info-wrap">
        <div className="name-descr-wrap">
          <div>
            Hosted by{" "}
            {spot.Owner ? (
              <span>
                {spot.Owner.firstName} {spot.Owner.lastName}
              </span>
            ) : null}
          </div>
          <div>{spot.description}</div>
        </div>
        <div className="reserve-box">
          <div className="price-reviews">
            <div>
              ${spot.price} <span>night</span>
            </div>

            <div>
              <i className="fa-solid fa-star"></i>
              {spot.avgStarRating}
              {spot.avgStarRating ? <span>&#8226;</span> : ""}
            </div>
            <div>
              {spot.numReviews === 0 ? "New" : ""}
              {spot.numReviews === 1 ? (
                <span>{spot.numReviews} Review</span>
              ) : (
                ""
              )}
              {spot.numReviews > 1 ? (
                <span>{spot.numReviews} Reviews</span>
              ) : (
                ""
              )}
            </div>

            <div></div>
          </div>
          <button onClick={() => alert("Feature Coming Soon...")}>
            Reserve
          </button>
        </div>
      </div>
      <div>
        <div style={{display: "flex"}}>
          <h2 style={{display: "flex"}}>
            <i className="fa-solid fa-star"></i>
            {spot.avgStarRating}
            {spot.avgStarRating ? <div>&#8226;</div> : ""}
          </h2>
          <h2>
            {spot.numReviews === 0 ? "New" : ""}
            {spot.numReviews === 1 ? <span>{spot.numReviews} Review</span> : ""}
            {spot.numReviews > 1 ? <span>{spot.numReviews} Reviews</span> : ""}
          </h2>
        </div>
        <SpotReviews spotId={spotId} />
      </div>
    </div>
  );
}
