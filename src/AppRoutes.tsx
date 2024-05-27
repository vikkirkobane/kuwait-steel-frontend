import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageReportPage from "./pages/ManageReportPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const AppRoutes = () =>{
  return(
    <Routes>
      <Route path="/" element={
      <Layout showHero>
        <HomePage />
      </Layout>
      } 
      />
      <Route path="/auth-callback" element={<AuthCallbackPage/>} />
      <Route
        path="/search/:reportName"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      
      <Route
        path="/detail/:reportId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={
          <Layout>
            <UserProfilePage />
          </Layout>
          } 
        /><Route path="/manage-report" element={
          <Layout>
            <ManageReportPage />
          </Layout>
          } 
        />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;