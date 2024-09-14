"use client";

import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaUser, FaLock, FaGithub, FaGoogle } from "react-icons/fa"; // Icons
import { images } from "@/public/images";
import { Separator } from "../ui/separator";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignInForm = () => {
  const router = useRouter();

  const handleSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/" });

    // Redirect to dashboard
    router.push("/");
  };

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
          <h2 className="text-3xl font-semibold mb-6 text-center">Sign in</h2>

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
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 h-12 w-full"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-12">
              Log in
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-4 text-sm text-center">
            <a href="/auth/register" className="text-blue-600">
              Create an account
            </a>
          </p>

          {/* Divider */}
          <Separator className="mt-5" />
          <div className="mt-6 flex items-center justify-center">
            <span className="mx-auto text-gray-500">Or login with</span>
          </div>

          {/* Social Media Buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <Button
              className="bg-gray-700 text-white hover:bg-gray-900 px-4 py-2"
              onClick={() => handleSignIn("github")}
            >
              <FaGithub size={20} />
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2"
              onClick={() => handleSignIn("google")}
            >
              <FaGoogle size={20} />
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex items-center justify-center lg:w-1/2">
          <Image
            src={images.signInForm}
            alt="Sign in illustration"
            width={1000}
            height={1000}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};
