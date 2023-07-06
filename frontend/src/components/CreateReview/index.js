import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createReviewThunk} from "../../store/reviewsReducer";

export default function CreateReview() {
  //   const dispatch = useDispatch();
  //   const [yourReview, setYourReview] = useState("");
  //   //const [didSubmit, setDidSubmit] = useState(false);
  const dispatch = useDispatch();
  const [yourReview, setYourReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setDidSubmit(true);

    const newReview = {
      review: yourReview,
      stars: 5,
    };
    console.log("inside create review handle submit");
    await dispatch(createReviewThunk(newReview));

    setYourReview("");
  };
  return (
    <div>
      <h2>How was your stay?</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={yourReview}
          onChange={(e) => setYourReview(e.target.value)}
          placeholder="Leave your review here..."
        />
        <button type="submit" disabled={yourReview.length < 10}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
