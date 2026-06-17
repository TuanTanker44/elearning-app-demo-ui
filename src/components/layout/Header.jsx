import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import courses from "../../data/courses.json";
import { Search, ChevronDown, LogOut } from "lucide-react";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const categories = [...new Set(courses.map((course) => course.category))];

  const suggestions = keyword
    ? courses.filter((course) =>
        course.title.toLowerCase().includes(keyword.toLowerCase()),
      )
    : [];

  function handleLogout() {
    logout();

    navigate("/login");
  }

  function handleSearch(e) {
    setParams({
      keyword,
    });
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
      setKeyword("");
    }
  }

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="
    fixed
    top-0
    left-0
    right-0
    h-16
    border-b
    bg-white
    flex
    items-center
    justify-between
    px-8
    z-50
      "
    >
      {/* Left */}

      <div
        className="
          flex
          items-center
          gap-10
        "
      >
        <div
          onClick={() => navigate("/student/dashboard")}
          className="
            font-bold
            text-xl
            text-blue-600
            cursor-pointer
          "
        >
          EduLearn
        </div>

        {/* Navigation */}

        <nav
          className="
            hidden
            md:flex
            items-center
            gap-6
            text-sm
          "
        >
          {/* Course dropdown */}

          <div
            className="relative
    group
    cursor-pointer
    flex
    items-center
    gap-1
  "
          >
            <span className="hover:text-blue-600">Course</span>

            <ChevronDown
              size={16}
              className="
    transition-transform
    duration-200
    group-hover:rotate-180
  "
            />

            <div
              className="
    absolute
    top-full
    left-0
    pt-2
    hidden
    group-hover:block
    z-50
  "
            >
              <div
                className="
    bg-white
    border
    rounded-md
    shadow-lg
    w-48
    p-2
  "
              >
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => navigate(`/search?category=${category}`)}
                    className="
px-3
py-2
rounded
hover:bg-slate-100
"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate("/student/progress")}
            className="
              cursor-pointer
              hover:text-blue-600
            "
          >
            My Learning
          </div>

          <div
            onClick={() => navigate("/student/certificates")}
            className="
              cursor-pointer
              hover:text-blue-600
            "
          >
            Degrees
          </div>
        </nav>
      </div>

      {/* Center Search */}

      <div
        className="
    relative
    w-full
    max-w-md
  "
      >
        <Search
          size={18}
          className="
    absolute
    left-3
    top-1/2
    -translate-y-1/2
    text-muted-foreground
  "
        />

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search courses..."
          className="
  w-full
  h-10
  pl-10
  pr-4
  rounded-md
  border
  bg-slate-50
  outline-none
  focus:ring-2
  focus:ring-blue-500
"
        />

        {suggestions.length > 0 && (
          <div
            className="
  absolute
  top-full
  left-0
  right-0
  mt-2
  bg-white
  border
  rounded-md
  shadow-lg
  z-50
"
          >
            {suggestions.map((course) => (
              <div
                key={course.id}
                onClick={() => {
                  navigate(`/courses/${course.id}`);

                  setKeyword("");
                }}
                className="
  px-4
  py-3
  cursor-pointer
  hover:bg-slate-100
"
              >
                <div
                  className="
font-medium
"
                >
                  {course.title}
                </div>

                <div
                  className="
text-xs
text-muted-foreground
"
                >
                  {course.category}
                  {" • "}
                  {course.level}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right */}

      <div
        className="
    flex
    items-center
    gap-4
    relative
  "
      >
        {/* Greeting */}
        <span
          className="
      text-sm
      text-muted-foreground
    "
        >
          Hi, {user?.fullName}
        </span>
        <div ref={menuRef} className="relative flex items-center gap-4">
          {/* Avatar button */}
          <div
            onClick={() => setOpenUserMenu(!openUserMenu)}
            className="
      w-10
      h-10
      rounded-full
      bg-blue-600
      text-white
      flex
      items-center
      justify-center
      font-semibold
      cursor-pointer
      hover:bg-blue-700
      transition
      select-none
    "
          >
            {user?.fullName?.charAt(0)?.toUpperCase()}
          </div>

          {/* Dropdown */}
          {openUserMenu && (
            <div
              className="
        absolute
        right-0
        top-14
        w-64
        bg-white
        border
        rounded-xl
        shadow-lg
        z-50
        overflow-hidden
      "
            >
              {/* User info */}
              <div
                className="
          p-4
          border-b
        "
              >
                <div
                  className="
            font-semibold
          "
                >
                  {user?.fullName}
                </div>

                <div
                  className="
            text-xs
            text-muted-foreground
          "
                >
                  {user?.email}
                </div>

                <div
                  className="
            text-[11px]
            text-blue-600
            mt-1
          "
                >
                  {user?.role}
                </div>
              </div>

              {/* Menu items */}
              <div
                className="
          py-2
          text-sm
        "
              >
                <div
                  onClick={() => {
                    navigate("/profile");
                    setOpenUserMenu(false);
                  }}
                  className="
            px-4
            py-2
            hover:bg-slate-100
            cursor-pointer
          "
                >
                  Profile
                </div>

                <div
                  onClick={() => {
                    navigate("/student/courses");
                    setOpenUserMenu(false);
                  }}
                  className="
            px-4
            py-2
            hover:bg-slate-100
            cursor-pointer
          "
                >
                  My Courses
                </div>

                <div
                  onClick={() => {
                    navigate("/student/certificates");
                    setOpenUserMenu(false);
                  }}
                  className="
            px-4
            py-2
            hover:bg-slate-100
            cursor-pointer
          "
                >
                  Certificates
                </div>

                <div
                  onClick={() => {
                    navigate("/student/payment");
                    setOpenUserMenu(false);
                  }}
                  className="
            px-4
            py-2
            hover:bg-slate-100
            cursor-pointer
          "
                >
                  Payment
                </div>
              </div>

              {/* Logout */}
              <div
                className="
          border-t
          px-4
          py-2
        "
              >
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setOpenUserMenu(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
