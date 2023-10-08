import React from "react";


function SkeletonLoader3() {
  return (
      <div class="bg-white shadow-md rounded-md p-4 max-w-full w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-8">
            <div class="space-y-8">
              <div class="w-1/2 grid grid-cols-3 gap-4">
                <div class="h-8 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-8 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-8 bg-slate-700 col-span-1 rounded"></div>
              </div>
              <div class="grid grid-cols-8 gap-4">
                <div class="h-6 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-6 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-6 bg-slate-700 col-span-3 rounded"></div>
                <div class="h-6 bg-slate-700 col-span-2 rounded"></div>
                <div class="h-6 bg-slate-700 col-span-1 rounded"></div>
              </div>
              <div class="grid grid-cols-8 gap-4">
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-3 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-2 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
              </div>
              <div class="grid grid-cols-8 gap-4">
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-3 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-2 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
              </div>
              <div class="grid grid-cols-8 gap-4">
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-3 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-2 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
              </div>
              <div class="grid grid-cols-8 gap-4">
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-3 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-2 rounded"></div>
                <div class="h-2 bg-slate-700 col-span-1 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}



export default SkeletonLoader3;