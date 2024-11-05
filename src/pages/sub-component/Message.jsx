// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent } from '@radix-ui/react-tabs';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SpecialLoadingButton from './SpecialLoadingButton';
// import { deleteMessage, getAllMessages, resetMessageSlice } from '@/store/slices/messageSlice';

// const Message = () => {
 
//   const {loading,messages,error,message} = useSelector( state => state.messages);
//   const dispatch = useDispatch();
//   const [messageId, setMessageId] = useState("");

//   const handleMessageDelete = (id) => {
//     setMessageId(id);
//     dispatch(deleteMessage(id))
//   }

//   useEffect(() => {
//     if(error){
//       toast.error(error);
//       dispatch(clearAllMessageErrors());
//     }
//     if(message){
//       toast.success(message);
//       dispatch(resetMessageSlice());
//       dispatch(getAllMessages());
//     }
//   },[dispatch,error,message,loading]);

//   return (
//     <>
//       <div className='min-h-[100vh] sm:gap-4 sm:py-4n sm:pl-20'>
//           <Tabs>
//               <TabsContent>
//                   <Card>
//                     <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
//                       <CardTitle>Messages</CardTitle>
                      
//                     </CardHeader>
//                   <CardContent className="grid sm:grid-cols-2 gap-4">
//                     {
//                       messages && messages.length > 0 ? (messages.map(element => {
//                         return(
//                           <Card key={element._id} className="grid gap-2 p-4">
//                             <CardTitle>{element.senderName}</CardTitle>
                                
//                                 <CardDescription className="text-slate-950">
//                                   <span className='font-bold mr-2'>Snder Email</span>
//                                   {element.email}
//                                 </CardDescription>
//                                 <CardDescription className="text-slate-950">
//                                   <span className='font-bold mr-2'>Subject</span>
//                                   {element.subject}
//                                 </CardDescription>
//                                 <CardDescription className="text-slate-950">
//                                   <span className='font-bold mr-2'>Message</span>
//                                   {element.message}
//                                 </CardDescription>
//                                 <CardDescription className="text-slate-950">
//                                <span className='font-bold mr-2'>Date</span>
//                                {new Date(element.createdAt).toLocaleString()}
//                                </CardDescription>

//                                 <CardFooter className="justify-end">
//                                   {
//                                     loading && (messageId === element._id) ? (
//                                       <SpecialLoadingButton width={w-32} content={"Deleting"}/>
//                                     ): (
//                                       <Button className="w-32" onClick={() => handleMessageDelete(element._id)}>Delete</Button>
//                                     )
//                                   }
//                                 </CardFooter>
//                           </Card>
//                         )
//                       })) : <CardHeader>No Message Found!</CardHeader>
//                     }
//                   </CardContent>
//                   </Card>
//               </TabsContent>
//           </Tabs>
//       </div>

//     </>
//   );
// };

// export default Message;






import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpecialLoadingButton from './SpecialLoadingButton';
import { deleteMessage, getAllMessages, resetMessageSlice, clearAllMessageErrors } from '@/store/slices/messageSlice';
import { toast } from 'react-toastify';

const Message = () => {
  const { loading, messages, error, message } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const [messageId, setMessageId] = useState("");

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessageSlice());  // Reset slice after successful action
      dispatch(getAllMessages());     // Refetch messages
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className='min-h-[100vh] text-white sm:gap-4 sm:py-4n sm:pl-20  '>
        <Tabs >
          <TabsContent >
            <Card className='bg1 mr-10 border-0 mb-5 mt-5 ml-5'>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center text-white">
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4 ">
                {messages && messages.length > 0 ? (
                  messages.map(element => (
                    <Card key={element._id} className="grid gap-2 p-4 mbg">
                      <CardTitle>{element.senderName}</CardTitle>
                      <CardDescription className="text-slate-950">
                        <span className='font-bold mr-2'>Sender Email</span>
                        {element.email}
                      </CardDescription>
                      <CardDescription className="text-slate-950">
                        <span className='font-bold mr-2'>Subject</span>
                        {element.subject}
                      </CardDescription>
                      <CardDescription className="text-slate-950">
                        <span className='font-bold mr-2'>Message</span>
                        {element.message}
                      </CardDescription>
                      <CardDescription className="text-slate-950">
                        <span className='font-bold mr-2'>Date</span>
                        {new Date(element.createdAt).toLocaleString()}
                      </CardDescription>

                      <CardFooter className="justify-end">
                        {loading && (messageId === element._id) ? (
                          <SpecialLoadingButton width={32} content={"Deleting"} />
                        ) : (
                          <Button className="w-32 btn" onClick={() => handleMessageDelete(element._id)}>Delete</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                ) : <CardHeader className="text-white">No Messages Found!</CardHeader>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Message;


