"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useTranslation } from "@/context/LanguageProvider";
import {
  FiBookOpen,
  FiArrowLeft,
  FiUsers,
  FiPlayCircle,
  FiStar,
  FiSearch,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

// =============================================
// COURSE DATA — 45 courses across all categories
// =============================================
interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  lessons: number;
  enrolled: number;
  progress: number;
  category: string;
  description: string;
  rating: number;
  price: string;
  weeklyCommitment: string;
  featured: boolean;
}

const COURSES: Course[] = [
  // --- Technology ---
  {
    id: 1, title: "Complete Web Development Bootcamp",
    instructor: "Dr. Sarah Chen", instructorAvatar: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
    thumbnail: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
    lessons: 48, enrolled: 15420, progress: 75, category: "Technology",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch.",
    rating: 4.8, price: "$49.99", weeklyCommitment: "8-10 hrs/week", featured: true,
  },
  {
    id: 2, title: "Python for Data Science",
    instructor: "Dr. James Wilson", instructorAvatar: "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
    thumbnail: "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg",
    lessons: 42, enrolled: 11200, progress: 0, category: "Technology",
    description: "Master Python, NumPy, Pandas, and data visualization.",
    rating: 4.7, price: "$49.99", weeklyCommitment: "6-8 hrs/week", featured: true,
  },
  {
    id: 3, title: "Machine Learning A-Z",
    instructor: "Prof. Andrew Kim", instructorAvatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
    thumbnail: "https://images.pexels.com/photos/35241895/pexels-photo-35241895.jpeg",
    lessons: 56, enrolled: 8900, progress: 0, category: "Technology",
    description: "From regression to deep learning — all ML algorithms covered.",
    rating: 4.9, price: "$99.99", weeklyCommitment: "10-12 hrs/week", featured: true,
  },
  {
    id: 4, title: "iOS App Development with Swift",
    instructor: "Lisa Park", instructorAvatar: "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg",
    thumbnail: "https://images.pexels.com/photos/35216378/pexels-photo-35216378.jpeg",
    lessons: 38, enrolled: 6700, progress: 0, category: "Technology",
    description: "Build beautiful iOS apps from scratch using SwiftUI.",
    rating: 4.6, price: "$49.99", weeklyCommitment: "6-8 hrs/week", featured: false,
  },
  {
    id: 5, title: "React & Next.js Masterclass",
    instructor: "Marco Dev", instructorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    thumbnail: "https://images.pexels.com/photos/35007035/pexels-photo-35007035.jpeg",
    lessons: 44, enrolled: 9200, progress: 0, category: "Technology",
    description: "Build production-ready apps with React, Next.js, and TypeScript.",
    rating: 4.8, price: "$49.99", weeklyCommitment: "7-9 hrs/week", featured: true,
  },
  {
    id: 6, title: "Cybersecurity Fundamentals",
    instructor: "Alex Turner", instructorAvatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg",
    thumbnail: "https://images.pexels.com/photos/35204037/pexels-photo-35204037.jpeg",
    lessons: 30, enrolled: 5400, progress: 0, category: "Technology",
    description: "Learn network security, cryptography, and ethical hacking.",
    rating: 4.5, price: "$19.99", weeklyCommitment: "5-7 hrs/week", featured: false,
  },
  {
    id: 7, title: "Cloud Computing with AWS",
    instructor: "Rachel Ng", instructorAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    thumbnail: "https://images.pexels.com/photos/34959733/pexels-photo-34959733.jpeg",
    lessons: 34, enrolled: 7800, progress: 0, category: "Technology",
    description: "Master AWS services: EC2, S3, Lambda, DynamoDB, and more.",
    rating: 4.6, price: "$49.99", weeklyCommitment: "6-8 hrs/week", featured: false,
  },
  {
    id: 8, title: "Blockchain & Web3 Development",
    instructor: "Dr. Carlos Mendez", instructorAvatar: "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg",
    thumbnail: "https://images.pexels.com/photos/34593774/pexels-photo-34593774.jpeg",
    lessons: 26, enrolled: 4300, progress: 0, category: "Technology",
    description: "Build dApps, smart contracts, and understand DeFi protocols.",
    rating: 4.4, price: "$49.99", weeklyCommitment: "5-7 hrs/week", featured: false,
  },
  // --- Arts ---
  {
    id: 9, title: "Digital Photography Masterclass",
    instructor: "Mike Johnson", instructorAvatar: "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg",
    thumbnail: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
    lessons: 36, enrolled: 8920, progress: 30, category: "Arts",
    description: "Master your camera and learn composition, lighting, and editing.",
    rating: 4.7, price: "$49.99", weeklyCommitment: "4-6 hrs/week", featured: true,
  },
  {
    id: 10, title: "Creative Writing Workshop",
    instructor: "Sarah Smith", instructorAvatar: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
    thumbnail: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    lessons: 20, enrolled: 4560, progress: 0, category: "Arts",
    description: "Unlock your creativity and develop your unique writing voice.",
    rating: 4.5, price: "$19.99", weeklyCommitment: "3-5 hrs/week", featured: false,
  },
  {
    id: 11, title: "UI/UX Design Fundamentals",
    instructor: "Emma Rodriguez", instructorAvatar: "https://images.pexels.com/photos/35634366/pexels-photo-35634366.jpeg",
    thumbnail: "https://images.pexels.com/photos/35487966/pexels-photo-35487966.jpeg",
    lessons: 28, enrolled: 7300, progress: 0, category: "Arts",
    description: "Design thinking, wireframing, prototyping, and user research.",
    rating: 4.6, price: "$49.99", weeklyCommitment: "5-7 hrs/week", featured: true,
  },
  {
    id: 12, title: "Watercolor Painting for Beginners",
    instructor: "Yuki Tanaka", instructorAvatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    thumbnail: "https://images.pexels.com/photos/34512587/pexels-photo-34512587.jpeg",
    lessons: 18, enrolled: 3200, progress: 0, category: "Arts",
    description: "Learn watercolor techniques from basic washes to finished paintings.",
    rating: 4.4, price: "$19.99", weeklyCommitment: "3-4 hrs/week", featured: false,
  },
  {
    id: 13, title: "Graphic Design with Adobe Suite",
    instructor: "David Kim", instructorAvatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    thumbnail: "https://images.pexels.com/photos/34500961/pexels-photo-34500961.jpeg",
    lessons: 40, enrolled: 6100, progress: 0, category: "Arts",
    description: "Master Photoshop, Illustrator, and InDesign for professional design.",
    rating: 4.7, price: "$49.99", weeklyCommitment: "6-8 hrs/week", featured: false,
  },
  // --- Health ---
  {
    id: 14, title: "Fitness & Nutrition Fundamentals",
    instructor: "Emma Wilson", instructorAvatar: "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg",
    thumbnail: "https://images.pexels.com/photos/35443625/pexels-photo-35443625.jpeg",
    lessons: 24, enrolled: 12350, progress: 0, category: "Health",
    description: "Build healthy habits with expert guidance on exercise and nutrition.",
    rating: 4.6, price: "Free", weeklyCommitment: "3-5 hrs/week", featured: true,
  },
  {
    id: 15, title: "Yoga & Meditation for Beginners",
    instructor: "Priya Sharma", instructorAvatar: "https://images.pexels.com/photos/1874585/pexels-photo-1874585.jpeg",
    thumbnail: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
    lessons: 20, enrolled: 8900, progress: 0, category: "Health",
    description: "Find your inner peace with guided yoga and meditation sessions.",
    rating: 4.8, price: "Free", weeklyCommitment: "2-4 hrs/week", featured: true,
  },
  {
    id: 16, title: "Mental Health & Wellbeing",
    instructor: "Dr. Lisa Brown", instructorAvatar: "https://images.pexels.com/photos/3785429/pexels-photo-3785429.jpeg",
    thumbnail: "https://images.pexels.com/photos/34442976/pexels-photo-34442976.jpeg",
    lessons: 16, enrolled: 5600, progress: 0, category: "Health",
    description: "Understand anxiety, stress management, and build resilience.",
    rating: 4.7, price: "$19.99", weeklyCommitment: "2-3 hrs/week", featured: false,
  },
  {
    id: 17, title: "Strength Training 101",
    instructor: "Mike Torres", instructorAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    thumbnail: "https://images.pexels.com/photos/34582218/pexels-photo-34582218.jpeg",
    lessons: 22, enrolled: 4700, progress: 0, category: "Health",
    description: "Build muscle and strength with proper form and programming.",
    rating: 4.5, price: "$19.99", weeklyCommitment: "4-6 hrs/week", featured: false,
  },
  {
    id: 18, title: "Plant-Based Cooking & Nutrition",
    instructor: "Sophie Green", instructorAvatar: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg",
    thumbnail: "https://images.pexels.com/photos/34466192/pexels-photo-34466192.jpeg",
    lessons: 14, enrolled: 3800, progress: 0, category: "Health",
    description: "Delicious plant-based recipes and nutritional science explained.",
    rating: 4.4, price: "Free", weeklyCommitment: "2-3 hrs/week", featured: false,
  },
  // --- Music ---
  {
    id: 19, title: "Music Production for Beginners",
    instructor: "Alex Brown", instructorAvatar: "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg",
    thumbnail: "https://images.pexels.com/photos/35634366/pexels-photo-35634366.jpeg",
    lessons: 30, enrolled: 6780, progress: 0, category: "Music",
    description: "Create your own beats and learn music production from scratch.",
    rating: 4.5, price: "$49.99", weeklyCommitment: "5-7 hrs/week", featured: true,
  },
  {
    id: 20, title: "Piano for Absolute Beginners",
    instructor: "Clara Johannson", instructorAvatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg",
    thumbnail: "https://images.pexels.com/photos/34617039/pexels-photo-34617039.jpeg",
    lessons: 24, enrolled: 5100, progress: 0, category: "Music",
    description: "Learn piano from zero — notes, chords, and your first songs.",
    rating: 4.6, price: "$19.99", weeklyCommitment: "3-5 hrs/week", featured: false,
  },
  {
    id: 21, title: "Electronic Music Production",
    instructor: "DJ Remix", instructorAvatar: "https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg",
    thumbnail: "https://images.pexels.com/photos/34663847/pexels-photo-34663847.jpeg",
    lessons: 28, enrolled: 4200, progress: 0, category: "Music",
    description: "Produce electronic music using Ableton Live and synthesizers.",
    rating: 4.4, price: "$49.99", weeklyCommitment: "5-7 hrs/week", featured: false,
  },
  {
    id: 22, title: "Guitar Mastery: From Zero to Hero",
    instructor: "Carlos Rivera", instructorAvatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg",
    thumbnail: "https://images.pexels.com/photos/34710569/pexels-photo-34710569.jpeg",
    lessons: 36, enrolled: 8300, progress: 0, category: "Music",
    description: "Acoustic and electric guitar — chords, solos, and music theory.",
    rating: 4.7, price: "$49.99", weeklyCommitment: "4-6 hrs/week", featured: true,
  },
  // --- Business ---
  {
    id: 23, title: "Entrepreneurship 101",
    instructor: "John Davis", instructorAvatar: "https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg",
    thumbnail: "https://images.pexels.com/photos/34757172/pexels-photo-34757172.jpeg",
    lessons: 22, enrolled: 9400, progress: 0, category: "Business",
    description: "From idea to IPO — learn how to start and scale a business.",
    rating: 4.6, price: "Free", weeklyCommitment: "3-5 hrs/week", featured: true,
  },
  {
    id: 24, title: "Digital Marketing Masterclass",
    instructor: "Jessica Lee", instructorAvatar: "https://images.pexels.com/photos/35586994/pexels-photo-35586994.jpeg",
    thumbnail: "https://images.pexels.com/photos/34828140/pexels-photo-34828140.jpeg",
    lessons: 32, enrolled: 7600, progress: 0, category: "Business",
    description: "SEO, SEM, social media marketing, and analytics explained.",
    rating: 4.5, price: "$49.99", weeklyCommitment: "5-7 hrs/week", featured: false,
  },
  {
    id: 25, title: "Financial Literacy & Investing",
    instructor: "Robert Chen", instructorAvatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
    thumbnail: "https://images.pexels.com/photos/34875644/pexels-photo-34875644.jpeg",
    lessons: 18, enrolled: 11000, progress: 0, category: "Business",
    description: "Understand stocks, bonds, real estate, and personal finance.",
    rating: 4.8, price: "Free", weeklyCommitment: "2-4 hrs/week", featured: true,
  },
  {
    id: 26, title: "Leadership & Team Management",
    instructor: "Angela White", instructorAvatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    thumbnail: "https://images.pexels.com/photos/34923707/pexels-photo-34923707.jpeg",
    lessons: 20, enrolled: 5400, progress: 0, category: "Business",
    description: "Lead teams effectively with emotional intelligence and strategy.",
    rating: 4.5, price: "$19.99", weeklyCommitment: "3-5 hrs/week", featured: false,
  },
  {
    id: 27, title: "E-Commerce & Shopify Mastery",
    instructor: "Tom Harris", instructorAvatar: "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg",
    thumbnail: "https://images.pexels.com/photos/34982942/pexels-photo-34982942.jpeg",
    lessons: 26, enrolled: 4900, progress: 0, category: "Business",
    description: "Build and scale your online store with Shopify and dropshipping.",
    rating: 4.3, price: "$49.99", weeklyCommitment: "4-6 hrs/week", featured: false,
  },
  // --- Science ---
  {
    id: 28, title: "Introduction to AI & Deep Learning",
    instructor: "Dr. Maria Santos", instructorAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    thumbnail: "https://images.pexels.com/photos/35030704/pexels-photo-35030704.jpeg",
    lessons: 34, enrolled: 6800, progress: 0, category: "Science",
    description: "Neural networks, CNNs, RNNs, and transformers explained simply.",
    rating: 4.7, price: "$49.99", weeklyCommitment: "6-8 hrs/week", featured: true,
  },
  {
    id: 29, title: "Physics for Everyone",
    instructor: "Prof. Neil Armstrong", instructorAvatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg",
    thumbnail: "https://images.pexels.com/photos/35067414/pexels-photo-35067414.jpeg",
    lessons: 28, enrolled: 3400, progress: 0, category: "Science",
    description: "Classical mechanics, thermodynamics, and quantum physics made fun.",
    rating: 4.5, price: "Free", weeklyCommitment: "4-6 hrs/week", featured: false,
  },
  {
    id: 30, title: "Biology & Life Sciences",
    instructor: "Dr. Anna Kowalski", instructorAvatar: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
    thumbnail: "https://images.pexels.com/photos/35114204/pexels-photo-35114204.jpeg",
    lessons: 30, enrolled: 2900, progress: 0, category: "Science",
    description: "Cell biology, genetics, evolution, and ecology fundamentals.",
    rating: 4.4, price: "$19.99", weeklyCommitment: "4-6 hrs/week", featured: false,
  },
  {
    id: 31, title: "Astronomy: Exploring the Cosmos",
    instructor: "Dr. Stella Moon", instructorAvatar: "https://images.pexels.com/photos/146531/pexels-photo-146531.jpeg",
    thumbnail: "https://images.pexels.com/photos/35169063/pexels-photo-35169063.jpeg",
    lessons: 22, enrolled: 4100, progress: 0, category: "Science",
    description: "Stars, planets, galaxies, and the mysteries of the universe.",
    rating: 4.8, price: "Free", weeklyCommitment: "3-5 hrs/week", featured: true,
  },
  // --- Language ---
  {
    id: 32, title: "Spanish for Beginners",
    instructor: "Carmen Flores", instructorAvatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
    thumbnail: "https://images.pexels.com/photos/35192852/pexels-photo-35192852.jpeg",
    lessons: 30, enrolled: 12500, progress: 0, category: "Language",
    description: "Start speaking Spanish with confidence in just 30 lessons.",
    rating: 4.6, price: "Free", weeklyCommitment: "3-5 hrs/week", featured: true,
  },
  {
    id: 33, title: "Japanese Language & Culture",
    instructor: "Yuki Tanaka", instructorAvatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    thumbnail: "https://images.pexels.com/photos/35266321/pexels-photo-35266321.jpeg",
    lessons: 36, enrolled: 5600, progress: 0, category: "Language",
    description: "Learn Japanese from hiragana to fluent conversation.",
    rating: 4.5, price: "$49.99", weeklyCommitment: "4-6 hrs/week", featured: false,
  },
  {
    id: 34, title: "French for Travelers",
    instructor: "Marie Dubois", instructorAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    thumbnail: "https://images.pexels.com/photos/35291387/pexels-photo-35291387.jpeg",
    lessons: 18, enrolled: 4400, progress: 0, category: "Language",
    description: "Essential French phrases and cultural tips for your next trip.",
    rating: 4.3, price: "Free", weeklyCommitment: "2-3 hrs/week", featured: false,
  },
  {
    id: 35, title: "English for Business Professionals",
    instructor: "James Cooper", instructorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    thumbnail: "https://images.pexels.com/photos/35317558/pexels-photo-35317558.jpeg",
    lessons: 24, enrolled: 8100, progress: 0, category: "Language",
    description: "Business English: presentations, negotiations, and email writing.",
    rating: 4.6, price: "$19.99", weeklyCommitment: "3-5 hrs/week", featured: false,
  },
  {
    id: 36, title: "Mandarin Chinese for Beginners",
    instructor: "Li Wei", instructorAvatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    thumbnail: "https://images.pexels.com/photos/35342149/pexels-photo-35342149.jpeg",
    lessons: 32, enrolled: 3900, progress: 0, category: "Language",
    description: "Master tones, characters, and basic conversation in Mandarin.",
    rating: 4.4, price: "$49.99", weeklyCommitment: "4-6 hrs/week", featured: false,
  },
  // --- More Technology ---
  {
    id: 37, title: "DevOps & CI/CD Pipeline Mastery",
    instructor: "Derek Okafor", instructorAvatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
    thumbnail: "https://images.pexels.com/photos/35382479/pexels-photo-35382479.jpeg",
    lessons: 32, enrolled: 3600, progress: 0, category: "Technology",
    description: "Docker, Kubernetes, Jenkins, GitOps, and infrastructure as code.",
    rating: 4.5, price: "$49.99", weeklyCommitment: "6-8 hrs/week", featured: false,
  },
  {
    id: 38, title: "Database Design & SQL",
    instructor: "Dr. Nina Patel", instructorAvatar: "https://images.pexels.com/photos/1874585/pexels-photo-1874585.jpeg",
    thumbnail: "https://images.pexels.com/photos/35421139/pexels-photo-35421139.jpeg",
    lessons: 22, enrolled: 6200, progress: 0, category: "Technology",
    description: "Relational databases, SQL queries, normalization, and indexing.",
    rating: 4.6, price: "$19.99", weeklyCommitment: "4-6 hrs/week", featured: false,
  },
  // --- More Arts ---
  {
    id: 39, title: "Interior Design Principles",
    instructor: "Hannah Lee", instructorAvatar: "https://images.pexels.com/photos/35586994/pexels-photo-35586994.jpeg",
    thumbnail: "https://images.pexels.com/photos/35459874/pexels-photo-35459874.jpeg",
    lessons: 16, enrolled: 2800, progress: 0, category: "Arts",
    description: "Color theory, space planning, and creating beautiful interiors.",
    rating: 4.3, price: "$19.99", weeklyCommitment: "2-4 hrs/week", featured: false,
  },
  // --- More Health ---
  {
    id: 40, title: "Sleep Science & Better Rest",
    instructor: "Dr. James Hart", instructorAvatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg",
    thumbnail: "https://images.pexels.com/photos/35500894/pexels-photo-35500894.jpeg",
    lessons: 12, enrolled: 7200, progress: 0, category: "Health",
    description: "Understand circadian rhythms and improve your sleep quality.",
    rating: 4.7, price: "Free", weeklyCommitment: "1-2 hrs/week", featured: false,
  },
  // --- More Business ---
  {
    id: 41, title: "Real Estate Investing",
    instructor: "Patricia Wong", instructorAvatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
    thumbnail: "https://images.pexels.com/photos/35548297/pexels-photo-35548297.jpeg",
    lessons: 20, enrolled: 4600, progress: 0, category: "Business",
    description: "Rental properties, flipping, REITs, and market analysis.",
    rating: 4.4, price: "$49.99", weeklyCommitment: "3-5 hrs/week", featured: false,
  },
  // --- More Science ---
  {
    id: 42, title: "Chemistry in Everyday Life",
    instructor: "Dr. Otto Fischer", instructorAvatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg",
    thumbnail: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    lessons: 18, enrolled: 2100, progress: 0, category: "Science",
    description: "Discover the chemistry behind cooking, cleaning, and nature.",
    rating: 4.2, price: "Free", weeklyCommitment: "2-3 hrs/week", featured: false,
  },
  // --- More Music ---
  {
    id: 43, title: "Music Theory & Composition",
    instructor: "Prof. Johann Bach", instructorAvatar: "https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg",
    thumbnail: "https://images.pexels.com/photos/35528023/pexels-photo-35528023.jpeg",
    lessons: 26, enrolled: 3100, progress: 0, category: "Music",
    description: "Harmony, counterpoint, melody, and orchestration fundamentals.",
    rating: 4.6, price: "$19.99", weeklyCommitment: "4-6 hrs/week", featured: false,
  },
  // --- More Language ---
  {
    id: 44, title: "German for Work & Study",
    instructor: "Klaus Mueller", instructorAvatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    thumbnail: "https://images.pexels.com/photos/35557186/pexels-photo-35557186.jpeg",
    lessons: 28, enrolled: 2800, progress: 0, category: "Language",
    description: "Learn German from A1 to B2 with practical business scenarios.",
    rating: 4.3, price: "$19.99", weeklyCommitment: "3-5 hrs/week", featured: false,
  },
  // --- More Technology ---
  {
    id: 45, title: "Mobile App Development (Flutter)",
    instructor: "Sofia Costa", instructorAvatar: "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg",
    thumbnail: "https://images.pexels.com/photos/35563658/pexels-photo-35563658.jpeg",
    lessons: 38, enrolled: 5100, progress: 0, category: "Technology",
    description: "Build cross-platform mobile apps with Flutter and Dart.",
    rating: 4.5, price: "$49.99", weeklyCommitment: "6-8 hrs/week", featured: false,
  },
];

