//ACTIONS
export const CREATE_TRANSACTIONS = "Investments/CREATE_TRANSACTIONS";

//ACTION CREATORS



//THUNKS



// Buy new stock
export const addTransfer = (ticker, newTransaction) => async (dispatch) => {
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

const initialState = { transfers: null };

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
