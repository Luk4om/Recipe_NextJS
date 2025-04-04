"use client";

import { useParams } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Border from '@/components/Border';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import Link from 'next/link';

interface Meal {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
}

interface MealResponse {
  meals: Meal[];
}

export default function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMeal = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<MealResponse>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (res.data?.meals && res.data.meals.length > 0) {
          setMeal(res.data.meals[0]);
        } else {
          setMeal(null);
          setError('Recipe not found.');
        }
      } catch (err) {
        setMeal(null);
        setError('Failed to load recipe. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error || !meal) {
    return (
      <div className="text-center mt-8">
        <p className="text-xl text-red-600">{error}</p>
        <Link href="/" className="mt-4 text-blue-600 underline">Back to Home</Link>
      </div>
    );
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}` as keyof Meal];
    const measure = meal[`strMeasure${i + 1}` as keyof Meal];
    return ingredient && ingredient.trim() && measure && measure.trim()
      ? { ingredient, measure }
      : null;
  }).filter(Boolean) as { ingredient: string; measure: string }[];

  const isValidYoutubeLink = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/.+$/;
    return youtubeRegex.test(url);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-[#F7F8F3] to-[#ECF4D6] px-4 md:px-12 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative w-full h-96">
            <Image
              className="rounded-xl object-cover shadow-lg"
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              priority
            />
          </div>
          <Border>
            <div className="px-6 py-4 bg-white rounded-lg shadow-xl">
              <h1 className="text-4xl font-bold text-gray-800">Recipe: {meal.strMeal}</h1>
              <p className="text-xl text-gray-600">{meal.strCategory}</p>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-700">Instructions:</h2>
                <p className="text-lg text-gray-800 mt-2">{meal.strInstructions}</p>
              </div>

              {meal.strYoutube && isValidYoutubeLink(meal.strYoutube) && (
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold text-gray-700">Watch it on YouTube:</h2>
                  <div className="relative w-full pt-[56.25%]">
                    <ReactPlayer
                      url={meal.strYoutube}
                      controls
                      width="100%"
                      height="100%"
                      className="absolute top-0 left-0"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-700">Ingredients:</h2>
                <ul className="mt-4 space-y-2">
                  {ingredients.map((item, index) => (
                    <li key={index} className="text-lg text-gray-800">{item.ingredient} - {item.measure}</li>
                  ))}
                </ul>
              </div>

              {meal.strSource && (
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold text-gray-700">Source:</h2>
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {meal.strSource}
                  </a>
                </div>
              )}
            </div>
          </Border>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="btn bg-[#9AD0C2] text-black hover:bg-[#2D9596] py-3 px-6 rounded-lg shadow-lg"
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    </>
  );
}
