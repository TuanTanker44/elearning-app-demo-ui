import { useState } from "react";

import AuthLayout from "../../components/layout/AuthLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    role: "STUDENT",
  });

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    console.log({
      ...form,
      status: "ACTIVE",
    });

    alert("Register demo success");
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
        Create account
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label>Full name</Label>

          <Input
            name="fullName"
            value={form.fullName}
            onChange={change}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <Label>Email</Label>

          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={change}
            placeholder="example@email.com"
          />
        </div>

        <div>
          <Label>Password</Label>

          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={change}
          />
        </div>

        <div>
          <Label>Confirm password</Label>

          <Input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={change}
          />
        </div>

        <div>
          <Label>Phone</Label>

          <Input name="phone" value={form.phone} onChange={change} />
        </div>

        <div>
          <Label>Role</Label>

          <Select
            value={form.role}
            onValueChange={(value) =>
              setForm({
                ...form,
                role: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="STUDENT">Student</SelectItem>

              <SelectItem value="TEACHER">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="
            w-full
            mt-4
          "
        >
          Register
        </Button>

        <p
          className="
            text-center
            text-sm
          "
        >
          Already have account?{" "}
          <a
            href="/login"
            className="
              text-blue-600
              font-medium
              hover:text-blue-800
              hover:underline
            "
          >
            Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
