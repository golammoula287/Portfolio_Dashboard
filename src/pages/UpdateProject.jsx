
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllProjectSliceError, getAllProjects, updateProject } from '@/store/slices/projectSlice'; // Ensure this exists
import { resetMessageSlice } from '@/store/slices/messageSlice';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SpecialLoadingButton from './sub-component/SpecialLoadingButton';
import { Button } from '@/components/ui/button';

const UpdateProjects = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectBanner, setProjectBanner] = useState('');
  const [projectBannerPreview, setProjectBannerPreview] = useState('');
  const [gitRepoLink, setGitRepoLink] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [stack, setStack] = useState('');
  const [deployed, setDeployed] = useState('');

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  // Corrected file preview handler
  const handleProjectBannerPreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file); // To use later when submitting the form
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, { withCredentials: true });
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies);
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBannerPreview(project.projectBanner?.url || '');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error loading project');
      }
    };
  
    getProject();
  }, [id]);
  
  // Handle error messages separately
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }
  }, [error, dispatch]);
  
  // Handle success messages separately
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetMessageSlice());
      dispatch(getAllProjects());
    }
  }, [message, dispatch]);
  
  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('gitRepoLink', gitRepoLink);
    formData.append('projectLink', projectLink);
    formData.append('technologies', technologies);
    formData.append('stack', stack);
    formData.append('deployed', deployed);
    if (projectBanner) {
      formData.append('projectBanner', projectBanner); // If a new file was uploaded
    }

    dispatch(updateProject(id, formData)); // Redux action to update project
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen sm:gap-4 sm:py-4 sm:pl-14">
        <form onSubmit={handleUpdateProject} className="w-full max-w-3xl px-5 md:w-[1000px] bg1 p-8 rounded-md m-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
             <div className='flex justify-between items-center'>
             <h2 className="font-semibold leading-7 text-[#fff] text-3xl text-center">
                UPDATE PROJECT
              </h2>
              <Link to={"/"}>
              <Button> Return To Dashboard </Button>
              </Link>
             </div>
              <div className="mt-10 flex flex-col gap-5">
                {/* Project Banner */}
                <div className="w-full sm:col-span-4">
                  <img src={projectBannerPreview || '/avatarHolder.jpg'} alt="projectBanner" className="w-full h-auto rounded-md" />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProjectBannerPreview}
                      className="avatar-update-btn mt-4 w-full "
                    />
                  </div>
                </div>

                {/* Title Input */}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-[#fff]">Title</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6 w-full rounded-md"
                    />
                  </div>
                </div>
                 
                               {/* Description Input */}
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-[#fff]">Description</label>
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
                  <label className="block text-sm font-medium leading-6 text-[#fff]">Technology Used</label>
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
                <label className="block text-sm font-medium leading-6 text-[#fff]">Stack</label>
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
                <label className="block text-sm font-medium leading-6 text-[#fff]">Deployed Status</label>
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
                <label className="block text-sm font-medium leading-6 text-[#fff]">GitHub Repository Link</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <input
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
                <label className="block text-sm font-medium leading-6 text-[#fff]">Project Link</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                    <input
                      type="text"
                      placeholder="Paste Your Project Link"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>


              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full items-center">
            {loading ? (
              <SpecialLoadingButton content="Updating" width="w-52" />
            ) : (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-52"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProjects;
