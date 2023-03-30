import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./WatchlistModal.css";
import { useModal } from "../../../context/Modal";
import { editWatchlist } from "../../../store/watchlists";



function RenameWatchlistModal({list}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let listName = list.name
    const [name, setName] = useState(list.name);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const newList = {
        id: list.id,
        name: name,
    };

    await dispatch(editWatchlist(newList));
    closeModal();
    };

  return (
    <form className="list-form">
      <h2>Edit List Name</h2>
      <div className="list-text-div">
        <input
          className="list-input-text"
          placeholder="List Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>

      <button
        className="submit-form-btn"
        onClick={handleSubmit}
        // disabled={errors.length ? true : false}
      >
        Create List
      </button>
    </form>
  );
}

export default RenameWatchlistModal;
