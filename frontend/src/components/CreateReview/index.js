import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {createReviewThunk} from "../../store/reviewsReducer";
import {useModal} from "../../context/Modal";
import "./CreateReview.css";
import {getOneSpotThunk} from "../../store/spotsReducer";

export default function CreateReview({spotId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();
  const [yourReview, setYourReview] = useState("");
  const [errors, setErrors] = useState({});
  const [activeRating, setActiveRating] = useState(0);
  const [starsRating, setStarsRating] = useState();
  const [didSubmit, setDidSubmit] = useState(false);

  useEffect(() => {
    const errorsObj = {};
    if (yourReview.length < 10)
      errorsObj.yourReview = "Your review must be at least 10 characters";

    if (starsRating < 1 || !starsRating)
      errorsObj.starsRating = "Star rating must be at least 1";

    setErrors(errorsObj);
  }, [yourReview, starsRating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);

    const newReview = {
      review: yourReview,
      stars: starsRating,
    };
    console.log("inside create review handle submit");
    const dispatchedReview = await dispatch(
      createReviewThunk(newReview, spotId)
    );
    await dispatch(getOneSpotThunk(spotId));

    console.log(
      "yay the review has been created: dispatched review",
      dispatchedReview
    );

    setYourReview("");
    setActiveRating(0);
    setStarsRating();

    if (dispatchedReview) {
      closeModal();
      history.push(`/spots/${spotId}`);
    }
  };

  return (
    <div>
      <h2>How was your stay?</h2>
      <form onSubmit={handleSubmit}>
        {didSubmit && errors.yourReview && <p>{errors.yourReview}</p>}
        {didSubmit && errors.starsRating && <p>{errors.starsRating}</p>}
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
        <textarea
          value={yourReview}
          onChange={(e) => setYourReview(e.target.value)}
          placeholder="Leave your review here..."
        />
        <button type="submit" disabled={Object.values(errors).length > 0}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
