import Link from "next/link"
import { tools } from "@/lib/tools-data"

interface ToolsGridProps {
  category?: string
  limit?: number
}

export default function ToolsGrid({ category = "all", limit }: ToolsGridProps) {
  let filteredTools = tools

  // Filter by category if provided
  if (category !== "all" && category !== "featured" && category !== "popular") {
    filteredTools = tools.filter((tool) => tool.categoryId === category)
  }

  // Filter for featured tools
  if (category === "featured") {
    filteredTools = tools.filter((tool) => tool.featured)
  }

  // Filter for popular tools
  if (category === "popular") {
    filteredTools = tools.filter((tool) => tool.popular)
  }

  // Apply limit if provided
  if (limit) {
    filteredTools = filteredTools.slice(0, limit)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredTools.map((tool) => (
        <Link key={tool.id} href={`/tool/${tool.id}`} className="group">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300 h-full flex flex-col">
            <div className={`h-1 ${tool.color}`}></div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex items-center mb-3">
                <tool.icon className={`h-6 w-6 mr-2 ${tool.iconColor}`} />
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 flex-grow">{tool.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{tool.category}</span>
                {tool.new && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">New</span>}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

