//import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Report } from "@/types";

type Props = {
  report: Report;
};

const UpdateReportLink = ({ report }: Props) => {
  const { isAuthenticated } = useAuth0();
    return (
        <span className="flex space-x-2 items-center">
          {isAuthenticated ? (
              <Link
      to={`/update-report/${report._id}`}
      className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Edit Report</Link>
      ) : '' }
        </span>
    );
};

export default UpdateReportLink;