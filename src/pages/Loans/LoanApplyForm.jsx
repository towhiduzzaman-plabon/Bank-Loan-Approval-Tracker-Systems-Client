import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";

const LoanApplyForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  // loan info লোড
  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const { data } = await axiosPublic.get(`/api/loans/${id}`);
        setLoan(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load loan info", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchLoan();
  }, [id, axiosPublic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      loanId: loan._id,
      loanAmount: Number(form.loanAmount.value),

      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contactNumber: form.contactNumber.value,
      incomeSource: form.incomeSource.value,
      monthlyIncome: Number(form.monthlyIncome.value),
      reason: form.reason.value,
      address: form.address.value,
      notes: form.notes.value,
    };

    try {
      await axiosSecure.post("/api/applications", payload);
      Swal.fire("Success", "Application submitted successfully!", "success");
      navigate("/dashboard/my-loans"); // submit হলে এখানে যাবে
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit application", "error");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!loan) return null;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-2">
        Apply for <span className="text-purple-700">{loan.title}</span>
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Interest {loan.interestRate}% · Max ${loan.maxLimit}
      </p>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        {/* read-only */}
        <div>
          <label className="text-xs mb-1 block">Your Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered input-sm w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="text-xs mb-1 block">Loan Title</label>
          <input
            type="text"
            value={loan.title}
            readOnly
            className="input input-bordered input-sm w-full bg-gray-100"
          />
        </div>

        {/* inputs */}
        <div>
          <label className="text-xs mb-1 block">Loan Amount</label>
          <input
            name="loanAmount"
            type="number"
            required
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div>
          <label className="text-xs mb-1 block">First Name</label>
          <input
            name="firstName"
            type="text"
            required
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div>
          <label className="text-xs mb-1 block">Last Name</label>
          <input
            name="lastName"
            type="text"
            required
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div>
          <label className="text-xs mb-1 block">Contact Number</label>
          <input
            name="contactNumber"
            type="text"
            required
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div>
          <label className="text-xs mb-1 block">Income Source</label>
          <input
            name="incomeSource"
            type="text"
            required
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div>
          <label className="text-xs mb-1 block">Monthly Income</label>
          <input
            name="monthlyIncome"
            type="number"
            required
            className="input input-bordered input-sm w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs mb-1 block">Address</label>
          <input
            name="address"
            type="text"
            className="input input-bordered input-sm w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs mb-1 block">Reason for Loan</label>
          <textarea
            name="reason"
            required
            className="textarea textarea-bordered w-full text-sm"
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs mb-1 block">Extra Notes (optional)</label>
          <textarea
            name="notes"
            className="textarea textarea-bordered w-full text-sm"
            rows={2}
          />
        </div>

        <button type="submit" className="btn btn-primary md:col-span-2">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanApplyForm;
