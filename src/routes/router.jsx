// src/routes/router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// shared pages
import NotFound from "../pages/Shared/NotFound";
import About from "../pages/Shared/About";
import Contact from "../pages/Shared/Contact";

// home & loans
import Home from "../pages/Home/Home";
import AllLoans from "../pages/Loans/AllLoans";
import LoanDetails from "../pages/Loans/LoanDetails";
import LoanApplyForm from "../pages/Loans/LoanApplyForm"; // 👉 Apply Form

// auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// dashboard common
import Overview from "../pages/Dashboard/Overview";

// borrower
import MyLoans from "../pages/Dashboard/borrower/MyLoans";
import BorrowerProfile from "../pages/Dashboard/borrower/BorrowerProfile";

// admin
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import AdminAllLoans from "../pages/Dashboard/admin/AdminAllLoans";
import LoanApplications from "../pages/Dashboard/admin/LoanApplications";

// manager
import AddLoan from "../pages/Dashboard/manager/AddLoan";
import ManageLoans from "../pages/Dashboard/manager/ManageLoans";
import PendingLoans from "../pages/Dashboard/manager/PendingLoans";
import ApprovedLoans from "../pages/Dashboard/manager/ApprovedLoans";
import ManagerProfile from "../pages/Dashboard/manager/ManagerProfile";
import UpdateLoan from "../pages/Dashboard/manager/UpdateLoan"; // ✅ নতুন import

// guards
import PrivateRoute from "../components/PrivateRoute";
import RoleRoute from "../components/RoleRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-loans", element: <AllLoans /> },

      // Loan details (protected)
      {
        path: "loans/:id",
        element: (
          <PrivateRoute>
            <LoanDetails />
          </PrivateRoute>
        ),
      },

      // 👉 Loan Apply Form (এই রুটে ফর্ম দেখাবে)
      {
        path: "loans/:id/apply",
        element: (
          <PrivateRoute>
            <LoanApplyForm />
          </PrivateRoute>
        ),
      },

      // auth
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // shared
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  // dashboard area
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> },

      // borrower
      {
        path: "my-loans",
        element: (
          <RoleRoute allowed={["borrower"]}>
            <MyLoans />
          </RoleRoute>
        ),
      },
      { path: "profile", element: <BorrowerProfile /> },

      // admin
      {
        path: "manage-users",
        element: (
          <RoleRoute allowed={["admin"]}>
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "all-loan",
        element: (
          <RoleRoute allowed={["admin"]}>
            <AdminAllLoans />
          </RoleRoute>
        ),
      },
      {
        path: "loan-applications",
        element: (
          <RoleRoute allowed={["admin"]}>
            <LoanApplications />
          </RoleRoute>
        ),
      },

      // manager
      {
        path: "add-loan",
        element: (
          <RoleRoute allowed={["manager"]}>
            <AddLoan />
          </RoleRoute>
        ),
      },
      {
        path: "manage-loans",
        element: (
          <RoleRoute allowed={["manager"]}>
            <ManageLoans />
          </RoleRoute>
        ),
      },
      {
        path: "pending-loans",
        element: (
          <RoleRoute allowed={["manager"]}>
            <PendingLoans />
          </RoleRoute>
        ),
      },
      {
        path: "approved-loans",
        element: (
          <RoleRoute allowed={["manager"]}>
            <ApprovedLoans />
          </RoleRoute>
        ),
      },
      {
        path: "manager-profile",
        element: (
          <RoleRoute allowed={["manager"]}>
            <ManagerProfile />
          </RoleRoute>
        ),
      },

      // ✅ এই রুটটাই আগে ছিল না, এখন Edit এ গেলে এটা হিট করবে
      {
        path: "update-loan/:id",
        element: (
          <RoleRoute allowed={["manager"]}>
            <UpdateLoan />
          </RoleRoute>
        ),
      },
    ],
  },
]);

export default router;
