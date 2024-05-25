import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import DamageItemInput from "./DamageItemInput";

const DamageSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "damageItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Damaged Items</h2>
        <FormDescription>
          State the damages and give each item a name and a price
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="damageItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <DamageItemInput
                index={index}
                removeDamageItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Damaged Item
      </Button>
    </div>
  );
};

export default DamageSection;