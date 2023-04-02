//ACTIONS
const GET_USER_PORTFOLIO = 'portfolio/GET_USER_PORTFOLIO'
export const CLEAR_PORT_STATE = "portfolio/CLEAR_PORT_STATE";


//ACTION CREATORS

const actionGetUserPortfolio = (portfolio) => ({
    type: GET_USER_PORTFOLIO,
    portfolio
})

export const clearPortfolioState = () => {
  return {
    type: CLEAR_PORT_STATE,
  };
};

//THUNKS

// Get Portfolio of Current User
export const getUserPortfolio = () => async (dispatch) => {
    const response = await fetch(`/api/portfolio/`)

    if (response.ok) {
        const portfolio = await response.json()
        await dispatch(actionGetUserPortfolio(portfolio))
        return portfolio
    }
}

export const updatePortfolio = (transactionData) => async (dispatch) => {
  const response = await fetch(`/api/portfolio/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transactionData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getUserPortfolio(data));
  }
};


const initialState = {
    // historicalValues: [],
    // holdings: {},
    portfolio: {}
}



// REDUCER
export default function portfolioReducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
      case GET_USER_PORTFOLIO: {
        newState.id = action.portfolio.id;
        newState.balance = action.portfolio.balance;
        return newState;
      }
      case CLEAR_PORT_STATE:
        return { ...initialState };
      default:
        return state;
    }
}
