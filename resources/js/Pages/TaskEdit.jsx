import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";


export default function TaskEdit({ task, users, projects }) {
  const { data, setData, put, processing, errors } = useForm({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "pending",
    due_date: task.due_date || "",
    project_id: task.project_id.name || "",
    assigned_to: task.assigned_to.name || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("task.update", task.slug));
  };

  return (
    <AuthenticatedLayout>
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Project */}
        <div>
          <label className="block font-medium">Project</label>
          <select
            value={data.project_id}
            onChange={(e) => setData("project_id", e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          {errors.project_id && (
            <p className="text-red-500 text-sm">{errors.project_id}</p>
          )}
        </div>

        {/* Assigned User */}
        <div>
          <label className="block font-medium">Assigned To</label>
          <select
            value={data.assigned_to || ""}
            onChange={(e) => setData("assigned_to", e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.assigned_to && (
            <p className="text-red-500 text-sm">{errors.assigned_to}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            value={data.status}
            onChange={(e) => setData("status", e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            value={data.due_date || ""}
            onChange={(e) => setData("due_date", e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.due_date && (
            <p className="text-red-500 text-sm">{errors.due_date}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {processing ? "Saving..." : "Update Task"}
          </button>
        </div>
      </form>
    </div>
    </AuthenticatedLayout>
  );
}
