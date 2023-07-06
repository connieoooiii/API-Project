import {csrfFetch} from "./csrf";

const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

const DELETE_REVIEW = "reviews/DELETE_REVIEWS";

const CREATE_REVIEW = "reviews/CREATE_REVIEWS";

//action creators

export const getSpotReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews,
  };
};

export const deleteReview = (reviewId) => {
  return {
    action: DELETE_REVIEW,
    reviewId,
  };
};

export const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

//THUNK ACTION CREATOR
export const getAllSpotReviewsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
      const reviews = await res.json();
      console.log("INSIDE get all review THUNK this is res.json", reviews);
      dispatch(getSpotReviews(reviews));
      return reviews;
    }
  } catch (err) {
    const error = await err.json();
    console.log(error);
    return error;
  }
};

export const deleteReviewThunk = (reviewId, spotId) => async (dispatch) => {
  try {
    const res = csrfFetch(` /api/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log("INSIDE DELETE THUNK");
      dispatch(deleteReview(reviewId));
      dispatch(getAllSpotReviewsThunk(spotId));
    }
  } catch (err) {
    const error = await err.json();
    console.log(error);
    return error;
  }
};

export const createReviewThunk = (review, spotId) => async (dispatch) => {
  try {
    const res = csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(review),
    });

    if (res.ok) {
      const newReview = await res.json();
      console.log("INSIDE CREATE REVIEW THUNK", newReview);
      dispatch(createReview(newReview));
      //dispatch(getAllSpotReviewsThunk(spotId));
      return newReview;
    }
  } catch (err) {
    const error = await err.json();
    console.log(error);
    return error;
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      console.log("inside load reviews reducer");
      const reviewsState = {};
      action.reviews.Reviews.forEach((review) => {
        reviewsState[review.id] = review;
      });
      return reviewsState;
    }
    case DELETE_REVIEW: {
      const newState = {...state};
      delete newState[action.reviewId];
      return newState;
    }
    case CREATE_REVIEW: {
      console.log("inside reviews reducer create review");
      return {...state, [action.review.id]: action.review};
    }
    default:
      return state;
  }
};

export default reviewsReducer;
