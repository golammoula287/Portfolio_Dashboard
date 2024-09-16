import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword, clearAllForgotPasswordError } from '@/store/slices/forgotResetPasswordSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SpecialLoadingButton from './sub-component/SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword // Ensure this matches your Redux state slice
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordError());
    }
    if (isAuthenticated) {
      navigateTo('/');
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message, navigateTo]);



  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email to Reset password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to={"/login"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Remember Your Password?
                </Link>
              </div>
            </div>
            {
              loading ? <SpecialLoadingButton content={"Requesting"}/> : 
              <Button type="submit" className="w-full" onClick = {handleForgotPassword}>
              Reset Password Request
            </Button>
            }
            
            
          </div>
          
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    </>
  );
  
};

export default ForgotPassword;









// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { forgotPassword, clearAllForgotPasswordError } from '@/store/slices/forgotResetPasswordSlice';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import SpecialLoadingButton from './sub-component/SpecialLoadingButton';
// import { Button } from '@/components/ui/button';
// import { toast } from 'react-toastify';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const { loading, error, message } = useSelector(
//     (state) => state.forgotPassword // Ensure this matches your Redux state slice
//   );
//   const { isAuthenticated } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigateTo = useNavigate();

//   const handleForgotPassword = (e) => {
//     e.preventDefault(); // Prevents default form submission behavior
//     dispatch(forgotPassword(email));
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllForgotPasswordError());
//     }
//     if (isAuthenticated) {
//       navigateTo('/');
//     }
//     if (message) {
//       toast.success(message);
//     }
//   }, [dispatch, isAuthenticated, error, message, navigateTo]);

//   return (
//     <>
//       <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
//         <div className="min-h-[100vh] flex items-center justify-center py-12">
//           <form className="mx-auto grid w-[350px] gap-6" onSubmit={handleForgotPassword}>
//             <div className="grid gap-2 text-center">
//               <h1 className="text-3xl font-bold">Forgot Password</h1>
//               <p className="text-balance text-muted-foreground">
//                 Enter your email to reset password
//               </p>
//             </div>
//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   type="email"
//                   placeholder="m@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                   <Link to="/login" className="ml-auto inline-block text-sm underline">
//                     Remember Your Password?
//                   </Link>
//                 </div>
//               </div>
//               {loading ? (
//                 <SpecialLoadingButton content="Requesting" />
//               ) : (
//                 <Button type="submit" className="w-full">
//                   Reset Password
//                 </Button>
//               )}
//             </div>
//           </form>
//         </div>
//         <div className="hidden bg-muted lg:block">
//           <img
//             src="/placeholder.svg"
//             alt="Image"
//             className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ForgotPassword;

