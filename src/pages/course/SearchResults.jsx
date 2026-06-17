import { useSearchParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

import courses from "../../data/courses.json";

import DashboardLayout from "../../components/layout/DashboardLayout";

import CourseCard from "../../components/course/CourseCard";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Search } from "lucide-react";

export default function SearchResult() {
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const initialKeyword = params.get("keyword") || "";

  const initialCategory = params.get("category") || "ALL";

  const [keyword, setKeyword] = useState(initialKeyword);

  const [category, setCategory] = useState(initialCategory);

  const categories = ["ALL", ...new Set(courses.map((c) => c.category))];

  const results = useMemo(() => {
    return courses.filter((course) => {
      const matchKeyword = course.title
        .toLowerCase()
        .includes(keyword.toLowerCase());

      const matchCategory = category === "ALL" || course.category === category;

      return matchKeyword && matchCategory;
    });
  }, [keyword, category]);

  useEffect(() => {
    setKeyword(params.get("keyword") || "");

    setCategory(params.get("category") || "ALL");
  }, [params]);

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
          <div>
            <h1
              className="
              text-3xl
              font-bold
            "
            >
              Search Result
            </h1>

            <p
              className="
              text-muted-foreground
            "
            >
              {results.length} courses found
            </p>
          </div>

          {/* SEARCH */}

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
                  top-2
                  text-muted-foreground
                  "
                />

                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="
                  Search course...
                  "
                  className="
                  pl-10
                  "
                />
              </div>

              <div
                className="
                flex
                gap-2
                flex-wrap
              "
              >
                {categories.map((c) => (
                  <Button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={
                      category === c ? "bg-blue-600" : "bg-white text-black"
                    }
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {results.length === 0 ? (
            <Card>
              <CardContent
                className="
                p-10
                text-center
              "
              >
                No courses found
              </CardContent>
            </Card>
          ) : (
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
            >
              {results.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="
                    cursor-pointer
                  "
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
