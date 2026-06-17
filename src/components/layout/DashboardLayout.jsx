import Header from "./Header";

import Footer from "./Footer";

export default function DashboardLayout({ children }) {
  return (
    <div
      className="
min-h-screen
flex
flex-col
bg-slate-50
mt-16
"
    >
      <Header />

      <main
        className="
flex-1
p-8
"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
