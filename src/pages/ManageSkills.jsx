
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllSkillSliceError, deleteSkill, getAllSkills, resetSkillSlice, updateSkill } from '@/store/slices/skillSlice';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Ensure this import exists

const ManageSkills = () => {
  // Extract state from Redux store
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );

  const dispatch = useDispatch();

  // Local state to handle each skill proficiency input separately
  const [proficiencies, setProficiencies] = useState({});

  // Handle input change for proficiency
  const handleInputChange = (id, proficiency) => {
    setProficiencies((prev) => ({
      ...prev,
      [id]: proficiency, // Update the proficiency for the specific skill
    }));
  };

  // Update Skill Functionality
  const handleUpdateSkill = (id) => {
    if (proficiencies[id] !== undefined) {
      dispatch(updateSkill(id, proficiencies[id]));
    }
  };

  // Delete Skill Functionality
  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    // Fetch all skills on component mount
    dispatch(getAllSkills());

    // Display errors or messages if available
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillSliceError()); // Clear errors after displaying
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice()); // Reset the slice after showing message
      dispatch(getAllSkills()); // Re-fetch the skills to reflect changes
    }
  }, [dispatch, error, message]);

  // Optional: Add a console log to verify skills
  useEffect(() => {
    console.log('Skills:', skills);
  }, [skills]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Link to="/">
                <Button className="w-fit btn">Return To Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills && skills.length > 0 ? (
                skills.map((element) => (
                  <Card key={element._id}>
                    <CardHeader className="text-2xl font-bold items-center justify-between flex-row">
                      {element.title}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              onClick={() => handleDeleteSkill(element._id)}
                              className="h-5 w-5 hover:text-red-600 cursor-pointer"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="right" className="bg-red-500 text-white">
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter className="flex items-center">
                      <Label className="text-2xl mr-2">Proficiency</Label>
                      <Input
                        className="w-full"
                        type="number"
                        defaultValue={element.proficiency}
                        onChange={(e) => handleInputChange(element._id, e.target.value)}
                        onBlur={() => handleUpdateSkill(element._id)} // Trigger update on blur
                      />
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <CardTitle className="text-2xl overflow-y-hidden">
                  You Don't Have any Skill Yet
                </CardTitle>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
