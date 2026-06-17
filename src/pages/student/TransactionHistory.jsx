import { useMemo, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import courses from "../../data/courses.json";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Search,
  CreditCard,
  CalendarDays,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function TransactionHistory() {
  const { user } = useAuth();

  const [keyword, setKeyword] = useState("");

  const [status, setStatus] = useState("ALL");

  const transactions = useMemo(() => {
    if (!user?.transactions) return [];

    return user.transactions
      .map((tx) => {
        const course = courses.find((c) => c.id === tx.courseId);

        return {
          ...tx,
          course,
        };
      })
      .filter(Boolean);
  }, [user]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchKeyword = tx.course?.title
        ?.toLowerCase()
        .includes(keyword.toLowerCase());

      const matchStatus = status === "ALL" || tx.status === status;

      return matchKeyword && matchStatus;
    });
  }, [transactions, keyword, status]);

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
          max-w-6xl
          mx-auto
          space-y-6
        "
        >
          {/* HEADER */}

          <div>
            <h1
              className="
              text-3xl
              font-bold
            "
            >
              Transaction History
            </h1>

            <p
              className="
              text-muted-foreground
            "
            >
              View your course payment records
            </p>
          </div>

          {/* FILTER */}

          <Card>
            <CardContent
              className="
              p-4
              flex
              flex-col
              md:flex-row
              gap-4
            "
            >
              <div
                className="
                relative
                flex-1
              "
              >
                <Search
                  size={18}
                  className="
                    absolute
                    left-3
                    top-2.5
                    text-muted-foreground
                  "
                />

                <Input
                  placeholder="Search course..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                {["ALL", "COMPLETED", "PENDING"].map((item) => (
                  <Button
                    key={item}
                    onClick={() => setStatus(item)}
                    className={
                      status === item ? "bg-blue-600" : "bg-white text-black"
                    }
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* LIST */}

          {filteredTransactions.length === 0 ? (
            <Card>
              <CardContent
                className="
                  p-10
                  text-center
                "
              >
                No transactions found
              </CardContent>
            </Card>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
              "
            >
              {filteredTransactions.map((tx) => (
                <Card
                  key={tx.id}
                  className="
                        hover:shadow-lg
                        transition
                      "
                >
                  <CardHeader>
                    <div
                      className="
                          flex
                          justify-between
                          items-start
                        "
                    >
                      <CardTitle>{tx.course?.title}</CardTitle>

                      {tx.status === "COMPLETED" ? (
                        <CheckCircle
                          className="
                                text-green-600
                              "
                          size={22}
                        />
                      ) : (
                        <Clock
                          className="
                                text-yellow-500
                              "
                          size={22}
                        />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent
                    className="
                        space-y-3
                        text-sm
                      "
                  >
                    <div
                      className="
                          flex
                          justify-between
                        "
                    >
                      <span>Transaction ID</span>

                      <b>{tx.id}</b>
                    </div>

                    <div
                      className="
                          flex
                          justify-between
                        "
                    >
                      <span>Price</span>

                      <span>${tx.price}</span>
                    </div>

                    <div
                      className="
                          flex
                          justify-between
                        "
                    >
                      <span>Tax</span>

                      <span>${tx.tax}</span>
                    </div>

                    <div
                      className="
                          flex
                          justify-between
                          font-bold
                          text-base
                        "
                    >
                      <span>Total</span>

                      <span
                        className="
                            text-blue-600
                          "
                      >
                        ${tx.total}
                      </span>
                    </div>

                    <hr />

                    <div
                      className="
                          flex
                          items-center
                          gap-2
                        "
                    >
                      <CreditCard size={16} />

                      {tx.paymentMethod}
                    </div>

                    <div
                      className="
                          flex
                          items-center
                          gap-2
                          text-muted-foreground
                        "
                    >
                      <CalendarDays size={16} />

                      {formatDate(tx.createdAt)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
