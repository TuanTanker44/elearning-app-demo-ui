import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import courses from "../../data/courses.json";

import { useAuth } from "../../context/AuthContext";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Progress } from "@/components/ui/progress";

import { CheckCircle, PlayCircle, ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function CourseStudy() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user, updateUser } = useAuth();

  const course = useMemo(() => {
    return courses.find((c) => String(c.id) === String(id));
  }, [id]);

  const enrolled = user?.courses?.find(
    (c) => String(c.courseId) === String(id),
  );

  const [activeLesson, setActiveLesson] = useState(course?.lessons?.[0]);

  if (!course) {
    return <div className="p-10">Course not found</div>;
  }

  if (!enrolled) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center">
          <h2 className="text-xl font-bold">You are not enrolled</h2>

          <Button
            className="mt-4"
            onClick={() => navigate(`/courses/${id}/enroll`)}
          >
            Enroll now
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  function completeLesson() {
    const currentIndex = course.lessons.findIndex(
      (l) => l.id === activeLesson.id,
    );

    const percent = Math.round(
      ((currentIndex + 1) / course.lessons.length) * 100,
    );

    const updatedUser = {
      ...user,

      courses: user.courses.map((c) =>
        c.courseId === course.id
          ? {
              ...c,
              progress: Math.max(c.progress, percent),
            }
          : c,
      ),

      updatedAt: new Date(),
    };

    updateUser(updatedUser);
  }

  return (
    <DashboardLayout>
      <div
        className="
      min-h-screen
      bg-slate-100
      p-6
      "
      >
        {/* HEADER */}

        <div
          className="
        flex
        justify-between
        mb-6
        "
        >
          <div>
            <h1
              className="
            text-3xl
            font-bold
            "
            >
              {course.title}
            </h1>

            <p
              className="
            text-muted-foreground
            "
            >
              {course.instructor}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
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

        <div
          className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
        "
        >
          {/* VIDEO */}

          <div
            className="
          lg:col-span-2
          space-y-5
          "
          >
            <Card
              className="
            overflow-hidden
            "
            >
              <CardContent className="p-0">
                <div
                  className="
                aspect-video
                bg-black
                "
                >
                  <video
                    key={activeLesson.id}
                    src={activeLesson.videoUrl}
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
              <CardContent className="p-5 space-y-3">
                <h2
                  className="
                text-xl
                font-bold
                "
                >
                  {activeLesson.title}
                </h2>

                <p
                  className="
                text-sm
                text-muted-foreground
                "
                >
                  Duration: {activeLesson.duration}
                </p>

                <Button onClick={completeLesson}>
                  <CheckCircle size={16} className="mr-2" />
                  Complete lesson
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* LESSON LIST */}

          <Card>
            <CardHeader>
              <CardTitle>Lessons</CardTitle>

              <Progress value={enrolled.progress} />

              <p className="text-sm">Progress: {enrolled.progress}%</p>
            </CardHeader>

            <CardContent className="space-y-2">
              {course.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`
                p-3
                rounded-md
                cursor-pointer
                border

                ${
                  activeLesson.id === lesson.id
                    ? "bg-blue-50 border-blue-400"
                    : "hover:bg-slate-100"
                }
                `}
                >
                  <div
                    className="
                  flex
                  items-center
                  gap-2
                  "
                  >
                    <PlayCircle size={16} />

                    <span>{lesson.title}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
