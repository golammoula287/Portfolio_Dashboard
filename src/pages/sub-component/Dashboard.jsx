import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllSoftwareApplicationSliceError, deleteSoftwareApplication, getAllSoftwareApplication, resetSoftwareApplicationsSlice } from '@/store/slices/softwareApplicationSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const { softwareApplications, error, loading, message } = useSelector((state) => state.application);
  const { timeline } = useSelector((state) => state.timeline);

  const dispatch = useDispatch();

  const [appId , setAppId] = useState("");
  const handleDeleteSoftwareApp =  (id)=>{
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  useEffect(()=>{
     if(error){
      toast.error(error);
      dispatch(clearAllSoftwareApplicationSliceError())
     }
     if(message){
       toast.success(message);
       dispatch(resetSoftwareApplicationsSlice())
       dispatch(getAllSoftwareApplication())
     }
  },[dispatch, error, message, loading]);

  return (
    <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
      <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2'>
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
            <Card className="sm:col-span-2 bg4 text-black border-0">
              <CardHeader className="p-3">
                <CardDescription className="ax-w-lg text-justify text-[#ffffff] p-5 flex items-center">{user.aboutMe}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={user.portfolioURL || '#'}
                target='_blank'
                >
                  <Button>Visit Portfolio</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center bg4 border-0">
              <CardHeader className="pb-2">
                <CardTitle className=" text-[#ffffff]">Project Completed</CardTitle>
                <CardTitle className="text-6xl text-[#ffffff]">{projects && projects.length}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to="/manage/projects">
                  <Button >Manage Projects</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center bg4 border-0">
              <CardHeader className="pb-2">
                <CardTitle  className=" text-[#ffffff]">Skills</CardTitle>
                <CardTitle className="text-6xl text-[#ffffff] ">{skills && skills.length}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to="/manage/skills">
                  <Button>Manage Skills</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Projects Tab */}
          <Tabs >
            <TabsContent>
              <Card className="bg4 border-0 pb-4">
                <CardHeader className="px-7">
                  <CardTitle className=" text-[#ffffff]">Projects</CardTitle>
                </CardHeader>
                <CardContent className="bg2 m-4 rounded-md pt-6">
                  <Table >
                    <TableHeader className="bg3">
                      <TableRow>
                        <TableHead className="text-[fff]">Title</TableHead>
                        <TableHead className="hidden md:table-cell text-[000]">Stack</TableHead>
                        <TableHead className="hidden md:table-cell text-[000]">Deployed</TableHead>
                        <TableHead className="text-[000]">Update</TableHead>
                        <TableHead className="text-right text-[000]">Visit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody >
                      {projects && projects.length > 0 ? (
                        projects.map((element) => (
                          <TableRow className="bg3 bg3:hover" key={element._id}>
                            <TableCell>
                              <div className='font-semibold'>{element.title}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{element.stack}</TableCell>
                            <TableCell className="hidden md:table-cell">{element.deployed}</TableCell>
                            <TableCell>
                              <Link to={`/update/projects/${element._id}`}>
                                <Button>Update</Button>
                              </Link>
                            </TableCell>
                            <TableCell className="text-right">
                              <Link to={element.projectLink || '#'}
                              target='_blank'
                              >
                                <Button>Visit</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-3xl overflow-y-hidden text-center">
                            No projects available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Skills Tab */}
          <Tabs>
            <TabsContent>
              <Card className="bg4 border-0 pb-4">
                <CardHeader className="px-7 gap-3">
                  <CardTitle className=" text-[#ffffff]">Skills</CardTitle>
                </CardHeader>
                <CardContent className='grid sm:grid-cols-2 gap-4 bg2 m-4  p-4 rounded-md '>
                  {skills && skills.length > 0 ? (
                    skills.map((element) => (
                      <Card key={element._id} className="bg3">
                        <CardHeader>{element.title}</CardHeader>
                        <CardFooter>
                          <Progress  value={element.proficiency} />
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-3xl overflow-y-hidden text-center col-span-full">
                      No skills available
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Software Applications and Timelines Tabs */}
          <Tabs>
            <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
              {/* Software Applications */}
              <Card className="bg4 border-0">
                <CardHeader className='px-7'>
                  <CardTitle className=" text-[#ffffff]">Software Applications</CardTitle>
                </CardHeader>
                <CardContent className="bg2 m-4 rounded-md pt-6">
                  <Table>
                    <TableHeader className="bg3">
                      <TableRow >
                        <TableHead className="text-[000] ">Name</TableHead>
                        <TableHead className="md:table-cell text-[000] ">Icon</TableHead>
                        <TableHead className="md:table-cell text-[000]">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {softwareApplications && softwareApplications.length > 0 ? (
                        softwareApplications.map((element) => (
                          <TableRow className="bg3" key={element._id}>
                            <TableCell>{element.name}</TableCell>
                            <TableCell>
                              {element.svg && element.svg.url ? (
                                <img src={element.svg.url} alt={element.name} className='w-7 h-7' />
                              ) : (
                                'No Icon'
                              )}
                            </TableCell>
                            <TableCell>
                                {
                                  loading && appId === element._id ? (
                                    <SpecialLoadingButton content={"Deleting"} width={"w-fit"}/>
                                  ) : (
                                    <Button onClick={() => handleDeleteSoftwareApp(element._id)}> Delete </Button>
                                  )
                                }
                              </TableCell>

                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-3xl overflow-y-hidden text-center">
                            No Software Application is Available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
               {/* Timelines */}
              <Card className="bg4 border-0">
                <CardHeader className='px-7 flex items-center justify-between flex-row'>
                  <CardTitle className=" text-[#ffffff]">Timelines</CardTitle>
                  <Link to="/manage/timeline">
                    <Button>Manage Timeline</Button>
                  </Link>
                </CardHeader>
                <CardContent className="bg2 m-4 rounded-md pt-6" >
                  <Table>
                    <TableHeader className="bg3">
                      <TableRow >
                        <TableHead className="text-[000] ">Title</TableHead>
                        <TableHead className=" text-[000] ">From</TableHead>
                        <TableHead className="text-right  text-[000]">To</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody >
                      {timeline && timeline.length > 0 ? (
                        timeline.map((element) => {
                          // Debugging log for the timeline array and each element
                          console.log("Timeline element:", element);
                          console.log("Timeline from:", element.timeline?.from);
                          console.log("Timeline to:", element.timeline?.to);

                          return (
                            <TableRow className="bg3" key={element._id}>
                              <TableCell className="font-medium">{element.title}</TableCell>
                              <TableCell className="md:table-cell">{element.timeline?.from}</TableCell>
                              <TableCell className="md:table-cell text-right">{element.timeline?.to ? `${element.timeline?.to}` : "Present"}</TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-3xl overflow-y-hidden text-center">
                            No Software Application is Available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

             

            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
