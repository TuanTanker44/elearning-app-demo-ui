import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
bg-white
border-t
mt-12
"
    >
      <div
        className="
max-w-7xl
mx-auto
px-8
py-10
grid
grid-cols-1
md:grid-cols-4
gap-8
"
      >
        {/* Brand */}

        <div
          className="
space-y-4
"
        >
          <div
            className="
flex
items-center
gap-2
text-xl
font-bold
text-blue-600
"
          >
            <BookOpen size={26} />
            EduLearn
          </div>

          <p
            className="
text-sm
text-muted-foreground
leading-6
"
          >
            Online learning platform helping students learn programming,
            technology and career skills.
          </p>
        </div>

        {/* Platform */}

        <div>
          <h3
            className="
font-semibold
mb-4
"
          >
            Platform
          </h3>

          <ul
            className="
space-y-2
text-sm
text-muted-foreground
"
          >
            <li
              className="
hover:text-blue-600
cursor-pointer
"
            >
              Courses
            </li>

            <li
              className="
hover:text-blue-600
cursor-pointer
"
            >
              My Learning
            </li>

            <li
              className="
hover:text-blue-600
cursor-pointer
"
            >
              Certificates
            </li>

            <li
              className="
hover:text-blue-600
cursor-pointer
"
            >
              Degrees
            </li>
          </ul>
        </div>

        {/* Categories */}

        <div>
          <h3
            className="
font-semibold
mb-4
"
          >
            Categories
          </h3>

          <ul
            className="
space-y-2
text-sm
text-muted-foreground
"
          >
            <li>Frontend Development</li>

            <li>Backend Development</li>

            <li>Database</li>

            <li>UI / UX Design</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3
            className="
font-semibold
mb-4
"
          >
            Contact
          </h3>

          <div
            className="
space-y-3
text-sm
text-muted-foreground
"
          >
            <div
              className="
flex
gap-2
items-center
"
            >
              <Mail size={16} />
              support@edulearn.com
            </div>

            <div
              className="
flex
gap-2
items-center
"
            >
              <Phone size={16} />
              (+84) 900 000 000
            </div>

            <div
              className="
flex
gap-2
items-center
"
            >
              <MapPin size={16} />
              Hanoi, Vietnam
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
border-t
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-8
py-4
flex
flex-col
md:flex-row
justify-between
items-center
gap-3
text-sm
text-muted-foreground
"
        >
          <p>© 2026 EduLearn. All rights reserved.</p>

          <div
            className="
flex
gap-5
"
          >
            <span
              className="
cursor-pointer
hover:text-blue-600
"
            >
              Privacy Policy
            </span>

            <span
              className="
cursor-pointer
hover:text-blue-600
"
            >
              Terms
            </span>

            <span
              className="
cursor-pointer
hover:text-blue-600
"
            >
              Help
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
