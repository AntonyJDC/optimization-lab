import React from 'react';
import '../globals.css';
import Link from 'next/link';

const navItems = [
    {
        title: "Inicio",
        label: "home",
        url: "/",
    },
    {
        title: "Optimization",
        label: "optimization",
        url: "/#optimization",
    },
    {
        title: "Sparse Matrix",
        label: "sparse_matrix",
        url: "/#sparce_matrix",
    },{
        title: "Series Taylor",
        label: "taylor_series",
        url: "/#taylor_series",
    },
    {
        title: "Algorithms",
        label: "optimization_algorithms",
        url: "/#optimization_algorithms",
    },
]

export default function Navbar() {
    return (
        <header
            className="fixed top-0 z-10 flex items-center justify-center w-full mx-auto mt-5"
        >
            <nav
                className="flex px-3 text-sm font-medium rounded-full text-gray-600 dark:text-gray-200 justify-center items-center"
            >
                {
                    navItems.map((link) => (
                        <Link
                            key={link.label}
                            className="relative block px-3 py-2 transition-all hover:text-blue-500 dark:hover:text-blue-500"
                            aria-label={link.label}
                            href={link.url}
                        >
                            {link.title}
                        </Link>
                    ))
                }
            </nav>
        </header>
    )
}