import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import "./SpotCard.css";

export default function SpotCard({spot}) {
  const dispatch = useDispatch();

  console.log("SPOTT", spot);

  return (
    <div className="spot-card-wrap">
      {console.log(spot)}
      <div className="tool-tip">{spot.name}</div>
      <Link to={`/spots/${spot.id}`}>
        <img src={spot.previewImage} style={{height: "10rem"}} />
        <div>
          <div>
            <div>
              {spot.city}, {spot.state}{" "}
            </div>
            <div>{spot.avgRating ? spot.avgRating.toFixed(1) : "New"}</div>
          </div>
          <div>${spot.price} night</div>
        </div>
      </Link>
    </div>
  );
}
