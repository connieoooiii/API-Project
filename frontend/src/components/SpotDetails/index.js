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

  console.log("SPOT STATEE ", spot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  return (
    <>
      {/* <h3>{spot.name}</h3>
      <div>
        Location: {spot.city} {spot.state} {spot.country}
      </div>
      <div>
        <img src={spot.SpotImages[0].url} alt="bnbpic" />
      </div> */}
    </>
  );
}
