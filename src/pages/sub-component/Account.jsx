import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile")
  return (
    <>
       <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 ] bg">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-2xl font-bold text-[#fff]">Account Settings</h1>
          <hr className='w-44 font-bold'/>
          <hr className='w-24 font-bold'/>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 md-4 text-sm  text-muted-foreground  " 
          >
            <Link href="#" className={selectedComponent === "Profile" ? "font-semibold text-white" : ""}
            onClick={()=> setSelectedComponent("Profile")}
            >
              Profile
            </Link>
            <Link href="#" className={selectedComponent === "Update Profile" ? "font-semibold text-white" : ""}
            onClick={()=> setSelectedComponent("Update Profile")}
            >
              Update Profile
            </Link>
            <Link href="#" className={selectedComponent === "Update Password" ? "font-semibold text-white" : ""}
            onClick={()=> setSelectedComponent("Update Password")}
            >
              Update Password
            </Link>
          </nav>
          <div className="grid gap-6">
            {(() => {
              switch(selectedComponent){
                case "Profile":
                 return <Profile/>
                 break;
                 case "Update Profile":
                 return <UpdateProfile/>
                 break;
                 case "Update Password":
                 return <UpdatePassword/>
                 break;
                 default:
                 break;
              }
            })()}
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
