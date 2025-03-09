import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-emerald-500 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              width={40}
              height={40}
              alt="Tools 365 Logo"
              className="rounded-full bg-white p-1"
            />
            <span className="text-2xl font-bold text-white">Tools 365</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white font-medium hover:text-emerald-100">
            HOME
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white font-medium hover:text-emerald-100">
              IMAGE TOOLS <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/tools/image-to-text" className="w-full">
                  Image to Text
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/tools/image-compressor" className="w-full">
                  Image Compressor
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/tools/image-converter" className="w-full">
                  Image Converter
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/tools/background-remover" className="w-full">
                  Background Remover
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/tools/watermark-remover" className="w-full">
                  Watermark Remover
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white font-medium hover:text-emerald-100">
              PDF TOOLS <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/tools/merge-pdf" className="w-full">
                  Merge PDF
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/tools/pdf-to-webp" className="w-full">
                  PDF to WEBP
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/tools/pdf-compressor" className="w-full">
                  PDF Compressor
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white font-medium hover:text-emerald-100">
              CALCULATOR TOOLS <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/tools/compound-interest" className="w-full">
                  Compound Interest
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/tools/sip-calculator" className="w-full">
                  SIP Calculator
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white font-medium hover:text-emerald-100">
              REMOVAL TOOL <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/tools/background-remover" className="w-full">
                  Background Remover
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/tools/watermark-remover" className="w-full">
                  Watermark Remover
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/blog" className="text-white font-medium hover:text-emerald-100">
            BLOG
          </Link>
        </nav>

        {/* Mobile menu button - would need to implement mobile menu functionality */}
        <button className="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  )
}

