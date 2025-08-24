import NavBar from "@/Components/MyNav";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PlusCircle, Trash2, Pencil } from "lucide-react";

export default function Project({ projects }) {
  const { data, meta } = projects;

  const handleDelete = (slug) => {
    if (confirm("Are you sure you want to delete this project?")) {
      router.delete(route("project.destroy", {project : slug} ));
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Projects" />

      {/* ✅ Navbar with "Add Project" button */}
      <NavBar
        children={
          <Link
            href={route("project.so")}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <PlusCircle size={16} className="mr-1" />
            Add Project
          </Link>
        }
        routeName="project.index"
      />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>

        {/* ✅ Table */}
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Description</th>
                <th className="px-4 py-3 border">Owner</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((project) => (
                <tr
                  key={project.slug}
                  className="bg-white hover:bg-gray-50 border-t"
                >
                  <td className="px-4 py-3 border">{project.id}</td>
                  <td className="px-4 py-3 border font-medium">{project.name}</td>
                  <td className="px-4 py-3 border text-gray-600">
                    {project.description}
                  </td>
                  <td className="px-4 py-3 border">{project.owner_id?.name}</td>
                  <td
                    className={`px-4 py-3 border font-semibold ${
                      project.status === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {project.status}
                  </td>
                  <td className="px-4 py-3 border text-center space-x-2">
                    {/* ✅ Fixed: pass param as object */}
                   <Link
                    href={route("project.edit", { project: project.slug })}
                    className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={16} className="mr-1" />
                    Edit
                  </Link>

                    <button
                      onClick={() => handleDelete(project.slug)}
                      className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Showing {meta.from} to {meta.to} of {meta.total} results
          </p>

          <div className="flex space-x-1">
            {meta.links.map((link, i) => (
              <a
                key={i}
                href={link.url || "#"}
                className={`px-3 py-1 text-sm rounded-md border ${
                  link.active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                } ${!link.url ? "opacity-50 pointer-events-none" : ""}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
