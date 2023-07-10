import {useEffect} from "react";
import {getAllSpotReviewsThunk} from "../../store/reviewsReducer";
import {useDispatch, useSelector} from "react-redux";
import DeleteReview from "../DeleteReview";
import OpenModalButton from "../OpenModalButton";
import "./SpotReviews.css";

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
    <div className="gona-wrap">
      {reviews
        .map((review) => (
          <div key={review.id} className="wee">
            <div className="person">{review.User && review.User.firstName}</div>
            <div className="mon-yr">
              {review.createdAt.slice(5, 7) === "01" && (
                <div className="yee">January</div>
              )}
              {review.createdAt.slice(5, 7) === "02" && (
                <div className="yee">February</div>
              )}
              {review.createdAt.slice(5, 7) === "03" && (
                <div className="yee">March</div>
              )}
              {review.createdAt.slice(5, 7) === "04" && (
                <div className="yee">April</div>
              )}
              {review.createdAt.slice(5, 7) === "05" && (
                <div className="yee">May</div>
              )}
              {review.createdAt.slice(5, 7) === "06" && (
                <div className="yee">June</div>
              )}
              {review.createdAt.slice(5, 7) === "07" && (
                <div className="yee">July</div>
              )}
              {review.createdAt.slice(5, 7) === "08" && (
                <div className="yee">August</div>
              )}
              {review.createdAt.slice(5, 7) === "09" && (
                <div className="yee">September</div>
              )}
              {review.createdAt.slice(5, 7) === "10" && (
                <div className="yee">October</div>
              )}
              {review.createdAt.slice(5, 7) === "11" && (
                <div className="yee">November</div>
              )}
              {review.createdAt.slice(5, 7) === "12" && (
                <div className="yee">December</div>
              )}
              <div className="yr">{review.createdAt.slice(0, 4)}</div>
            </div>
            <div>{review.review}</div>
            {currUser && review.userId === currUser.id ? (
              <div className="my-del">
                <OpenModalButton
                  modalComponent={
                    <DeleteReview reviewId={review.id} spotId={spotId} />
                  }
                  buttonText="Delete"
                />
              </div>
            ) : null}
          </div>
        ))
        .reverse()}
    </div>
  );
}
