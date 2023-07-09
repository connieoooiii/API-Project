import {useDispatch} from "react-redux";
import {deleteSpotThunk} from "../../store/spotsReducer";
import {useModal} from "../../context/Modal";
import {getAllSpotReviewsThunk} from "../../store/reviewsReducer";
import "./DeleteSpot.css";

export default function DeleteSpot({spotId}) {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const deleteHandler = async () => {
    console.log("inside delete handler for button");
    await dispatch(deleteSpotThunk(spotId));

    closeModal();
  };
  return (
    <div className="delete-wrap">
      <h2 className="confirm-del">Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      <div className="del-btns">
        <button className="yes-del" onClick={deleteHandler}>
          Yes (Delete Spot)
        </button>
        <button className="no-del" onClick={closeModal}>
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
}
