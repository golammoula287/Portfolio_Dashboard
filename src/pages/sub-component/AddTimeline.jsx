import { Label } from '@/components/ui/label';
import React from 'react';

const AddTimeline = () => {
  return (
    <>
      <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
          <form className='w-[100vh] px-5 md:w-[650px]'>
            <div className='space y-12'>
                <div className='border-b border-gray-900/10 pb-12'>
                    <h2 className='font-semibold leading-7 text-[#fff] text-3xl text-center'>ADD A NEW TIMELINE</h2>
                    <div className='mt-10 flex flex-col gap-5'>
                         <div className='w-full sm:col-span-4'>
                            <Label className="block text-sm font-medium leading-6 text-[#fff]">
                              Tittle
                            </Label>
                            <div className='mt-2 '>
                                <div className='flex rounded-md shadow-sm ring-1 ring-insert ring-[#fff] focus-within:ring-2 focus-within:ring-insert'></div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
          </form>
      </div>
    </>
  );
};

export default AddTimeline;
