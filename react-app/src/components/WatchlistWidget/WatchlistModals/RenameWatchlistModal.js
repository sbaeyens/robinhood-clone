import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./WatchlistModal.css";
import { useModal } from "../../../context/Modal";


function RenameWatchlistModal({list}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  return (
    <div >
        MODAL OPEN
    </div>
  );
}

export default RenameWatchlistModal;
