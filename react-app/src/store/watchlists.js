

// ACTIONS
const GET_WATCHLISTS_USER_ID = 'watchlists/user/all' // Getting all watchlists of user
const CREATE_WATCHLIST = 'watchlists/create' // Creating a new watchlist


// ACTION CREATORS
const actionGetAllWatchlistsUserId = (watchlists) => ({
    type: GET_WATCHLISTS_USER_ID,
    watchlists
})

const actionCreateWatchlist = (watchlist) => ({
  type: CREATE_WATCHLIST,
  watchlist,
});



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

export const createList = (watchlist) => async (dispatch) => {
  const response = await fetch("/api/watchlists/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(watchlist),
  });

  if (response.ok) {
    const newWatchlist = await response.json();
    dispatch(actionCreateWatchlist(newWatchlist));
    return newWatchlist;
  }
};


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
    case CREATE_WATCHLIST: {
      const newState = { ...state };
      newState[action.watchlist.id] = action.watchlist;
      return newState;
    }
    default:
      return state;
  }
}
