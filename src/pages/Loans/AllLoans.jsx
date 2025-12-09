// src/pages/Loans/AllLoans.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllLoans = () => {
  const axiosPublic = useAxiosPublic();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const { data } = await axiosPublic.get("/api/loans");

        // 🔥 এখানে safe ভাবে array বের করছি
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.loans)
          ? data.loans
          : [];

        setLoans(list);
      } catch (error) {
        console.error("AllLoans error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [axiosPublic]);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">All Loans</h1>
          <p className="text-sm text-gray-500">
            Browse all available loan products and apply from the details page.
          </p>
        </div>
      </div>

      {loans.length === 0 ? (
        <p className="text-sm text-gray-500">
          No loans found. Please add some from manager dashboard.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="card bg-base-100 border rounded-2xl shadow-sm overflow-hidden flex flex-col"
            >
              {/* image field যদি single "image" হয় তাহলে এখানে loan.image ব্যবহার করতে পারো */}
              {loan.images?.[0] && (
                <figure className="h-40 overflow-hidden">
                  <img
                    src={loan.images[0]}
                    alt={loan.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
              )}

              <div className="card-body p-4 md:p-5 flex-1 flex flex-col">
                <h2 className="card-title text-base md:text-lg mb-1">
                  {loan.title}
                </h2>
                <p className="text-xs text-gray-500 mb-2">
                  {loan.category} · Interest {loan.interestRate}% · Max $
                  {loan.maxLimit}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {loan.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    {loan.emiPlans?.length ? (
                      <span>
                        EMI: {loan.emiPlans.slice(0, 2).join(", ")}
                        {loan.emiPlans.length > 2 ? "..." : ""}
                      </span>
                    ) : (
                      <span>No EMI plan set</span>
                    )}
                  </div>
                  <Link
                    to={`/loans/${loan._id}`}
                    className="btn btn-primary btn-xs md:btn-sm hover:bg-yellow-400 hover:border-yellow-400"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllLoans;
//kkkkkkkkkkkk