

// ACTIONS
const GET_WATCHLISTS_USER_ID = 'watchlists/user/all' // Getting all watchlists of user

// ACTION CREATORS
const actionGetAllWatchlistsUserId = (watchlists) => ({
    type: GET_WATCHLISTS_USER_ID,
    watchlists
})


// THUNKS
export const thunkGetAllWatchlistsUserId = (id) => async (dispatch) => {
//   const response = await fetch(`/api/users/${+id}/watchlists`)
  const response = await fetch(`/api/watchlists/user/${id}`)

  if (response.ok) {
    const watchlistById = await response.json();
    dispatch(actionGetAllWatchlistsUserId(watchlistById));
    return watchlistById;
  }
}

const initialState = {};


// REDUCER
export default function watchlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WATCHLISTS_USER_ID: {
      const newState = { ...state };
      for (let watchlist of action.watchlists) {
        newState[watchlist.id] = watchlist;
      }
      return newState;
    }
    default:
      return state;
  }
}
