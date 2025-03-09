import Link from "next/link"
import { tools } from "@/lib/tools-data"

interface RelatedToolsProps {
  categoryId: string
  currentToolId: string
  limit?: number
}

export default function RelatedTools({ categoryId, currentToolId, limit = 5 }: RelatedToolsProps) {
  // Get tools from the same category, excluding the current tool
  const relatedTools = tools
    .filter((tool) => tool.categoryId === categoryId && tool.id !== currentToolId)
    .slice(0, limit)

  return (
    <div className="space-y-4">
      {relatedTools.map((tool) => (
        <Link
          key={tool.id}
          href={`/tool/${tool.id}`}
          className="flex items-start p-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <tool.icon className={`h-5 w-5 mr-3 mt-0.5 ${tool.iconColor}`} />
          <div>
            <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">{tool.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
          </div>
        </Link>
      ))}

      {relatedTools.length === 0 && <p className="text-gray-500 text-sm">No related tools found.</p>}
    </div>
  )
}

