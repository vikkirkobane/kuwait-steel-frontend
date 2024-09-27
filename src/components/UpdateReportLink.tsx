//import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import { Report } from "@/types";
//import { useState, useEffect } from 'react';
//import { LoaderCircle } from 'lucide-react';

import { useGetMyUser } from "@/api/MyUserApi";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";

type Props = {
  report: Report,
//  currentUser: User,
  
};

const UpdateReportLink = ({ report /*, currentUser */ }: Props) => {
//  const { isAuthenticated } = useAuth0();
// new code
  const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();

  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if(!isAuthenticated) {
    return ( 
    <Button onClick={onLogin} className="bg-blue-500 flex-1">Login to Create or Edit Report</Button>
    );
  }
  if(isAuthLoading){
    return <LoadingButton />;
  }

  if(isAuthenticated) {
  const reportUser = JSON.stringify(report.user);
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { currentUser, isLoading: isCurrentUserLoading } = useGetMyUser();
//alert(currentUser)
  if (!currentUser) {
    return isCurrentUserLoading;
  }
  
  // const [storedData, setStoredData] = useState(currentUser || {} || null);
// 
//   useEffect(() => {
//     if (currentUser !== undefined && currentUser !== null) {
//       setStoredData(currentUser);
//     }
//   }, [currentUser]);
//   
//   if (!storedData) {
//     return <LoaderCircle />;
//   }
//   
  const currentUserId = JSON.stringify(currentUser._id);

        return (
        <span className="flex space-x-2 items-center">
          { reportUser === currentUserId ? (
              <Link
      to={`/update-report/${report._id}`}>
          <Button className="bg-blue-500 flex-1">Edit Report</Button></Link>
      ) : '' }
        </span>
    );

    // return (
    //     <span className="flex space-x-2 items-center">
    //       {isAuthenticated   && reportUser === currentUserId ? (
    //           <Link
    //   to={`/update-report/${report._id}`}
    //   className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Edit Report</Link>
    //   ) : '' }
    //     </span>
    // );
  }
};

export default UpdateReportLink;