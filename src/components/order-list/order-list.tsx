import { FC, useMemo } from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import Order from "../order/order";
import styles from "./order-list.module.css";

const OrderList: FC = () => {
  const { orders } = useAppSelector((store) => store.websocket);
  const feed = useMemo(
    () =>
      orders?.map((item) => (
        <li key={item._id}>
          <Order order={item} />
        </li>
      )),
    [orders]
  );

  return (
    <ul className={styles.orders}>
      {feed && feed.length === 0 ? (
        <li className={`text text_type_main-large`}>
          <h1 className={`text text_type_main-large ${styles.subtitle}`}>
            Заказы отсутствуют
          </h1>
        </li>
      ) : (
        <>{feed}</>
      )}
    </ul>
  );
};

export default OrderList;
