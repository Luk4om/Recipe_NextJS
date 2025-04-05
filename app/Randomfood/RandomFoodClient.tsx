'use client';

import React from 'react';
import Image from 'next/image';
import Border from '@/components/Border';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface Random {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strInstructions: string;
    strYoutube: string;
    [key: string]: any;
}

interface RandomDB {
    meals: Random[];
}

const Randomfood: React.FC<{ data: RandomDB }> = ({ data }) => {
    const meal = data.meals[0];

    const ingredients = Array.from({ length: 20 }, (_, i) => {
        const ingredient = meal[`strIngredient${i + 1}`];
        const measure = meal[`strMeasure${i + 1}`];
        return ingredient && ingredient.trim()
            ? `${ingredient} ${measure}`.trim()
            : null;
    }).filter(Boolean);

    return (
        <>
            <Navbar />
            <div className='min-h-screen w-full bg-gradient-to-br from-[#fbffee] to-[#e0f7e9] px-6 py-8'>
                <div className='max-w-6xl mx-auto'>
                    <h1 className='text-5xl font-bold text-center text-[#5F6F52] mb-10'>
                        🍽️ {meal.strMeal}
                    </h1>
                    <div className='grid md:grid-cols-2 gap-8'>
                        <div className='rounded-2xl overflow-hidden shadow-lg'>
                            <Image
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                width={1000}
                                height={1000}
                                className='object-cover w-full h-full'
                            />
                        </div>

                        <Border>
                            <div className='p-6 space-y-6'>
                                <p className='text-xl font-semibold text-[#5F6F52]'>
                                    📂 Category: <span className='font-normal text-black'>{meal.strCategory}</span>
                                </p>

                                <div>
                                    <p className='text-2xl font-semibold text-[#5F6F52] mb-2'>▶️ Watch on YouTube</p>
                                    <div className='aspect-w-16 aspect-h-9'>
                                        <ReactPlayer url={meal.strYoutube} controls width="100%" height="100%" />
                                    </div>
                                </div>

                                <div>
                                    <p className='text-2xl font-semibold text-[#5F6F52] mb-2'>🥕 Ingredients</p>
                                    <ul className='grid grid-cols-2 gap-2 text-lg text-black bg-white p-4 rounded-xl shadow-md'>
                                        {ingredients.map((item, index) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className='text-2xl font-semibold text-[#5F6F52] mb-2'>📝 Instructions</p>
                                    <p className='text-base text-gray-800 whitespace-pre-line leading-relaxed'>
                                        {meal.strInstructions}
                                    </p>
                                </div>
                            </div>
                        </Border>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Randomfood;
