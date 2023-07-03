import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getOneSpotThunk} from "../../store/spotsReducer";

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

  return (
    <div>
      <div>
        <h1>{spot.name}</h1>
        <div>
          Location: {spot.city}, {spot.state}, {spot.country}
        </div>
        <div>{/* <img src={spot.SpotImages[0].url} alt="bnbpic" /> */}</div>
      </div>
      <div>
        <div>
          Hosted by{" "}
          {spot.Owner ? (
            <span>
              {spot.Owner.firstName} {spot.Owner.lastName}
            </span>
          ) : null}
        </div>
        <div>{spot.description}</div>
        <div>
          <div>
            <div>
              ${spot.price.toFixed(2)} <span>night</span>
            </div>

            <p>
              <i className="fa-solid fa-star"></i>{" "}
              {spot.avgRating ? spot.avgRating : "New"}
            </p>
            <p>{spot.numReviews ? spot.numReviews : ""} reviews</p>
          </div>
          <button onClick={() => alert("Feature Coming Soon...")}>
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
