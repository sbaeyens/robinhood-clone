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



const initialState = { investments: null };

// REDUCER

export default function investReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ONE_INVESTMENT:
      let singleInvestment = {};
      singleInvestment[action.payload.ticker] = action.payload;
      newState.investments = { ...singleInvestment };
      return newState;
    default:
      return state;
  }
}
