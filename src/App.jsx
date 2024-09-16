import React,{useEffect} from 'react';
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkills from './pages/ManageSkills';
import ManageTimeline from './pages/ManageTimeline';
import ManageProjects from './pages/ManageProjects';
import ViewProjects from './pages/ViewProjects';
import UpdateProject from './pages/UpdateProject';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import "./App.css";
import { getAllMessages } from './store/slices/messageSlice';



const App = () => {
  const dispatch = useDispatch()
   
  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllMessages())
  },[]);
  return (
    <Router>
      <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/password/forgot" element={<ForgotPassword/>}/>
         <Route path="/password/reset/:token" element={<ResetPassword/>}/>
         <Route path="/manage/skills" element={<ManageSkills/>}/>
         <Route path="/manage/timeline" element={<ManageTimeline/>}/>
         <Route path="/manage/projects" element={<ManageProjects/>}/>
         <Route path="/view/projects/:id" element={<ViewProjects/>}/>
         <Route path="/update/projects/:id" element={<UpdateProject/>}/>
      </Routes>
      <ToastContainer position="bottom-right" theme="dark"/>
    </Router>
  );
};

export default App;
