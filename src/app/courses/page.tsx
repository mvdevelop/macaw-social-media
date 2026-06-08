"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageProvider";
import { FiBookOpen, FiArrowLeft, FiUsers, FiPlayCircle, FiBarChart2 } from "react-icons/fi";

// Simulated courses
const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Sarah Chen",
    instructorAvatar: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
    thumbnail: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
    lessons: 48,
    enrolled: 15420,
    progress: 75,
    category: "Technology",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch.",
  },
  {
    id: 2,
    title: "Digital Photography Masterclass",
    instructor: "Mike Johnson",
    instructorAvatar: "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg",
    thumbnail: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
    lessons: 36,
    enrolled: 8920,
    progress: 30,
    category: "Arts",
    description: "Master your camera and learn composition, lighting, and editing.",
  },
  {
    id: 3,
    title: "Fitness & Nutrition Fundamentals",
    instructor: "Emma Wilson",
    instructorAvatar: "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg",
    thumbnail: "https://images.pexels.com/photos/35443625/pexels-photo-35443625.jpeg",
    lessons: 24,
    enrolled: 12350,
    progress: 0,
    category: "Health",
    description: "Build healthy habits with expert guidance on exercise and nutrition.",
  },
  {
    id: 4,
    title: "Music Production for Beginners",
    instructor: "Alex Brown",
    instructorAvatar: "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg",
    thumbnail: "https://images.pexels.com/photos/35634366/pexels-photo-35634366.jpeg",
    lessons: 30,
    enrolled: 6780,
    progress: 0,
    category: "Music",
    description: "Create your own beats and learn music production from scratch.",
  },
  {
    id: 5,
    title: "Data Science & Machine Learning",
    instructor: "Dr. James Wilson",
    instructorAvatar: "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
    thumbnail: "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg",
    lessons: 52,
    enrolled: 11200,
    progress: 0,
    category: "Technology",
    description: "Python, statistics, machine learning, and AI fundamentals.",
  },
  {
    id: 6,
    title: "Creative Writing Workshop",
    instructor: "Sarah Smith",
    instructorAvatar: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
    thumbnail: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    lessons: 20,
    enrolled: 4560,
    progress: 0,
    category: "Arts",
    description: "Unlock your creativity and develop your unique writing voice.",
  },
];

export default function CoursesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
            <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.courses.title}</h1>
        </div>

        {/* In Progress Course */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Continue Learning</h2>
          {courses.filter(c => c.progress > 0).map((course) => (
            <div key={course.id} className="flex flex-col md:flex-row gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4">
              <div className="relative w-full md:w-48 h-28 rounded-lg overflow-hidden shrink-0">
                <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 dark:text-white">{course.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.description}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>{t.courses.progress}: {course.progress}%</span>
                    <span>{course.lessons} {t.courses.lessons}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0052FF] to-[#6825FF] rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <button className="mt-3 bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                  {t.courses.continue}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* All courses */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
              <div className="relative h-40">
                <Image src={course.thumbnail} alt={course.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full">
                    {course.category}
                  </span>
                </div>
                {course.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
                    <div className="h-full bg-green-500" style={{ width: `${course.progress}%` }} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 dark:text-white">{course.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Image src={course.instructorAvatar} alt={course.instructor} width={24} height={24} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><FiPlayCircle size={12} /> {course.lessons} {t.courses.lessons}</span>
                  <span className="flex items-center gap-1"><FiUsers size={12} /> {course.enrolled.toLocaleString()} {t.courses.enrolled}</span>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                  {course.progress > 0 ? t.courses.continue : t.courses.start}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
