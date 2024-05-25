import { SearchState } from "@/pages/SearchPage";
import { Report, ReportSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useGetReport = (reportId?: string) => {
  const getReportByIdRequest = async (): Promise<Report> => {
    const response = await fetch(
      `${API_BASE_URL}/api/report/${reportId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get report");
    }

    return response.json();
  };

  const { data: report, isLoading } = useQuery(
    "fetchReport",
    getReportByIdRequest,
    {
      enabled: !!reportId,
    }
  );

  return { report, isLoading };
};


export const useSearchReports = (
  searchState: SearchState,
  reportName?: string
) => {
  const createSearchRequest = async (): Promise<ReportSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedIncidents", searchState.selectedIncidents.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/report/search/${reportName}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get report");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchReports", searchState],
    createSearchRequest,
    { enabled: !!reportName }
  );

  return {
    results,
    isLoading,
  };
};