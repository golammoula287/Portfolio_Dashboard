
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image } from 'lucide-react';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProject, clearAllProjectSliceError, getAllProjects, resetProjectSlice } from '@/store/slices/projectSlice';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const { loading, error, message } = useSelector(state => state.project);
  const dispatch = useDispatch();
  
  
  // Handle file upload and preview
  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to base64 for preview
    reader.onload = () => {
      setProjectBanner(file); // Set the file in the state
      setProjectBannerPreview(reader.result); // Set base64 for preview (images)
    };
  };




  // Validate form inputs and show specific missing fields
  const validateForm = () => {
    const missingFields = [];

    if (!title) missingFields.push("Title");
    if (!description) missingFields.push("Description");
    if (!gitRepoLink) missingFields.push("Git Repository Link");
    if (!projectLink) missingFields.push("Project Link");
    if (!technologies) missingFields.push("Technologies");
    if (!stack) missingFields.push("Stack");
    if (!deployed) missingFields.push("Deployed Status");
    if (!projectBanner) missingFields.push("Project Banner");

    if (missingFields.length > 0) {
      toast.error(`Please fill out the following fields: ${missingFields.join(', ')}.`);
      return false;
    }

    return true;
  };

  const handleAddNewProject = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);
    dispatch(addNewProject(formData));
  
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error notification
      dispatch(clearAllProjectSliceError());
    }
    if (message) {
      toast.success(message); // Show success notification
      dispatch(resetProjectSlice());
      dispatch(getAllProjects()); // Refresh application list
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="flex justify-center items-center min-h-screen sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handleAddNewProject} className="w-full max-w-3xl px-5 md:w-[1000px] bg1 p-8 rounded-md m-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-[#fff] text-3xl text-center">
              ADD A NEW PROJECT
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              {/* Title Input */}
              {/* ... (rest of the form fields remain unchanged) ... */}
                {/* Title Input */}
                <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-[#fff]">Title</Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <Input
                      type="text"
                      placeholder="Project Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Description Input */}
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-[#fff]">Description</Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <Textarea
                      type="text"
                      placeholder="Feature 1. Feature 2. Feature 3. "
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Technology */}
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-[#fff]">Technology Used</Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <Textarea
                      type="text"
                      placeholder="HTML ,CSS, JavaScript, etc."
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Stack */}
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-[#fff]">Stack</Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <Select value={stack} onValueChange={(selectedValue)=>setStack(selectedValue)}>
                       <SelectTrigger>
                          <SelectValue placeholder="Select Project Stack"></SelectValue>
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Full Stack">Full Stack</SelectItem>
                         <SelectItem value="MERN">MERN</SelectItem>
                         <SelectItem value="MEAN">MEAN</SelectItem>
                         <SelectItem value="MEVN">MEVN</SelectItem>
                         <SelectItem value="LAMP">LAMP</SelectItem>
                         <SelectItem value="Django + React">Django + React</SelectItem>
                         <SelectItem value="Java Spring Boot + Angular">Java Spring Boot + Angular</SelectItem>
                         <SelectItem value="Tailwind CSS">Tailwind CSS</SelectItem>
                         <SelectItem value="Bootstrap">Bootstrap</SelectItem>
                         <SelectItem value="Angular">Angular</SelectItem>
                         <SelectItem value="Ruby on Rails + React">Ruby on Rails + React</SelectItem>


                         <SelectItem value="NEXT.js">NEXT.js</SelectItem>
                         <SelectItem value="REACT.js">REACT.js</SelectItem>
                         <SelectItem value="Vue.js">Vue.js</SelectItem>
                       </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Deployed */}
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-[#fff]">Deployed Status</Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <Select value={deployed} onValueChange={(selectedValue)=>setDeployed(selectedValue)}>
                       <SelectTrigger>
                          <SelectValue placeholder="Select Deployed Status"></SelectValue>
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Yes">Yes</SelectItem>
                         <SelectItem value="No">No</SelectItem>
                         
                       </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* GitHub Repo */}
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-[#fff]">GitHub Repository Link</Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <Input
                      type="text"
                      placeholder="Paste Repository Link"
                      value={gitRepoLink}
                      onChange={(e) => setGitRepoLink(e.target.value)}
                      className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Project link */}
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-[#fff]">Project Link</Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <Input
                      type="text"
                      placeholder="Paste Your Project Link"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* File Upload Input */}
              <div className="col-span-full">
                <Label className="block text-sm font-medium leading-6 text-white">Project Banner</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                  <div className="text-center">
                    {projectBannerPreview ? (
                      <img className="mx-auto h-[250px] w-full object-cover text-white" src={projectBannerPreview} alt="File Preview" />
                    ) : (
                      <Image className="mx-auto h-12 w-12 text-white" aria-hidden="true" />
                    )}

                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <Label
                        className="pt-1 file-upload relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-300 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleSvg}
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
          <Button type="submit" className="w-full bg-[#000]">Add Project</Button>
        )}
      </form>
    </div>
  );
};

export default AddProject;
