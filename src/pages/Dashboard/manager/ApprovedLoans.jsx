// src/pages/Dashboard/manager/ApprovedLoans.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ApprovedLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApproved = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(
        "/api/applications/manager/approved"
      );
      setApps(data || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load approved applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-2">Approved Applications</h2>
      <p className="text-sm text-gray-500 mb-4">
        All approved loan applications.
      </p>

      {apps.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No approved applications yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-base-100 border rounded-xl shadow-sm">
          <table className="table table-sm md:table-md">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Loan</th>
                <th>Borrower</th>
                <th>Amount</th>
                <th>Approved At</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app, idx) => (
                <tr key={app._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="font-semibold text-sm">
                      {app.loanTitle}
                    </div>
                    <div className="text-xs text-gray-500">
                      {app.loanCategory}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">{app.borrowerName}</div>
                    <div className="text-xs text-gray-500">
                      {app.borrowerEmail}
                    </div>
                  </td>
                  <td>${app.loanAmount}</td>
                  <td className="text-xs">
                    {app.approvedAt
                      ? new Date(app.approvedAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedLoans;
