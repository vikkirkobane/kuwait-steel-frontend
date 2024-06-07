import { useParams } from "react-router-dom";
import ManageReportForm from "@/forms/manage-report-form/ManageReportForm";
import {
//  useGetMyReport,
//  useCreateMyReport,
  useUpdateMyReport,
} from "@/api/MyReportApi";

import { useGetReport } from "@/api/ReportApi";

const UpdateReportPage = () => {
//  const {createReport, isLoading: isCreateLoading } =
//    useCreateMyReport();
//  const { report } = useGetMyReport(); 
//  const { report } = useGetReport(); 
//  const { report } = useCreateMyReport(); 

  const { reportId } = useParams();
  const { report,/* isLoading */ } = useGetReport(reportId);
 

  const { updateReport, isLoading: isUpdateLoading } =
    useUpdateMyReport(reportId);
  
//  const isEditing = !!report;
    
  return <ManageReportForm 
  report={report} 
  //change here to only create a report
  //onSave={isEditing ? updateReport : createReport}
  onSave={updateReport}
//  onSave={createReport} 
  isLoading={/*isCreateLoading || */ isUpdateLoading} />
}

export default UpdateReportPage;