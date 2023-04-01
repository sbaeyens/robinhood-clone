//ACTIONS
export const GET_ONE_INVESTMENT = "Investments/GET_ONE_INVESTMENT";
export const DELETE_INVESTMENT = "Investments/DELETE_INVESTMENT";
export const GET_ALL_INVESTMENTS = "Investments/GET_ALL_INVESTMENTS";
export const CLEAR_INV_STATE = "Investments/CLEAR_INV_STATE";


//ACTION CREATORS
export const getAllInvestments = (payload) => {
    return {
        type: GET_ALL_INVESTMENTS,
        payload
    }
}

export const getOneInvestment = (payload) => {
  return {
    type: GET_ONE_INVESTMENT,
    payload,
  };
};

export const removeInvestment = (ticker) => {
  return {
    type: DELETE_INVESTMENT,
    ticker,
  };
};

export const clearInvestmentState = () => {
    return {
        type: CLEAR_INV_STATE,
    }
}

//THUNKS

//fetch all investments by user
export const fetchAllInvestments = () => async (dispatch) => {
    const response = await fetch("/api/investments/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllInvestments(data));
    }
};

// Get Investments by ticker
export const fetchStockInvestment = (ticker) => async (dispatch) => {
  const response = await fetch(`/api/investments/${ticker}`);

  if (response.ok) {
    const data = await response.json();
    if (data.error) {
      return;
    }
    dispatch(getOneInvestment(data));
    return;
  }
};

// POST investment by ticker
export const addInvestment = (ticker, newTransaction) => async (dispatch) => {
  const response = await fetch(`/api/investments/${ticker}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTransaction),
  });

  if (response) {
    const data = await response.json();
    dispatch(fetchStockInvestment(ticker));
    return data;
  }
};

// EDIT investment by ticker
export const editInvestment = (ticker, newTransaction) => async (dispatch) => {
  console.log("REACHED THUNK%%%%%%%%%")
  const response = await fetch(`/api/investments/${ticker}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTransaction),
  });

  if (response) {
    const data = await response.json();
    dispatch(fetchStockInvestment(ticker));
    return data;
  }
};

// DELETE investment by ticker
export const deleteInvestment = (ticker) => async (dispatch) => {
  const response = await fetch(`/api/investments/${ticker}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("delet inv thunk", data);

    dispatch(removeInvestment(ticker));
    return data;
  }
};


const initialState = {}

// REDUCER

export default function investReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_INVESTMENTS:
      let investmentList = {}
      action.payload.forEach((investment) => {
          investmentList[investment.stock_id] = investment
      })
      newState = {...investmentList}
      return newState
    case GET_ONE_INVESTMENT:
      newState[action.payload.stock_id] = action.payload;
      return newState;
    case DELETE_INVESTMENT:
      newState = { ...initialState };
      return newState;
    case CLEAR_INV_STATE:
      return { ...initialState }
    default:
      return state;
  }
}
