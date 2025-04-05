"use client";

import React from "react";
import Link from "next/link";
import Search from "./Search";

export default function Navbar() {
    const countries = [
        "American",
        "British",
        "Canadian",
        "Italian",
        "French",
        "Japanese",
        "Thai",
    ];

    return (
        <div className="navbar-container sticky top-0 z-50">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

            <div className="navbar-content flex flex-col w-full">
                <div className="navbar bg-[#5F6F52] min-h-[60px] px-6 shadow-md pt-2 w-full">
                    {/* Mobile Menu Button */}
                    <div className="mobile-menu flex-none">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="open sidebar"
                            className="btn-mobile text-[#FEFAE0]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                    </div>

                    <div className="navbar-main flex justify-between w-full items-center">
                        <div className="flex items-center gap-4 flex-wrap">
                            <Link
                                href="/"
                                className="text-3xl text-[#FEFAE0] font-bold hover:scale-105 transition duration-300"
                            >
                                Eating_Kan
                            </Link>
                            <div className="search-container">
                                <Search />
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="desktop-nav">
                            <ul className="flex space-x-3">
                                {countries.map((country) => (
                                    <li key={country}>
                                        <Link
                                            href={`/${country}`}
                                            className="px-4 py-2 text-lg font-semibold border border-[#FEFAE0] text-[#FEFAE0]
                        hover:bg-[#FEFAE0] hover:text-[#5F6F52] rounded-xl shadow-md
                        hover:scale-105 transition duration-300"
                                        >
                                            {country}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href="/Randomfood"
                                        className="px-4 py-2 text-lg font-semibold border border-[#FEFAE0] text-[#FEFAE0]
                      hover:bg-[#FEFAE0] hover:text-[#5F6F52] rounded-xl shadow-md
                      hover:scale-105 transition duration-300"
                                    >
                                        RandomFood
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <div className="sidebar-content p-4 w-64 min-h-full bg-[#5F6F52] text-[#FEFAE0] space-y-2 font-semibold">
                    <div className="flex justify-end">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="close sidebar"
                            className="btn-close text-[#FEFAE0]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </label>
                    </div>
                    <ul>
                        {countries.map((country) => (
                            <li key={country}>
                                <Link
                                    href={`/${country}`}
                                    className="text-lg hover:bg-[#FEFAE0] hover:text-[#5F6F52] rounded-lg px-3 py-2 transition block"
                                >
                                    {country}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/Randomfood"
                                className="text-lg hover:bg-[#FEFAE0] hover:text-[#5F6F52] rounded-lg px-3 py-2 transition block"
                            >
                                RandomFood
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}