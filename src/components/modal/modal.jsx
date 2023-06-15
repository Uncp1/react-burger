import PropTypes from "prop-types";
import styles from "./modal.module.css";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect, useCallback } from "react";
import IngredientInfo from "../ingredient-info/ingredient-info.jsx";
import OrderInfo from "../order-info/order-info.jsx";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/slices/modal-slice";

const Modal = ({ title }) => {
  const { ingredientData, orderData, notificationData, isModalOpen } =
    useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const handleEscape = useCallback(
    (e) => {
      console.log(e);
      e.preventDefault();
      e.key === "Escape" && dispatch(closeModal());
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isModalOpen) return;
    console.log(isModalOpen);
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleEscape, isModalOpen]);

  return createPortal(
    <>
      {!!notificationData ? (
        <></>
      ) : (
        <>
          <ModalOverlay />

          <div
            className={clsx(styles.modal, {
              [styles.modal_opened]: isModalOpen,
            })}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal__header}>
              <h3
                className={clsx(
                  styles.modal__title,
                  "text text_type_main-large"
                )}
              >
                {title}
              </h3>

              <button
                className={styles.modal__close}
                type="button"
                aria-label="Закрыть модальное окно"
                onClick={() => dispatch(closeModal())}
              >
                <CloseIcon type="primary" />
              </button>
            </div>

            {!!ingredientData && <IngredientInfo ingredient={ingredientData} />}

            {!!orderData && <OrderInfo />}
          </div>
        </>
      )}
    </>,
    document.body
  );
};

Modal.propTypes = {
  title: PropTypes.string,
};

export default Modal;
