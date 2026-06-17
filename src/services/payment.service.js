export function createPaymentSession(course, user) {
  return {
    sessionId: Date.now(),
    courseId: course.id,
    userId: user.id,
    amount: course.price + course.price * course.tax,
    status: "PENDING",
  };
}
