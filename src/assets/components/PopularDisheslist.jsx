import React from 'react'
import  { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';

export const PopularDisheslist = () => {
    const { id } = useParams();
  const [recipeItems, setRecipeItems] = useState("");

  const fetchDetails = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    setRecipeItems(data.meals[0]);
  
    
  };

  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, []); 
  return (
    <div className="flex justify-center flex-col items-center">
    <img className="mt-5 rounded-2xl border border-black" src={recipeItems.strMealThumb} width="200" alt={recipeItems.strMeal} />
    <h2 className="font-semibold text-xl">{recipeItems.strMeal}</h2>

    <h2 className="mt-4 font-bold text-2xl rounded-2xl">INGREDIENTS:-</h2>
    <ul className='border-2 border-black rounded-2xl'>
      {/* Use a for loop to iterate over the ingredients */}
      {(() => {
        const ingredients = [];
        for (let index = 1; index <= 20; index++) {
          const ingredient = recipeItems[`strIngredient${index}`];
          const measure = recipeItems[`strMeasure${index}`];
          if (ingredient) {
            ingredients.push(
              <li key={index}>
                {ingredient} {measure}
              </li>
            );
          }
        }
        return ingredients;
      })()}
    </ul>

    <h2 className="text-2xl mt-4 font-bold border-4 rounded-2xl">INSTRUCTIONS:-</h2>
    <h4 className="border-2 text-center border-black rounded-2xl">{recipeItems.strInstructions}</h4>
  </div>
  );
};
export default PopularDisheslist;