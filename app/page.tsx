import { Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToolCard } from "@/components/tool-card"
import { AdBanner } from "@/components/ad-banner"
import { toolsData } from "@/lib/tools-data"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section with Search */}
      <section className="mb-8">
        <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-6 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold text-primary md:text-4xl">1000+ Online Tools</h1>
          <p className="mb-6 text-muted-foreground">Free online tools for all your needs - no downloads required</p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search for tools..." className="pl-10" />
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner className="mb-8" />

      {/* Tools Categories */}
      <section className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Tools by Category</h2>

        <Tabs defaultValue="all">
          <TabsList className="mb-6 flex flex-wrap justify-start gap-2">
            <TabsTrigger value="all">All Tools</TabsTrigger>
            <TabsTrigger value="image">Image Tools</TabsTrigger>
            <TabsTrigger value="seo">SEO Tools</TabsTrigger>
            <TabsTrigger value="text">Text Tools</TabsTrigger>
            <TabsTrigger value="developer">Developer Tools</TabsTrigger>
            <TabsTrigger value="math">Math & Calculators</TabsTrigger>
            <TabsTrigger value="unit">Unit Converters</TabsTrigger>
            <TabsTrigger value="security">Security Tools</TabsTrigger>
            <TabsTrigger value="social">Social Media Tools</TabsTrigger>
            <TabsTrigger value="misc">Miscellaneous</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {toolsData.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </TabsContent>

          {["image", "seo", "text", "developer", "math", "unit", "security", "social", "misc"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {toolsData
                  .filter((tool) => tool.category === category)
                  .map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Ad Banner */}
      <AdBanner className="mb-8" />

      {/* Popular Tools Section */}
      <section className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Popular Tools</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {toolsData
            .filter((tool) => tool.popular)
            .slice(0, 5)
            .map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-lg bg-primary/5 p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold">Need a Custom Tool?</h2>
        <p className="mb-6 text-muted-foreground">
          Can't find what you're looking for? Let us know and we might add it!
        </p>
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </section>
    </div>
  )
}

