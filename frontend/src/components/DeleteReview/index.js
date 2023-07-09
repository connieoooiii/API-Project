import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import {deleteReviewThunk} from "../../store/reviewsReducer";
import {getAllSpotReviewsThunk} from "../../store/reviewsReducer";
import {getOneSpotThunk} from "../../store/spotsReducer";
import "./DeleteReview.css";

export default function DeleteReview({reviewId, spotId}) {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const deleteHandler = async () => {
    console.log("inside delete handler for button");
    await dispatch(deleteReviewThunk(reviewId, spotId));

    await dispatch(getAllSpotReviewsThunk(spotId));

    await dispatch(getOneSpotThunk(spotId));

    closeModal();
  };
  return (
    <div className="del-rev-wrap">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="del-btns">
        <button className="yes-del" onClick={deleteHandler}>
          Yes (Delete Review)
        </button>
        <button className="no-del" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}
