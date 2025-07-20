/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Global search component
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <input
      type="text"
      className="mb-4 px-4 py-2 border rounded shadow focus:outline-none focus:ring"
      placeholder="Search by name or email..."
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
    />
  );
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://giftoflife.onrender.com/api/admin/users"
      );
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Error deleting user");
    }
  };

  // Update user role
  const handleRoleUpdate = async (id, role, isAdmin) => {
    setUpdatingId(id);
    try {
      await axios.patch(`/api/admin/users/${id}/role`, { role, isAdmin });
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const columns = [
    { Header: "Name", accessor: "fullName" },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "role" },
    {
      Header: "Admin",
      accessor: "isAdmin",
      Cell: ({ value }) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            value ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }) => {
        const { _id, role, isAdmin } = row.original;
        return (
          <div className="space-x-2">
            <button
              onClick={() => handleDelete(_id)}
              className="px-2 py-1 text-red-600 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
            >
              Delete
            </button>
            <button
              onClick={() =>
                handleRoleUpdate(
                  _id,
                  role === "user" ? "admin" : "user",
                  !isAdmin
                )
              }
              disabled={updatingId === _id}
              className="px-2 py-1 text-blue-600 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
            >
              {updatingId === _id ? "Updating..." : "Toggle Role"}
            </button>
          </div>
        );
      },
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // instead of rows
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns,
      data: users,
      initialState: { pageIndex: 0, pageSize: 6 }, // You can change the page size
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <div className="overflow-x-auto border rounded-lg shadow-md">
        <table
          {...getTableProps()}
          className="min-w-full table-auto border-collapse"
        >
          <thead className="bg-gray-100 text-gray-700">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 border-b"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className="divide-y">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-6 py-3">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-4 py-2 text-sm border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page <strong>{pageIndex + 1}</strong> of{" "}
          <strong>{pageOptions.length}</strong>
        </span>

        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-4 py-2 text-sm border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
