import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdBanner from "@/components/ad-banner"
import RelatedTools from "@/components/related-tools"
import { tools, categories } from "@/lib/tools-data"

export async function generateMetadata({
  params,
}: {
  params: { toolId: string }
}): Promise<Metadata> {
  const tool = tools.find((t) => t.id === params.toolId)

  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  return {
    title: `${tool.name} - Tools365`,
    description: tool.description,
  }
}

export default function ToolPage({
  params,
}: {
  params: { toolId: string }
}) {
  const tool = tools.find((t) => t.id === params.toolId)

  if (!tool) {
    notFound()
  }

  const category = categories.find((c) => c.id === tool.categoryId)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href={`/category/${category?.id}`} className="hover:text-blue-600">
          {category?.name}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-900 font-medium">{tool.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            <p className="text-gray-600 mb-6">{tool.description}</p>

            {/* Tool Interface Placeholder */}
            <div className="bg-gray-100 rounded-lg p-8 mb-6 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Tool Interface</h3>
                <p className="text-gray-500">The actual tool interface would be implemented here</p>
              </div>
            </div>

            {/* Tool Instructions */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">How to use this tool</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Upload or input your content</li>
                <li>Configure the settings according to your needs</li>
                <li>Click the process button</li>
                <li>Download or copy the results</li>
              </ol>
            </div>
          </div>

          {/* Ad Banner */}
          <AdBanner className="mb-8" />
        </div>

        <div className="lg:col-span-1">
          {/* Sidebar Ad */}
          <AdBanner className="mb-8" vertical />

          {/* Related Tools */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Related Tools</h2>
            <RelatedTools categoryId={tool.categoryId} currentToolId={tool.id} />
          </div>

          {/* Sidebar Ad */}
          <AdBanner className="mb-8" vertical />
        </div>
      </div>
    </div>
  )
}

