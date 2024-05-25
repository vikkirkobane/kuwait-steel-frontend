import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";


const DetailsSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Details</h2>
        <FormDescription>
          Enter the details about your report
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="reportName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title: </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
        <FormField
          control={control}
          name="details"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Description: </FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-white"
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="recommendations"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Recommendations: </FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-white"
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
      <FormField
        control={control}
        name="plateNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vehicle Plate Number: </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="xxxxx" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="gate"
        render={({ field }) => (
          <FormItem className="max-w-[50%]">
            <FormLabel>Gate Number: </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="1" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailsSection;
