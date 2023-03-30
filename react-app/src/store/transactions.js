//ACTIONS
export const GET_ALL_TRANSACTIONS = "transactions/GET_ALL_TRANSACTIONS";


//ACTION CREATORS
export const getAllTransactions = (payload) => {
  return {
    type: GET_ALL_TRANSACTIONS,
    payload,
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

// Buy new


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
    default:
      return state;
  }
}
