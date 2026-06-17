import { updateUserById } from "../data/mockUsers";

export function enrollCourse(user, course) {
  return updateUserById(user.id, (u) => {
    const alreadyEnrolled = u.courses?.some((c) => c.courseId === course.id);

    if (alreadyEnrolled) return u;

    return {
      ...u,
      courses: [
        ...(u.courses || []),
        {
          courseId: course.id,
          progress: 0,
          status: "ENROLLED",
        },
      ],
      updatedAt: new Date(),
    };
  });
}
