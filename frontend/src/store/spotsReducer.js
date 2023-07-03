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

export const getOneSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
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
    console.log("inside getall spots thunk");
    dispatch(getAllSpots(spots));
    return spots;
  }
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    console.log("ONE SPOT THUNK spot from res", spot);
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

export const createSpotThunk =
  (spot, spotImages, owner) => async (dispatch) => {
    console.log("I AM INSIDE CREATE THUNK FIRST CL");

    try {
      const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(spot),
      });

      if (res.ok) {
        console.log("I AM INSIDE CREATE THUNK");
        const newSpot = await res.json();

        const newSpotImg = [];

        for (let img of spotImages) {
          img.spotId = newSpot.id;

          const imgFetch = await csrfFetch(`api/spots/${newSpot.id}/images`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(img),
          });

          if (imgFetch.ok) {
            const newImg = await imgFetch.json();
            newSpotImg.push(newImg);
          }
        }
        newSpot.SpotImages = newSpotImg;

        newSpot.owner = owner;

        await dispatch(createSpot(newSpot));
        return newSpot;
      }
    } catch (err) {
      const error = await err.json();
      console.log(error);
      return error;
    }
    // } else {
    //   const errors = await res.json();
    //   console.log("inside create thunk. ERRORRS".errors);
    //   return errors;
    // }

    // if (res.ok) {
    //   const newSpot = await res.json();
    //   console.log("inside create spot thunk. NEW SPOT:", newSpot);
    //   dispatch(createSpot(newSpot));
    //   return newSpot;
    // } else {
    //   const errors = await res.json();
    //   console.log("inside create thunk. ERRORRS".errors);
    //   return errors;
    // }
  }; // not done yet

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      console.log("inside spots reducer");
      const spotsState = {...state};
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }
    case GET_SPOT: {
      console.log("SPOTS REDUCER", state);
      const newState = {...state};
      newState[action.spot.id] = action.spot;
      return newState;
      //return {...state, [action.spot.id]: action.spot};
    }
    // case CREATE_SPOT: {
    //   return {...state, [action.spot.id]: action.spot};
    // }
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
