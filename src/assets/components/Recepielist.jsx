import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Link } from "react-router-dom";


const Recepielist = () => {
  const [country, setCountry] = useState("indian");
  const [recipes, setRecipes] = useState(null);
  const [category, setCategory] = useState("");

  const getCountries = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
    );
    const data = await response.json();
    setRecipes(data.meals); 
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    let data = await response.json();
    setRecipes(data.meals);
    setCategory('');
  };

  useEffect(() => {
    getCountries();
  }, [country]);

  return (
    <div className="w-full max-w-none min-h-screen flex flex-col gap-5">
      <div className="w-full flex flex-col gap-3 md:flex-row md:gap-8 items-center border-b-4">
        <form
          className="w-full flex gap-2 justify-center items-center md:w-2/5 text-center pt-4 md:pt-0"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Type Category Here .."
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="input input-bordered w-full max-w-xs italic placeholder:italic"
          />
          <button type="submit" className="btn btn-outline btn-info">
            <FaSearch className="text-xl" />
          </button>
        </form>
        <div className="w-full md:w-3/5 flex justify-center gap-4 py-3 flex-wrap">
          <button
            className="btn btn-outline btn-error text-lg"
            onClick={() => setCountry("indian")}
          >
            Indian
          </button>
          <button
            className="btn btn-outline btn-success text-lg"
            onClick={() => setCountry("chinese")}
          >
            Chinese
          </button>
          <button
            className="btn btn-outline btn-warning text-lg"
            onClick={() => setCountry("italian")}
          >
            Italian
          </button>
          <button
            className="btn btn-outline btn-info text-lg"
            onClick={() => setCountry("British")}
          >
            British
          </button>
          <button
            className="btn btn-outline btn-secondary text-lg"
            onClick={() => setCountry("Canadian")}
          >
            Canadian
          </button>
        </div>
      </div>
      <div
        className={
          recipes
            ? "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-2"
            : "w-full h-52 flex justify-center text-center items-center"
        }
      >
        {recipes ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="h-96 border w-72 overflow-hidden rounded-3xl mx-auto">
              <Link to={`/recipe/${recipe.idMeal}`} className='flex flex-col item-center'>
              
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="h-4/5 w-full overflow-hidden border border-white" />
             <div className="h-1/5 w-full text-center flex flex-col justify-evenly text-black italic">
                 <h2 className="text-3xl">{recipe.strMeal}</h2>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <div>
            Sorry, No Result Found <br />
            <br />
            Try another category
          </div>
        )}
      </div>
    </div>
  );
};

export default Recepielist;
