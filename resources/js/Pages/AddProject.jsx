// resources/js/Pages/AddProject.jsx

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function AddProject({ users }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
    owner_id: "",
    status: "pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("projects.store"), {
      onSuccess: () => reset(), // clear form on success
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Add Project" />

      <div className="max-w-2xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Create New Project</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Name */}
          <div>
            <label className="block font-medium mb-1">Project Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
              placeholder="Enter project name"
            />
            {errors.projectName && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Owner */}
          <div>
            <label className="block font-medium mb-1">Owner</label>
            <select
              value={data.owner_id}
              onChange={(e) => setData("owner_id", e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
            >
              <option value="">-- Select Owner --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.assigned_to && (
              <p className="text-red-500 text-sm">{errors.owner_id}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              value={data.status}
              onChange={(e) => setData("status", e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {processing ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
