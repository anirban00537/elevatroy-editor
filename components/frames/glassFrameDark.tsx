import React, { ReactNode } from "react";

const DarkBasicFrame: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      <div className="border-[25px]   shadow-md border-gray-600 rounded-lg bg-gray-800 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default DarkBasicFrame;
