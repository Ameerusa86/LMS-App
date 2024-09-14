import React from "react";

interface ProgressBarProps {
  progress: number; // Progress percentage (0-100)
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
  return (
    <div
      className={`w-full bg-gray-300 rounded-full h-6 ${className} relative`}
    >
      {/* Background Progress Track */}
      <div
        className="bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 h-6 rounded-full transition-all duration-500 ease-in-out shadow-lg"
        style={{ width: `${progress}%` }}
      ></div>

      {/* Progress Text */}
      <div className="absolute inset-0 flex justify-center items-center text-white font-semibold">
        {Math.floor(progress)}%
      </div>
    </div>
  );
};

export default ProgressBar;
