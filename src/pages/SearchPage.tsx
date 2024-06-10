import { useParams } from "react-router-dom";
import { useSearchReports } from "@/api/ReportApi";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import PaginationSelector from "@/components/PaginationSelector";
import IncidentFilter from "@/components/IncidentFilter";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import SearchResultCard from "@/components/SearchResultCard";
import { LoaderCircle } from 'lucide-react';
import { useState } from "react";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedIncidents: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { reportName } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
     page: 1,
     selectedIncidents: [],
     sortOption: "bestMatch",
  });
  
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  const setSelectedIncidents = (selectedIncidents: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedIncidents,
      page: 1,
    }));
  };

  
  const { results, isLoading } = useSearchReports(
    searchState, 
    reportName
  );
  
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };
  
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };
  
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  
  if (isLoading) {
    <span className="flex justify-center items-center min-h-screen">
      <LoaderCircle />
    </span>
  };
  
  if (!results?.data || !reportName) {
    return (
      <span className="flex justify-center items-center min-h-screen">
        <LoaderCircle />
      </span>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="incident-list">
        <IncidentFilter
          selectedIncidents={searchState.selectedIncidents}
          onChange={setSelectedIncidents}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search Report or Incident"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} reportName={reportName} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((report) => (
          <SearchResultCard report={report} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
    
  )
}

export default SearchPage;