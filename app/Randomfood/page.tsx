'use client';

import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import Border from '@/components/Border';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';

interface RandomDB {
    meals: Random[];
}

interface Random {
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

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const fetchData = async (): Promise<RandomDB> => {
    const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
    return data;
};

const Randomfood: React.FC<{ data: RandomDB }> = ({ data }) => {
    return (
        <>
            <section>
                <Navbar />
            </section>
            <div className='text-black min-h-screen w-full bg-[#fbffee] flex-auto flex-col px-12 py-4'>
                {data.meals?.map((Random) => (
                    <div key={Random.idMeal}>
                        <div className='grid md:grid-cols-2'>
                            <Image
                                className='flex w-full h-full rounded-xl object-cover object-center relative'
                                src={Random.strMealThumb}
                                alt=""
                                width={1000} height={1000}
                            />
                            <Border>
                                <div className='px-4 py-2'>
                                    <p className='text-4xl font-bold'>Name Food: </p>
                                    <p className='text-3xl'>{Random.strMeal}</p><br />
                                    <p className='text-2xl font-bold'>Category: </p>
                                    <p className='text-xl'>{Random.strCategory}</p><br />
                                    <p className='text-2xl font-bold'>Youtube: </p>
                                    <ReactPlayer
                                        url={Random.strYoutube}
                                        controls
                                    /><br />
                                    <p className='text-2xl font-bold py-2'>Ingrediant: </p>
                                    <div className='px-2 text-lg flex flex-col w-full lg:flex-row'>
                                        <div className="py-2 grid flex-grow h-auto card bg-white rounded-box place-items-center">
                                            <p>{Random.strIngredient1} {Random.strMeasure1}</p>
                                            <p>{Random.strIngredient2} {Random.strMeasure2}</p>
                                            <p>{Random.strIngredient3} {Random.strMeasure3}</p>
                                            <p>{Random.strIngredient4} {Random.strMeasure4}</p>
                                            <p>{Random.strIngredient5} {Random.strMeasure5}</p>
                                            <p>{Random.strIngredient6} {Random.strMeasure6}</p>
                                            <p>{Random.strIngredient7} {Random.strMeasure7}</p>
                                            <p>{Random.strIngredient8} {Random.strMeasure8}</p>
                                            <p>{Random.strIngredient9} {Random.strMeasure9}</p>
                                            <p>{Random.strIngredient10} {Random.strMeasure10}</p>
                                            <p>{Random.strIngredient11} {Random.strMeasure11}</p>
                                            <p>{Random.strIngredient12} {Random.strMeasure12}</p>
                                            <p>{Random.strIngredient13} {Random.strMeasure13}</p>
                                            <p>{Random.strIngredient14} {Random.strMeasure14}</p>
                                            <p>{Random.strIngredient15} {Random.strMeasure15}</p>
                                            <p>{Random.strIngredient16} {Random.strMeasure16}</p>
                                            <p>{Random.strIngredient17} {Random.strMeasure17}</p>
                                            <p>{Random.strIngredient18} {Random.strMeasure18}</p>
                                            <p>{Random.strIngredient19} {Random.strMeasure19}</p>
                                            <p>{Random.strIngredient20} {Random.strMeasure20}</p>
                                        </div>
                                    </div>
                                    <p className='text-2xl font-bold'>How to: </p>
                                    <p className='text-xl'>{Random.strInstructions}</p><br />
                                </div>
                            </Border>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

const RandomFoodPage = async () => {
    const data = await fetchData();
    return <Randomfood data={data} />;
};

export default RandomFoodPage;
