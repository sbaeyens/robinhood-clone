//ACTIONS
export const GET_ALL_TRANSACTIONS = "transactions/GET_ALL_TRANSACTIONS";
export const CREATE_TRANSACTIONS = "Investments/CREATE_TRANSACTIONS";
export const CLEAR_TRANS_STATE = "Investments/CLEAR_TRANS_STATE";


//ACTION CREATORS
export const getAllTransactions = (payload) => {
  return {
    type: GET_ALL_TRANSACTIONS,
    payload,
  };
};

export const clearTransactionState = () => {
  return {
    type: CLEAR_TRANS_STATE,
  };
};


//THUNKS

// Get transactions by ticker
export const getTransactionsByTicker = (ticker) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${ticker}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllTransactions(data));
        return
    }
};

// Buy new stock
export const addTransaction =
  (ticker, newTransaction) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${ticker}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    });

    if (response) {
      const data = await response.json();
      return data;
    }
  };

const initialState = { transactions: null };

// REDUCER
export default function transactionReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      let transactions = {};
      action.payload.forEach((trans) => {
        transactions[trans.id] = trans;
      });
      newState.transactions = { ...transactions };
      return newState;
    case CLEAR_TRANS_STATE:
      return { ...initialState };
    default:
      return state;
  }
}
