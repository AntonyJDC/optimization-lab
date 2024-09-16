import Link from "next/link";

export default function Footer () {
    return (
        <footer className="bg-gray-900 rounded-lg shadow m-4">
            <div className="w-full mx-auto max-w-screen-lg p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-200 sm:text-center">© 2024 <Link href="https://github.com/AntonyJDC/" className="hover:underline">AntonyJDC</Link>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-normal text-white">
                    <li>
                        <Link href="/" className="hover:underline me-4 md:me-6">Home</Link>
                    </li>
                    <li>
                        <Link href="/#optimization" className="hover:underline me-4 md:me-6">Optimization</Link>
                    </li>
                    <li>
                        <Link href="/#sparse_matrix" className="hover:underline me-4 md:me-6">Sparse Matrix</Link>
                    </li>
                    <li>
                        <Link href="/#taylor_series" className="hover:underline me-4 md:me-6">Taylor Series</Link>
                    </li>
                    <li>
                        <Link href="/#Algorithms" className="hover:underline me-4 md:me-6">Algorithms</Link>
                    </li>
                    <li>
                        <a href="https://github.com/AntonyJDC" className="hover:underline">Contacto</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

