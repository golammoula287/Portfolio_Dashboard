import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpecialLoadingButton from './SpecialLoadingButton';
import { clearAllUserError, getUser, resetProfile, updateProfile } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';



const UpdateProfile = () => {
  const {user, loading, error, isUpdated,message } =useSelector((state) => state.user);
  const [fullName , setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone , setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL , setPortfolioURL] = useState(user && user.portfolioURL);
  const [githubURL,setGithubURL] = useState(user && (user.githubURL === "undefined" ? "" : user.githubURL));
  const [linkedInURL,setLinkedInURL] = useState(user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL));
  const [facebookURL,steFacebookURL] = useState(user && (user.facebookURL === "undefined" ? "" : user.facebookURL));
  const [instagramURL,SetInstagramURL] = useState(user && (user.instagramURL === "undefined" ? "" : user.instagramURL));
  const [twitterURL,setTwitterURL] = useState(user && (user.twitterURL === "undefined" ? "" : user.twitterURL));
  const [avatar,setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url);
  const [resume,setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(user && user.resume && user.resume.url);

  const dispatch = useDispatch();
  const avatarHandler = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        
        reader.onload = () => {
          setAvatarPreview(reader.result); // Update the avatar preview state
          setAvatar(file); // Store the selected file
        };
        
        reader.readAsDataURL(file); // Convert the file to a data URL
      } else {
        console.log("No file selected.");
      }
    };
    
    
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      setResumePreview(reader.result);
    setResume(file);
    };
  };
  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("portfolioURL", portfolioURL);
    formData.append("aboutMe", aboutMe);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("facebookURL", facebookURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
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
      <div className='w-full h-full  bg5 p-10 text-white rounded-md'>
            <div className='grid w-[100%] gap-6'>
                <div className='flex grid gap-2 items-center '>
                    <h1  className='text-2xl font-semibold '>Update Profile</h1>
                    <p></p>
                    <hr />
                </div>
            </div>
            <div className='grid gap-4 mt-4 '>
                <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5 bg2 p-4 rounded-md'>
                   <div className='grid gap-2 w-full sm:w-72'>
                      <Label>Profile Image</Label>
                      <img src={avatarPreview ? `${avatarPreview}`:"./avatar.jpg"} alt="avatar" className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'/>
                     <div className="relative">
                     <input 
                        type="file" 
                        onChange={avatarHandler} 
                        className="avatar-update-btn" 
                         />
                     </div>

                     
                   </div>
                   <div className='grid gap-2 w-full sm:w-72'>
                      <Label>Resume</Label>
                  
                      <img src={resumePreview ? `${resumePreview}`:"./resume.jpg"} alt="resume" className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'/>
                  
                      
                      <div className="relative">
                     <input 
                        type="file" 
                        onChange={resumeHandler} 
                        className="avatar-update-btn" 
                         />
                     </div>
                   </div>
                </div>
                  <div className='grid gap-2 '>
                        <Label>Full Name</Label>
                        <Input className="bg-[#4b4b4b] border-0" type="text" placeholder="Your Full Name" value={fullName} onChange={(e)=> setFullName(e.target.value)} />
                  </div>
                  <div className='grid gap-2'>
                        <Label>Email</Label>
                        <Input className="bg-[#4b4b4b] border-0" type="email" placeholder="Your Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                  </div>
                  <div className='grid gap-2'>
                        <Label>phone</Label>
                        <Input className="bg-[#4b4b4b] border-0" type="phone" placeholder="Your Phone Number" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                  </div>
                  <div className='grid gap-2'>
                        <Label>About Me</Label>
                        <Textarea className="bg-[#4b4b4b] border-0" placeholder="Write About Yourself" value={aboutMe} onChange={(e)=> setAboutMe(e.target.value)} />
                  </div>
                  <div className='grid gap-2'>
                        <Label>Portfolio URL</Label>
                        <Input className="bg-[#4b4b4b] border-0" type="portfolioURL"  placeholder="Your Portfolio URL" value={portfolioURL} onChange={(e)=> setPortfolioURL(e.target.value)}/>
                  </div>
                  <div className='grid gap-2'>
                        <Label>LinkedIn URL</Label>
                        <Input className="bg-[#4b4b4b] border-0" type="linkedInURL"  placeholder="Your LinkedIn URL" value={linkedInURL} onChange={(e)=> setLinkedInURL(e.target.value)} />
                  </div>
                  <div className='grid gap-2'>
                        <Label>Instagram URL</Label>
                        <Input className="bg-[#4b4b4b] border-0" type="instagramURL"  placeholder="Your Instagram URL" value={instagramURL} onChange={(e)=> SetInstagramURL(e.target.value)} />
                  </div>
                  <div className='grid gap-2'>
                        <Label>Facebook URL</Label>
                        <Input className="bg-[#4b4b4b] border-0" type="facebookURL" placeholder="Your Facebook URL" value={facebookURL} onChange={(e)=> steFacebookURL(e.target.value)}/>
                  </div>
                  <div className='grid gap-2'>
                        <Label>Github URL</Label>
                        <Input className="bg-[#4b4b4b] border-0" type="githubURL" placeholder="Your Github URL" value={githubURL} onChange={(e)=> setGithubURL(e.target.value)} />
                  </div>
                  <div className='grid gap-2'>
                        <Label>Twitter URL</Label>
                        <Input className="bg-[#4b4b4b] border-0" type="twitterURL" placeholder="Your Twitter URL" value={twitterURL} onChange={(e)=> setTwitterURL(e.target.value)} />
                  </div>
                  <div className='grid gap-2'>
                       {
                        !loading ? <Button onClick ={handleUpdateProfile} className="w-full w-full bg-[#b7b7b7] text-black hover:bg-[#e8e8e8] hover:text-[#525252] ">Update Profile</Button> : <SpecialLoadingButton content={"Updating"}/>
                       }
                  </div>
            </div>
      </div>
    </>
  );
};

export default UpdateProfile;



