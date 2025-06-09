"use client";
import { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { Button } from "../ui/button";
import { ICourse } from "@/lib/db/models/course";
import { useMobile } from "@/hooks/use-mobile";

interface CourseCarouselProps {
  courses: Partial<ICourse>[];
}

export function CourseCarousel({ courses }: CourseCarouselProps) {
  const [centerIndex, setCenterIndex] = useState(0);
  const isMobile = useMobile();

  // Create a circular array of courses for infinite scrolling
  const circularCourses = useMemo(() => {
    const duplicated = [...courses, ...courses, ...courses];
    const offset = courses.length;
    return duplicated.map((course, index) => ({
      ...course,
      virtualIndex: index - offset
    }));
  }, [courses]);

  // Navigation functions
  const next = () => {
    setCenterIndex((prev) => (prev + 1) % courses.length);
  };

  const prev = () => {
    setCenterIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  // Calculate visible courses based on center index
  const visibleCourses = useMemo(() => {
    const startIdx = centerIndex + courses.length - 1;
    return circularCourses.slice(startIdx, startIdx + 3); // Show 3 cards
  }, [centerIndex, circularCourses, courses.length]);

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    }
    if (isRightSwipe) {
      prev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div 
      className="relative h-[750px] w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cards Container */}
      <div className="absolute inset-0 flex items-start justify-center">
        <div className="relative w-[320px] sm:w-[960px] h-[650px]">
          {/* Navigation Arrows - Positioned on sides */}
          <div className="absolute left-0 right-0 top-[300px] -mx-9 sm:-mx-32 flex justify-between items-center z-20 pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors pointer-events-auto"
              onClick={prev}
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors pointer-events-auto"
              onClick={next}
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>
          </div>

          {visibleCourses.map((course, index) => (
            <CourseCard
              key={`${course._id}-${course.virtualIndex}`}
              course={course}
              isCenter={index === 1}
              index={index}
              active={1}
            />
          ))}
        </div>
      </div>

      {/* Dots Navigation
      <div className="absolute bottom-12 sm:bottom-2 left-0 right-0 flex justify-center z-30">
        <div className="flex gap-2 p-2 rounded-full bg-zinc-900/50 backdrop-blur-sm">
          {courses.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === centerIndex % courses.length
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => setCenterIndex(index)}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}