import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {
  createReviewThunk,
  getAllSpotReviewsThunk,
} from "../../store/reviewsReducer";
import {useModal} from "../../context/Modal";
import "./CreateReview.css";
import {getOneSpotThunk} from "../../store/spotsReducer";

export default function CreateReview({currUser, spotId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  const [activeRating, setActiveRating] = useState(0);
  const [starsRating, setStarsRating] = useState();
  const [didSubmit, setDidSubmit] = useState(false);
  //const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    const errorsObj = {};
    if (review.length < 10)
      errorsObj.review = "Your review must be at least 10 characters";

    if (starsRating < 1 || !starsRating)
      errorsObj.starsRating = "Star rating must be at least 1";

    setErrors(errorsObj);
    //setDisableBtn(true);
  }, [review, starsRating]);

  //   const disableBtnFnc = () => {
  //     if (Object.values(errors).length >0) {
  //         setDisableBtn(true)
  //     } else {

  //     }
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);

    if (!Object.keys(errors).length > 0) {
      setErrors({});
      //setDisableBtn(false);
      const newReview = {
        review,
        stars: starsRating,
      };
      console.log("new review", newReview);

      const dispatchedReview = await dispatch(
        createReviewThunk(newReview, spotId)
      );

      await dispatch(getOneSpotThunk(spotId));

      await dispatch(getAllSpotReviewsThunk(spotId));

      console.log(
        "yay the review has been created: dispatched review",
        dispatchedReview
      );

      setReview("");
      setActiveRating(0);
      setStarsRating();

      if (dispatchedReview.id) {
        closeModal();
        history.push(`/spots/${spotId}`);
      } else {
        const errorsObj = {};

        errorsObj.dispatchedReview = dispatchedReview;
        setErrors(errorsObj);
      }
    } else {
      //setDisableBtn(true);
    }
  };

  return (
    <div className="rvw-wrap">
      <h2>How was your stay?</h2>
      <form onSubmit={handleSubmit}>
        {didSubmit && (
          <>
            {errors.review && <p>{errors.review}</p>}
            {errors.starsRating && <p>{errors.starsRating}</p>}
            {errors.dispatchedReview && <p>{errors.dispatchedReview}</p>}
          </>
        )}

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
        />

        <div className="text-btn">
          <div className="rating-input">
            <div
              className={activeRating >= 1 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(1)}
              onMouseLeave={() => setActiveRating(starsRating)}
              onClick={() => setStarsRating(1)}
            >
              <i className="fa-sharp fa-solid fa-star"></i>
            </div>
            <div
              className={activeRating >= 2 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(2)}
              onMouseLeave={() => setActiveRating(starsRating)}
              onClick={() => setStarsRating(2)}
            >
              <i className="fa-sharp fa-solid fa-star"></i>
            </div>
            <div
              className={activeRating >= 3 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(3)}
              onMouseLeave={() => setActiveRating(starsRating)}
              onClick={() => setStarsRating(3)}
            >
              <i className="fa-sharp fa-solid fa-star"></i>
            </div>
            <div
              className={activeRating >= 4 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(4)}
              onMouseLeave={() => setActiveRating(starsRating)}
              onClick={() => setStarsRating(4)}
            >
              <i className="fa-sharp fa-solid fa-star"></i>
            </div>
            <div
              className={activeRating >= 5 ? "filled" : "empty"}
              onMouseEnter={() => setActiveRating(5)}
              onMouseLeave={() => setActiveRating(starsRating)}
              onClick={() => setStarsRating(5)}
            >
              <i className="fa-sharp fa-solid fa-star"></i>
            </div>
          </div>

          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className="rvw-btn"
            onClick={() => setDidSubmit(true)}
          >
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  );
}
