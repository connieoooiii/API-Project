import {Link} from "react-router-dom";
import "./ManageSpotCard.css";

export default function ManageSpotCard({spot}) {
  //console.log("SPOTT", spot);

  if (!spot) return null;

  return (
    // <h1>manage spot card</h1>
    <div className="manage-card-wrap">
      {console.log(spot)}
      {/* <div className="tool-tip">{spot.name}</div> */}
      <Link to={`/spots/${spot.id}`}>
        <img
          className="manage-img"
          src={spot.previewImage}
          style={{height: "10rem"}}
        />
        <div className="card-info">
          <div className="location-rate">
            <div>
              {spot.city}, {spot.state}{" "}
            </div>
            <div>
              <span>
                <i className="fa-solid fa-star" />
              </span>
              {spot.avgRating ? spot.avgRating.toFixed(1) : "New"}
            </div>
          </div>
          <div className="price">${spot.price} night</div>
        </div>
      </Link>
    </div>
  );
}
