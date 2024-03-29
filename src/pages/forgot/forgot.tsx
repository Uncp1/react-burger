import styles from "./forgot.module.css";
import { fetchForgotPassword } from "../../services/slices/password-slice";
import { FC, FormEvent, useCallback, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../services/hooks/hooks";
import { useForm } from "../../services/hooks/useForm";

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const { inputValues, handleChange, isValid, resetForm } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(
        fetchForgotPassword({
          email: inputValues.email,
        })
      );
      navigate("/reset");
    },
    [inputValues.email, dispatch, navigate]
  );

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-large">Восстановление пароля</h1>
        <EmailInput
          value={inputValues.email || ""}
          placeholder={"E-mail"}
          name={"email"}
          onChange={handleChange}
          required
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid}
        >
          Восстановить
        </Button>
      </form>

      <div className={`text text_type_main-small ${styles.container}`}>
        <p className={styles.item}>
          Вспомнили пароль?
          <NavLink to="/login" className={styles.link}>
            Войти
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
