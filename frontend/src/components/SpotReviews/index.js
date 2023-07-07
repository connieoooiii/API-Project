import {useEffect} from "react";
import {getAllSpotReviewsThunk} from "../../store/reviewsReducer";
import {useDispatch, useSelector} from "react-redux";
import DeleteReview from "../DeleteReview";
import OpenModalButton from "../OpenModalButton";

export default function SpotReviews({spotId, reviews}) {
  const dispatch = useDispatch();
  //const reviews = useSelector((state) => Object.values(state.reviews));

  const currUser = useSelector((state) => state.session.user);

  console.log("THis is curruser", currUser);

  console.log("in reviews comp this is review", reviews);

  useEffect(() => {
    dispatch(getAllSpotReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!reviews.length) return null;

  return (
    <div>
      {reviews
        .map((review) => (
          <div key={review.id}>
            <h4>{review.User && review.User.firstName}</h4>
            <div>
              {review.createdAt.slice(5, 7) === "01" && <div>January</div>}
              {review.createdAt.slice(5, 7) === "02" && <div>February</div>}
              {review.createdAt.slice(5, 7) === "03" && <div>March</div>}
              {review.createdAt.slice(5, 7) === "04" && <div>April</div>}
              {review.createdAt.slice(5, 7) === "05" && <div>May</div>}
              {review.createdAt.slice(5, 7) === "06" && <div>June</div>}
              {review.createdAt.slice(5, 7) === "07" && <div>July</div>}
              {review.createdAt.slice(5, 7) === "08" && <div>August</div>}
              {review.createdAt.slice(5, 7) === "09" && <div>September</div>}
              {review.createdAt.slice(5, 7) === "10" && <div>October</div>}
              {review.createdAt.slice(5, 7) === "11" && <div>November</div>}
              {review.createdAt.slice(5, 7) === "12" && <div>December</div>}
              <div>{review.createdAt.slice(0, 4)}</div>
            </div>
            <div>{review.review}</div>
            {currUser && review.userId === currUser.id ? (
              <OpenModalButton
                modalComponent={
                  <DeleteReview reviewId={review.id} spotId={spotId} />
                }
                buttonText="Delete"
              />
            ) : null}
          </div>
        ))
        .reverse()}
    </div>
  );
}
