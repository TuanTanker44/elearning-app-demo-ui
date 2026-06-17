import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import courses from "../../data/courses.json";
import { useAuth } from "../../context/AuthContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateUserById } from "../../data/mockUsers";
import { toast } from "sonner";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Enroll() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const course = useMemo(() => {
    return courses.find((c) => String(c.id) === String(id));
  }, [id]);

  if (!course) {
    return (
      <div className="p-10 text-center text-red-500">Course not found</div>
    );
  }

  const price = course.price;
  const tax = course.tax * price;
  const total = price + tax;

  function handleConfirmEnroll() {
    const isFree = Math.abs(total) < 0.01;

    const newTransaction = {
      id: `TXN-${Date.now()}`,

      courseId: course.id,

      price: price,

      tax: Number(tax.toFixed(2)),

      total: Number(total.toFixed(2)),

      status: isFree ? "COMPLETED" : "PENDING",

      paymentMethod: isFree ? "FREE" : "WAITING_PAYMENT",

      createdAt: new Date().toISOString(),
    };

    const updatedUser = updateUserById(user.id, (u) => {
      const alreadyEnrolled = u.courses?.some((c) => c.courseId === course.id);

      // đã enroll thì không thêm lại
      if (alreadyEnrolled) {
        return u;
      }

      return {
        ...u,

        courses: [
          ...(u.courses || []),

          {
            courseId: course.id,
            progress: 1,
          },
        ],

        transactions: [...(u.transactions || []), newTransaction],

        updatedAt: new Date(),
      };
    });

    // sync context
    updateUser(updatedUser);

    if (isFree) {
      toast.success("You have successfully joined this free course!", {
        description: course.title,
      });

      navigate(`/courses/${course.id}/study`);

      return;
    }

    // paid course
    toast.info("Redirecting to payment...", {
      description: course.title,
    });

    navigate(`/courses/${course.id}/payment`);
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Enroll Course</h1>
          <p className="text-sm text-muted-foreground">
            Complete your enrollment
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT - COURSE INFO */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-56 object-cover rounded-md"
                />

                <p className="text-sm text-slate-600">{course.description}</p>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Instructor: {course.instructor}</p>
                  <p>Level: {course.level}</p>
                  <p>Duration: {course.duration}</p>
                  <p>Category: {course.category}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT - PAYMENT SUMMARY */}
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Course price</span>
                  <span>${price}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full mt-4" onClick={handleConfirmEnroll}>
                  Confirm Enrollment
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  Back to Course
                </Button>

                <p className="text-xs text-muted-foreground mt-2">
                  By enrolling, you agree to our Terms of Service.
                </p>
              </CardContent>
            </Card>

            {/* USER INFO */}
            <Card>
              <CardHeader>
                <CardTitle>Your Account</CardTitle>
              </CardHeader>

              <CardContent className="text-sm space-y-1">
                <p>Name: {user?.fullName}</p>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
