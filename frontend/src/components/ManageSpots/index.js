import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserSpotsThunk} from "../../store/spotsReducer";
import ManageSpotCard from "./ManageSpotCard";
import "./ManageSpots.css";
import {useHistory} from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteSpot from "../DeleteSpot";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userSpots = useSelector((state) => Object.values(state.spots));

  console.log("this is user spots", userSpots);

  useEffect(() => {
    console.log("I AM USE EFFECT");
    dispatch(getUserSpotsThunk());
  }, [dispatch]);

  if (!userSpots.length) {
    // history.push("/");
    return (
      <div className="parent-div">
        <h2 className="h-manage">Manage Your Spots</h2>
        <button className="m-create" onClick={() => history.push("/spots/new")}>
          Create a New Spot
        </button>
      </div>
    );
  }

  return (
    <div className="parent-div">
      <h2 className="h-manage">Manage Your Spots</h2>

      <div className="wrapperdiv">
        {userSpots.map((spot) => (
          <div key={spot.id}>
            <ManageSpotCard spot={spot} />
            <div className="the-btns">
              <button
                className="up-btn"
                onClick={() => history.push(`/spots/${spot.id}/edit`)}
              >
                Update
              </button>
              <OpenModalButton
                modalComponent={<DeleteSpot spotId={spot.id} />}
                buttonText="Delete"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// const allSpots = useSelector((state) => {
//   return Object.values(state.spots);
// });

// const currUser = useSelector((state) => state.session);

// console.log("ALL SPOTS", allSpots);

// console.log("CURR User", currUser);

// const userSpots = allSpots.filter(
//   (spot) => spot.ownerId === currUser.user.id
// );

// console.log("userSpots", userSpots);

// useEffect(() => {
//   dispatch(getAllSpotsThunk());
// }, [dispatch]);
