//ACTIONS
export const GET_ONE_INVESTMENT = "Investments/GET_ONE_INVESTMENT";


//ACTION CREATORS
export const getOneInvestment = (payload) => {
  return {
    type: GET_ONE_INVESTMENT,
    payload,
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

// EDIT investment by ticker

// DELETE investment by ticker



const initialState = {}

// REDUCER

export default function investReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ONE_INVESTMENT:
      newState[action.payload.stock_id]= action.payload
      return newState;
    default:
      return state;
  }
}
