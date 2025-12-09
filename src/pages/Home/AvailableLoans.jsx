// src/pages/Home/AvailableLoans.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import React from "react";


const AvailableLoans = () => {
  const axiosPublic = useAxiosPublic();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axiosPublic.get("/api/loans/home").then((res) => setLoans(res.data));
  }, [axiosPublic]);

  return (
    <section className="max-w-6xl mx-auto px-4 my-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Available Loans</h2>
        <Link to="/all-loans" className="btn btn-outline btn-sm">
          See All
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {loans.map((loan, index) => (
          <motion.div
            key={loan._id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="card bg-base-100 shadow-md border"
          >
            <figure className="h-40 overflow-hidden">
              <img
                src={loan.image}
                alt={loan.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-base">{loan.title}</h3>
              <p className="text-xs text-gray-500">
                {loan.description?.slice(0, 80)}...
              </p>
              <p className="text-xs">
                Interest:{" "}
                <span className="font-semibold">{loan.interestRate}%</span>
              </p>
              <p className="text-xs">
                Max: <span className="font-semibold">${loan.maxLimit}</span>
              </p>
              <div className="card-actions justify-end mt-3">
                <Link
                  to={`/loans/${loan._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AvailableLoans;
