import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import ToolsGrid from "@/components/tools-grid"
import AdBanner from "@/components/ad-banner"
import { categories } from "@/lib/tools-data"

export async function generateMetadata({
  params,
}: {
  params: { categoryId: string }
}): Promise<Metadata> {
  const category = categories.find((c) => c.id === params.categoryId)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} Tools - Tools365`,
    description: category.description,
  }
}

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string }
}) {
  const category = categories.find((c) => c.id === params.categoryId)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center">
          <category.icon className={`h-8 w-8 mr-3 ${category.iconColor}`} />
          {category.name} Tools
        </h1>
        <p className="text-lg text-gray-600">{category.description}</p>
      </div>

      {/* Ad Banner */}
      <AdBanner className="mb-8" />

      {/* Tools Grid */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">All {category.name} Tools</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Most Popular
            </Button>
            <Button variant="outline" size="sm">
              Newest
            </Button>
          </div>
        </div>
        <ToolsGrid category={params.categoryId} />
      </section>

      {/* Ad Banner */}
      <AdBanner className="mb-8" />
    </div>
  )
}

