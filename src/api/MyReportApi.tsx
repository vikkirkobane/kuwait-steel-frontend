import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Report } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyReport = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyReportRequest = async (): Promise<Report> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/report`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get report");
    }
    return response.json();
  };

  const { data: report, isLoading } = useQuery(
    "fetchMyReport",
    getMyReportRequest
  );

  return { report, isLoading };
};

export const useCreateMyReport = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyReportRequest = async (
    reportFormData: FormData
  ): Promise<Report> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/report`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: reportFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create report");
    }

    return response.json();
  };
  const {
    mutate: createReport,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyReportRequest);

  if (isSuccess) {
    toast.success("Report submitted!");
  }

  if (error) {
    toast.error("Unable to update report");
  }

  return { createReport, isLoading };
};
// testing with reportId?: string, you can remove
export const useUpdateMyReport = (reportId?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const updateReportRequest = async (
    reportFormData: FormData
  ): Promise<Report> => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(
      `${API_BASE_URL}/api/my/report/${reportId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: reportFormData,
    });
  

    // const response = await fetch(`${API_BASE_URL}/api/my/report`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: reportFormData,
//     });
// 
    if (!response) {
      throw new Error("Failed to update report");
    }

    return response.json();
  };

  const {
    mutate: updateReport,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateReportRequest);

  if (isSuccess) {
    toast.success("Report Updated");
  }

  if (error) {
    toast.error("Unable to update report");
  }

  return { updateReport, isLoading };
};
