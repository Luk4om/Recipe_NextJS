import axios from 'axios';
import React from 'react'
import Image from 'next/image';

export interface RandomDB {
    meals: Random[];
}

export interface Random {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strInstructions: string;
    strYoutube: string;
    strSource: string;
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
}

function CardRandom({ data }: { data: RandomDB }) {
    return (
        <>
            {data.meals?.map((meal) => (
                <div key={meal.idMeal}>
                    <div className='flex items-center justify-center min-h-screen from-[#F9F5F3] via-[#F9F5F3] to-[#F9F5F3] bg-gradient-to-br px-2'>
                        <div className='w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
                            <div className='max-w-md mx-auto'>
                                <div className='h-[236px]'>
                                    <Image
                                        className='cover flex w-full h-full rounded-xl relative'
                                        src={meal.strMealThumb}
                                        alt={meal.strMeal}
                                        width={1000} height={1000}
                                    />
                                </div>
                                <div className='p-4 sm:p-6'>
                                    <p className='font-bold text-gray-700 text-[22px] leading-7 mb-1'>{meal.strMeal}</p>
                                    <div className='flex flex-row'>
                                        <p className='text-[17px] font-bold text-[#0FB478]'>Category: {meal.strCategory}</p>
                                    </div>
                                    <div className='text-[#7C7C80] font-[15px] mt-6'>
                                        {Array.from({ length: 20 }, (_, index) => {
                                            const ingredientKey = `strIngredient${index + 1}` as keyof typeof meal;
                                            const measureKey = `strMeasure${index + 1}` as keyof typeof meal;
                                            const ingredient = meal[ingredientKey];
                                            const measure = meal[measureKey];
                                            if (ingredient && measure) {
                                                return (
                                                    <p key={index}>{ingredient} - {measure}</p>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export const getServerSideProps = async () => {
    const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
    return {
        props: {
            data,
        },
    };
}

export default CardRandom;
