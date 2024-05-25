import { Report } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Truck, Factory, Dot } from "lucide-react";

type Props = {
  report: Report;
};

const SearchResultCard = ({ report }: Props) => {
  return (
    <Link
      to={`/detail/${report._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={report.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {report.reportName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {report.incident.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < report.incident.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Factory className="text-green-600" />
              Gate: {report.gate}
            </div>
            <div className="flex items-center gap-1">
              <Truck />
              Plates: {report.plateNumber}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;