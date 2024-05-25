import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  incident: string;
  field: ControllerRenderProps<FieldValues, "incident">;
};

const IncidentCheckbox = ({ incident, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(incident)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, incident]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== incident)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{incident}</FormLabel>
    </FormItem>
  );
};

export default IncidentCheckbox;