"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import './globals.css';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
  strSource: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInitialRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const randomMeals: Recipe[] = [];
      const mealIds = new Set<string>();

      while (randomMeals.length < 12) {
        const res = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        if (res.data?.meals?.[0]) {
          const meal = res.data.meals[0];

          if (!mealIds.has(meal.idMeal)) {
            mealIds.add(meal.idMeal);
            randomMeals.push(meal);
          }
        }
      }
      setRecipes(randomMeals);
    } catch (err) {
      console.error("Error fetching initial recipes:", err);
      setError("Failed to load initial recipes. Please try again later.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialRecipes();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchInitialRecipes();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      if (res.data?.meals) {
        setRecipes(res.data.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error("Error searching recipes:", err);
      setError("Failed to search recipes. Please try again later.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#ECF4D6] p-6 md:p-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-black">
            🍽️ Recipe Finder
          </h1>

          {error && (
            <div className="flex justify-center items-center h-64">
              <p className="text-2xl text-red-500">{error}</p>
            </div>
          )}

          {loading && !error ? (
            <div className="flex justify-center items-center h-64 text-black">
              <p className="text-2xl animate-pulse">Loading recipes...</p>
            </div>
          ) : recipes.length === 0 && !error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-2xl">No recipes found. Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {recipes.map((recipe) => (
                <Link
                  href="#"
                  key={recipe.idMeal}
                  className="hover:scale-105 transition-transform duration-300"
                  onClick={() => openModal(recipe)} // Open modal when clicked
                >
                  <div className="card bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden">
                    <figure className="relative h-52">
                      <Image
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </figure>
                    <div className="p-4">
                      <h2 className="text-lg font-bold text-gray-900">{recipe.strMeal}</h2>
                      <p className="text-sm text-gray-600">
                        Category: <span className="font-medium text-gray-800">{recipe.strCategory}</span>
                      </p>

                      <div className="flex justify-end mt-3">
                        <button className="px-4 py-2 text-gray-800 font-semibold bg-[#9AD0C2] hover:bg-[#2D9596] rounded-lg transition duration-300 shadow-md">
                          View Recipe
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for recipe details */}
      <Modal
        isOpen={isModalOpen}
        recipe={selectedRecipe}
        onClose={closeModal}
      />
    </>
  );
}
