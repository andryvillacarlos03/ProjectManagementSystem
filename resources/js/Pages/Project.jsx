import NavBar from "@/Components/MyNav";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,Link} from "@inertiajs/react";
import { PlusCircle } from "lucide-react";
export default function Project({ projects }) {
  const { data, meta } = projects;

  return (
    <AuthenticatedLayout>
      <Head title="Projects" />
       
         <NavBar children={  <Link
          href="/projects/create"
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <PlusCircle size={16} className="mr-1" />
          Add Project
        </Link>}/>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 border">ID</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Description</th>
                <th className="px-4 py-3 border">Owner</th>
                <th className="px-4 py-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((project) => (
                <tr
                  key={project.id}
                  className="bg-white hover:bg-gray-50 border-t"
                >
                  <td className="px-4 py-3 border">{project.id}</td>
                  <td className="px-4 py-3 border font-medium">
                    {project.name}
                  </td>
                  <td className="px-4 py-3 border text-gray-600">
                    {project.description}
                  </td>
                  <td className="px-4 py-3 border">{project.owner_id}</td>
                  <td
                    className={`px-4 py-3 border font-semibold ${
                      project.status === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {project.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
