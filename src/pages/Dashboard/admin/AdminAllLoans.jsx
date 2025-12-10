import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get("/api/loans");
      setLoans(data.loans || data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load loans", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleToggleShowOnHome = async (loan) => {
    try {
      const { data } = await axiosSecure.patch(
        `/api/loans/${loan._id}/show-on-home`,
        { showOnHome: !loan.showOnHome }
      );
      setLoans((prev) => prev.map((l) => (l._id === data._id ? data : l)));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update home visibility", "error");
    }
  };

  const handleDelete = async (loan) => {
    const result = await Swal.fire({
      title: "Delete this loan?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/api/loans/${loan._id}`);
      Swal.fire("Deleted", "Loan has been deleted", "success");
      fetchLoans();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete loan", "error");
    }
  };

  const handleQuickEdit = async (loan) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Loan",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${
          loan.title || ""
        }" />
        <input id="interest" type="number" class="swal2-input" placeholder="Interest" value="${
          loan.interestRate || 0
        }" />
        <input id="maxLimit" type="number" class="swal2-input" placeholder="Max Limit" value="${
          loan.maxLimit || 0
        }" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const title = document.getElementById("title").value;
        const interest = document.getElementById("interest").value;
        const maxLimit = document.getElementById("maxLimit").value;
        if (!title) {
          Swal.showValidationMessage("Title is required");
        }
        return {
          title,
          interestRate: Number(interest),
          maxLimit: Number(maxLimit),
        };
      },
    });

    if (!formValues) return;

    try {
      await axiosSecure.patch(`/api/loans/${loan._id}`, formValues);
      Swal.fire("Updated", "Loan updated successfully", "success");
      fetchLoans();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update loan", "error");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-2">All Loans (Admin)</h2>
      <p className="text-sm text-gray-500 mb-4">
        Manage all loans and control which ones appear on the home page.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : loans.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No loans found.</p>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Loan</th>
                <th>Interest</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Show on Home</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, idx) => (
                <tr key={loan._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={loan.image} alt={loan.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{loan.title}</div>
                        <div className="text-xs text-gray-500">
                          Max: ${loan.maxLimit}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.category}</td>
                  <td className="text-xs">
                    {loan.createdByEmail || "Manager"}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-sm toggle-primary"
                      checked={loan.showOnHome}
                      onChange={() => handleToggleShowOnHome(loan)}
                    />
                  </td>
                  <td className="text-right space-x-2">
                    {/* Secondary style Update button */}
                    <button
                      onClick={() => handleQuickEdit(loan)}
                      className="
                        btn btn-xs
                        border border-gray-400
                        bg-white text-gray-700
                        hover:bg-yellow-400 hover:border-yellow-400 hover:text-black
                      "
                    >
                      Update
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(loan)}
                      className="
                        btn btn-xs btn-error text-black
                        hover:bg-red-600
                      "
                    >
                      Delete
                    </button>
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

export default AdminAllLoans;
