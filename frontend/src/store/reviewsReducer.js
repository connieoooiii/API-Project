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
    type: DELETE_REVIEW,
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
    console.log(err);
  }
};

export const deleteReviewThunk = (reviewId, spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(` /api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    console.log("delete res", res);
    if (res.ok) {
      console.log("INSIDE DELETE THUNK");
      dispatch(deleteReview(reviewId));
      dispatch(getAllSpotReviewsThunk(spotId));
    }
  } catch (err) {
    console.log("There was an error deleting review", err);
  }
};

export const createReviewThunk = (review, spotId) => async (dispatch) => {
  console.log("inside thunk create review");
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(review),
    });
    console.log("res complete");
    console.log(res);
    if (res.ok) {
      console.log("res ok");
      const newReview = await res.json();
      console.log("INSIDE CREATE REVIEW THUNK", newReview);
      dispatch(createReview(newReview));
      return newReview;
    }
  } catch (err) {
    return err;
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
      console.log("action.review", action.review);
      console.log("inside reviews reducer create review");
      return {...state, [action.review.id]: action.review};
    }
    default:
      return state;
  }
};

export default reviewsReducer;
