import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Award } from "lucide-react";

export default function CertificateCard({ certificate, course }) {
  return (
    <Card
      className="
transition-all
hover:shadow-xl
hover:bg-yellow-50
border-yellow-400
cursor-pointer
"
    >
      <CardHeader>
        <div
          className="
flex
items-center
justify-between
"
        >
          <CardTitle
            className="
text-yellow-600
text-lg
"
          >
            {certificate.title}
          </CardTitle>

          <Award
            size={30}
            className="
text-yellow-500
"
          />
        </div>
      </CardHeader>

      <CardContent
        className="
space-y-2
"
      >
        <p
          className="
text-sm
"
        >
          Course:
          <span
            className="
font-semibold
ml-1
"
          >
            {course?.title}
          </span>
        </p>

        <p
          className="
text-sm
text-muted-foreground
"
        >
          Issued:
          {certificate.issuedAt}
        </p>

        <div
          className="
text-xs
text-muted-foreground
"
        >
          Certificate ID: #{certificate.id}
        </div>
      </CardContent>
    </Card>
  );
}
