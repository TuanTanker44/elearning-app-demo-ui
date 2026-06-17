import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import CourseCard from "../../components/course/CourseCard";

import courses from "../../data/courses.json";
import { useAuth } from "../../context/AuthContext";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { BookOpen, CheckCircle, Clock } from "lucide-react";

export default function MyLearning() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");

  const enrolledCourses = useMemo(() => {
    if (!user?.courses) return [];

    return user.courses
      .map((item) => {
        const course = courses.find((c) => c.id === item.courseId);

        if (!course) return null;

        return {
          ...course,
          progress: item.progress,
        };
      })
      .filter(Boolean);
  }, [user]);

  const filteredCourses = useMemo(() => {
    if (filter === "learning") {
      return enrolledCourses.filter((c) => c.progress < 100);
    }

    if (filter === "completed") {
      return enrolledCourses.filter((c) => c.progress === 100);
    }

    return enrolledCourses;
  }, [filter, enrolledCourses]);

  return (
    <DashboardLayout>
      <div
        className="
          min-h-screen
          bg-slate-100
          p-8
        "
      >
        <div
          className="
            max-w-6xl
            mx-auto
            space-y-8
          "
        >
          {/* HEADER */}

          <div>
            <h1
              className="
                text-3xl
                font-bold
              "
            >
              My Learning
            </h1>

            <p
              className="
                text-muted-foreground
              "
            >
              Manage your enrolled courses
            </p>
          </div>

          {/* FILTER */}

          <div
            className="
              flex
              gap-3
              flex-wrap
            "
          >
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              <BookOpen size={16} />
              All
            </FilterButton>

            <FilterButton
              active={filter === "learning"}
              onClick={() => setFilter("learning")}
            >
              <Clock size={16} />
              Learning
            </FilterButton>

            <FilterButton
              active={filter === "completed"}
              onClick={() => setFilter("completed")}
            >
              <CheckCircle size={16} />
              Completed
            </FilterButton>
          </div>

          {/* COURSE GRID */}

          {filteredCourses.length === 0 ? (
            <Card>
              <CardContent
                className="
                  p-10
                  text-center
                  text-muted-foreground
                "
              >
                No courses found
              </CardContent>
            </Card>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function FilterButton({ active, children, onClick }) {
  return (
    <Button
      onClick={onClick}
      className={`
flex
items-center
gap-2

${
  active
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-white text-slate-700 hover:bg-slate-100"
}

`}
    >
      {children}
    </Button>
  );
}
