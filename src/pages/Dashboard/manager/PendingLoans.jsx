import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const PendingLoans = () => {
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const { data } = await axiosSecure.get(
        "/api/applications/manager/pending"
      );
      setApplications(data || []);
    } catch (error) {
      console.error("Pending loans error:", error);
      Swal.fire("Error", "Failed to load pending applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    const result = await Swal.fire({
      title: `${status} this application?`,
      icon: status === "Approved" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status.toLowerCase()} it`,
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await axiosSecure.patch(
        `/api/applications/${id}/status`,
        { status }
      );

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );

      Swal.fire(
        "Updated",
        `Application has been ${status.toLowerCase()}.`,
        "success"
      );
    } catch (error) {
      console.error("Update status error:", error);
      Swal.fire("Error", "Could not update application status", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Pending Applications</h1>
      <p className="text-sm text-gray-500 mb-6">
        Review borrowers’ applications and approve or reject them.
      </p>

      {applications.length === 0 ? (
        <div className="text-sm text-gray-500 text-center">
          No pending applications at the moment.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 border rounded-xl shadow-sm">
          <table className="table table-xs sm:table-sm md:table-md">
            <thead>
              <tr>
                <th>#</th>
                <th>Borrower</th>
                <th>Loan</th>
                <th>Amount</th>
                <th>Applied At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="font-semibold text-xs md:text-sm">
                      {app.borrowerName}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {app.borrowerEmail}
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold text-xs md:text-sm">
                      {app.loanTitle}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {app.loanCategory}
                    </div>
                  </td>
                  <td>${app.loanAmount}</td>
                  <td className="text-[11px]">
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleUpdateStatus(app._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-xs btn-error btn-outline"
                        onClick={() => handleUpdateStatus(app._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
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

export default PendingLoans;
