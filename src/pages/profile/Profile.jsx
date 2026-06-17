import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  User,
  Mail,
  Phone,
  Shield,
  BookOpen,
  Award,
  Clock,
  Edit,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  const navigate = useNavigate();

  if (!user) {
    return <div className="p-10 text-center">User not found</div>;
  }

  const completedCourses =
    user.courses?.filter((course) => course.progress === 100) || [];

  const learningCourses =
    user.courses?.filter((course) => course.progress < 100) || [];

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
            max-w-5xl
            mx-auto
            space-y-6
          "
        >
          {/* HEADER PROFILE */}

          <Card>
            <CardContent
              className="
                p-6
                flex
                flex-col
                md:flex-row
                gap-6
                items-center
              "
            >
              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <User size={50} className="text-blue-600" />
                )}
              </div>

              <div className="flex-1">
                <h1
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  {user.fullName}
                </h1>

                <p
                  className="
                    text-muted-foreground
                  "
                >
                  {user.role}
                </p>

                <Button
                  onClick={() => navigate("/profile/edit")}
                  className="
                    mt-4
                    bg-blue-600
                    hover:bg-blue-700
                  "
                >
                  <Edit className="mr-2" size={16} />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* INFORMATION */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>

              <CardContent
                className="
                  space-y-4
                "
              >
                <InfoRow
                  icon={<Mail size={18} />}
                  label="Email"
                  value={user.email}
                />

                <InfoRow
                  icon={<Phone size={18} />}
                  label="Phone"
                  value={user.phone}
                />

                <InfoRow
                  icon={<Shield size={18} />}
                  label="Role"
                  value={user.role}
                />
              </CardContent>
            </Card>

            {/* STATISTICS */}

            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
              </CardHeader>

              <CardContent
                className="
                  grid
                  grid-cols-2
                  gap-4
                "
              >
                <StatCard
                  icon={<BookOpen />}
                  title="Courses"
                  value={user.courses?.length || 0}
                />

                <StatCard
                  icon={<Award />}
                  title="Certificates"
                  value={user.certificates?.length || 0}
                />

                <StatCard
                  icon={<Clock />}
                  title="Learning"
                  value={learningCourses.length}
                />

                <StatCard
                  icon={<Award />}
                  title="Finished"
                  value={completedCourses.length}
                />
              </CardContent>
            </Card>
          </div>

          {/* CERTIFICATE */}

          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
            </CardHeader>

            <CardContent>
              {user.certificates?.length ? (
                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-4
                  "
                >
                  {user.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="
                          border
                          rounded-lg
                          p-4
                          bg-yellow-50
                        "
                    >
                      <h3
                        className="
                            font-semibold
                            text-yellow-700
                          "
                      >
                        🏆 {cert.title}
                      </h3>

                      <p
                        className="
                            text-sm
                            text-muted-foreground
                          "
                      >
                        Issued: {cert.issuedAt}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No certificates yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div
      className="
 flex
 gap-3
 items-center
"
    >
      {icon}

      <div>
        <p className="text-xs text-muted-foreground">{label}</p>

        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div
      className="
 border
 rounded-lg
 p-4
 flex
 flex-col
 gap-2
"
    >
      <div className="text-blue-600">{icon}</div>

      <p className="text-sm text-muted-foreground">{title}</p>

      <p
        className="
text-2xl
font-bold
"
      >
        {value}
      </p>
    </div>
  );
}
