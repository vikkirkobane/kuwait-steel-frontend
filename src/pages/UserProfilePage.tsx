import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { LoaderCircle } from 'lucide-react';
import { useUpdateMyUser, useGetMyUser } from "@/api/MyUserApi";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();
  
  if (isGetLoading) {
    return (
      <span className="flex justify-center items-center min-h-screen">
        <LoaderCircle />
      </span>
      );
  }
  if(!currentUser) {
    return <span>Unable to load user profile</span>;
  }
  return <UserProfileForm 
  currentUser={currentUser} 
  onSave={updateUser} 
  isLoading={isUpdateLoading} />;
}

export default UserProfilePage