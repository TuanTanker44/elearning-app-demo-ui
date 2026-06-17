import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({ children }) {
  return (
    <div
      className="
min-h-screen
flex
items-center
justify-center
bg-muted
"
    >
      <Card
        className="
w-[420px]
"
      >
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </div>
  );
}
