import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { User, Save, ArrowLeft } from "lucide-react";

export default function EditProfile() {
  const { user, updateUser } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
    password: user?.password || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedUser = {
      ...user,
      ...form,
      updatedAt: new Date(),
    };

    updateUser(updatedUser);

    navigate("/dashboard");
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
          max-w-3xl
          mx-auto
        "
        >
          {/* BACK */}

          <Button
            onClick={() => navigate(-1)}
            className="
              mb-6
              bg-blue-600
              hover:bg-blue-700
            "
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card>
            <CardHeader>
              <CardTitle
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <User size={22} />
                Edit Profile
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="
                  space-y-5
                "
              >
                {/* Avatar */}

                <div>
                  <Label>Avatar URL</Label>

                  <Input
                    name="avatar"
                    value={form.avatar}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                {/* Name */}

                <div>
                  <Label>Full Name</Label>

                  <Input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}

                <div>
                  <Label>Email</Label>

                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}

                <div>
                  <Label>Phone</Label>

                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}

                <div>
                  <Label>Password</Label>

                  <Input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                  "
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
