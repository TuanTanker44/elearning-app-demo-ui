import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import StudentDashboard from "../pages/student/Dashboard";

import CourseDetail from "../pages/course/CourseDetail";
import CourseEnroll from "../pages/course/CourseEnroll";
import CourseStudy from "../pages/course/CourseStudy";
import SearchResults from "../pages/course/SearchResults";

import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";

import MyLearning from "../pages/student/MyLearning";
import StudentCourses from "../pages/student/StudentCourses";
import Certificates from "../pages/student/Certificates";
import TransactionHistory from "../pages/student/TransactionHistory";

import { useAuth } from "../context/AuthContext";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            user?.role === "STUDENT" ? (
              <Navigate to="/student/dashboard" replace />
            ) : user ? (
              <Navigate to="/login" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />

        {/* STUDENT ROUTES */}

        {user?.role === "STUDENT" && (
          <>
            <Route path="/student/dashboard" element={<StudentDashboard />} />

            <Route path="/courses/:id" element={<CourseDetail />} />

            <Route path="/courses/:id/enroll" element={<CourseEnroll />} />

            <Route path="/courses/:id/study" element={<CourseStudy />} />

            <Route path="/search" element={<SearchResults />} />

            {/* PROFILE */}

            <Route path="/profile" element={<Profile />} />

            <Route path="/profile/edit" element={<EditProfile />} />

            {/* LEARNING */}

            <Route path="/student/progress" element={<MyLearning />} />

            <Route path="/student/courses" element={<StudentCourses />} />

            <Route path="/student/certificates" element={<Certificates />} />

            <Route path="/student/payment" element={<TransactionHistory />} />
          </>
        )}

        {/* BLOCK INVALID ROUTE */}

        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
