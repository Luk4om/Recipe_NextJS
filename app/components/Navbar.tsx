"use client";

import React from 'react';
import Link from 'next/link';
import Search from './Search';

export default function Navbar() {
    const city = ["American", "British", "Canadian", "Italian", "French", "Japanese", "Thai"];

    return (
        <div className="drawer sticky top-0 z-50">
            <div className="drawer-content flex flex-col w-full">
                {/* Top Navbar */}
                <div className="w-full navbar bg-[#5F6F52] min-h-[60px] px-6 shadow-md pt-2">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost text-[#FEFAE0]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>

                    <div className="flex justify-between w-full items-center">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-3xl text-[#FEFAE0] font-bold hover:scale-105 transition duration-300">
                                Eating_Kan
                            </Link>
                            <div className="hidden md:block">
                                <Search />
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center space-x-4">
                            <ul className="flex space-x-3">
                                {city.map((country) => (
                                    <li key={country}>
                                        <Link
                                            href={`/${country}`}
                                            className="px-4 py-2 text-lg font-semibold border border-[#FEFAE0] text-[#FEFAE0] 
                                            hover:bg-[#FEFAE0] hover:text-[#5F6F52] 
                                            rounded-xl shadow-md hover:scale-105 transition duration-300"
                                        >
                                            {country}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href="/Randomfood"
                                        className="px-4 py-2 text-lg font-semibold border border-[#FEFAE0] text-[#FEFAE0] 
                                        hover:bg-[#FEFAE0] hover:text-[#5F6F52] 
                                        rounded-xl shadow-md hover:scale-105 transition duration-300"
                                    >
                                        RandomFood
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
