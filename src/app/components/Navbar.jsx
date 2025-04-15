"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    router.push("/auth/sign-in");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-xl font-bold text-blue-600 dark:text-white"
            >
              नेपाली Startups 🚀
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
              href="/Submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit your Startups
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
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Startups
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-white bg-blue-600 rounded-lg text-center hover:bg-blue-700"
            >
              Login
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
