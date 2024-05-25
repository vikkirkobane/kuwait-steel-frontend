import { useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { incidentList } from "@/config/report-options-config";
import IncidentCheckbox from "./IncidentCheckbox";

const IncidentSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Incidents</h2>
        <FormDescription>
          Select the incident that you want to report
        </FormDescription>
      </div>
      <FormField control={control} name="incident" render={({field})=> (
        <FormItem>
          <div className="grid md:grid-cols-5 gap-1">
            {incidentList.map((incidentItem) => (
                <IncidentCheckbox incident={incidentItem} field={field} />
              ))}
          </div>
          <FormMessage />
        </FormItem>
        )} />
    </div>
  )
}

export default IncidentSection;