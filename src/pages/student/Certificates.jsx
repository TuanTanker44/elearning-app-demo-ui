import { useMemo, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import CertificateCard from "../../components/certificate/CertificateCard";

import courses from "../../data/courses.json";
import { useAuth } from "../../context/AuthContext";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Search, Award, Calendar } from "lucide-react";

export default function Certificates() {
  const { user } = useAuth();

  const [keyword, setKeyword] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("newest");

  const certificates = useMemo(() => {
    if (!user?.certificates) return [];

    return user.certificates.map((cert) => {
      const course = courses.find((c) => c.id === cert.courseId);

      return {
        ...cert,

        courseTitle: course?.title,

        category: course?.category,

        thumbnail: course?.thumbnail,

        level: course?.level,
      };
    });
  }, [user]);

  const categories = useMemo(() => {
    return ["All", ...new Set(certificates.map((c) => c.category))];
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    let result = certificates.filter((cert) => {
      const text = (
        cert.title +
        cert.courseTitle +
        cert.category
      ).toLowerCase();

      const matchKeyword = text.includes(keyword.toLowerCase());

      const matchCategory = category === "All" || cert.category === category;

      return matchKeyword && matchCategory;
    });

    result.sort((a, b) => {
      const da = new Date(a.issuedAt);

      const db = new Date(b.issuedAt);

      return sort === "newest" ? db - da : da - db;
    });

    return result;
  }, [certificates, keyword, category, sort]);

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
max-w-7xl
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
flex
items-center
gap-2
"
            >
              <Award className="text-yellow-500" />
              My Certificates
            </h1>

            <p
              className="
text-muted-foreground
"
            >
              Your earned achievements
            </p>
          </div>

          {/* FILTER */}

          <Card>
            <CardContent
              className="
      p-4
      space-y-4
    "
            >
              {/* Search */}
              <div
                className="
        relative
        w-full
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
                  placeholder="Search certificate..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category + Sort same row */}

              <div
                className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
      "
              >
                {/* Category */}

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
                        category === c
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-white text-black border"
                      }
                    >
                      {c}
                    </Button>
                  ))}
                </div>

                {/* Sort */}

                <div
                  className="
          flex
          gap-2
        "
                >
                  <Button
                    variant={sort === "newest" ? "default" : "outline"}
                    onClick={() => setSort("newest")}
                  >
                    Newest
                  </Button>

                  <Button
                    variant={sort === "oldest" ? "default" : "outline"}
                    onClick={() => setSort("oldest")}
                  >
                    Oldest
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LIST */}

          {filteredCertificates.length === 0 ? (
            <Card>
              <CardContent
                className="
p-10
text-center
"
              >
                No certificates found
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
              {filteredCertificates.map((cert) => (
                <Card
                  key={cert.id}
                  className="
hover:shadow-xl
transition
"
                >
                  <CardContent className="p-4 space-y-3">
                    <img
                      src={cert.thumbnail}
                      className="
h-40
w-full
object-cover
rounded-lg
"
                    />

                    <CertificateCard
                      certificate={cert}
                      course={{
                        title: cert.courseTitle,
                        category: cert.category,
                        level: cert.level,
                      }}
                    />

                    <div
                      className="
flex
items-center
gap-2
text-xs
text-muted-foreground
"
                    >
                      <Calendar size={14} />
                      Issued:
                      {new Date(cert.issuedAt).toLocaleDateString()}
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
