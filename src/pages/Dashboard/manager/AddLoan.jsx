import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddLoan = () => {
  const axiosSecure = useAxiosSecure();
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const interestRate = Number(form.interestRate.value);
    const maxLimit = Number(form.maxLimit.value);
    const requiredDocuments = form.requiredDocuments.value
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);
    const emiPlans = form.emiPlans.value
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    const imageUrl = form.imageUrl.value;
    const showOnHome = form.showOnHome.checked;

    const payload = {
      title,
      category,
      description,
      interestRate,
      maxLimit,
      requiredDocuments,
      emiPlans,
      images: imageUrl ? [imageUrl] : [],
      showOnHome,
    };

    try {
      setSubmitting(true);
      await axiosSecure.post("/api/loans", payload);
      Swal.fire("Success", "Loan added successfully", "success");
      form.reset();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add loan", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Add New Loan</h1>
          <p className="text-sm text-gray-500">
            Create a new loan product with required documents and EMI plans.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 rounded-2xl shadow-sm border p-6 md:p-8 grid md:grid-cols-2 gap-6"
      >
        {/* Loan Title */}
        <div className="md:col-span-1">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Loan Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. Small Business Expansion Loan"
            className="input input-bordered w-full input-sm md:input-md"
          />
        </div>

        {/* Category */}
        <div className="md:col-span-1">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            name="category"
            type="text"
            required
            placeholder="Business, Education, Personal..."
            className="input input-bordered w-full input-sm md:input-md"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={3}
            placeholder="Write a short description about this loan, eligibility, purpose etc."
            className="textarea textarea-bordered w-full text-sm"
          />
        </div>

        {/* Interest & Max Limit */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Interest Rate (%) <span className="text-red-500">*</span>
          </label>
          <input
            name="interestRate"
            type="number"
            step="0.1"
            min="0"
            required
            placeholder="e.g. 12.5"
            className="input input-bordered w-full input-sm md:input-md"
          />
          <p className="text-[11px] text-gray-400 mt-1">
            Annual interest rate for this loan.
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Max Loan Limit ($) <span className="text-red-500">*</span>
          </label>
          <input
            name="maxLimit"
            type="number"
            min="0"
            required
            placeholder="e.g. 50000"
            className="input input-bordered w-full input-sm md:input-md"
          />
          <p className="text-[11px] text-gray-400 mt-1">
            Maximum amount a borrower can request.
          </p>
        </div>

        {/* Required Documents */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Required Documents
          </label>
          <input
            name="requiredDocuments"
            type="text"
            placeholder="NID, Bank Statement, Salary Slip"
            className="input input-bordered w-full input-sm md:input-md"
          />
          <p className="text-[11px] text-gray-400 mt-1">
            Separate multiple documents with commas.
          </p>
        </div>

        {/* EMI Plans */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            EMI Plans
          </label>
          <input
            name="emiPlans"
            type="text"
            placeholder="6 months, 12 months, 24 months"
            className="input input-bordered w-full input-sm md:input-md"
          />
          <p className="text-[11px] text-gray-400 mt-1">
            Separate multiple plans with commas.
          </p>
        </div>

        {/* Image URL */}
        <div className="md:col-span-1">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Loan Image URL
          </label>
          <input
            name="imageUrl"
            type="url"
            placeholder="https://example.com/loan-banner.png"
            className="input input-bordered w-full input-sm md:input-md"
          />
          <p className="text-[11px] text-gray-400 mt-1">
            Optional banner image for this loan card.
          </p>
        </div>

        {/* Date (read only) */}
        <div className="md:col-span-1">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Date
          </label>
          <input
            type="text"
            value={today}
            readOnly
            className="input input-bordered w-full input-sm md:input-md bg-gray-100"
          />
        </div>

        {/* Show on Home toggle */}
        <div className="md:col-span-2 flex items-center justify-between border-t pt-4 mt-2">
          <label className="flex items-center gap-3 text-sm font-medium">
            <span>Show on Home Page</span>
            <input
              type="checkbox"
              name="showOnHome"
              className="toggle toggle-primary"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary px-8"
          >
            {submitting ? "Adding..." : "Add Loan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLoan;
