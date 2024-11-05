import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { clearAllUserError, logout } from '@/store/slices/userSlice';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { Award, FolderGit, History, Home, LayoutGrid, LogOut,  MessageCircleCodeIcon,  Package, User,PanelLeft,Package2, PencilRuler, MessageSquare, MessageSquareCodeIcon, HistoryIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
 } from "@/components/ui/sheet"
 import { Button } from '@/components/ui/button';
import Dashboard from './sub-component/Dashboard';
import AddProject from './sub-component/AddProject';
import AddSkill from './sub-component/AddSkill';
import AddApplication from './sub-component/AddApplication'
import AddTimeline from './sub-component/AddTimeline';
import Message from './sub-component/Message';
import Account from './sub-component/Account';
 
const HomePage = () => {
const [active, setActive] = useState("Dashboard");
const {isAuthenticated, error, user} = useSelector(state => state.user);
const dispatch = useDispatch();
const handleLogout = () => {
  dispatch(logout());
 
}
const navigateTo = useNavigate();
useEffect(()=>{
  if(error){
    toast.error(error);
    dispatch(clearAllUserError());
  }
  if(!isAuthenticated){
    navigateTo("/login")
  }
},[isAuthenticated]);
  return (
    <>
       <div className='flex min-h-screen w-full flex-col bg-muted/40  bg'>
          <aside className='fixed inset-y-0 left-0 hidden w-14 flex-col  border-r sm:flex z-50 hover:shadow-lg bg-[#1e1e1e]'>
           <nav className='flex flex-col items-center gap-4 px-2 sm:py-5 '>
         <Link className='group flex h-p w-p shrink-0 items-center justify-center gap-2 rounded-full'>
         <Package className='h-8 w-8 bg-white p-1 rounded-full transition-all  group-hover:scale-110'/>
         <span className='sr-only'> Dashboard </span>
         </Link>
         <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Link
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${active === "Dashboard" ? "bg7" : "text-muted-foreground"} transition-colors hover:text-white md:h-8 md:w-8`}
        onClick={() => setActive("Dashboard")}
      >
        <Home className='w-5 h-5' />
        <span className='sr-only'>Dashboard</span>
      </Link>
    </TooltipTrigger>
    <TooltipContent
      side='right'
      className='relative bg-white text-black p-2 ml-2 rounded shadow-lg transform-gpu transition-all duration-0 ease-in-out opacity-0 translate-x-2 data-[state=delayed-open]:opacity-100 data-[state=delayed-open]:translate-x-0'
    >
      Dashboard
    </TooltipContent>
  </Tooltip>
</TooltipProvider>




         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link className={`flex h-9 w-9 items-center justify-center rounded-lg ${active === "Add Project" ? "text-accent-foreground bg7" : "text-muted-foreground" } transition-colors hover:text-white md:h-8 md:w-8`}
                  onClick={() =>setActive("Add Project") }
                  >
                  <FolderGit className=' w-5 h-5'/>
                  <span className='sr-only'>Add Project</span>
                  </Link>
               </TooltipTrigger>
               <TooltipContent
      side='right'
      className='relative bg-white text-black p-2 ml-2 rounded shadow-lg transform-gpu transition-all duration-0 ease-in-out opacity-0 translate-x-2 data-[state=delayed-open]:opacity-100 data-[state=delayed-open]:translate-x-0'
    >Add Project</TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link className={`flex h-9 w-9 items-center justify-center rounded-lg ${active === "Add Skill" ? "text-accent-foreground bg7" : "text-muted-foreground" } transition-colors hover:text-white md:h-8 md:w-8`}
                  onClick={() =>setActive("Add Skill") }
                  >
                  <PencilRuler className=' w-5 h-5'/>
                  <span className='sr-only'>Add Skill</span>
                  </Link>
               </TooltipTrigger>
               <TooltipContent
      side='right'
      className='relative bg-white text-black p-2 ml-2 rounded shadow-lg transform-gpu transition-all duration-0 ease-in-out opacity-0 translate-x-2 data-[state=delayed-open]:opacity-100 data-[state=delayed-open]:translate-x-0'
    >Add Skill</TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link className={`flex h-9 w-9 items-center justify-center rounded-lg ${active === "Add Application" ? "text-accent-foreground bg7" : "text-muted-foreground" } transition-colors hover:text-white md:h-8 md:w-8`}
                  onClick={() =>setActive("Add Application") }
                  >
                  <LayoutGrid className=' w-5 h-5'/>
                  <span className='sr-only'>Add Application</span>
                  </Link>
               </TooltipTrigger>
               <TooltipContent
      side='right'
      className='relative bg-white text-black p-2 ml-2 rounded shadow-lg transform-gpu transition-all duration-0 ease-in-out opacity-0 translate-x-2 data-[state=delayed-open]:opacity-100 data-[state=delayed-open]:translate-x-0'
    >Add Application</TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link className={`flex h-9 w-9 items-center justify-center rounded-lg ${active === "Add Timeline" ? "text-accent-foreground bg7" : "text-muted-foreground" } transition-colors hover:text-white md:h-8 md:w-8`}
                  onClick={() =>setActive("Add Timeline") }
                  >
                  <History className=' w-5 h-5'/>
                  <span className='sr-only'>Add Timelines</span>
                  </Link>
               </TooltipTrigger>
               <TooltipContent
      side='right'
      className='relative bg-white text-black p-2 ml-2 rounded shadow-lg transform-gpu transition-all duration-0 ease-in-out opacity-0 translate-x-2 data-[state=delayed-open]:opacity-100 data-[state=delayed-open]:translate-x-0'
    >Add Timelines</TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link className={`flex h-9 w-9 items-center justify-center rounded-lg ${active === "Message" ? "text-accent-foreground bg7" : "text-muted-foreground" } transition-colors hover:text-white md:h-8 md:w-8`}
                  onClick={() =>setActive("Message") }
                  >
                  <MessageSquareCodeIcon className=' w-5 h-5'/>
                  <span className='sr-only'>Message</span>
                  </Link>
               </TooltipTrigger>
               <TooltipContent
      side='right'
      className='relative bg-white text-black p-2 ml-2 rounded shadow-lg transform-gpu transition-all duration-0 ease-in-out opacity-0 translate-x-2 data-[state=delayed-open]:opacity-100 data-[state=delayed-open]:translate-x-0'
    >Message</TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link className={`flex h-9 w-9 items-center justify-center rounded-lg ${active === "Account" ? "text-accent-foreground bg7" : "text-muted-foreground" } transition-colors hover:text-white md:h-8 md:w-8`}
                  onClick={() =>setActive("Account") }
                  >
                  <User className=' w-5 h-5'/>
                  <span className='sr-only'>Account</span>
                  </Link>
               </TooltipTrigger>
               <TooltipContent
      side='right'
      className='relative bg-white text-black p-2 ml-2 rounded shadow-lg transform-gpu transition-all duration-0 ease-in-out opacity-0 translate-x-2 data-[state=delayed-open]:opacity-100 data-[state=delayed-open]:translate-x-0'
    >Account</TooltipContent>
            </Tooltip>
         </TooltipProvider>
         
           </nav>
           <nav className='mt-auto flex-col items-center gap-4 px-2'>
           <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link className={`flex h-9 w-9 items-center justify-center rounded-lg ${active === "Logout" ? "text-accent-foreground bg7" : "text-muted-foreground" } transition-colors hover:text-white md:h-8 md:w-8`}
                  onClick={handleLogout}
                  >
                  <LogOut className=' w-5 h-5'/>
                  <span className='sr-only'>Logout</span>
                  </Link>
               </TooltipTrigger>
               <TooltipContent
      side='right'
      className='relative bg-white text-black p-2 ml-2 rounded shadow-lg transform-gpu transition-all duration-0 ease-in-out opacity-0 translate-x-2 data-[state=delayed-open]:opacity-100 data-[state=delayed-open]:translate-x-0'
    >Logout</TooltipContent>
            </Tooltip>
         </TooltipProvider>
          </nav>      
          </aside>
          <header className='sticky top-0 z-30 flex h-14 items-center  gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]'>
           <Sheet>
               <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden items-center ">
                     <PanelLeft className="h-5 w-5 "/>
                     <span className='sr-only mt-1'>Toggle Menu</span>
                  </Button>
               </SheetTrigger>
               <SheetContent side="left" className="sm:max-w-xs">
                  <nav className='grid gap-6 text-lg front-medium'>
                  <div className='flex items-center gap-4 md:grow-0 ml-1 -mt-2.5 mb-2'>
                        <img src={user && user.avatar && user.avatar.url} alt="avatar" className='w-10 h-10 rounded-full ' />
                       
                  </div>


                        <Link href="#" className ={`flex items-center gap-4 px-2.5 ${active === "Dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        onClick={()=> setActive("Dashboard")}> 
                        <Home className='h-5 w-5'/>
                        Dashboard
                        </Link>
                        <Link href="#" className ={`flex items-center gap-4 px-2.5 ${active === "Add Project" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        onClick={()=> setActive("Add Project")}> 
                        <FolderGit className='h-5 w-5'/>
                        Add Project
                        </Link>
                        <Link href="#" className ={`flex items-center gap-4 px-2.5 ${active === "Add Skill" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        onClick={()=> setActive("Add Skill")}> 
                        <PencilRuler className='h-5 w-5'/>
                        Add Skill
                        </Link>
                        <Link href="#" className ={`flex items-center gap-4 px-2.5 ${active === "Add Application" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        onClick={()=> setActive("Add Application")}> 
                        <LayoutGrid className='h-5 w-5'/>
                        Add Application
                        </Link>
                        <Link href="#" className ={`flex items-center gap-4 px-2.5 ${active === "Account" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        onClick={()=> setActive("Account")}> 
                        <User className='h-5 w-5'/>
                        Account
                        </Link>
                        <Link href="#" className ={`flex items-center gap-4 px-2.5 ${active === "Add Timeline" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        onClick={()=> setActive("Add Timeline")}> 
                        <History className='h-5 w-5'/>
                        Add Timeline
                        </Link>
                        <Link href="#" className ={`flex items-center gap-4 px-2.5 ${active === "Message" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        onClick={()=> setActive("Message")}> 
                        <MessageSquareCodeIcon className='h-5 w-5'/>
                        Message
                        </Link>
                        <Link  className ={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground `}
                       onClick={handleLogout}
                       > 
                        <LogOut className='h-5 w-5'/>
                        Logout
                        </Link>
                  </nav>
               </SheetContent>
           </Sheet>
                  <div className='flex items-center hight mb-4 gap-4 md:grow-0 sm:ml-16 sm:mt-5'>
                        <img src={user && user.avatar && user.avatar.url} alt="avatar" className='w-14 h-15 rounded-full max-[900px]:hidden border border-white border-[2px] ' />
                        <h1 className=' text-3xl max-[900px]:text-2xl text-white'>
                           Welcome back, {user.fullName}
                        </h1>
                  </div>
          </header>
          {
            (()=>{
               switch (active){
                   case "Dashboard":
                   return <Dashboard/>
                   break;
                   case "Add Project":
                   return <AddProject/>
                   break;
                   case "Add Skill":
                   return <AddSkill/>
                   break;
                   case "Add Application":
                   return <AddApplication/>
                   break;
                   case "Add Timeline":
                   return <AddTimeline/>
                   break;
                   case "Message":
                   return <Message/>
                   break;
                   case "Account":
                   return <Account/>
                   break;
                   default:
                     return <Dashboard/>
                   break;
               }
            })()
          }
       </div>



    </>
  );
};

export default HomePage;
