import { useEffect, useRef, useState } from "react";
import courses from "../../data/courses.json";
import CourseCard from "./CourseCard";
import { useAuth } from "../../context/AuthContext";

export default function CourseSlider() {
  const ref = useRef(null);

  const intervalRef = useRef(null);
  const idleTimerRef = useRef(null);

  const bufferCountRef = useRef(1);

  const speed = 1;

  const { user } = useAuth();

  const recommendedCourses = courses
    .filter((c) => !user?.courses?.some((u) => u.courseId === c.id))
    .slice(0, 10);

  const [list, setList] = useState(recommendedCourses);

  const isNearEnd = (el) => {
    const threshold = 250;
    return el.scrollLeft + el.clientWidth >= el.scrollWidth - threshold;
  };

  const appendBuffer = () => {
    setList((prev) => [...prev, ...recommendedCourses]);

    bufferCountRef.current += 1;
  };

  const trimBuffer = () => {
    if (bufferCountRef.current > 2) {
      setList(recommendedCourses);
      bufferCountRef.current = 1;

      const el = ref.current;
      if (el) el.scrollLeft = 0;
    }
  };

  const startAutoScroll = () => {
    const el = ref.current;
    if (!el) return;

    stopAutoScroll();

    intervalRef.current = setInterval(() => {
      if (!el) return;

      el.scrollLeft += speed;

      if (isNearEnd(el)) {
        appendBuffer();
      }

      trimBuffer();
    }, 16);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      startAutoScroll();
    }, 30000);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    startAutoScroll();

    const handleUserAction = () => {
      stopAutoScroll();
      resetIdleTimer();
    };

    el.addEventListener("mousedown", handleUserAction);
    el.addEventListener("touchstart", handleUserAction);
    el.addEventListener("wheel", handleUserAction);

    return () => {
      stopAutoScroll();
      clearTimeout(idleTimerRef.current);

      el.removeEventListener("mousedown", handleUserAction);
      el.removeEventListener("touchstart", handleUserAction);
      el.removeEventListener("wheel", handleUserAction);
    };
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">🔥 Recommended for you</h2>

      <div
        ref={ref}
        className="
          flex
          gap-4
          overflow-x-auto
          pb-2
          items-stretch
          scrollbar-hide
          scroll-smooth
        "
      >
        {list.map((course, index) => (
          <div
            key={`${course.id}-${index}`}
            className="
              min-w-[280px]
              flex
            "
          >
            <CourseCard course={course} variant="slider" />
          </div>
        ))}
      </div>
    </div>
  );
}
