import React, { useEffect } from 'react';  // Added useEffect import
import { useDispatch, useSelector } from 'react-redux';
import { clearAllProjectSliceError, deleteProject, getAllProjects, resetProjectSlice } from '@/store/slices/projectSlice';
import { toast } from 'react-toastify';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Pen, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ManageProjects = () => {
  const { loading, projects, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  // Delete Project Functionality
  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    // Fetch all projects on component mount
    dispatch(getAllProjects());

    // Display errors or messages if available
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError()); // Clear errors after displaying
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice()); // Reset the slice after showing message
      dispatch(getAllProjects()); // Re-fetch the projects to reflect changes
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:item-center">
              <CardTitle>Manage Your Projects</CardTitle>
              <Link to="/">
                <Button>Return To Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Stack</TableHead>
                    <TableHead className="hidden md:table-cell">Deployed</TableHead>
                    <TableHead >Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map((element) => (
                      <TableRow className="bg-accent" key={element._id}>
                        <TableCell>
                          <div>
                            <img
                              src={element.projectBanner && element.projectBanner.url}
                              alt={element.title}
                              className="w-16 h-16"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{element.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{element.stack}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {element.deployed ? "Yes" : "No"}
                        </TableCell>
                        <TableCell className="flex flex-row items-center gap-3 h-24 ">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/view/projects/${element._id}`}>
                                  <button className="border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-600 hover:text-slate-950 hover:bg-green-600">
                                    <Eye className="h-5 w-5">
                                    </Eye>
                                  </button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="bg-green-500 text-white">
                                view
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/update/projects/${element._id}`}>
                                  <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400 hover:text-slate-950 hover:bg-yellow-400 " >
                                    <Pen className="h-5 w-5">
                                    </Pen>
                                  </button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="bg-yellow-500 text-white">
                                Update
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-950 hover:bg-red-600" onClick={() => handleDeleteProject(element._id)}>
                                    <Trash2 className="h-5 w-5"></Trash2>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="bg-red-500 text-white">
                                  Delete
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-3xl text-center">
                        No Projects Available
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
  );
};

export default ManageProjects;
