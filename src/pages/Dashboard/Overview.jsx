import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalLoans: 0,
    pendingApps: 0,
    approvedApps: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // user না থাকলে কল করব না
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await axiosSecure.get("/api/stats/dashboard");
        setStats({
          totalLoans: data.totalLoans || 0,
          pendingApps: data.pendingApps || 0,
          approvedApps: data.approvedApps || 0,
        });
      } catch (err) {
        console.error("Overview stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
      <p className="text-sm text-gray-500 mb-4">
        Quick snapshot of your LoanLink activity.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Total Loans */}
        <div className="bg-base-100 border rounded-2xl p-4">
          <p className="text-xs text-gray-500 mb-1">Total Loans</p>
          <p className="text-3xl font-bold">
            {stats.totalLoans ?? "—"}
          </p>
        </div>

        {/* Pending Applications */}
        <div className="bg-base-100 border rounded-2xl p-4">
          <p className="text-xs text-gray-500 mb-1">Pending Applications</p>
          <p className="text-3xl font-bold">
            {stats.pendingApps ?? "—"}
          </p>
        </div>

        {/* Approved Applications */}
        <div className="bg-base-100 border rounded-2xl p-4">
          <p className="text-xs text-gray-500 mb-1">Approved Applications</p>
          <p className="text-3xl font-bold">
            {stats.approvedApps ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