const CATEGORIES = [
  { key: "All", label: "All" },
  { key: "Technology", label: "Technology" },
  { key: "Arts", label: "Arts" },
  { key: "Health", label: "Health" },
  { key: "Music", label: "Music" },
  { key: "Business", label: "Business" },
  { key: "Science", label: "Science" },
  { key: "Language", label: "Language" },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <FiStar key={i} size={13} className="fill-yellow-400 text-yellow-400" />
      );
    } else if (i === full && hasHalf) {
      stars.push(
        <FiStar key={i} size={13} className="fill-yellow-400/50 text-yellow-400" />
      );
    } else {
      stars.push(
        <FiStar key={i} size={13} className="text-gray-300 dark:text-gray-600" />
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function CoursesPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      if (
        selectedCategory !== "All" &&
        course.category !== selectedCategory
      )
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(q) ||
          course.instructor.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const featuredCourses = useMemo(
    () => COURSES.filter((c) => c.featured),
    []
  );

  const inProgressCourses = useMemo(
    () => COURSES.filter((c) => c.progress > 0),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <FiArrowLeft
              size={20}
              className="text-gray-600 dark:text-gray-400"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t.courses.title}
          </h1>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sticky top-24">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                Categories
              </h3>
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const count =
                    cat.key === "All"
                      ? COURSES.length
                      : COURSES.filter((c) => c.category === cat.key).length;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        selectedCategory === cat.key
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <FiBookOpen size={15} />
                      <span className="flex-1 text-left">{cat.label}</span>
                      <span className="text-xs text-gray-400">{count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile categories */}
          <div className="lg:hidden w-full mb-4 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {CATEGORIES.map((cat) => {
                const count =
                  cat.key === "All"
                    ? COURSES.length
                    : COURSES.filter((c) => c.category === cat.key).length;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                      selectedCategory === cat.key
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <FiBookOpen size={13} />
                    {cat.label}
                    <span className="text-[10px] opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="relative mb-6">
              <FiSearch
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search courses by title or instructor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
              />
            </div>

            {/* Continue Learning */}
            {inProgressCourses.length > 0 && selectedCategory === "All" && !searchQuery && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FiPlayCircle size={18} className="text-blue-500" />
                  Continue Learning
                </h2>
                {inProgressCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col md:flex-row gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4"
                  >
                    <div className="relative w-full md:w-48 h-28 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                        {course.description}
                      </p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>
                            {t.courses.progress}: {course.progress}%
                          </span>
                          <span>
                            {course.lessons} {t.courses.lessons}
                          </span>
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
            )}

            {/* Featured Row */}
            {selectedCategory === "All" && !searchQuery && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FiTrendingUp size={18} className="text-orange-500" />
                  Featured Courses
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredCourses.slice(0, 6).map((course) => (
                    <CourseCard key={course.id} course={course} t={t} />
                  ))}
                </div>
              </div>
            )}

            {/* All / Filtered Courses */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {searchQuery || selectedCategory !== "All"
                ? `${filteredCourses.length} course${filteredCourses.length !== 1 ? "s" : ""} found`
                : "All Courses"}
            </h2>

            {filteredCourses.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiBookOpen
                    size={36}
                    className="text-gray-300 dark:text-gray-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-400 dark:text-gray-500 max-w-sm mx-auto">
                  {searchQuery
                    ? "Try a different search term or category."
                    : "There are no courses in this category yet."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} t={t} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  course,
  t,
}: {
  course: Course;
  t: any;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-40">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-300"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full">
            {course.category}
          </span>
        </div>
        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              course.price === "Free"
                ? "bg-green-500 text-white"
                : "bg-white/90 text-gray-800"
            }`}
          >
            {course.price === "Free" ? "Free" : course.price}
          </span>
        </div>
        {/* Progress bar if enrolled */}
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
            <div
              className="h-full bg-green-500"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 dark:text-white text-sm leading-tight">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-2.5">
          <Image
            src={course.instructorAvatar}
            alt={course.instructor}
            width={22}
            height={22}
            className="w-5.5 h-5.5 rounded-full object-cover"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {course.instructor}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <StarRating rating={course.rating} />
          <span className="text-xs text-gray-400">{course.rating}</span>
        </div>

        {/* Meta row: lessons + enrolled */}
        <div className="flex items-center justify-between mt-2.5 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <FiPlayCircle size={12} /> {course.lessons} {t.courses.lessons}
          </span>
          <span className="flex items-center gap-1">
            <FiUsers size={12} /> {course.enrolled.toLocaleString()}{" "}
            {t.courses.enrolled}
          </span>
        </div>

        {/* Weekly commitment badge */}
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
          <FiClock size={12} />
          <span>{course.weeklyCommitment}</span>
        </div>

        {/* Button */}
        <button className="w-full mt-auto bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
          {course.progress > 0 ? t.courses.continue : t.courses.start}
        </button>
      </div>
    </div>
  );
}
