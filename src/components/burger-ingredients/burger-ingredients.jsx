import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import { useState, useContext } from 'react';
import PropTypes from "prop-types";
import { IngredientsContext } from '../../context/ingredientsContext';

import IngredientItem from '../ingredient-item/ingredient-item';

const BurgerIngredients = ({  openModal }) => {
  const { ingredients } = useContext(IngredientsContext);

  const [currentTab, setCurrentTab] = useState('Булки');

  function changeActiveTab(string) {
    setCurrentTab(string);
  }

  const [tabList] = useState([
    {
      value: 'Булки',
      click: () => changeActiveTab('Булки')
    },
    {
      value: 'Соусы',
      click: () => changeActiveTab('Соусы')
    },
    {
      value: 'Начинки',
      click: () => changeActiveTab('Начинки')
    }
  ]);

  return (
    <section>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <ul className={styles.tabs}>
        {
          tabList.map(tab => (
            <li key={tab.value}>
              <Tab
                value={tab.value}
                active={currentTab === tab.value}
                onClick={tab.click}
              >
                {tab.value}
              </Tab>
            </li>
          ))
        }
      </ul>
      <div className={styles.list}>
        {
          ingredients.map((component, index)  => (
            <ul key={index}>
              <h2 className="text text_type_main-medium">{component.name}</h2>

              <li className={`${styles.sublist} pl-4 pr-4`}>
                {
                 component.items.map(item => (
                    <IngredientItem ingredient={item} key={item._id} openModal={openModal}/>
                  ))
                }
              </li>
            
            </ul>
           ))
        } 
    </div>    
    </section> 
  )
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;