import React, { useState, useEffect } from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-72">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
};

export default LoadingSpinner;
