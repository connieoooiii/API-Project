import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getOneSpotThunk} from "../../store/spotsReducer";
import "./SpotDetails.css";

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
              ${spot.price} <span>night</span>
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
