import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./RenameWatchlistModal.css";
import { useModal } from "../../../context/Modal";
import { editWatchlist } from "../../../store/watchlists";



function RenameWatchlistModal({list}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let listName = list.name
  const [name, setName] = useState(list.name);
  const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const newList = {
        id: list.id,
        name: name,
    };

    await dispatch(editWatchlist(newList));
    closeModal();
    };

    useEffect(() => {
      const errors = [];
      if (name.length < 1)
        errors.push("List name cannot be empty");
      if (name.length > 25)
        errors.push("List name cannot be longer than 25 characters");
      setErrors(errors);
    }, [name]);

  return (
    <div className="rename-modal-container">
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
        <div className="errors">
          {errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
        <button
          className="create-button"
          onClick={handleSubmit}
          disabled={errors.length ? true : false}
        >
          Edit List
        </button>
      </form>
    </div>
  );
}

export default RenameWatchlistModal;
