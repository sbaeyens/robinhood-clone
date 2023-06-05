//ACTIONS
export const CREATE_TRANSACTIONS = "Investments/CREATE_TRANSACTIONS";
export const GET_ALL_TRANSFERS = "Investments/GET_ALL_TRANSFERS";


//ACTION CREATORS
export const getAllTransfers = (payload) => {
  return {
    type: GET_ALL_TRANSFERS,
    payload,
  };
};


//THUNKS

export const getTransfers = () => async (dispatch) => {
  const response = await fetch(`/api/transfers/`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllTransfers(data));
    return;
  }
};


// New Deposit or Withdrawal
export const addTransfer = (newTransfer) => async (dispatch) => {
  const response = await fetch(`/api/transfers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTransfer),
  });

  if (response) {
    const data = await response.json();
    return data;
  }
};

const initialState = { transfers: null };

// REDUCER
export default function transferReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_TRANSFERS:
      let transfers = {};
      // console.log("action.payload", action.payload);
      action.payload.forEach((trans) => {
        transfers[trans.id] = trans;
      });
      // console.log("transfers", transfers)
      newState.transfers = { ...transfers };
      return newState;
    default:
      return state;
  }
}
