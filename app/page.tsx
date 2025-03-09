import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-400 to-emerald-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to Tools 365</h1>
              <p className="text-white/90 text-lg">
                Transform your digital tasks with Tools 365: Merge PDF Tool, Compound Interest Calculator, Article
                Prompt Generator, PDF to WEBP Converter, SIP Calculator, URL to QR Code Generator, and 20+
                professional-grade utilities.
              </p>
              <Button asChild className="bg-emerald-900 hover:bg-emerald-950 text-white px-8 py-2 rounded-md">
                <Link href="/tools">Explore Tools</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -top-10 right-20 w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-300">
                  <path d="M10,50 Q25,25 40,50 T70,50 T100,50" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
              <Image
                src="/placeholder.svg?height=500&width=400"
                width={400}
                height={500}
                alt="Professional using Tools 365"
                className="relative z-10 mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Categories Section */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">Our Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Image Tools Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-emerald-100 p-3">
                <h3 className="text-xl font-bold text-emerald-800 text-center">Image Tools</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/tools/image-to-text"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Image to Text
                  </Link>
                  <Link
                    href="/tools/image-compressor"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Image Compressor
                  </Link>
                  <Link
                    href="/tools/image-converter"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Image Converter
                  </Link>
                  <Link
                    href="/tools/background-remover"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Background Remover
                  </Link>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/tools#image-tools">View All Image Tools</Link>
                </Button>
              </div>
            </div>

            {/* PDF Tools Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-emerald-100 p-3">
                <h3 className="text-xl font-bold text-emerald-800 text-center">PDF Tools</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/tools/merge-pdf"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Merge PDF
                  </Link>
                  <Link
                    href="/tools/pdf-compressor"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    PDF Compressor
                  </Link>
                  <Link
                    href="/tools/pdf-to-webp"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    PDF to WEBP
                  </Link>
                  <Link
                    href="/tools/pdf-to-jpg"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    PDF to JPG
                  </Link>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/tools#pdf-tools">View All PDF Tools</Link>
                </Button>
              </div>
            </div>

            {/* Calculator Tools Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-emerald-100 p-3">
                <h3 className="text-xl font-bold text-emerald-800 text-center">Calculator Tools</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/tools/compound-interest"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Compound Interest
                  </Link>
                  <Link
                    href="/tools/sip-calculator"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    SIP Calculator
                  </Link>
                  <Link
                    href="/tools/age-calculator"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Age Calculator
                  </Link>
                  <Link
                    href="/tools/bmi-calculator"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    BMI Calculator
                  </Link>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/tools#calculator-tools">View All Calculators</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">Why Choose Tools 365?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-emerald-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Fast & Efficient</h3>
              <p className="text-slate-600">
                All tools are optimized for speed and performance, giving you results in seconds.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">100% Secure</h3>
              <p className="text-slate-600">
                Your files are processed in your browser and never uploaded to our servers.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Free to Use</h3>
              <p className="text-slate-600">
                All our tools are completely free with no hidden fees or subscriptions required.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Works Everywhere</h3>
              <p className="text-slate-600">
                Our tools work on all devices and browsers without requiring any installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-700 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Using Tools 365 Today</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our tools for their daily digital tasks. No registration required - just
            select a tool and get started!
          </p>
          <Button asChild className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-md text-lg">
            <Link href="/tools">Explore All Tools</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

