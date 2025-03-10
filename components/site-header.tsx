import Link from "next/link"
import { Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-2 font-bold">
                  <span>MultiTools</span>
                </Link>
                <Link href="/" className="text-sm font-medium">
                  Home
                </Link>
                <Link href="/categories" className="text-sm font-medium">
                  Categories
                </Link>
                <Link href="/popular" className="text-sm font-medium">
                  Popular Tools
                </Link>
                <Link href="/new" className="text-sm font-medium">
                  New Tools
                </Link>
                <Link href="/blog" className="text-sm font-medium">
                  Blog
                </Link>
                <Link href="/contact" className="text-sm font-medium">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span>MultiTools</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/categories" className="text-sm font-medium">
              Categories
            </Link>
            <Link href="/popular" className="text-sm font-medium">
              Popular Tools
            </Link>
            <Link href="/new" className="text-sm font-medium">
              New Tools
            </Link>
            <Link href="/blog" className="text-sm font-medium">
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search tools..." className="w-[200px] pl-8 md:w-[250px] lg:w-[300px]" />
          </div>
          <ModeToggle />
          <Button asChild size="sm" className="hidden md:flex">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

