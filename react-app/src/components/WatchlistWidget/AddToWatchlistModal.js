import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetAllWatchlistsUserId } from "../../store/watchlists";
import "./AddToWatchlistModal.css";
import { addStockToList } from "../../store/watchlists";




function AddToWatchlistModal({ ticker }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let [showForm, setShowForm] = useState(false);
    let [listName, setListName] = useState("");
    let [error, setError] = useState(false);
    let [disableBtn, setDisableBtn] = useState(false);
    let [disableSaveChanges, setDisableSaveChanges] = useState(false);
    const watchlists = useSelector((state) => state.watchlists);

    console.log("watchlists", watchlists)

    useEffect(() => {
      dispatch(thunkGetAllWatchlistsUserId());
    }, [dispatch]);

    useEffect(() => {
      if (listName.length > 64) {
        setError(true);
        setDisableBtn(true);
      } else {
        setError(false);
        setDisableBtn(false);
      }
    }, [listName]);

    // sort lists in descending by id and create default state obj -------------------------------------------
    let lists = watchlists ? Object.values(watchlists) : [];
    let defaultObj = {};

    if (lists.length) {
      lists.sort((a, b) => {
        return b.id - a.id;
      });

      for (let i = 0; i < lists.length; i++) {
        defaultObj[lists[i].id] = lists[i].stocks.includes(ticker);
      }
    }

    // Check if any changes in watchlists ---------------------------------------------------------------------
    const [updateObj, setUpdateObj] = useState(defaultObj);

    useEffect(() => {
      if (JSON.stringify(defaultObj) === JSON.stringify(updateObj)) {
        setDisableSaveChanges(true);
      } else {
        setDisableSaveChanges(false);
      }
    }, [updateObj]);

    // Event Handlers -----------------------------------------------------------------------------------------
    // Create List Handlers -----------------------------------------------------------------------------------


    // const submitFormHandler = async (e) => {
    //   e.preventDefault();

    //   if (listName.length < 1) {
    //     setError(true);
    //     setDisableBtn(true);
    //     return;
    //   }

    //   const listInfo = {
    //     name: listName,
    //   };

    //   let newList = await dispatch(createWatchlists(listInfo));
    //   setListName("");
    //   setShowForm(false);
    // };

    const cancelFormHandler = (e) => {
      e.preventDefault();
      setShowForm(false);
      setListName("");
    };

    const onChangeFormHandler = (e) => {
      setListName(e.target.value.toString());
    };

    // Update List Handlers -----------------------------------------------------------------------------------
    const checkedHandler = (id) => {
      return updateObj[id];
    };

    const boxOnChangeHandler = (e) => {
      updateObj[e.target.name] = !updateObj[e.target.name];
        setUpdateObj({ ...updateObj });
        console.log("updateObj", updateObj)
    };

    const saveChanges = async (e) => {
      e.preventDefault();

      let addArray = [];
      let deleteArray = [];

      for (let listId in updateObj) {
        let updateInfo = {};
        if (defaultObj[listId] !== updateObj[listId]) {
          updateInfo.watchlistId = listId;
          updateInfo.ticker = ticker;

          if (updateObj[listId]) {
            addArray.push(updateInfo);
          } else {
            deleteArray.push(updateInfo);
          }
        }
      }

      let added = await dispatch(addStockToList(addArray));
    //   let deleted = await dispatch(removeStockFromList(deleteArray));

      closeModal();
    };

  // Watchlist list display --------------------------------------------------------------------------------
  let watchlistDisplay;
  if (lists.length) {
    watchlistDisplay = (
      <>
        {lists.map((list) => (
          <div key={list.id} className="watch-modal-card-div">
            <div className="watch-modal-checkbox-div">
              <input
                type="checkbox"
                name={`${list.id}`}
                id={`${list.id}`}
                onChange={boxOnChangeHandler}
                className="watch-modal-checkbox"
                checked={checkedHandler(list.id)}
              />
            </div>
            <label htmlFor={`${list.id}`} className="watch-modal-label">

              <div className="watch-modal-box-label-div">
                <div className="watch-modal-box-label-name bold">
                  {list.name}
                </div>
                <div className="watch-modal-box-label-items">
                  {list.stocks.length} item(s)
                </div>
              </div>
            </label>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="watch-add-stock-container">
      <h2 className="watch-add-stock-header">
        {`Add ${ticker} to Your Lists`}
        <i className="fas fa-times" onClick={() => closeModal()} />
      </h2>
      <div className="watchlist-modal-display-div">{watchlistDisplay}</div>
      <div>
        <button
          className={
            !disableSaveChanges
              ? "watchlist-save-changes bold"
              : "watchlist-save-changes disable bold"
          }
          onClick={saveChanges}
          disabled={disableSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AddToWatchlistModal;
