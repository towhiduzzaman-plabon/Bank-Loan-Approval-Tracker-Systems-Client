import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const roles = ["borrower", "manager", "admin"];
const statuses = ["active", "suspended"];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get("/api/users", {
        params: {
          search,
          role: roleFilter,
          status: statusFilter,
          page,
          limit: 6,
        },
      });
      setUsers(data.users);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    
  }, [page]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const updateRole = async (user, newRole) => {
    if (user.role === newRole) return;

    const result = await Swal.fire({
      title: "Change role?",
      text: `Make ${user.name} a ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/api/users/${user._id}`, { role: newRole });
      Swal.fire("Updated", "Role has been updated", "success");
      fetchUsers();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  const handleSuspend = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: "Suspend User",
      html: `
        <input id="suspend-reason" class="swal2-input" placeholder="Suspend reason" />
        <textarea id="suspend-feedback" class="swal2-textarea" placeholder="Feedback / Notes"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const reason = document.getElementById("suspend-reason").value;
        const feedback = document.getElementById("suspend-feedback").value;
        if (!reason) {
          Swal.showValidationMessage("Reason is required");
        }
        return { reason, feedback };
      },
    });

    if (!formValues) return;

    try {
      await axiosSecure.patch(`/api/users/${user._id}`, {
        status: "suspended",
        suspendReason: formValues.reason,
        suspendFeedback: formValues.feedback,
      });
      Swal.fire("Suspended", "User has been suspended", "success");
      fetchUsers();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to suspend user", "error");
    }
  };

  const handleActivate = async (user) => {
    const result = await Swal.fire({
      title: "Activate User?",
      text: `Reactivate ${user.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, activate",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/api/users/${user._id}`, {
        status: "active",
        suspendReason: "",
        suspendFeedback: "",
      });
      Swal.fire("Activated", "User has been activated", "success");
      fetchUsers();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to activate user", "error");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold">Manage Users</h2>
          <p className="text-sm text-gray-500">
            Search, filter and manage roles & status for all users.
          </p>
        </div>

        <form
          onSubmit={handleFilterSubmit}
          className="flex flex-col md:flex-row gap-2 md:items-center"
        >
          <input
            type="text"
            placeholder="Search by name/email"
            className="input input-sm input-bordered w-full md:w-56"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select select-sm select-bordered"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
          <select
            className="select select-sm select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-sm btn-primary">
            Filter
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No users found with current filters.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto bg-base-100 shadow rounded-xl mb-4">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={u._id}>
                    <td>{(page - 1) * 6 + idx + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img
                              src={
                                u.photoURL ||
                                "https://i.ibb.co/4JVK4fK/default-avatar.png"
                              }
                              alt={u.name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-outline">
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {u.status === "suspended" ? (
                        <span className="badge badge-error text-black">
                          Suspended
                        </span>
                      ) : (
                        <span className="badge badge-success">Active</span>
                      )}
                    </td>
                    <td className="text-right space-x-2">
                      {/* Role change buttons */}
                      <div className="inline-flex gap-1">
                        {roles.map((r) => (
                          <button
                            key={r}
                            className={`btn btn-xs ${
                              u.role === r
                                ? "btn-ghost"
                                : "btn-outline btn-primary"
                            }`}
                            disabled={u.role === r}
                            onClick={() => updateRole(u, r)}
                          >
                            {r}
                          </button>
                        ))}
                      </div>

                      {/* suspend / activate */}
                      {u.status === "active" ? (
                        <button
                          onClick={() => handleSuspend(u)}
                          className="btn btn-xs btn-error text-black ml-2"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(u)}
                          className="btn btn-xs btn-success text-black ml-2"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="text-sm">
              Page {page} of {pages}
            </span>
            <button
              className="btn btn-sm"
              disabled={page === pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
