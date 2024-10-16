import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import axios from 'axios'; 
import { toast } from 'react-toastify'; 

const ViewProjects = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, { withCredentials: true })
        .then((res) => { // Fixed the res reference here
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(res.data.project.projectBanner && res.data.project.projectBanner.url);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  // Split the description and technologies into lists
  const descriptionInListFormat = description.split(". ");
  const technologiesInListFormat = technologies.split(", ");

  return (
    <>
      <div className="flex justify-center items-center min-h-screen sm:gap-4 sm:py-4 sm:pl-14">
        <div className="w-full max-w-3xl px-5 md:w-[1000px]  p-8 rounded-md m-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className='text-2xl font-bold  mb-4'>{title}</h1>
                  <img src={projectBanner ? projectBanner : "/avatarHolder.jpg"} alt={title} className="w-full h-auto" />
                </div>
                
                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Description : </p>
                  <ul className='list-disc pl-5'>
                    {descriptionInListFormat.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Technologies : </p>
                  <ul className='list-disc pl-5'>
                    {technologiesInListFormat.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Stack : </p>
                  <p>{stack}</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Deployed : </p>
                  <p>{deployed}</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Github Repository Link : </p>
                  <Link to={gitRepoLink} target="_blank" className='text-sky-700'>{gitRepoLink }</Link>
                </div>

                  <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Project Link : </p>
                  <Link to={projectLink ? projectLink : "/"} target="_blank" className='text-sky-700'>{projectLink ? projectLink : " Still Not Deployed"}</Link>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProjects;
