"use client";

import { useEffect, useState } from "react";
import { fs_database, collection, getDocs } from "@/utils/firebase";
import { motion } from "framer-motion";
import Spinner from "@/components/spinner";
import CourseCard from "@/components/Cards/CourseCard";

// Define the types for Course data
interface Course {
  id: string;
  title: string;
  description: string;
  author: string;
  price: string;
  imageUrl: string;
  category: string;
  chaptersCount: number;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesSnapshot = await getDocs(
          collection(fs_database, "courses")
        );

        setCourses(
          coursesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Course[]
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="shadow-lg hover:shadow-2xl rounded-lg overflow-hidden bg-white"
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
