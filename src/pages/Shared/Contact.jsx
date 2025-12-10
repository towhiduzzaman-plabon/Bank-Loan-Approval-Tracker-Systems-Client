import React, { useState, useEffect } from "react";

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
      <p className="text-sm text-gray-600 mb-4">
        For any queries about this project or microloan system demos, feel free
        to reach out.
      </p>
      <div className="bg-base-100 border rounded-2xl p-5 text-sm space-y-1">
        <p>Email: support@loanlink.app</p>
        <p>Phone: +880-1723-912-972</p>
        <p>Address: Parbatipur, Bangladesh</p>
      </div>
    </div>
  );
};

export default Contact;
