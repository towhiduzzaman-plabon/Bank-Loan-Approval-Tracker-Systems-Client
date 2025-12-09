// client/src/pages/Dashboard/manager/ManageLoans.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLoans = async () => {
    try {
      const { data } = await axiosSecure.get("/api/loans/manager/mine", {
        params: { search },
      });
      setLoans(data || []);
    } catch (error) {
      console.error("ManageLoans error:", error);
      Swal.fire("Error", "Failed to load your loans", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetchLoans();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this loan?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/api/loans/${id}`);
      setLoans((prev) => prev.filter((loan) => loan._id !== id));
      Swal.fire("Deleted", "Loan has been deleted", "success");
    } catch (error) {
      console.error("Delete loan error:", error);
      Swal.fire("Error", "Failed to delete loan", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Loans</h1>
          <p className="text-sm text-gray-500">
            View and manage the loans you have created.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by title or category"
            className="input input-bordered input-sm w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-sm btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>

      {loans.length === 0 ? (
        <div className="text-center text-sm text-gray-500">
          No loans found. Try adding a new one.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 border rounded-xl shadow-sm">
          <table className="table table-xs sm:table-sm md:table-md">
            <thead>
              <tr>
                <th>#</th>
                <th>Loan</th>
                <th>Interest</th>
                <th>Category</th>
                <th>Max Limit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, idx) => (
                <tr key={loan._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="font-semibold text-xs md:text-sm">
                      {loan.title}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {loan.description?.slice(0, 40)}
                      {loan.description?.length > 40 && "..."}
                    </div>
                  </td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.category}</td>
                  <td>${loan.maxLimit}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/update-loan/${loan._id}`}
                        className="btn btn-xs btn-ghost"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-xs btn-error btn-outline"
                        onClick={() => handleDelete(loan._id)}
                      >
                        Delete
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

export default ManageLoans;
