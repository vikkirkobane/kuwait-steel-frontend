import ManageReportForm from "@/forms/manage-report-form/ManageReportForm";
import {
//  useGetMyReport,
  useCreateMyReport,
//  useUpdateMyReport,
} from "@/api/MyReportApi";

const ManageReportPage = () => {
  const {createReport, isLoading: isCreateLoading } =
    useCreateMyReport();
//  const { report } = useGetMyReport(); 
//  const { report } = useCreateMyReport(); 
  // const { updateReport,  isLoading: isUpdateLoading } =
//     useUpdateMyReport();
//   
//  const isEditing = !!report;
    
  return <ManageReportForm 
//  report={report} 
  //change here to only create a report
//  onSave={isEditing ? updateReport : createReport} 
  onSave={createReport} 
  isLoading={isCreateLoading /* || isUpdateLoading */ } />
}

export default ManageReportPage;