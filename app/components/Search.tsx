"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

const Search: React.FC = () => {
  const [apiMeals, setApiMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchItem, setSearchItem] = useState('');
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [selectedItem, setSelectedItem] = useState<Meal | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const apiEndpoints = [
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=American',
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=British',
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian',
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian',
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=French',
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese',
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=Thai',
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all(apiEndpoints.map(endpoint => fetch(endpoint)))
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(dataArray => {
        const combinedMeals = dataArray.flatMap(data => data.meals || []);
        setApiMeals(combinedMeals);
        setFilteredMeals(combinedMeals.slice(0, 10));
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filtered = apiMeals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const limitedResults = filtered.slice(0, 10);
    setFilteredMeals(limitedResults);
    setDropdownVisible(!!searchTerm && limitedResults.length > 0);
    if (limitedResults.length === 0) setSelectedItem(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedItem) {
        router.push(`/${selectedItem.idMeal}`);
      } else if (filteredMeals.length > 0) {
        router.push(`/${filteredMeals[0].idMeal}`);
      }
    }
  };

  const handleDropdownItemClick = (meal: Meal) => {
    console.log('Redirecting to recipe ID:', meal.idMeal);

    setSearchItem(meal.strMeal);
    setDropdownVisible(false);
    setSelectedItem(meal);
    router.push(`/recipe/${meal.idMeal}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-wrapper')) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-[250px] max-w-md dropdown-wrapper bg-white">
      <form className="relative w-full">
        <input
          className="w-full text-black py-2 px-4 rounded shadow"
          type="search"
          value={searchItem}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="What are you looking for?"
        />
      </form>

      {dropdownVisible && (
        <div className="absolute z-10 w-full bg-white shadow rounded mt-1 max-h-60 overflow-y-auto">
          <ul className="divide-y divide-gray-200 text-black">
            {loading ? (
              <li className="p-3 text-gray-500">Loading...</li>
            ) : error ? (
              <li className="p-3 text-red-500">Error loading meals</li>
            ) : filteredMeals.length === 0 ? (
              <li className="p-3 text-gray-500">Can't find this food</li>
            ) : (
              filteredMeals.map((meal) => (
                <li
                  key={meal.idMeal}
                  onClick={() => handleDropdownItemClick(meal)}
                  className="cursor-pointer hover:bg-gray-300 p-3 transition"
                >
                  {meal.strMeal}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
