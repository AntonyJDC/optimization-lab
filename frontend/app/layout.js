import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Optimization Lab",
  description: "Laboratory for optimization algorithms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className="relative text-black dark:text-white"
      >
        <div
          className="absolute top-0 bottom-0 z-[-2] min-h-screen w-full bg-gray-50 dark:bg-gray-950
      bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,216,255,0.5),rgba(255,255,255,0.9))]
      dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
        >
        </div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
