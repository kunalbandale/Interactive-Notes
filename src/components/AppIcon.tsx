import React from 'react';
import { StickyNote } from 'lucide-react';

const AppIcon = () => {
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12">
      <div className="absolute inset-0 bg-blue-500 rounded-xl transform rotate-6"></div>
      <div className="absolute inset-0 bg-blue-400 rounded-xl transform -rotate-3"></div>
      <div className="relative bg-white rounded-xl w-full h-full flex items-center justify-center">
        <StickyNote className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  );
};

export default AppIcon;