import React, { ReactNode } from "react";

const BasicFrame: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      <div className=" border-[25px]  shadow-md border-[#ffffffc7] rounded-lg  pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default BasicFrame;
