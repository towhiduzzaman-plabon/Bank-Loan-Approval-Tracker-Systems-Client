// src/pages/Dashboard/admin/LoanApplications.jsx
import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const LoanApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get("/api/applications/admin", {
        params: { status: statusFilter || undefined },
      });
      setApplications(data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl font-bold">Loan Applications</h2>
          <p className="text-sm text-gray-500">
            View all loan applications with status filter.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Filter by status:</label>
          <select
            className="select select-sm select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No applications found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Loan</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Applied At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="text-sm">
                      <p className="font-semibold">{app.loanTitle}</p>
                      <p className="text-xs text-gray-500">
                        Category: {app.loanCategory}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <p>{app.borrowerName}</p>
                      <p className="text-xs text-gray-500">
                        {app.borrowerEmail}
                      </p>
                    </div>
                  </td>
                  <td>${app.loanAmount}</td>
                  <td>
                    <span className="badge badge-outline">{app.status}</span>
                  </td>
                  <td className="text-xs">
                    {new Date(app.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <button
                      onClick={() => setSelected(app)}
                      className="btn btn-xs btn-outline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <dialog
          open
          className="modal modal-open"
          onClose={() => setSelected(null)}
        >
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-2">
              Application Details – {selected.loanTitle}
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <b>Borrower:</b> {selected.borrowerName} ({selected.borrowerEmail})
              </p>
              <p>
                <b>Amount:</b> ${selected.loanAmount}
              </p>
              <p>
                <b>Status:</b> {selected.status}
              </p>
              <p>
                <b>Fee Status:</b> {selected.feeStatus}
              </p>
              <p>
                <b>Reason:</b> {selected.reason}
              </p>
              <p>
                <b>Address:</b> {selected.address}
              </p>
              <p>
                <b>National ID:</b> {selected.nationalId}
              </p>
              <p>
                <b>Income Source:</b> {selected.incomeSource} – $
                {selected.monthlyIncome}
              </p>
              <p>
                <b>Applied:</b>{" "}
                {new Date(selected.createdAt).toLocaleString()}
              </p>
              {selected.approvedAt && (
                <p>
                  <b>Approved At:</b>{" "}
                  {new Date(selected.approvedAt).toLocaleString()}
                </p>
              )}
              {selected.rejectedAt && (
                <p>
                  <b>Rejected At:</b>{" "}
                  {new Date(selected.rejectedAt).toLocaleString()}
                </p>
              )}
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default LoanApplications;
