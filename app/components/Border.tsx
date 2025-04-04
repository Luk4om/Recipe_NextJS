"use client";

import React, { ReactNode } from 'react';

interface BorderProps {
  children: ReactNode;
}

const Border: React.FC<BorderProps> = ({ children }) => {
  return (
    <div className="border-2 border-[#9AD0C2] rounded-xl shadow-lg bg-white">
      {children}
    </div>
  );
};

export default Border;
