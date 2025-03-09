"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { categories } from "@/lib/tools-data"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Tools365
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md">
              Home
            </Link>
            <Link
              href="/popular"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md"
            >
              Popular
            </Link>
            <Link href="/new" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md">
              New
            </Link>
            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md">
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700"
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-700">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="px-3 py-2 text-lg font-medium hover:text-blue-600">
                    Home
                  </Link>
                  <Link href="/popular" className="px-3 py-2 text-lg font-medium hover:text-blue-600">
                    Popular
                  </Link>
                  <Link href="/new" className="px-3 py-2 text-lg font-medium hover:text-blue-600">
                    New
                  </Link>
                  <Link href="/blog" className="px-3 py-2 text-lg font-medium hover:text-blue-600">
                    Blog
                  </Link>
                  <Link href="/contact" className="px-3 py-2 text-lg font-medium hover:text-blue-600">
                    Contact
                  </Link>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.id}`}
                          className="px-3 py-2 flex items-center text-gray-700 hover:text-blue-600"
                        >
                          <category.icon className="h-5 w-5 mr-2" />
                          <span>{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-3 border-t border-gray-200">
            <div className="relative">
              <Input placeholder="Search for tools..." className="pl-10 pr-4 py-2 w-full" autoFocus />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

