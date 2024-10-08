"use client";

import React from "react";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import Link from "next/link";
import Image from "next/image";
import Navlinks from "@/constants/Navlinks";
import Profile from "../Profile";
import { useSession } from "next-auth/react";
import Spinner2 from "../spinner2";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();

  // Check if the user is an admin
  const isAdmin = session?.user?.isAdmin;

  return (
    <header
      id="navbar"
      className="top-0 left-0 fixed w-full transition-all duration-200 h-[7vh] z-[10000] bg-gray-900 text-white shadow-md"
    >
      <div className="flex items-center justify-between h-full w-[90%] xl:w-[80%] mx-auto">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link
            href="/"
            className="hover:text-teal-400 transition flex items-center"
          >
            <Image src={"/logo.png"} width={85} height={85} alt="Logo" />
            CodewithAmeer
          </Link>
        </div>

        {/* Menu Section */}
        <nav className="hidden lg:flex items-center space-x-10">
          {Navlinks.map((link, index) => (
            <Link key={index} href={link.url} className="nav__link">
              {link.title}
            </Link>
          ))}
          {/* Conditionally add "Dashboard" link for admin users */}
          {isAdmin && (
            <Link href="/admin/dashboard" className="nav__link">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {status === "loading" ? (
            <div>
              <Spinner2 />
            </div>
          ) : session && session.user ? (
            <div className="hidden md:flex items-center justify-center gap-x-3">
              {/* User Profile Section */}
              <Profile imageUrl={session.user.image || ""} />
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white transition"
              >
                <Link href="/auth/signin">Login</Link>
              </Button>
              <Button
                variant="default"
                className="bg-teal-500 hover:bg-teal-600 hover:text-white transition"
              >
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Navbar;
