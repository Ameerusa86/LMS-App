"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { fs_database, storage } from "../../utils/firebase"; // Firestore and Storage
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore methods
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"; // Storage methods
import { motion } from "framer-motion";
import { FaSave, FaUpload } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input"; // Shadcn Input component
import Image from "next/image";

// Define the types for user and course
interface User {
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
}

interface Course {
  title: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<User | null>(null); // Store user data
  const [name, setName] = useState(""); // Full Name input state
  const [profilePic, setProfilePic] = useState<File | null>(null); // Profile Pic state
  const [isAdmin, setIsAdmin] = useState(false); // Role state
  const [loading, setLoading] = useState(true); // Loading state
  const { data: session } = useSession(); // Session from Auth.js

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const userDocRef = doc(fs_database, "users", session.user.email);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUserData(userData);
            setName(userData.name || ""); // Set the full name from Firestore
            setIsAdmin(!!userData?.isAdmin); // Set the role
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [session]);

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (session?.user?.email) {
        const userDocRef = doc(fs_database, "users", session.user.email);

        let profileImageUrl = userData?.image || "";

        // Upload the profile picture if a new one is selected
        if (profilePic) {
          const storageRef = ref(storage, `profilePics/${session.user.email}`);
          const uploadTask = uploadBytesResumable(storageRef, profilePic);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.error("Upload error:", error);
            },
            async () => {
              profileImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              await setDoc(
                userDocRef,
                { image: profileImageUrl }, // Save profile image URL in Firestore
                { merge: true }
              );
              setUserData((prev) => ({
                ...prev,
                image: profileImageUrl,
                name: prev?.name || "",
              })); // Update local state
              setProfilePic(null); // Clear the profile pic after upload
            }
          );
        }

        // Update Firestore with new name
        await setDoc(
          userDocRef,
          {
            name: name, // Update name
            isAdmin: isAdmin, // Keep the admin flag
            updatedAt: new Date(),
          },
          { merge: true } // Merge with existing data
        );

        setUserData((prev) => ({ ...prev, name })); // Update local state with new name
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Profile
      </h1>

      {/* Profile Picture Section */}
      <div className="mb-6 flex flex-col items-center">
        {userData && (
          <Image
            src={userData.image || "/default-profile.png"} // Show the profile image from Firestore
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
            width={96}
            height={96}
          />
        )}
        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2">
          <FaUpload />
          <span>Upload New Picture</span>
          <Input
            type="file"
            onChange={handleProfilePicChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <Input
            type="email"
            value={session?.user?.email || ""} // Show the user's email from session
            disabled
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-100 disabled"
          />
        </div>

        {/* Full Name Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Full Name
          </label>
          <Input
            type="text"
            value={name} // Display the name from state
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>

        {/* Role Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Role
          </label>
          <Input
            type="text"
            value={isAdmin ? "Admin" : "User"} // Display the role
            disabled
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
          >
            <FaSave />
            <span>Update Profile</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
