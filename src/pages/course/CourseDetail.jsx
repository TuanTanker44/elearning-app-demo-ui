import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

import courses from "../../data/courses.json";
import { useAuth } from "../../context/AuthContext";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [hoverFinish, setHoverFinish] = useState(false);

  const course = useMemo(() => {
    return courses.find((c) => String(c.id) === String(id));
  }, [id]);

  const enrolled = user?.courses?.find(
    (c) => String(c.courseId) === String(id),
  );

  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    if (course?.lessons?.length) {
      setActiveLesson(course.lessons[0]);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="p-10 text-center text-red-500">Course not found</div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
        {/* TOP ACTION */}

        <div
          className="
          flex
          items-center
          justify-between
          mb-6
        "
        >
          <Button
            onClick={() => navigate("/student/dashboard")}
            className="
    flex
    items-center
    gap-2
    bg-blue-600
    text-white
    hover:bg-blue-700
    transition
  "
          >
            <ArrowLeft size={18} />
            Back
          </Button>
        </div>

        {/* HEADER */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold">{course.title}</h1>

          <p
            className="
            text-sm
            text-muted-foreground
            mt-1
          "
          >
            {course.instructor}
            {" • "}
            {course.category}
            {" • "}
            {course.level}
          </p>
        </div>

        {/* CONTENT */}

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
        >
          {/* VIDEO AREA */}

          <div
            className="
            lg:col-span-2
            space-y-5
          "
          >
            <Card
              className="
                overflow-hidden
                border
                shadow-sm
              "
            >
              <CardContent className="p-0">
                <div
                  className="
                    aspect-video
                    bg-black
                    flex
                    items-center
                    justify-center
                  "
                >
                  <video
                    key={activeLesson?.id}
                    src={activeLesson?.videoUrl}
                    controls
                    className="
                      w-full
                      h-full
                      object-contain
                    "
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent
                className="
                  p-5
                  space-y-2
                "
              >
                <h2 className="text-lg font-semibold">{activeLesson?.title}</h2>

                <p
                  className="
                  text-xs
                  text-muted-foreground
                "
                >
                  Duration: {activeLesson?.duration}
                </p>

                <p className="text-sm">{course.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* LESSON SIDE */}

          <div className="space-y-5">
            <Card>
              <CardContent className="p-4">
                <div
                  className="
                  flex
                  justify-between
                  mb-3
                "
                >
                  <h3 className="font-semibold">Lessons</h3>

                  {enrolled && (
                    <span
                      className="
                      text-xs
                      text-green-600
                    "
                    >
                      Enrolled
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {course.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`
                        p-3
                        rounded-md
                        cursor-pointer
                        border
                        transition

                        ${
                          activeLesson?.id === lesson.id
                            ? "bg-blue-50 border-blue-300"
                            : "border-transparent hover:bg-slate-100"
                        }
                      `}
                    >
                      <div className="text-sm font-medium">{lesson.title}</div>

                      <div
                        className="
                        text-xs
                        text-muted-foreground
                      "
                      >
                        {lesson.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-3">
                {enrolled ? (
                  <>
                    <div className="text-sm">
                      Progress:{" "}
                      <span className="font-semibold">
                        {enrolled.progress}%
                      </span>
                    </div>

                    {enrolled.progress === 100 ? (
                      <Button
                        className="
    w-full
    bg-green-600
    hover:bg-green-700
    text-white
    transition
  "
                        onMouseEnter={() => setHoverFinish(true)}
                        onMouseLeave={() => setHoverFinish(false)}
                        onClick={() => navigate("/student/certificates")}
                      >
                        {hoverFinish
                          ? "Go to My Certificates"
                          : "You already finished this course!"}
                      </Button>
                    ) : (
                      <Button
                        className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
            "
                        onClick={() => navigate(`/courses/${course.id}/study`)}
                      >
                        Continue Learning
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
        "
                    onClick={() => navigate(`/courses/${course.id}/enroll`)}
                  >
                    Enroll Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
