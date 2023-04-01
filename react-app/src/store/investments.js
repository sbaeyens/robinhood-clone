//ACTIONS
export const GET_ONE_INVESTMENT = "Investments/GET_ONE_INVESTMENT";
export const DELETE_INVESTMENT = "Investments/DELETE_INVESTMENT";


//ACTION CREATORS
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


//THUNKS

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
    case GET_ONE_INVESTMENT:
      newState[action.payload.stock_id] = action.payload;
      return newState;
    case DELETE_INVESTMENT:
      newState = { ...initialState };
      return newState;
    default:
      return state;
  }
}
