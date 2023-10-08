import React from "react";

function SkeletonLoader1() {
  return (
    <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonLoader2() {
  return (
      <div className="animate-pulse">
        <div className="rounded-full bg-slate-700 h-6 w-6"></div>
      </div>
  );
}

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



export { SkeletonLoader1, SkeletonLoader2, SkeletonLoader3 };