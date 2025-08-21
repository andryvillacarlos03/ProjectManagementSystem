import FlashMessage from "@/Components/Success";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm,usePage } from "@inertiajs/react";

export default function AddTask({ projects, users }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    project_id: "",
    assigned_to: "",
    title: "",
    description: "",
    status: "pending",
    due_date: "",
  });


  
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("tasks.store"), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Add Task" />
      <div className="max-w-3xl mx-auto mt-10 p-6">
        <FlashMessage/>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project
            </label>
            <select
              value={data.project_id}
              onChange={(e) => setData("project_id", e.target.value)}
              className="w-full mt-2 p-2 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">-- Select Project --</option>
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
            <label className="block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <select
              value={data.assigned_to}
              onChange={(e) => setData("assigned_to", e.target.value)}
              className="w-full mt-2 p-2 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Optional --</option>
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

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              className="w-full mt-2 p-2 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
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
              className="w-full mt-2 p-2 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              rows="3"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
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
              className="w-full mt-2 p-2 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
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
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              value={data.due_date}
              onChange={(e) => setData("due_date", e.target.value)}
              className="w-full mt-2 p-2 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 transition"
            >
              {processing ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
