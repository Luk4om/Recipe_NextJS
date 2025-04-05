"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ReactPlayer from "react-player";
import Navbar from "@/components/Navbar";
import Border from "@/components/Border";

interface Main {
    meals: Meal[];
}

interface Meal {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
    strCategory?: string;
    strYoutube?: string;
    strInstructions?: string;
    [key: string]: string | undefined;
}

const fallbackMeals: Meal[] = [
    {
        strMeal: "Banana Pancakes",
        strMealThumb: "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
        idMeal: "52855"
    },
    {
        strMeal: "BBQ Pork Sloppy Joes",
        strMealThumb: "https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg",
        idMeal: "52995"
    },
    {
        strMeal: "Beef Brisket Pot Roast",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg",
        idMeal: "52812"
    },
    {
        strMeal: "Big Mac",
        strMealThumb: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
        idMeal: "53013"
    },
    {
        strMeal: "Chick-Fil-A Sandwich",
        strMealThumb: "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
        idMeal: "53016"
    },
    {
        strMeal: "Chicken Fajita Mac and Cheese",
        strMealThumb: "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
        idMeal: "52818"
    },
    {
        strMeal: "Choc Chip Pecan Pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/rqvwxt1511384809.jpg",
        idMeal: "52856"
    },
    {
        strMeal: "Chocolate Raspberry Brownies",
        strMealThumb: "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
        idMeal: "52860"
    },
    {
        strMeal: "Clam chowder",
        strMealThumb: "https://www.themealdb.com/images/media/meals/rvtvuw1511190488.jpg",
        idMeal: "52840"
    },
    {
        strMeal: "French Onion Chicken with Roasted Carrots & Mashed Potatoes",
        strMealThumb: "https://www.themealdb.com/images/media/meals/b5ft861583188991.jpg",
        idMeal: "52996"
    },
    {
        strMeal: "Fruit and Cream Cheese Breakfast Pastries",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1543774956.jpg",
        idMeal: "52957"
    },
    {
        strMeal: "Grilled Mac and Cheese Sandwich",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg",
        idMeal: "52829"
    },
    {
        strMeal: "Honey Balsamic Chicken with Crispy Broccoli & Potatoes",
        strMealThumb: "https://www.themealdb.com/images/media/meals/kvbotn1581012881.jpg",
        idMeal: "52993"
    },
    {
        strMeal: "Hot Chocolate Fudge",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xrysxr1483568462.jpg",
        idMeal: "52787"
    },
    {
        strMeal: "Kentucky Fried Chicken",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg",
        idMeal: "52813"
    },
    {
        strMeal: "Key Lime Pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg",
        idMeal: "52859"
    },
    {
        strMeal: "Krispy Kreme Donut",
        strMealThumb: "https://www.themealdb.com/images/media/meals/4i5cnx1587672171.jpg",
        idMeal: "53015"
    },
    {
        strMeal: "Lasagna Sandwiches",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg",
        idMeal: "52987"
    },
    {
        strMeal: "New York cheesecake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/swttys1511385853.jpg",
        idMeal: "52858"
    },
    {
        strMeal: "Pancakes",
        strMealThumb: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
        idMeal: "52854"
    },
    {
        strMeal: "Peach & Blueberry Grunt",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ssxvup1511387476.jpg",
        idMeal: "52862"
    },
    {
        strMeal: "Peanut Butter Cheesecake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/qtuuys1511387068.jpg",
        idMeal: "52861"
    },
    {
        strMeal: "Peanut Butter Cookies",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1544384070.jpg",
        idMeal: "52958"
    },
    {
        strMeal: "Pumpkin Pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg",
        idMeal: "52857"
    },
    {
        strMeal: "Roasted Eggplant With Tahini, Pine Nuts, and Lentils",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ysqrus1487425681.jpg",
        idMeal: "52816"
    },
    {
        strMeal: "Rocky Road Fudge",
        strMealThumb: "https://www.themealdb.com/images/media/meals/vtxyxv1483567157.jpg",
        idMeal: "52786"
    },
    {
        strMeal: "Salmon Eggs Eggs Benedict",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1550440197.jpg",
        idMeal: "52962"
    },
    {
        strMeal: "Salted Caramel Cheescake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xqrwyr1511133646.jpg",
        idMeal: "52833"
    },
    {
        strMeal: "Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini",
        strMealThumb: "https://www.themealdb.com/images/media/meals/h3ijwo1581013377.jpg",
        idMeal: "52994"
    },
    {
        strMeal: "Soy-Glazed Meatloaves with Wasabi Mashed Potatoes & Roasted Carrots",
        strMealThumb: "https://www.themealdb.com/images/media/meals/o2wb6p1581005243.jpg",
        idMeal: "52992"
    },
    {
        strMeal: "Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt",
        strMealThumb: "https://www.themealdb.com/images/media/meals/yqwtvu1487426027.jpg",
        idMeal: "52817"
    },
    {
        strMeal: "Vegan Chocolate Cake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/qxutws1486978099.jpg",
        idMeal: "52794"
    },
    {
        strMeal: " Bubble & Squeak",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xusqvw1511638311.jpg",
        idMeal: "52885"
    },
    {
        strMeal: "Apple & Blackberry Crumble",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
        idMeal: "52893"
    },
    {
        strMeal: "Apple Frangipan Tart",
        strMealThumb: "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
        idMeal: "52768"
    },
    {
        strMeal: "Baked salmon with fennel & tomatoes",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
        idMeal: "52959"
    },
    {
        strMeal: "Bakewell tart",
        strMealThumb: "https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg",
        idMeal: "52767"
    },
    {
        strMeal: "Battenberg Cake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg",
        idMeal: "52894"
    },
    {
        strMeal: "Bean & Sausage Hotpot",
        strMealThumb: "https://www.themealdb.com/images/media/meals/vxuyrx1511302687.jpg",
        idMeal: "52848"
    },
    {
        strMeal: "Beef and Mustard Pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
        idMeal: "52874"
    },
    {
        strMeal: "Beef and Oyster pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg",
        idMeal: "52878"
    },
    {
        strMeal: "Beef Dumpling Stew",
        strMealThumb: "https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg",
        idMeal: "52873"
    },
    {
        strMeal: "Beef Sunday Roast",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg",
        idMeal: "52824"
    },
    {
        strMeal: "Beef Wellington",
        strMealThumb: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
        idMeal: "52803"
    },
    {
        strMeal: "Blackberry Fool",
        strMealThumb: "https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg",
        idMeal: "52891"
    },
    {
        strMeal: "Bread and Butter Pudding",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg",
        idMeal: "52792"
    },
    {
        strMeal: "Broccoli & Stilton soup",
        strMealThumb: "https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg",
        idMeal: "52842"
    },
    {
        strMeal: "Carrot Cake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg",
        idMeal: "52897"
    },
    {
        strMeal: "Chelsea Buns",
        strMealThumb: "https://www.themealdb.com/images/media/meals/vqpwrv1511723001.jpg",
        idMeal: "52898"
    },
    {
        strMeal: "Chicken & mushroom Hotpot",
        strMealThumb: "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg",
        idMeal: "52846"
    },
    {
        strMeal: "Chicken Ham and Leek Pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xrrtss1511555269.jpg",
        idMeal: "52875"
    },
    {
        strMeal: "Chocolate Avocado Mousse",
        strMealThumb: "https://www.themealdb.com/images/media/meals/uttuxy1511382180.jpg",
        idMeal: "52853"
    },
    {
        strMeal: "Chocolate Caramel Crispy",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1550442508.jpg",
        idMeal: "52966"
    },
    {
        strMeal: "Christmas cake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ldnrm91576791881.jpg",
        idMeal: "52990"
    },
    {
        strMeal: "Christmas Pudding Flapjack",
        strMealThumb: "https://www.themealdb.com/images/media/meals/vvusxs1483907034.jpg",
        idMeal: "52788"
    },
    {
        strMeal: "Christmas Pudding Trifle",
        strMealThumb: "https://www.themealdb.com/images/media/meals/r33cud1576791081.jpg",
        idMeal: "52989"
    },
    {
        strMeal: "Classic Christmas pudding",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1d85821576790598.jpg",
        idMeal: "52988"
    },
    {
        strMeal: "Creamy Tomato Soup",
        strMealThumb: "https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg",
        idMeal: "52841"
    },
    {
        strMeal: "Dundee cake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/wxyvqq1511723401.jpg",
        idMeal: "52899"
    },
    {
        strMeal: "Eccles Cakes",
        strMealThumb: "https://www.themealdb.com/images/media/meals/wtqrqw1511639627.jpg",
        idMeal: "52888"
    },
    {
        strMeal: "English Breakfast",
        strMealThumb: "https://www.themealdb.com/images/media/meals/utxryw1511721587.jpg",
        idMeal: "52895"
    },
    {
        strMeal: "Eton Mess",
        strMealThumb: "https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg",
        idMeal: "52791"
    },
    {
        strMeal: "Fish pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
        idMeal: "52802"
    },
    {
        strMeal: "Full English Breakfast",
        strMealThumb: "https://www.themealdb.com/images/media/meals/sqrtwu1511721265.jpg",
        idMeal: "52896"
    },
    {
        strMeal: "Jam Roly-Poly",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ysqupp1511640538.jpg",
        idMeal: "52890"
    },
    {
        strMeal: "Kedgeree",
        strMealThumb: "https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg",
        idMeal: "52887"
    },
    {
        strMeal: "Lamb and Potato pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/sxrpws1511555907.jpg",
        idMeal: "52877"
    },
    {
        strMeal: "Lancashire hotpot",
        strMealThumb: "https://www.themealdb.com/images/media/meals/uttrxw1511637813.jpg",
        idMeal: "52884"
    },
    {
        strMeal: "Madeira Cake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/urtqut1511723591.jpg",
        idMeal: "52900"
    },
    {
        strMeal: "McSinghs Scotch pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/vssrtx1511557680.jpg",
        idMeal: "52880"
    },
    {
        strMeal: "Mince Pies",
        strMealThumb: "https://www.themealdb.com/images/media/meals/qe8pf51576795532.jpg",
        idMeal: "52991"
    },
    {
        strMeal: "Minced Beef Pie",
        strMealThumb: "https://www.themealdb.com/images/media/meals/xwutvy1511555540.jpg",
        idMeal: "52876"
    },
    {
        strMeal: "Mushroom & Chestnut Rotolo",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ssyqwr1511451678.jpg",
        idMeal: "52864"
    },
    {
        strMeal: "Parkin Cake",
        strMealThumb: "https://www.themealdb.com/images/media/meals/qxuqtt1511724269.jpg",
        idMeal: "52902"
    },
    {
        strMeal: "Rock Cakes",
        strMealThumb: "https://www.themealdb.com/images/media/meals/tqrrsq1511723764.jpg",
        idMeal: "52901"
    },
];

