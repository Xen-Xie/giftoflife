/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Global Filter Component
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
  <input
    type="text"
    className="mb-4 px-4 py-2 border rounded shadow focus:outline-none focus:ring"
    placeholder="Search by name or email..."
    value={globalFilter || ""}
    onChange={(e) => setGlobalFilter(e.target.value)}
  />
);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No auth token found. Please login.");
        return;
      }

      try {
        const res = await axios.get(
          "https://giftoflife.onrender.com/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to fetch users");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `https://giftoflife.onrender.com/api/admin/users/${id}`
      );
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      toast.error("Error deleting user");
    }
  };

  const handleRoleUpdate = async (id, role, isAdmin) => {
    setUpdatingId(id);
    try {
      await axios.patch(
        `https://giftoflife.onrender.com/api/admin/users/${id}/role`,
        { role, isAdmin }
      );
      toast.success("Role updated");
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role, isAdmin } : u))
      );
    } catch {
      toast.error("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "fullName",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Role",
        accessorKey: "role",
      },
      {
        header: "Admin",
        accessorKey: "isAdmin",
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                value
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {value ? "Yes" : "No"}
            </span>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => {
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
    ],
    [updatingId]
  );

  const table = useReactTable({
    data: users,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3 border-b">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 text-sm border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong>{table.getPageCount()}</strong>
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 text-sm border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
