export default function TableSkeleton() {
  return (
    <div className="bg-white rounded-sm border border-gray-200 animate-pulse">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="flex items-center space-x-4">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((index) => (
              <tr key={index}>
                {/* Image Column */}
                <td className="px-6 py-4">
                  <div className="h-16 w-24 bg-gray-200 rounded"></div>
                </td>
                {/* Name Column */}
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </td>
                {/* Type Column */}
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                </td>
                {/* Date Column */}
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                {/* Rent Price Column */}
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                {/* Sale Price Column */}
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                {/* Status Column */}
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </td>
                {/* Actions Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
