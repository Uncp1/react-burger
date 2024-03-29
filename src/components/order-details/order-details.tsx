import styles from "./order-details.module.css";
import { FC, useMemo } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { TIngredientType, TOrderType } from "../../utils/types";
import { useAppSelector } from "../../services/hooks/hooks";
import { excludeUndefinedResult } from "../../utils/excludeUndefinedResult";

const OrderDetails: FC<{ order: TOrderType }> = ({ order }) => {
  const date = new Date(order.createdAt);
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const ingredientsArray = useMemo(
    () =>
      order.ingredients.map((item) => {
        return excludeUndefinedResult(
          ingredients.find((i) => i._id === item),
          "Ingredient not found."
        );
      }),
    [ingredients, order.ingredients]
  );
  const sortIngredints = useMemo(
    () =>
      ingredientsArray.reduce((acc: TIngredientType[], item) => {
        if (acc.find((i) => i._id === item._id)) {
          return acc.map((value) =>
            value._id === item._id
              ? {
                  ...value,
                  quantity:
                    typeof value.quantity === "number" ? value.quantity + 1 : 0,
                }
              : value
          );
        }
        return [...acc, { ...item, quantity: 1 }];
      }, []),
    [ingredientsArray]
  );

  const checkTotalPrice = useMemo(
    () => ingredientsArray.reduce((prev, current) => prev + current.price, 0),
    [ingredientsArray]
  );

  const ingredientList = sortIngredints.map((item, index) => (
    <li key={index}>
      <div className={styles.ingredients_item}>
        <img
          className={styles.ingredients_image}
          src={item.image}
          alt={`Ингредиент ${item.name}`}
        />

        <h5
          className={`text text_type_main-default ${styles.ingredients_title}`}
        >
          {item.name}
        </h5>
        <div className={styles.ingredients_price}>
          <p className={"text text_type_digits-default"}>
            {item.quantity}&#160;x&#160;{item.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  ));

  return (
    <div className={styles.container}>
      <h2 className={clsx(styles.numbers, "text", "text_type_digits-default")}>
        #{order.number}
      </h2>
      <div className={styles.content}>
        <h3 className={clsx("text", "text_type_main-medium")}>{order.name}</h3>
        <p
          className={clsx(
            "text",
            "text_type_main-default",
            "mt-3",
            styles.status,
            { [styles.status_done]: order.status === "done" }
          )}
        >
          {order.status === "done" ? "Выполнен" : "Готовится"}
        </p>
        <h4 className={clsx("mt-15", "text", "text_type_main-medium")}>
          Состав:
        </h4>
        <ul className={clsx(styles.ingredients_list, "page__list", "mt-6")}>
          {ingredientList}
        </ul>
      </div>

      <div className={clsx(styles.footer)}>
        <FormattedDate
          date={date}
          className="text text_type_main-default text_color_inactive"
        />
        <span className={clsx(styles.price)}>
          <span className="text text_type_digits-default">
            {checkTotalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};

export default OrderDetails;
