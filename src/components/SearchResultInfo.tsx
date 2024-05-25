import { Link } from "react-router-dom";

type Props = {
  total: number;
  reportName: string;
};

const SearchResultInfo = ({ total, reportName }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Reports found for {reportName}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Report
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;