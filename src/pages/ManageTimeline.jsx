import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {Table,TableHead, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
  deleteTimeline, // Import the missing action
} from '@/store/slices/TimelineSlice';
import { Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react'; // Added useEffect import
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageTimeline = () => {
  const { loading, message, error, timeline } = useSelector(
    (state) => state.timeline // Ensure you're accessing the correct slice
  );
  const dispatch = useDispatch();

  const [timelineId, setTimelineId] = useState('');

  const handleDeleteTimeline = (id) => {
    setTimelineId(id);
    dispatch(deleteTimeline(id)); // Trigger deletion of the timeline
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
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Tabs>
  <TabsContent>
    <Card>
      <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:item-center">
        <CardTitle>Manage Your Timeline</CardTitle>
        <Link to="/">
          <Button className="btn">Return To Dashboard</Button>
        </Link>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>From</TableHead>
              <TableHead className="text-right">To</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {timeline && timeline.length > 0 ? (
                        timeline.map((element) => {
                         
                          return (
                            <TableRow className="bg-accent" key={element._id}>
                              <TableCell className="font-medium">{element.title}</TableCell>
                              <TableCell className="md:table-cell">{element.description}</TableCell>
                              <TableCell className="md:table-cell">{element.timeline?.from}</TableCell>
                              <TableCell className="md:table-cell text-right">{element.timeline?.to ? `${element.timeline?.to}` : "Present"}</TableCell>
                              <TableCell className="flex justify-end">
                                  <button className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600">
                                    <Trash2 className='h-5 w-5 ' onClick={()=> handleDeleteTimeline(element._id)}/>
                                  </button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-3xl overflow-y-hidden text-center">
                            No Timeline is Available
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
    </>
  );
};

export default ManageTimeline;

