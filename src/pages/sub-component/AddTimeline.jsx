


import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import SpecialLoadingButton from './SpecialLoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTimeline, clearAllTimelineErrors, getAllTimeline, resetTimelineSlice } from '@/store/slices/TimelineSlice';
import { toast } from 'react-toastify';  // Assuming you are using react-hot-toast for notifications

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { loading, error, message } = useSelector(state => state.timeline); // Assuming timeline slice

  const dispatch = useDispatch();

  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14 ">
        <form onSubmit={handleAddNewTimeline} className="w-[100vh] px-5 md:w-[650px] bg1 p-8 pl-10 pr-10 rounded-md m-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-[#fff] text-3xl text-center">
                ADD A NEW TIMELINE
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-[#fff]">
                    Title
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                      <Input
                        type="text"
                        placeholder="Matriculation"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block flex-1 border-0 bg3  py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-[#fff]">
                    Description
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                      <Textarea
                        placeholder="Timeline Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-[#fff]">
                    From
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                      <Input
                        type="number"
                        placeholder="Starting Period"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-[#fff]">
                    To
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-[#fff] focus-within:ring-2 focus-within:ring-indigo-600">
                      <Input
                        type="number"
                        placeholder="Ending Period"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="block flex-1 border-0 bg3 py-1.5 pl-1 text-gray-900 placeholder:text-[#686D76] focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Adding"} />
            ) : (
              <Button type="submit" className="w-full btn btn:hover">
                Add Timeline
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTimeline;
