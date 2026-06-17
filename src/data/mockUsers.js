export const mockUsers = [
  {
    id: 1,
    fullName: "Student Demo",
    email: "student@test.com",
    password: "123456",
    phone: "0900000001",
    avatar: "",
    role: "STUDENT",
    status: "ACTIVE",

    courses: [
      {
        courseId: 101,
        progress: 75,
      },
      {
        courseId: 102,
        progress: 40,
      },
      {
        courseId: 103,
        progress: 10,
      },
      {
        courseId: 104,
        progress: 100,
      },
      {
        courseId: 110,
        progress: 100,
      },
    ],

    certificates: [
      {
        id: 1,
        courseId: 104,
        title: "JavaScript Advanced",
        issuedAt: "2026-06-10",
      },
      {
        id: 2,
        courseId: 110,
        title: "Fullstack Web Development",
        issuedAt: "2026-06-12",
      },
    ],

    transactions: [
      {
        id: "TXN-20260610-001",

        courseId: 101,

        price: 0,
        tax: 0,
        total: 0,

        status: "COMPLETED",

        paymentMethod: "FREE",

        createdAt: "2026-06-10T08:30:00",
      },

      {
        id: "TXN-20260611-002",

        courseId: 102,

        price: 49.99,
        tax: 5.0,
        total: 54.99,

        status: "COMPLETED",

        paymentMethod: "VISA",

        createdAt: "2026-06-11T10:20:00",
      },

      {
        id: "TXN-20260612-003",

        courseId: 103,

        price: 29.99,
        tax: 3.0,
        total: 32.99,

        status: "COMPLETED",

        paymentMethod: "PAYPAL",

        createdAt: "2026-06-12T15:45:00",
      },

      {
        id: "TXN-20260613-004",

        courseId: 104,

        price: 69.99,
        tax: 7.0,
        total: 76.99,

        status: "COMPLETED",

        paymentMethod: "MASTER_CARD",

        createdAt: "2026-06-13T09:10:00",
      },

      {
        id: "TXN-20260614-005",

        courseId: 110,

        price: 99.99,
        tax: 10.0,
        total: 109.99,

        status: "COMPLETED",

        paymentMethod: "VISA",

        createdAt: "2026-06-14T18:00:00",
      },

      {
        id: "TXN-20260615-006",

        courseId: 105,

        price: 79.99,
        tax: 8.0,
        total: 87.99,

        status: "PENDING",

        paymentMethod: "BANK_TRANSFER",

        createdAt: "2026-06-15T12:30:00",
      },
    ],

    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 2,
    fullName: "Teacher Demo",
    email: "teacher@test.com",
    password: "123456",
    phone: "0900000002",
    avatar: "",
    role: "TEACHER",
    status: "ACTIVE",

    transactions: [],

    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 3,
    fullName: "Admin Demo",
    email: "admin@test.com",
    password: "123456",
    phone: "0900000003",
    avatar: "",
    role: "ADMIN",
    status: "ACTIVE",

    transactions: [],

    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Helpers
export function updateUserById(userId, updater) {
  const index = mockUsers.findIndex((u) => u.id === userId);

  if (index === -1) return null;

  const updatedUser = updater(mockUsers[index]);

  mockUsers[index] = {
    ...mockUsers[index],
    ...updatedUser,
    updatedAt: new Date(),
  };

  return mockUsers[index];
}
