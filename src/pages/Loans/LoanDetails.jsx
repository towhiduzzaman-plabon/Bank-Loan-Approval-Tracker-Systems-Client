import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ----- Load Loan Details -----
  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const { data } = await axiosSecure.get(`/api/loans/${id}`);
        setLoan(data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to load loan details", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, axiosSecure]);

  // ----- Apply Handler with Validation -----
  const handleApply = async (e) => {
    e.preventDefault();
    if (!loan) return;

    const form = e.target;

    const loanAmount = parseFloat(form.loanAmount.value);
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const contactNumber = form.contactNumber.value.trim();
    const incomeSource = form.incomeSource.value.trim();
    const monthlyIncome = parseFloat(form.monthlyIncome.value);
    const address = form.address.value.trim();
    const reason = form.reason.value.trim();
    const notes = form.notes.value.trim();

    // -------- Basic Validation --------
    if (!loanAmount || loanAmount <= 0) {
      return Swal.fire("Invalid Amount", "Enter a valid loan amount.", "warning");
    }

    if (loan.maxLimit && loanAmount > loan.maxLimit) {
      return Swal.fire(
        "Limit Exceeded",
        `Maximum allowed amount for this loan is $${loan.maxLimit}.`,
        "warning"
      );
    }

    if (!firstName || !lastName) {
      return Swal.fire(
        "Name Required",
        "Please enter your first and last name.",
        "warning"
      );
    }

    if (contactNumber.length < 6) {
      return Swal.fire(
        "Invalid Contact",
        "Please enter a valid contact number.",
        "warning"
      );
    }

    if (!monthlyIncome || monthlyIncome <= 0) {
      return Swal.fire(
        "Invalid Income",
        "Please enter a valid monthly income.",
        "warning"
      );
    }

    if (!address) {
      return Swal.fire(
        "Address Required",
        "Please enter your full address.",
        "warning"
      );
    }

    if (!reason) {
      return Swal.fire(
        "Reason Required",
        "Please describe why you need this loan.",
        "warning"
      );
    }

    const application = {
      loanId: loan._id,
      loanAmount,
      firstName,
      lastName,
      contactNumber,
      incomeSource,
      monthlyIncome,
      address,
      reason,
      notes,
    };

    try {
      setSubmitting(true);
      await axiosSecure.post("/api/applications", application);

      const res = await Swal.fire({
        title: "Application Submitted!",
        text: "Your loan application is now pending review.",
        icon: "success",
        confirmButtonText: "Go to My Loans",
        showCancelButton: true,
        cancelButtonText: "Stay here",
      });

      if (res.isConfirmed) {
        navigate("/dashboard/my-loans");
      } else {
        form.reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit application", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!loan) return <p className="text-center mt-10">Loan not found.</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* ---------- Loan Header ---------- */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Apply for <span className="text-purple-600">{loan.title}</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Category: <b>{loan.category}</b> • Interest:{" "}
            <b>{loan.interestRate}%</b> • Max Limit: <b>${loan.maxLimit}</b>
          </p>
        </div>

        {loan.images?.[0] && (
          <img
            src={loan.images[0]}
            alt={loan.title}
            className="w-full md:w-56 h-32 md:h-32 object-cover rounded-xl shadow-sm border"
          />
        )}
      </div>

      {/* ---------- Apply Form Card ---------- */}
      <div className="bg-base-100 border rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-2">Loan Application Form</h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill in your personal and financial information carefully. Your
          application will be reviewed by our loan officers.
        </p>

        <form onSubmit={handleApply} className="space-y-6">
          {/* Your Email (readonly) */}
          <div>
            <label className="font-semibold block mb-1">Your Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600 text-sm"
              placeholder="Your email address"
            />
          </div>

          {/* Loan Title (readonly) */}
          <div>
            <label className="font-semibold block mb-1">Loan Title</label>
            <input
              type="text"
              value={loan.title}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600 text-sm"
              placeholder="Loan Title"
            />
          </div>

          {/* Loan Amount */}
          <div>
            <label className="font-semibold block mb-1">Loan Amount</label>
            <input
              type="number"
              required
              name="loanAmount"
              min="1"
              placeholder="Enter the amount you want to borrow"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Maximum you can request: ${loan.maxLimit}
            </p>
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-1">First Name</label>
              <input
                type="text"
                required
                name="firstName"
                placeholder="Your first name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Last Name</label>
              <input
                type="text"
                required
                name="lastName"
                placeholder="Your last name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="font-semibold block mb-1">Contact Number</label>
            <input
              type="text"
              required
              name="contactNumber"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Income Source & Monthly Income */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-1">Income Source</label>
              <input
                type="text"
                required
                name="incomeSource"
                placeholder="Job, Business, Freelancing etc."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Monthly Income</label>
              <input
                type="number"
                required
                name="monthlyIncome"
                min="1"
                placeholder="Enter your monthly income"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold block mb-1">Address</label>
            <textarea
              required
              name="address"
              placeholder="Your full address"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 text-sm"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="font-semibold block mb-1">Reason for Loan</label>
            <textarea
              required
              name="reason"
              placeholder="Why do you need this loan?"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 text-sm"
            />
          </div>

          {/* Extra Notes */}
          <div>
            <label className="font-semibold block mb-1">
              Extra Notes (Optional)
            </label>
            <textarea
              name="notes"
              placeholder="Additional information (optional)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-purple-600 text-white font-semibold py-3 rounded-lg transition-all ${
              submitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-yellow-400 hover:text-black"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanDetails;
