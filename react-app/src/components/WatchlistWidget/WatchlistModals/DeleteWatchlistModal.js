import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./DeleteWatchlistModal.css";
import { deleteList } from "../../../store/watchlists";



function DeleteWatchlistModal({ list }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const userId = list?.user_id;
//   const currentReview = reviews.find((review) => review?.user_id === userId);

    const confirm = (e) => {
        e.preventDefault();
        dispatch(deleteList(list?.id));
        // dispatch(fetchSingleProduct(productId));
        closeModal();
    };

    return (
      <div className="delete-product_and_review-container">
        <h2>Confirm Delete</h2>
        <p className="delete-question">
          Are you sure you want to delete this list?
        </p>
        <button onClick={confirm} className="delete-product_and_review-button">
          Yes (Delete List)
        </button>
        <button onClick={closeModal} className="keep-product_and_review-button">
          No (Keep List)
        </button>
      </div>
    );
}

export default DeleteWatchlistModal;
