import { useState } from "react";

import AuthLayout from "../../components/layout/AuthLayout";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { mockUsers } from "../../data/mockUsers";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    setLoading(true);

    setError("");

    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === form.email && u.password === form.password,
      );

      if (!user) {
        setError("Email hoặc password sai");
      } else {
        login(user);

        console.log("USER:", user);

        navigate("/student/dashboard");
      }

      setLoading(false);
    }, 800);
  }

  return (
    <AuthLayout>
      <h2
        className="
          text-3xl
          font-bold
          text-center
          mb-6
        "
      >
        Login
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label>Email</Label>

          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />
        </div>

        <div>
          <Label>Password</Label>

          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button disabled={loading} className="w-full">
          {loading ? "Loading..." : "Login"}
        </Button>

        <p
          className="
            text-center
            mt-4
            text-sm
          "
        >
          Don't have account?{" "}
          <a
            href="/register"
            className="
              text-blue-600
              font-medium
              hover:text-blue-800
              hover:underline
            "
          >
            Register
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
