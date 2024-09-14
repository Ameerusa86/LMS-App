"use client";

import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Icons
import { images } from "@/public/images";

export const SignUpForm = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card Container */}
      <div className="bg-white shadow-md rounded-lg flex flex-col lg:flex-row p-8 lg:p-12 w-full max-w-[1280px] h-[720px]">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">Sign up</h2>

          <form className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="John Doe"
                className="pl-10 h-12 w-full"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="email"
                placeholder="Your Email"
                className="pl-10 h-12 w-full"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 h-12 w-full"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="password"
                placeholder="Repeat your password"
                className="pl-10 h-12 w-full"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="text-sm">
                I agree all statements in{" "}
                <a href="#" className="text-blue-600">
                  Terms of service
                </a>
              </label>
            </div>

            {/* Register Button */}
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-12">
              Register
            </Button>
          </form>

          {/* Sign in link */}
          <p className="mt-4 text-sm text-center">
            <a href="/auth/signin" className="text-blue-600">
              I am already a member
            </a>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex items-center justify-center lg:w-1/2">
          <Image
            src={images.signUpForm}
            alt="Sign up illustration"
            width={1000}
            height={1000}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};
