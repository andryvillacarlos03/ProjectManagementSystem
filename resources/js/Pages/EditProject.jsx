import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function EditProject({ project, owners }) {
  const { data, setData, put, processing, errors } = useForm({
    name: project.name || "",
    description: project.description || "",
    owner_id: project.owner_id || "",
    status: project.status || "pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("project.update", {project : project.slug})); // PUT request
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit Project" />

      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Owner */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Owner
            </label>
            <select
              value={data.owner_id}
              onChange={(e) => setData("owner_id", e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">-- Select Owner --</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </select>
            {errors.owner_id && (
              <p className="text-red-600 text-sm mt-1">{errors.owner_id}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={data.status}
              onChange={(e) => setData("status", e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-600 text-sm mt-1">{errors.status}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => history.back()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
