import { incidentList } from "@/config/report-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (incidents: string[]) => void;
  selectedIncidents: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const IncidentFilter = ({
  onChange,
  selectedIncidents,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleIncidentsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedIncident = event.target.value;
    const isChecked = event.target.checked;

    const newIncidentsList = isChecked
      ? [...selectedIncidents, clickedIncident]
      : selectedIncidents.filter((incident) => incident !== clickedIncident);

    onChange(newIncidentsList);
  };

  const handleIncidentsReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Incident</div>
        <div
          onClick={handleIncidentsReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {incidentList
          .slice(0, isExpanded ? incidentList.length : 7)
          .map((incident) => {
            const isSelected = selectedIncidents.includes(incident);
            return (
              <div className="flex">
                <input
                  id={`incident_${incident}`}
                  type="checkbox"
                  className="hidden"
                  value={incident}
                  checked={isSelected}
                  onChange={handleIncidentsChange}
                />
                <Label
                  htmlFor={`incident_${incident}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {incident}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default IncidentFilter;