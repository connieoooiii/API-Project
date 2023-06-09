import {csrfFetch} from "./csrf";

const CREATE_SPOT = "spots/CREATE_SPOT";

const LOAD_SPOTS = "spots/LOAD_SPOTS";

const GET_SPOT = "spots/GET_SPOT";

const DELETE_SPOT = "spots/DELETE_SPOT";

const LOAD_USER_SPOTS = "spots/LOAD_USER_SPOTS";

const UPDATE_SPOT = "spots/UPDATE_SPOT";

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

export const getUserSpots = (spots) => {
  return {
    type: LOAD_USER_SPOTS,
    spots,
  };
};

export const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
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

export const getUserSpotsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/spots/current");
    if (res.ok) {
      console.log("Yay you made it to get user spots thunk");
      const spots = await res.json();
      dispatch(getUserSpots(spots));
    }
  } catch (err) {
    const error = await err.json();
    console.log(error);
    return error;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const spot = await res.json();
    console.log("INSIDE DELETE THUNK");
    dispatch(deleteSpot(spotId));
    return spot;
  }
};

export const createSpotThunk = (spot, spotImages) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/spots", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(spot),
    });
    if (res.ok) {
      const newSpot = await res.json();

      for (let i = 0; i < spotImages.length; ++i) {
        const imgRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(spotImages[i]),
        });
      }
      dispatch(createSpot(newSpot));
      return newSpot;
    }
  } catch (err) {
    console.log("this is err", err);
    const error = await err.json();
    console.log(error);
    return error;
  }
};

export const updateSpotThunk = (spot) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(spot),
    });

    if (res.ok) {
      const editSpot = await res.json();
      console.log("INISDE UPDATE THUNK", editSpot);

      dispatch(updateSpot(editSpot));
      return editSpot;
    }
  } catch (err) {
    const error = await err.json();
    console.log(error);
    return error;
  }
};

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
      console.log("GET A SPOT REDUCER", state);
      const newState = {...state};
      newState[action.spot.id] = action.spot;
      return newState;
      //return {...state, [action.spot.id]: action.spot};
    }
    case LOAD_USER_SPOTS: {
      console.log("inside load user spots reducer");
      const spotsState = {};
      console.log("THIS IS ACTION SPOTS", action.spot);
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }
    case CREATE_SPOT: {
      return {...state, [action.spot.id]: action.spot};
    }
    case UPDATE_SPOT: {
      console.log("INSIDE UPDATE SPOT REDUCER");
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

// export const createSpotThunk =
//   (spot, spotImages, owner) => async (dispatch) => {
//     console.log("I AM INSIDE CREATE THUNK FIRST CL");

//     try {
//       const res = await csrfFetch("/api/spots", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(spot),
//       });

//       if (res.ok) {
//         console.log("I AM INSIDE CREATE THUNK");
//         const newSpot = await res.json();

//         const newSpotImg = [];

//         for (let img of spotImages) {
//           img.spotId = newSpot.id;

//           const imgFetch = await csrfFetch(`api/spots/${newSpot.id}/images`, {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(img),
//           });

//           if (imgFetch.ok) {
//             const newImg = await imgFetch.json();
//             newSpotImg.push(newImg);
//           }
//         }
//         newSpot.SpotImages = newSpotImg;

//         newSpot.owner = owner;

//         await dispatch(createSpot(newSpot));
//         return newSpot;
//       }
//     } catch (err) {
//       const error = await err.json();
//       console.log(error);
//       return error;
//     }
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
//}; // not done yet
