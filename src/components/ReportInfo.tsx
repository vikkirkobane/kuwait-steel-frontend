import { Report } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  restaurant: Report;
};

const ReportInfo = ({ report }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {report.reportName}
        </CardTitle>
        <Separator />
        <CardDescription>
          <span className="font-black">Details:</span>
          <br/>
            {report.details}
          <br/>
          <br />
          <Separator />
          <br/>
          <span className="font-black">Recommendations:</span>
          <br/>
            {report.recommendations}
          <br/>
          <br/>
          <Separator />
          <br/>
          <span className="font-black">Incidents:</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {report.incident.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < report.incident.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReportInfo;