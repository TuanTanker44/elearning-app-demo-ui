import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { PlayCircle } from "lucide-react";

export default function CourseCard({
  course,
  variant = "default",
  enrolledProgress = null,
}) {
  const navigate = useNavigate();

  const isSlider = variant === "slider";
  const progress = enrolledProgress ?? course?.progress ?? 0;
  const isEnrolled = progress > 0;

  function handleClick() {
    navigate(`/courses/${course.id}`);
  }

  // -----------------------------
  // LEVEL COLOR MAPPING
  // -----------------------------
  const levelStyle = {
    Beginner: "bg-green-100 text-green-700 border-green-300",
    Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Advanced: "bg-red-100 text-red-700 border-red-300",
  };

  const progressColor = {
    Beginner: "[&>div]:bg-green-500",
    Intermediate: "[&>div]:bg-yellow-500",
    Advanced: "[&>div]:bg-red-500",
  };

  return (
    <Card
      onClick={handleClick}
      className={`
        relative
        group
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        overflow-hidden

        ${
          course.level === "Beginner"
            ? "hover:ring-2 hover:ring-green-200"
            : course.level === "Intermediate"
              ? "hover:ring-2 hover:ring-yellow-200"
              : "hover:ring-2 hover:ring-red-200"
        }

        ${isSlider ? "min-h-[320px]" : ""}
      `}
    >
      {/* overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/0
          group-hover:bg-black/40
          transition
          flex
          items-center
          justify-center
          opacity-0
          group-hover:opacity-100
        "
      >
        <div className="text-white font-semibold flex items-center gap-2">
          <PlayCircle size={18} />
          {isEnrolled ? "Continue Learning" : "View Course"}
        </div>
      </div>

      {/* header */}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>

          {/* LEVEL BADGE */}
          <Badge
            className={`
              border
              ${levelStyle[course.level]}
            `}
          >
            {course.level}
          </Badge>
        </div>
      </CardHeader>

      {/* body */}
      <CardContent className="space-y-4">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="
            w-full
            h-40
            object-cover
            rounded-md
          "
        />

        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        {/* progress */}
        {!isSlider && isEnrolled && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>

            <Progress
              value={progress}
              className={progressColor[course.level]}
            />
          </div>
        )}

        {/* meta */}
        <div className="text-xs text-muted-foreground flex justify-between">
          <span>{course.duration}</span>
          <span>{course.category}</span>
        </div>

        {isEnrolled && (
          <div className="text-xs text-green-600 font-medium">In progress</div>
        )}
      </CardContent>
    </Card>
  );
}
