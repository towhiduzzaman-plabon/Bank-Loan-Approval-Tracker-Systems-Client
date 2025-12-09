import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const MyLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    axiosSecure
      .get("/api/applications/my")
      .then((res) => setApplications(res.data))
      .catch((err) => {
        console.error(err);
        setApplications([]);
      });
  }, [axiosSecure]);

  if (applications === null) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Loan Applications</h1>

      {applications.length === 0 ? (
        <p className="text-sm text-gray-500">
          You have not applied for any loans yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Loan</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app._id}>
                  <td>{idx + 1}</td>
                  <td>{app.loanTitle}</td>
                  <td>${app.loanAmount}</td>
                  <td>{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyLoans;
