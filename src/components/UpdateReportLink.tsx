//import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Report, User } from "@/types";
import { useState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';

type Props = {
  report: Report,
  currentUser: User,
  
};

const UpdateReportLink = ({ report, currentUser }: Props) => {
  const { isAuthenticated } = useAuth0();
  const reportUser = JSON.stringify(report.user);;
  
  const [storedData, setStoredData] = useState(currentUser || {} || null);

  useEffect(() => {
    if (currentUser !== undefined && currentUser !== null) {
      setStoredData(currentUser);
    }
  }, [currentUser]);
  
  if (!storedData) {
    return <LoaderCircle />;
  }
  
  const currentUserId = JSON.stringify(storedData._id);

    return (
        <span className="flex space-x-2 items-center">
          {isAuthenticated   && reportUser === currentUserId ? (
              <Link
      to={`/update-report/${report._id}`}
      className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Edit Report</Link>
      ) : '' }
        </span>
    );
};

export default UpdateReportLink;