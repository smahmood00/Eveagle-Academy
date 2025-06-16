"use client";
import { motion } from "framer-motion";
import { ArrowRight, Book, ChevronDown, ChevronUp, Wrench } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { ICourse } from "@/lib/db/models/course";
import { useEffect, useState, useRef, memo } from "react";

interface CourseCardProps {
  course: Partial<ICourse>;
  isCenter: boolean;
  index: number;
  active: number;
}

function CourseCard({ course, isCenter, index, active }: CourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previousActive = useRef(active);

  const position = index - active;
  const scale = 1;
  const rotate = position * 5;
  const translateX = position * 360;
  const opacity = isCenter ? 1 : 0.7;

  // Reset expanded state when active card changes
  useEffect(() => {
    if (previousActive.current !== active) {
      setIsExpanded(false);
      previousActive.current = active;
    }
  }, [active]);

  // Force collapse when not center
  useEffect(() => {
    if (!isCenter && isExpanded) {
      setIsExpanded(false);
    }
  }, [isCenter, isExpanded]);

  return (
    <motion.div
      className={`absolute top-0 w-[320px] cursor-pointer ${
        isExpanded ? 'h-[700px]' : 'h-[600px]'
      }`}
      style={{
        left: '50%',
        transformStyle: "preserve-3d",
        transformOrigin: "center",
        perspective: "1000px",
      }}
      animate={{
        x: translateX - 160,
        scale,
        rotateY: rotate,
        opacity,
        zIndex: isCenter ? 10 : 5,
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.3 }
      }}
    >
      <div 
        className={`
          relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900/90 flex flex-col
          ${isCenter ? 'shadow-2xl shadow-purple-500/20 ring-2 ring-purple-500/20' : 'shadow-xl'}
          ${Math.abs(position) <= 1 ? 'backdrop-blur-sm' : ''}
        `}
      >
        {/* Image Section */}
        <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden">
          <Image
            src={course.cardImage || '/placeholder-course.jpg'}
            alt={course.title || 'Course Image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            quality={75}
          />
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Badges Row 1 */}
          <div className="flex gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs">
              {course.ageGroup}
            </span>
            <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs">
              {course.totalHours} Hours
            </span>
          </div>

          {/* Badges Row 2 */}
          <div className="flex gap-2 mb-4">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">
              <Book className="w-3 h-3" />
              {course.totalClasses} Classes
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
              <Wrench className="w-3 h-3" />
              {course.toolUsed}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {course.title}
          </h3>

          {/* Description with Read More/Less */}
          <div className="relative">
            <p className={`text-sm text-zinc-400 ${isExpanded ? 'h-auto' : 'h-[60px]'} overflow-hidden`}>
              {course.overviewDescription}
            </p>
            {isCenter && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-xs text-purple-400 hover:text-purple-300 mt-2 flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Read Less 
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Read More 
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Button */}
          <div className="mt-auto pt-4">
            <Link href={`/courses/${course.slug}`}>
              <Button
                className={`
                  w-full bg-gradient-to-r from-purple-500 to-pink-500 
                  hover:from-purple-600 hover:to-pink-600
                  ${isCenter ? 'opacity-100' : 'opacity-80'}
                `}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(CourseCard); 