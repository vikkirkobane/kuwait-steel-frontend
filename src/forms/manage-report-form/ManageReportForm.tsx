import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import IncidentSection from "./IncidentSection";
import DamageSection from "./DamageSection";
import ImageSection from "./ImageSection";
import { useEffect } from "react";
import { Report } from "@/types";


const formSchema = z.object({
  reportName: z.string({
    required_error: "Report name is required",
  }),
  details: z.string({
    required_error: "Details is required",
  }),
  recommendations: z.string({
    required_error: "Recommendations is required",
  }),
  gate: z.coerce.number({
    required_error: "Gate is required",
    invalid_type_error: "must be a valid number",
  }),
  plateNumber: z.coerce.number({
    required_error: "Truck plate is required",
    invalid_type_error: "must be a valid number",
  }),
  incident: z.array(z.string()).nonempty({
    message: "please select at least one incident",
  }),
  damageItems: z.array(z.object({
    name: z.string().min(1, "name is required"),
    price: z.coerce.number().min(1, "price is required")
    })
  ),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, { message: "image is required" }).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type ReportFormData = z.infer<typeof formSchema>;

type Props = {
  report?: Report;
  onSave: (reportFormData: FormData) => void;
  isLoading: boolean;
}

const ManageReportForm = ({ onSave, isLoading, report }: Props) => {
  const form = useForm<ReportFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        incident: [],
        damageItems: [{ name: "", price: 0 }],
      },
  });
  
  useEffect(() => {
    if (!report) {
      return;
    }

    // price lowest domination of 100 = 100pence == 1GBP
    /*
    const gateFormatted = parseInt(
      (report.gate).toFixed(2)
    );
*/
    const damageItemsFormatted = report.damageItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedReport = {
      ...report,
    //  gate: gateFormatted,
      damageItems: damageItemsFormatted,
    };

    form.reset(updatedReport);
  }, [form, report]);
  
  const onSubmit = (formDataJson: ReportFormData) => {
    // convert formDataJson to a new FormData object
    const formData = new FormData();

    formData.append("reportName", formDataJson.reportName);
    formData.append("details", formDataJson.details);
    formData.append("recommendations", formDataJson.recommendations);

    formData.append(
      "gate",
      formDataJson.gate //.toString()
    );
    formData.append(
      "plateNumber",
      formDataJson.plateNumber //.toString()
    );
    formDataJson.incident.forEach((incident, index) => {
      formData.append(`incident[${index}]`, incident);
    });
    formDataJson.damageItems.forEach((damageItem, index) => {
      formData.append(`damageItems[${index}][name]`, damageItem.name);
      formData.append(
        `damageItems[${index}][price]`,
        (damageItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  }
  
  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <IncidentSection />
        <Separator />
        <DamageSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  )
}

export default ManageReportForm;