import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const ManagerProfile = () => {
  const { user, role, logOut } = useAuth();

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-bold mb-2">Manager Profile</h2>
      <p className="text-sm text-gray-500 mb-4">
        Your account and role information.
      </p>
      <div className="bg-base-100 border rounded-2xl p-4 flex gap-4 items-center">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/4JVK4fK/default-avatar.png"
              }
              alt={user?.displayName}
            />
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold">{user?.displayName}</p>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-xs mt-1">
            Role: <span className="badge badge-outline">{role}</span>
          </p>
        </div>
      </div>
      <button
        onClick={logOut}
        className="btn btn-outline btn-sm mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default ManagerProfile;
