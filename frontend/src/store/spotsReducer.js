import {csrfFetch} from "./csrf";

const CREATE_SPOT = "spots/CREATE_SPOT";

const LOAD_SPOTS = "spots/LOAD_SPOTS";

const GET_SPOT = "spots/GET_SPOT";

const DELETE_SPOT = "spots/DELETE_SPOT";

//action creators

export const getAllSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const getOneSpot = (spotId) => {
  return {
    type: GET_SPOT,
    spotId,
  };
};

export const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

export const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

//Thunk Action Creator

export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots));
    return spots;
  }
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(getOneSpot(spot));
    return spot;
  } else {
    const errors = await res.json();
    console.log("inside thunk. ERRORRS".errors);
    return errors;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteSpot(spotId));
  }
};

export const createSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const newSpot = await res.json();
    console.log("inside create spot thunk. NEW SPOT:", newSpot);
    dispatch(createSpot(newSpot));
    return newSpot;
  } else {
    const errors = await res.json();
    console.log("inside create thunk. ERRORRS".errors);
    return errors;
  }
}; // not done yet

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spotsState = {};
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
    }
    case GET_SPOT: {
      return {...state, [action.spot.id]: action.spot};
    }
    case CREATE_SPOT: {
      return {...state, [action.spot.id]: action.spot};
    }
    case DELETE_SPOT: {
      const newState = {...state};
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
