

// ACTIONS
const GET_WATCHLISTS_USER_ID = 'watchlists/user/all'
const CREATE_WATCHLIST = 'watchlists/create'
const DELETE_WATCHLIST_BY_ID = "watchlists/delete";
const EDIT_WATCHLIST = 'watchlists/update'
export const CLEAR_WATCH_STATE = "watchlists/CLEAR_WATCH_STATE";



// ACTION CREATORS
const actionGetAllWatchlistsUserId = (watchlists) => ({
    type: GET_WATCHLISTS_USER_ID,
    watchlists
})

const actionCreateWatchlist = (watchlist) => ({
  type: CREATE_WATCHLIST,
  watchlist,
});

const actionDeleteWatchlistById = (id) => ({
  type: DELETE_WATCHLIST_BY_ID,
  id,
});

const actionEditWatchlist = (watchlist) => ({
  type: EDIT_WATCHLIST,
  watchlist,
});

export const clearWatchlistsState = () => {
  return {
    type: CLEAR_WATCH_STATE,
  };
};

// THUNKS
export const thunkGetAllWatchlistsUserId = () => async (dispatch) => {
//   const response = await fetch(`/api/users/${+id}/watchlists`)
  console.log("watchlist THUNK!!!!!!!!!")
  const response = await fetch(`/api/watchlists/user`)

  if (response.ok) {
    const watchlistById = await response.json();
    dispatch(actionGetAllWatchlistsUserId(watchlistById));
    return watchlistById;
  }
}

// -----create new watchlist
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

export const deleteList = (id) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(actionDeleteWatchlistById(id));
  }
};

export const editWatchlist = (watchlist) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${watchlist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(watchlist),
  });

  if (response.ok) {
    const updatedWatchlist = await response.json();
    dispatch(actionEditWatchlist(updatedWatchlist));
    return updatedWatchlist;
  }
};

// -----add new stock to watchlist
export const addStockToList = (stocksArr) => async (dispatch) => {
  console.log("REACHED THUNK - array value", stocksArr)
  const response = await fetch("/api/watchlists_stocks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stocksArr),
  });

  if (response.ok) {
    const data = await response.json();
    // dispatch(thunkGetAllWatchlistsUserId());
    return data;
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
    case DELETE_WATCHLIST_BY_ID: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case EDIT_WATCHLIST: {
      const newState = { ...state };
      newState[action.watchlist.id] = action.watchlist;
      return newState;
    }
    case CLEAR_WATCH_STATE:
      return { ...initialState };
    default:
      return state;
  }
}
