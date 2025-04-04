import React from 'react';
import Image from 'next/image';
import data from "@/Data/headcard.json";
import Link from 'next/link';

interface HeadData {
    id: number;
    name: string;
    img: string;
    url: string;
    category: string;
    time: string;
    ingredients: string;
    howto: string;
}

function Headcardfood() {
    return (
        <main className="flex w-full h-full overflow-y-auto p-6">
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {data.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 cursor-pointer">
                        <Link href={"/DnmRoutingSg/" + `${item.id}`} className="relative w-full block">
                            <Image
                                className="w-full aspect-[4/3] object-cover"
                                src={item.img}
                                width={800} height={600}
                                alt={item.name}
                            />
                            <div className="p-4">
                                <p className="text-2xl font-bold text-gray-700 hover:underline">{item.name}</p>
                                <p className="text-lg text-gray-500">Category: {item.category}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Headcardfood;
