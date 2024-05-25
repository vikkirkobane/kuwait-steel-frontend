import { Button } from "./ui/button";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link to="/user-profile" 
        className="flex bg-white items-center font-bold hover:text-blue-500">
        User Profile
      </Link>
      <Link to="/manage-report" 
        className="flex bg-white items-center font-bold hover:text-blue-500">
        Manage Report
      </Link>
      <Button onClick={() => logout()} className="flex-1 font-bold bg-blue-500">
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;