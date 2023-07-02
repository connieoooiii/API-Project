import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllSpotsThunk} from "../../store/spotsReducer";
import SpotCard from "../SpotCard";

export default function SpotsIndex() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => {
    console.log("state spots", state.spots);
    return Object.values(state.spots);
  });
  console.log("SPOTS INDEX COMP", spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div>
      <h3>In Spots Index</h3>

      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
}
