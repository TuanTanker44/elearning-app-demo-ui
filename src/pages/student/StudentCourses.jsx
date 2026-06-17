import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import CourseCard from "../../components/course/CourseCard";

import courses from "../../data/courses.json";
import { useAuth } from "../../context/AuthContext";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Trash2, Search, BookOpen, X, CheckCircle } from "lucide-react";

export default function StudentCourses() {
  const { user, updateUser } = useAuth();

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const [filter, setFilter] = useState("all");

  // course waiting remove
  const [deleteCourse, setDeleteCourse] = useState(null);

  // floating message
  const [message, setMessage] = useState("");

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
    return enrolledCourses.filter((course) => {
      const matchKeyword = course.title
        .toLowerCase()
        .includes(keyword.toLowerCase());

      if (filter === "completed")
        return matchKeyword && course.progress === 100;

      if (filter === "learning") return matchKeyword && course.progress < 100;

      return matchKeyword;
    });
  }, [enrolledCourses, keyword, filter]);

  function removeCourse() {
    if (!deleteCourse) return;

    const updatedUser = {
      ...user,

      courses: user.courses.filter((c) => c.courseId !== deleteCourse.id),

      updatedAt: new Date(),
    };

    updateUser(updatedUser);

    setDeleteCourse(null);

    setMessage(`Removed ${deleteCourse.title}`);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

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
          max-w-7xl
          mx-auto
          space-y-6
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
              My Courses
            </h1>

            <p
              className="
              text-muted-foreground
            "
            >
              Manage your enrolled courses
            </p>
          </div>

          {/* SEARCH FILTER */}

          <div
            className="
            flex
            flex-col
            md:flex-row
            gap-4
          "
          >
            <div
              className="
              relative
              flex-1
            "
            >
              <Search
                size={18}
                className="
                  absolute
                  left-3
                  top-3
                  text-muted-foreground
                "
              />

              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search courses..."
                className="
                  pl-10
                "
              />
            </div>

            <div className="flex gap-2">
              {[
                ["all", "All"],
                ["learning", "Learning"],
                ["completed", "Completed"],
              ].map(([key, label]) => (
                <Button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={
                    filter === key
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-white text-black"
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* LIST */}

          {filteredCourses.length === 0 ? (
            <Card>
              <CardContent
                className="
                p-10
                text-center
              "
              >
                No enrolled courses
              </CardContent>
            </Card>
          ) : (
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
            >
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="
                      relative
                      overflow-hidden
                      hover:shadow-xl
                      transition
                    "
                >
                  <CardContent
                    className="
                      p-4
                      space-y-4
                    "
                  >
                    <div
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="
                          cursor-pointer
                        "
                    >
                      <CourseCard course={course} />
                    </div>

                    {/* STATUS */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        text-sm
                      "
                    >
                      {course.progress === 100 ? (
                        <span
                          className="
                            flex
                            gap-1
                            text-green-600
                            font-medium
                          "
                        >
                          <CheckCircle size={16} />
                          Completed
                        </span>
                      ) : (
                        <span
                          className="
                            text-blue-600
                          "
                        >
                          {course.progress}% Learning
                        </span>
                      )}
                    </div>

                    <div
                      className="
                        flex
                        gap-2
                      "
                    >
                      <Button
                        className="
                            flex-1
                            bg-blue-600
                            hover:bg-blue-700
                          "
                        onClick={() => navigate(`/courses/${course.id}/study`)}
                      >
                        <BookOpen size={16} className="mr-2" />
                        Continue
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() => setDeleteCourse(course)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FLOAT MESSAGE */}

      {message && (
        <div
          className="
          fixed
          right-6
          bottom-6
          bg-green-600
          text-white
          px-5
          py-3
          rounded-xl
          shadow-xl
          animate-in
          slide-in-from-bottom
        "
        >
          {message}
        </div>
      )}

      {/* CONFIRM FLOAT BOX */}

      {deleteCourse && (
        <div
          className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
      "
          onClick={() => setDeleteCourse(null)}
        >
          <div
            className="
          w-[90%]
          max-w-md
          bg-white
          rounded-xl
          shadow-2xl
          p-6
          animate-in
          zoom-in-95
          duration-200
        "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}

            <div
              className="
            flex
            justify-between
            items-center
            mb-4
          "
            >
              <h2
                className="
              text-xl
              font-bold
              text-red-600
            "
              >
                Remove Course
              </h2>

              <X
                size={20}
                className="
              cursor-pointer
              text-gray-500
              hover:text-black
            "
                onClick={() => setDeleteCourse(null)}
              />
            </div>

            {/* Content */}

            <p
              className="
            text-sm
            text-muted-foreground
            mb-6
          "
            >
              Are you sure you want to remove
              <span
                className="
              font-semibold
              text-black
            "
              >
                {" "}
                {deleteCourse.title}
              </span>
              ?
              <br />
              Your learning progress will be deleted.
            </p>

            {/* Action */}

            <div
              className="
            flex
            justify-end
            gap-3
          "
            >
              <Button variant="outline" onClick={() => setDeleteCourse(null)}>
                Cancel
              </Button>

              <Button variant="destructive" onClick={removeCourse}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
