import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./CreateListModal.css";
import { createList } from "../../store/watchlists";


const CreateListModal = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  // const [emptyError, setEmptyError] = useState([])

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 1) {
      let newErrors = ["List name cannot be empty"]
      setErrors(newErrors)
      return
    }

    const newList = {
      name: name,
    };

    await dispatch(createList(newList));
    closeModal();
  };



  useEffect(() => {
    const errors = [];
    if (name.length > 20) errors.push("List name cannot be longer than 20 characters");
    setErrors(errors);
  }, [name]);

  return (
    <form className="create-modal-container">
      <h2>Create a List</h2>
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
        Create List
      </button>
    </form>
  );
};

export default CreateListModal;
