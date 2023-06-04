//ACTIONS
export const CREATE_TRANSACTIONS = "Investments/CREATE_TRANSACTIONS";

//ACTION CREATORS



//THUNKS



// Buy new stock
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

    default:
      return state;
  }
}
