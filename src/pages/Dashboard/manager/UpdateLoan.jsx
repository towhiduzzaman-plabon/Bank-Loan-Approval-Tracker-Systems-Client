import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const UpdateLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    interestRate: "",
    maxLimit: "",
    requiredDocuments: "",
    emiPlans: "",
    image: "",
    showOnHome: false,
  });

  // Load existing loan data
  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const { data } = await axiosSecure.get(`/api/loans/${id}`);
        setForm({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          interestRate: data.interestRate ?? "",
          maxLimit: data.maxLimit ?? "",
          requiredDocuments: data.requiredDocuments?.join(", ") || "",
          emiPlans: data.emiPlans?.join(", ") || "",
          image: data.image || data.images?.[0] || "",
          showOnHome: !!data.showOnHome,
        });
      } catch (error) {
        console.error("Load loan error:", error);
        Swal.fire("Error", "Failed to load loan", "error");
        navigate("/dashboard/manage-loans");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [axiosSecure, id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title: form.title,
        category: form.category,
        description: form.description,
        interestRate: Number(form.interestRate),
        maxLimit: Number(form.maxLimit),
        requiredDocuments: form.requiredDocuments
          ? form.requiredDocuments.split(",").map((d) => d.trim())
          : [],
        emiPlans: form.emiPlans
          ? form.emiPlans.split(",").map((p) => p.trim())
          : [],
        image: form.image,
        showOnHome: form.showOnHome,
      };

      await axiosSecure.patch(`/api/loans/${id}`, payload);

      Swal.fire("Updated", "Loan updated successfully", "success");
      navigate("/dashboard/manage-loans");
    } catch (error) {
      console.error("Update loan error:", error);
      Swal.fire("Error", "Failed to update loan", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-1">Update Loan</h1>
      <p className="text-sm text-gray-500 mb-6">
        Edit the loan information and save your changes.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-base-100 border rounded-2xl p-4 md:p-6">
        {/* Loan Title + Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">Loan Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter a clear loan title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              placeholder="Business, Education, Personal..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Describe who this loan is for and the key terms."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28"
          />
        </div>

        {/* Interest + Max Limit */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              value={form.interestRate}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="e.g. 12.5"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Max Loan Limit ($)</label>
            <input
              type="number"
              name="maxLimit"
              value={form.maxLimit}
              onChange={handleChange}
              required
              min="0"
              placeholder="Maximum amount a borrower can take"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Required Documents + EMI Plans */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">Required Documents</label>
            <input
              type="text"
              name="requiredDocuments"
              value={form.requiredDocuments}
              onChange={handleChange}
              placeholder="NID, Bank Statement, Salary Slip (comma separated)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">EMI Plans</label>
            <input
              type="text"
              name="emiPlans"
              value={form.emiPlans}
              onChange={handleChange}
              placeholder="6 months, 12 months, 24 months"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Image + Show on Home */}
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="font-semibold block mb-1">Loan Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/loan-banner.jpg"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-6">
            <input
              type="checkbox"
              id="showOnHome"
              name="showOnHome"
              checked={form.showOnHome}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
            <label htmlFor="showOnHome" className="text-sm">
              Show this loan on home page
            </label>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-purple-600 hover:bg-yellow-400 hover:text-black text-white font-semibold py-3 rounded-lg transition-all"
        >
          {saving ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default UpdateLoan;