export default function CountryPage({ params: paramsPromise }: { params: Promise<{ country: string }> }) {
    const params = React.use(paramsPromise);
    const [data, setData] = useState<Main | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.country}`;
            try {
                const response = await axios.get(url, { timeout: 10000 });
                if (response.data?.meals?.length === 0) {
                    setError(`No recipes found for ${params.country} cuisine.`);
                } else {
                    setData(response.data);
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.error("Axios Error:", err.message, err.code, err.config?.url);
                    setError(`Network Error: ${err.message}. Using fallback data.`);
                } else {
                    console.error("Unexpected Error:", err);
                    setError("An unexpected error occurred. Using fallback data.");
                }
                setData({ meals: fallbackMeals });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.country]);

    const fetchMealDetails = async (idMeal: string) => {
        setDetailsLoading(true);
        setSelectedMeal(null);
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
        try {
            const res = await axios.get(url, { timeout: 10000 });
            if (res.data?.meals?.[0]) {
                setSelectedMeal(res.data.meals[0]);
            } else {
                console.warn(`No details found for meal ID: ${idMeal}`);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios Error (Details):", err.message, err.code, err.config?.url);
            } else {
                console.error("Unexpected Error (Details):", err);
            }
        } finally {
            setDetailsLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedMeal(null);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#ECF4D6] flex justify-center items-center">
                    <p className="text-4xl font-bold text-[#5F6F52] animate-pulse">Loading...</p>
                </div>
            </>
        );
    }

    if (error && !data) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#ECF4D6] flex flex-col justify-center items-center gap-4">
                    <p className="text-5xl font-bold text-[#5F6F52]">Error</p>
                    <p className="text-xl text-[#2D9596]">{error}</p>
                </div>
            </>
        );
    }

    // Extract ingredients for selected meal
    const ingredients = selectedMeal
        ? Array.from({ length: 20 }, (_, i) => {
            const ingredient = selectedMeal[`strIngredient${i + 1}`];
            const measure = selectedMeal[`strMeasure${i + 1}`];
            return ingredient && ingredient.trim() ? `${measure ? measure + " " : ""}${ingredient}` : null;
        }).filter(Boolean)
        : [];

    // Split instructions for selected meal
    const howto = selectedMeal?.strInstructions?.split("\r\n").filter((step) => step.trim() !== "") || [];

    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full bg-[#ECF4D6] px-6 sm:px-10 py-8">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-10">
                    <h1 className="text-5xl font-extrabold text-black capitalize tracking-tight">
                        {params.country} Cuisine
                    </h1>
                    <p className="text-lg font-bold text-[#5F6F52] mt-2">
                        Explore delicious recipes from {params.country}!
                    </p>
                </div>

                {/* Recipe Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {(data?.meals || fallbackMeals).map((item) => (
                        <div
                            key={item.idMeal}
                            onClick={() => fetchMealDetails(item.idMeal)}
                            className="group card bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                            <div className="relative w-full h-52 overflow-hidden rounded-t-xl">
                                <Image
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    src={item.strMealThumb}
                                    alt={item.strMeal}
                                    fill
                                    priority
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-black truncate group-hover:text-[#5F6F52] transition-colors">
                                    {item.strMeal}
                                </h2>
                                <div className="flex justify-end mt-3">
                                    <button
                                        onClick={() => fetchMealDetails(item.idMeal)}
                                        className="px-4 py-2 text-gray-800 font-semibold bg-[#9AD0C2] hover:bg-[#2D9596] rounded-lg transition duration-300 shadow-md mt-1"
                                    >
                                        View Recipe
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Popup Modal with Transparent Background */}
                {selectedMeal && (
                    <div
                        className="fixed inset-0 bg-transparent flex justify-center items-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-[#5F6F52]">{selectedMeal.strMeal}</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-[#5F6F52] hover:text-[#2D9596] focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            {detailsLoading ? (
                                <div className="p-6 text-center">
                                    <p className="text-3xl font-bold text-[#5F6F52] animate-pulse">Loading details...</p>
                                </div>
                            ) : (
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Image Section */}
                                    <div className="relative w-full h-72 rounded-xl overflow-hidden">
                                        <Image
                                            className="object-cover"
                                            src={selectedMeal.strMealThumb}
                                            alt={selectedMeal.strMeal}
                                            fill
                                            priority
                                        />
                                    </div>

                                    {/* Details Section */}
                                    <div className="text-[#5F6F52]">
                                        <p className="text-xl font-bold text-gray-800">Category:</p>
                                        <p className="text-lg mt-1 text-gray-800">{selectedMeal.strCategory || "N/A"}</p>
                                        <div className="mt-4">
                                            <p className="text-xl font-bold text-gray-800">YouTube:</p>
                                            {selectedMeal.strYoutube ? (
                                                <ReactPlayer
                                                    url={selectedMeal.strYoutube}
                                                    controls
                                                    width="100%"
                                                    height="auto"
                                                    className="mt-2 rounded-lg"
                                                />
                                            ) : (
                                                <p className="text-md text-gray-500 mt-1">No YouTube link available</p>
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xl font-bold text-gray-800">Ingredients:</p>
                                            <div className="mt-2 grid grid-cols-1 gap-2 bg-gray-100 rounded-lg p-3">
                                                {ingredients.map((ingredient, index) => (
                                                    <p key={index} className="text-md text-gray-800">- {ingredient}</p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xl font-bold text-gray-800">How to:</p>
                                            <div className="mt-2 text-md space-y-2">
                                                {howto.map((step, index) => (
                                                    <p key={index} className="leading-relaxed text-gray-800">{`${index + 1}. ${step}`}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}