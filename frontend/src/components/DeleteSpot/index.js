import {useDispatch} from "react-redux";
import {deleteSpotThunk} from "../../store/spotsReducer";
import {useModal} from "../../context/Modal";

export default function DeleteSpot({spotId}) {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const deleteHandler = async () => {
    console.log("inside delete handler for button");
    await dispatch(deleteSpotThunk(spotId));
    closeModal();
  };
  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <div>
        <button onClick={deleteHandler}>Yes (Delete Spot)</button>
        <button onClick={() => closeModal}>No (Keep Spot)</button>
      </div>
    </div>
  );
}
