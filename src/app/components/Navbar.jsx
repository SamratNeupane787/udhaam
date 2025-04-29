"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userToken,setToken] = useState(null)
  const router = useRouter()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
 useEffect(() => {
   const storedToken = localStorage.getItem("token");
   setToken(storedToken);
 }, []);

 const handleLogout = () => {
   localStorage.removeItem("token");
   alert("Logged out successfully");
   router.push("/auth/sign-in");
 };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md   w-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-xl font-bold text-blue-600 dark:text-white"
            >
              Udhyaam
            </a>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              New Startups
            </a>
            <a
              href="/Dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Dashboard
            </a>
            {!token ? (
              <a
                href="/auth/sign-in"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </a>
            ) : (
              <Button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Logout
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg absolute w-full"
        >
          <div className="px-2 pt-2 pb-3 space-y-2">
            <a
              href="/"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              New startups
            </a>
            <a
              href="/Dashboard"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Dashboard
            </a>
            {!token ? (
              <a
                href="/auth/sign-in"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </a>
            ) : (
              <Button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Logout
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
