import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { AdBanner } from "@/components/ad-banner"
import { toolsData } from "@/lib/tools-data"

interface ToolPageProps {
  params: {
    slug: string
  }
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = toolsData.find((tool) => tool.slug === params.slug)

  if (!tool) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
        </Button>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold">{tool.name}</h1>
          <p className="text-muted-foreground">{tool.description}</p>
        </div>
        <div className="w-full md:w-64">
          <AdBanner size="medium" />
        </div>
      </div>

      {/* Tool Interface - This would be customized for each tool */}
      <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-4 text-primary">
          {tool.icon && <tool.icon className="h-8 w-8" />}
        </div>
        <p className="mb-6 text-center text-muted-foreground">
          This is where the {tool.name.toLowerCase()} interface would be implemented.
        </p>

        {/* Placeholder for tool interface */}
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
          <p className="text-sm text-muted-foreground">Tool Interface Placeholder</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <h2 className="mb-4 text-xl font-semibold">How to use {tool.name}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
        <div>
          <AdBanner size="large" />
        </div>
      </div>

      <h2 className="mb-4 text-xl font-semibold">Related Tools</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {toolsData
          .filter((t) => t.category === tool.category && t.id !== tool.id)
          .slice(0, 5)
          .map((relatedTool) => (
            <Link
              key={relatedTool.id}
              href={`/tools/${relatedTool.slug}`}
              className="flex flex-col items-center rounded-lg border bg-card p-4 text-center shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                {relatedTool.icon && <relatedTool.icon className="h-5 w-5" />}
              </div>
              <h3 className="text-sm font-medium">{relatedTool.name}</h3>
            </Link>
          ))}
      </div>
    </div>
  )
}

