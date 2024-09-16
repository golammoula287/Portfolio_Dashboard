import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSelector } from 'react-redux'; 
import { Textarea } from '@/components/ui/textarea'; 
import { Link } from 'react-router-dom'; 

const Profile = () => {
  const {user} = useSelector((state) => state.user);
  return (
    <>
      <div className='w-full h-full bg-[#1e1e1e] p-10 text-white rounded-md'>
            <div className='grid w-[100%] gap-6'>
                <div className='flex grid gap-2 items-center '>
                    <h1  className='text-2xl font-semibold '>Profile Overview</h1>
                    <p></p>
                    <hr />
                </div>
            </div>
            <div className='grid gap-4 mt-4 '>
                <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5  bg-[#4b4b4b] p-4 rounded-md'>
                   <div className='grid gap-2 w-full sm:w-72'>
                      <Label>Profile Image</Label>
                      <img src={user && user.avatar && user.avatar.url} alt="avatar" className='w-full h-auto sm:w-72 sm:h-72 rounded-md'/>
                   </div>
                   <div className='grid gap-2 w-full sm:w-72'>
                      <Label>Resume</Label>
                      <img src={user && user.resume && user.resume.url} alt="avatar" className='w-full h-auto sm:w-72 sm:h-72 rounded-md'/>
                   </div>
                </div>
                  <div className='grid gap-2 bg-[#4b4b4b] p-4 rounded-md'>
                        <Label>Full Name</Label>
                        {user.fullName} 
                  </div>
                  <div className='grid gap-2 bg-[#4b4b4b] p-4 rounded-md'>
                        <Label>Email</Label>
                        {user.email}
                  </div>
                  <div className='grid gap-2 bg-[#4b4b4b] p-4 rounded-md'>
                        <Label>phone</Label>
                        {user.phone} 
                  </div>
                  <div className='grid gap-2 bg-[#4b4b4b] p-4 rounded-md'>
                        <Label>About Me</Label>
                        {user.aboutMe} 
                  </div>
                  <div className='grid gap-2 bg-[#4b4b4b] p-4 rounded-md'>
                        <Label>Portfolio URL</Label>
                        {user.portfolioURL} 
                  </div>
                  <div className='grid gap-2 bg-[#4b4b4b] p-4 rounded-md'>
                        <Label>LinkedIn URL</Label>
                       {user.linkedInURL} 
                  </div>
                  <div className='grid gap-2 bg-[#4b4b4b] p-4 rounded-md'>
                        <Label>Instagram URL</Label>
                        {user.instagramURL} 
                  </div>
                  <div className='grid gap-2 bg-[#4b4b4b] p-4 rounded-md'>
                        <Label>Facebook URL</Label>
                        {user.facebookURL}
                  </div>
                  <div className='grid gap-2 bg-[#4b4b4b] p-4 rounded-md'>
                        <Label>Github URL</Label>
                        {user.githubURL} 
                  </div>
            </div>
      </div>
    </>
  );
};

export default Profile;
