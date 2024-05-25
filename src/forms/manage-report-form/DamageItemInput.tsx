import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeDamageItem: () => void;
};

const DamageItemInput = ({ index, removeDamageItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`damageItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name: <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Barrier"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`damageItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (KD): <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeDamageItem}
        className="bg-red-500 max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default DamageItemInput;