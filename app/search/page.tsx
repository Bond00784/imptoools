"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"
import Link from "next/link"

import { Input } from "@/components/ui/input"
import { ToolCard } from "@/components/tool-card"
import { AdBanner } from "@/components/ad-banner"
import { toolsData } from "@/lib/tools-data"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = toolsData.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">Search Tools</h1>

      <div className="mb-8 flex max-w-xl flex-col gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for tools by name, description, or category..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p className="text-sm text-muted-foreground">Found {filteredTools.length} tools matching your search</p>
      </div>

      <AdBanner className="mb-8" />

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">No tools found</h2>
          <p className="mb-6 text-muted-foreground">We couldn't find any tools matching your search query.</p>
          <Link href="/" className="text-primary hover:underline">
            View all tools
          </Link>
        </div>
      )}
    </div>
  )
}

