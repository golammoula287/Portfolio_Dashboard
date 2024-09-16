import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import SpecialLoadingButton from './SpecialLoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllUserError, getUser, resetProfile, updatePassword } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmNewPassword, setConfirmNewPassword] = useState("");

const { loading , error , isUpdated , message} = useSelector (
  (state) => state.user
); 


const dispatch = useDispatch();
const handleUpdatePassword = () =>{
  dispatch(updatePassword(currentPassword,newPassword,confirmNewPassword));
};
useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearAllUserError());
  }
  if (isUpdated) {
    dispatch(getUser());
    dispatch(resetProfile());
  }
  if (message) {
    toast.success(message);
  }
}, [dispatch, error, isUpdated, message]);


  return (
    <>
      <div className='w-full h-full bg-[#1e1e1e] p-10 text-white rounded-md'>
            <div className='grid w-[100%] gap-6'>
                <div className='flex grid gap-2 items-center '>
                    <h1  className='text-2xl font-semibold '>Update Password</h1>
                    <p>Update Your Dashboard Password</p>
                    <hr />
                </div>
            </div>
            <div className='grid gap-4 mt-4 '>
               
                  <div className='grid gap-2'>
                        <Label>Current Password</Label>
                        <Input 
                        className="bg-[#4b4b4b] border-0"
                        type="text"
                        placeholder="Current Password" 
                        value={currentPassword}
                        onChange={(e)=> setCurrentPassword(e.target.value)
                         } />
                  </div>
                  <div className='grid gap-2'>
                        <Label>New Password</Label>
                        <Input 
                        className="bg-[#4b4b4b] border-0"
                        type="text"
                        placeholder="New Password" 
                        value={newPassword}
                        onChange={(e)=> setNewPassword(e.target.value)
                         } />
                  </div>
                  <div className='grid gap-2'>
                        <Label>Confirm New Password</Label>
                        <Input 
                        className="bg-[#4b4b4b] border-0"
                        type="text"
                        placeholder="Confirm New Password" 
                        value={confirmNewPassword}
                        onChange={(e)=> setConfirmNewPassword(e.target.value)
                         } />
                  </div>
                  
                  <div className='grid gap-2'>
                       {
                        !loading ? <Button onClick ={handleUpdatePassword} className="w-full w-full bg-[#b7b7b7] text-black hover:bg-[#e8e8e8] hover:text-[#525252] ">Update Password</Button> : <SpecialLoadingButton content={"Updating"}/>
                       }
                  </div>
            </div>
      </div>
    </>
  );
};

export default UpdatePassword;



