
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify'; 
import { Image } from 'lucide-react';
import SpecialLoadingButton from './SpecialLoadingButton';
import { addNewSoftwareApplication, getAllSoftwareApplication, resetSoftwareApplicationsSlice,clearAllSoftwareApplicationSliceError } from '@/store/slices/softwareApplicationSlice';

const Application = () => {
  const [name, setName] = useState("");  
  const [svg, setSvg] = useState(null); 
  const [svgPreview, setSvgPreview] = useState("");
  const { loading, error, message } = useSelector(state => state.application);
  const dispatch = useDispatch();

  // Handle file upload and preview
  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to base64 for preview
    reader.onload = () => {
      setSvg(file); // Set the file in the state
      setSvgPreview(reader.result); // Set base64 for preview (images)
    };
  };

  // Form submission logic
  const handleAddNewApplication = (e) => {
    e.preventDefault();

    // Validate fields
    let missingFields = [];
    if (!name) missingFields.push("Application Name");
    if (!svg) missingFields.push("Application Svg");

    // Show toast if there are missing fields
    if (missingFields.length > 0) {
      toast.error(`Please provide: ${missingFields.join(', ')}`); // Single toast with missing fields
      return; // Do not proceed with form submission
    }

    // If all fields are filled, proceed with form submission
    const formData = new FormData();
    formData.append("name", name); // Changed title to name
    formData.append("svg", svg); // Append the file
    dispatch(addNewSoftwareApplication(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error notification
      dispatch(clearAllSoftwareApplicationSliceError());
    }
    if (message) {
      toast.success(message); // Show success notification
      dispatch(resetSoftwareApplicationsSlice());
      dispatch(getAllSoftwareApplication()); // Refresh application list
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handleAddNewApplication} className="w-[100vh] px-5 md:w-[650px] bg1 p-8 rounded-md m-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-[#fff] text-3xl text-center">
              ADD NEW SOFTWARE APPLICATION 
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              {/* Application Name Input */}
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-[#fff]">Application Name</Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <Input
                      type="text"
                      placeholder="Android Studio"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

             

              {/* File Upload Input */}
              <div className="col-span-full">
                <Label className="block text-sm font-medium leading-6 text-white">Application Svg</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white-900/25 px-6 py-10">
                  <div className="text-center">
                    {svgPreview ? (
                      <img className="mx-auto h-12 w-12 text-white" src={svgPreview} alt="File Preview" />
                    ) : (
                      <Image className="mx-auto h-12 w-12 text-white" aria-hidden="true" />
                    )}

                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <Label className="pt-1 file-upload relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-300 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleSvg} // Handle file change
                        />
                      </Label>
                      <p className="pl-1 text-white">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF, SVG, or any file type up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {loading ? (
          <SpecialLoadingButton content={"Adding"} />
        ) : (
          <Button type="submit" className="w-full bg-[#000]">Add Application</Button>
        )}
      </form>
    </div>
  );
};

export default Application;
