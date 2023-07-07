import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {createReviewThunk} from "../../store/reviewsReducer";
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

  useEffect(() => {
    const errorsObj = {};
    if (review.length < 10)
      errorsObj.review = "Your review must be at least 10 characters";

    if (starsRating < 1 || !starsRating)
      errorsObj.starsRating = "Star rating must be at least 1";

    setErrors(errorsObj);
  }, [review, starsRating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);

    const newReview = {
      review,
      stars: starsRating,
    };

    console.log("new review", newReview);

    try {
      const dispatchedReview = await dispatch(
        createReviewThunk(newReview, spotId)
      );

      await dispatch(getOneSpotThunk(spotId));

      console.log(
        "yay the review has been created: dispatched review",
        dispatchedReview
      );

      setReview("");
      setActiveRating(0);
      setStarsRating();

      if (dispatchedReview) {
        closeModal();
        history.push(`/spots/${spotId}`);
      }
    } catch (err) {
      const errorsObj = {};

      if (err) errorsObj.err = err;
      setErrors(err);
    }

    // const newReview = {
    //   //   spotId: spotId,
    //   //   userId: currUser,
    //   review,
    //   stars: starsRating,
    // };
    // console.log("inside create review handle submit");
    // await dispatch(createReviewThunk(newReview, spotId));
  };

  return (
    <div>
      <h2>How was your stay?</h2>
      <form onSubmit={handleSubmit}>
        {didSubmit && errors.review && <p>{errors.review}</p>}
        {errors.starsRating && <p>{errors.starsRating}</p>}
        {errors.err && <p>{errors.err}</p>}
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
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
        />
        <button type="submit" disabled={Object.values(errors).length > 0}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
