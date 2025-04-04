import Link from "next/link";
import React from "react";
import Image from 'next/image';
import data from "@/Data/card.json";

interface CardData {
    id: number;
    name: string;
    img: string;
    url: string;
    category: string;
    time: string;
    ingredients: string;
    howto: string;
}

function CardFood() {
    return (
        <main className="flex flex-wrap justify-center gap-8 p-4">
            {data.map((item) => (
                <Link
                    key={item.id}
                    href={`/DnmRoutingPl/${item.id}`}
                    className="w-72 bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer duration-300"
                >
                    <div className="relative w-full h-48">
                        <Image
                            className="rounded-t-2xl object-cover"
                            src={item.img}
                            alt={item.name}
                            layout="fill"
                        />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-black">{item.name}</h2>
                        <p className="text-sm text-gray-600">Category: {item.category}</p>
                        <div className="mt-3 flex justify-end">
                            <button className="px-4 py-2 text-white bg-[#9AD0C2] hover:bg-[#2D9596] rounded-lg transition duration-300">
                                View Recipe
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </main>
    );
}

export default CardFood;
