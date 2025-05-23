import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="h-[500px] w-[500px] flex justify-center items-center">
      {[50, 100, 150, 200, 250].map((delay, index) => (
        <div
          key={index}
          className="bg-gray-700 dark:bg-gray-300 w-[20px] h-[50px] mx-[5px] animate-load"
          style={{ animationDelay: `${delay}ms` }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingAnimation;
