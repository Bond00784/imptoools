import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ToolsGrid from "@/components/tools-grid"
import AdBanner from "@/components/ad-banner"
import { categories } from "@/lib/tools-data"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Search */}
      <section className="mb-12">
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-lg">
          <h1 className="mb-4 text-4xl font-bold">Tools365: 1000+ Tools for Every Need</h1>
          <p className="mb-6 text-lg">Find the perfect tool for your task - all in one place</p>

          <div className="relative max-w-md">
            <Input
              placeholder="Search for tools..."
              className="pl-10 pr-4 py-2 bg-white text-gray-900 rounded-md w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner className="mb-12" />

      {/* Categories Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Tool Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`} className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className={`h-2 ${category.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <category.icon className={`h-8 w-8 mr-3 ${category.iconColor}`} />
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{category.toolCount} tools</span>
                    <Button variant="ghost" className="text-blue-600 group-hover:bg-blue-50">
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Tools</h2>
          <Button variant="outline">View All</Button>
        </div>
        <ToolsGrid category="featured" limit={8} />
      </section>

      {/* Ad Banner */}
      <AdBanner className="mb-12" />

      {/* Popular Tools */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Popular Tools</h2>
          <Button variant="outline">View All</Button>
        </div>
        <ToolsGrid category="popular" limit={8} />
      </section>
    </div>
  )
}

