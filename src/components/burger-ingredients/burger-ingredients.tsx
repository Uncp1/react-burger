import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { FC, useCallback, useRef, useState } from "react";
import { InView } from "react-intersection-observer";

import IngredientItem from "../ingredient-item/ingredient-item";
import IngredientsType from "../ingredient-type/ingredients-type";
import { useAppSelector } from "../../services/hooks/hooks";

const BurgerIngredients: FC = () => {
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const buns = ingredients.filter((item) => item.type === "bun");
  const sauces = ingredients.filter((item) => item.type === "sauce");
  const main = ingredients.filter((item) => item.type === "main");

  const bunList = buns.map((item) => (
    <IngredientItem key={item._id} ingredient={item} />
  ));
  const sauceList = sauces.map((item) => (
    <IngredientItem key={item._id} ingredient={item} />
  ));
  const mainList = main.map((item) => (
    <IngredientItem key={item._id} ingredient={item} />
  ));

  const [currentTab, setCurrentTab] = useState("bun");

  const [tabList] = useState([
    {
      name: "Булки",
      type: "bun",
    },
    {
      name: "Соусы",
      type: "sauce",
    },
    {
      name: "Начинки",
      type: "main",
    },
  ]);

  const tabsRef = useRef<Map<string, number> | null>(null);
  const getRefs = () =>
    !tabsRef.current ? (tabsRef.current = new Map()) : tabsRef.current;

  const scrollToId = useCallback((itemKey: number) => {
    const refs = getRefs().get(itemKey);
    refs.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleTabClick = useCallback(
    (type: string, index: number) => {
      setCurrentTab(type);
      scrollToId(index);
    },
    [scrollToId]
  );

  return (
    <section>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <ul className={styles.tabs}>
        {tabList.map((tab, index) => (
          <li key={tab.type}>
            <Tab
              value={tab.type}
              active={currentTab === tab.type}
              onClick={(currentTab) => handleTabClick(currentTab, index)}
            >
              {tab.name}
            </Tab>
          </li>
        ))}
      </ul>

      <ul className={styles.list}>
        {tabList.map((tab, index) => (
          <InView
            as="li"
            key={index}
            data-type={tab.type}
            onChange={(inView, entry) => {
              const refs = getRefs();
              refs.set(index, entry.target);
              const target = entry.target as HTMLElement;
              const datasetType = target.dataset.type;
              if (inView && datasetType) {
                setCurrentTab(datasetType);
              }
            }}
            // threshold={0.3} поведение непредсказуемое
          >
            <IngredientsType type={tab.type} name={tab.name}>
              {tab.type === "bun"
                ? bunList
                : tab.type === "sauce"
                ? sauceList
                : mainList}
            </IngredientsType>
          </InView>
        ))}
      </ul>
    </section>
  );
};

export default BurgerIngredients;
