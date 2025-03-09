"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, ImageIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BackgroundRemoverPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      setError(null)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
        setProcessedImage(null)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const removeBackground = async () => {
    if (!file || !preview) {
      setError("Please select an image first")
      return
    }

    setProcessing(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate background removal process with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setProgress(i)
      }

      // In a real implementation, we would use an AI service or library
      // For this demo, we'll just simulate a successful background removal
      // by creating a placeholder transparent image

      // Create a simulated result
      const img = new Image()
      img.src = preview
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      const canvas = canvasRef.current
      if (!canvas) throw new Error("Canvas not available")

      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Canvas context not available")

      canvas.width = img.width
      canvas.height = img.height

      // Draw the original image
      ctx.drawImage(img, 0, 0)

      // Simulate background removal by creating a circular mask
      // This is just for demonstration - a real implementation would use AI
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.4

      // Create a temporary canvas for the mask
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) throw new Error("Temp canvas context not available")

      // Draw the original image
      tempCtx.drawImage(img, 0, 0)

      // Clear the main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create a clipping path (circle)
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      // Draw the image from the temp canvas
      ctx.drawImage(tempCanvas, 0, 0)

      // Get the result as a PNG with transparency
      const processedDataUrl = canvas.toDataURL("image/png")
      setProcessedImage(processedDataUrl)
    } catch (err) {
      setError("Failed to remove background. Please try again.")
      console.error(err)
    } finally {
      setProcessing(false)
      setProgress(100)
    }
  }

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = file ? `${file.name.split(".")[0]}-no-bg.png` : "image-no-bg.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Background Remover</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Remove the background from your images with our AI-powered tool. Get transparent backgrounds for product photos,
        portraits, and more.
      </p>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Select an image to remove the background</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
              {preview ? (
                <div className="mb-4">
                  <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                </div>
              ) : (
                <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              )}
              <p className="text-slate-600 mb-2">{file ? file.name : "Click to upload or drag and drop"}</p>
              <p className="text-xs text-slate-500">Supports JPG, PNG, WebP (Max 10MB)</p>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
              onClick={removeBackground}
              disabled={!file || processing}
            >
              {processing ? "Processing..." : "Remove Background"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>Download your image with background removed</CardDescription>
          </CardHeader>
          <CardContent>
            {processing ? (
              <div className="space-y-4">
                <p className="text-slate-600 text-center">Removing background...</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-slate-500 text-center">{progress}% complete</p>
              </div>
            ) : processedImage ? (
              <div className="space-y-4">
                <Tabs defaultValue="transparent" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="transparent">Transparent</TabsTrigger>
                    <TabsTrigger value="white">White Background</TabsTrigger>
                  </TabsList>
                  <TabsContent value="transparent" className="pt-4">
                    <div className="bg-[url('/placeholder.svg?height=20&width=20')] rounded-lg overflow-hidden">
                      <img src={processedImage || "/placeholder.svg"} alt="Processed" className="max-h-80 mx-auto" />
                    </div>
                  </TabsContent>
                  <TabsContent value="white" className="pt-4">
                    <div className="bg-white rounded-lg overflow-hidden">
                      <img src={processedImage || "/placeholder.svg"} alt="Processed" className="max-h-80 mx-auto" />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-center mt-6">
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={downloadImage}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PNG with Transparency
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                <ImageIcon className="h-12 w-12 mb-2" />
                <p>Processed image will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">About Background Removal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">How It Works</h3>
            <p className="text-slate-700 mb-4">
              Our background remover uses advanced AI technology to identify and separate the foreground subject from
              the background in your images. The process works in several steps:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-700">
              <li>AI analyzes the image to identify the main subject</li>
              <li>The algorithm creates a detailed mask around the subject</li>
              <li>Background pixels are removed, creating transparency</li>
              <li>The result is a PNG image with a transparent background</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">Use Cases</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>E-commerce product photos</li>
              <li>Professional headshots and portraits</li>
              <li>Social media profile pictures</li>
              <li>Digital art and graphic design</li>
              <li>Creating photo collages</li>
              <li>Website and marketing materials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

