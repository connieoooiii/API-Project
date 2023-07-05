import {useEffect} from "react";
import {getAllSpotReviewsThunk} from "../../store/reviewsReducer";
import {useDispatch, useSelector} from "react-redux";

export default function SpotReviews({spotId}) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));

  console.log("in reviews comp this is review", reviews);

  useEffect(() => {
    dispatch(getAllSpotReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!reviews.length) return null;

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h4>{review.User.firstName}</h4>

          <div>{review.review}</div>
        </div>
      ))}
    </div>
  );
}
