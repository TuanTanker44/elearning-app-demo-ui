import DashboardLayout from "../../components/layout/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

import CourseCard from "../../components/course/CourseCard";

import courses from "../../data/courses.json";

import { BookOpen, TrendingUp, Award } from "lucide-react";

import { useState, useEffect } from "react";

import CertificateCard from "../../components/certificate/CertificateCard";

import CourseSlider from "../../components/course/CourseSlider";

export default function StudentDashboard() {
  const [selectedCard, setSelectedCard] = useState("courses");
  const { user, logout } = useAuth();

  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    if (!user?.courses) {
      setMyCourses([]);
      return;
    }

    const mappedCourses = user.courses
      .map((item) => {
        const course = courses.find((c) => c.id === item.courseId);

        if (!course) return null;

        return {
          ...course,
          progress: item.progress,
        };
      })
      .filter(Boolean);

    setMyCourses(mappedCourses);
  }, [user]);

  const inProgressCourses = myCourses.filter((course) => course.progress < 100);

  const completedCourses = myCourses.filter(
    (course) => course.progress === 100,
  );

  const certificates = user?.certificates || [];

  const navigate = useNavigate();

  const renderCourses = () => {
    if (selectedCard === "progress") {
      return inProgressCourses;
    }

    return myCourses;
  };

  function handleLogout() {
    logout();

    navigate("/login");
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
flex
justify-between
items-center
mb-8
"
        >
          <div>
            <h1
              className="
text-3xl
font-bold
"
            >
              Student Dashboard
            </h1>

            <p>Welcome, {user?.fullName} !</p>
          </div>
        </div>

        <div
          className="
    space-y-8
  "
        >
          {/* Stats cards */}

          <div
            className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      w-full
    "
          >
            <Card
              onClick={() => setSelectedCard("courses")}
              className={`
        w-full
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-xl
        hover:bg-blue-50

        ${
          selectedCard === "courses"
            ? "border-blue-500 bg-blue-50 shadow-md"
            : ""
        }
      `}
            >
              <CardHeader>
                <div
                  className="
          flex
          items-center
          justify-between
        "
                >
                  <CardTitle>My Courses</CardTitle>

                  <BookOpen
                    size={28}
                    className="
              text-blue-600
            "
                  />
                </div>
              </CardHeader>

              <CardContent
                className="
          text-blue-600
          font-semibold
        "
              >
                {myCourses.length} courses enrolled
              </CardContent>
            </Card>

            <Card
              onClick={() => setSelectedCard("progress")}
              className={`
        w-full
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-xl
        hover:bg-green-50

        ${
          selectedCard === "progress"
            ? "border-green-500 bg-green-50 shadow-md"
            : ""
        }
      `}
            >
              <CardHeader>
                <div
                  className="
          flex
          items-center
          justify-between
        "
                >
                  <CardTitle>Progress</CardTitle>

                  <TrendingUp
                    size={28}
                    className="
              text-green-600
            "
                  />
                </div>
              </CardHeader>

              <CardContent
                className="
          text-green-600
          font-semibold
        "
              >
                {Math.round(
                  inProgressCourses.reduce(
                    (acc, course) => acc + course.progress,
                    0,
                  ) / inProgressCourses.length || 0,
                )}
                %
              </CardContent>
            </Card>

            <Card
              onClick={() => setSelectedCard("certificates")}
              className={`
        w-full
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-xl
        hover:bg-yellow-50

        ${
          selectedCard === "certificates"
            ? "border-yellow-500 bg-yellow-50 shadow-md"
            : ""
        }
      `}
            >
              <CardHeader>
                <div
                  className="
          flex
          items-center
          justify-between
        "
                >
                  <CardTitle>Certificates</CardTitle>

                  <Award
                    size={28}
                    className="
              text-yellow-500
            "
                  />
                </div>
              </CardHeader>

              <CardContent
                className="
          text-yellow-600
          font-semibold
        "
              >
                {certificates.length} earned
              </CardContent>
            </Card>
          </div>

          {/* Courses */}

          <div
            className="
      grid
      grid-cols-1
      md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
      gap-6
    "
          >
            {selectedCard !== "certificates" &&
              renderCourses().map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            {selectedCard === "certificates" && (
              <div
                className="
grid
grid-cols-1
md:grid-cols-3
gap-6
col-span-full
"
              >
                {certificates.map((cert) => {
                  const course = courses.find((c) => c.id === cert.courseId);

                  return (
                    <Card
                      key={cert.id}
                      className="
hover:shadow-lg
transition
border-yellow-400
"
                    >
                      <CardHeader>
                        <CardTitle
                          className="
text-yellow-600
"
                        >
                          🏆 {cert.title} Certificate
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <CertificateCard certificate={cert} course={course} />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
          <CourseSlider />
        </div>
      </div>
    </DashboardLayout>
  );
}
