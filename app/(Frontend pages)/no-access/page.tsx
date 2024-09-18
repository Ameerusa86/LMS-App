"use client";

import { images } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NoAccess() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Image with a smooth hover effect */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={images.accessDenied}
          height={500}
          width={500}
          alt="Access Denied Image"
          className="object-cover" // Removed box-like styles, now the image fits naturally
        />
      </motion.div>

      {/* Access Denied Text */}
      <motion.h1
        className="text-4xl font-bold text-red-600 mt-8 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Access Denied
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg text-gray-700 text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        You do not have admin access to view this page.
      </motion.p>

      {/* Button to go back to homepage */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 hover:underline transition text-lg font-semibold"
        >
          Go back to the homepage
        </Link>
      </motion.div>
    </motion.div>
  );
}
