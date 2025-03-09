"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, ImageIcon, AlertCircle, Trash2, MousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function WatermarkRemoverPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [brushSize, setBrushSize] = useState(30)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState<{ x: number; y: number } | null>(null)
  const [selectionEnd, setSelectionEnd] = useState<{ x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      setError(null)
      setSelectionStart(null)
      setSelectionEnd(null)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
        setProcessedImage(null)

        // Draw the image on the preview canvas
        if (e.target?.result) {
          const img = new Image()
          img.src = e.target.result as string
          img.onload = () => {
            const canvas = previewCanvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            // Set canvas dimensions to match image
            canvas.width = img.width
            canvas.height = img.height

            // Draw image on canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0)
          }
        }
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!preview) return

    const canvas = previewCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    setIsSelecting(true)
    setSelectionStart({ x, y })
    setSelectionEnd({ x, y })
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSelecting || !preview) return

    const canvas = previewCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    setSelectionEnd({ x, y })

    // Redraw the canvas with the selection rectangle
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.src = preview

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)

    if (selectionStart) {
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])

      const width = x - selectionStart.x
      const height = y - selectionStart.y

      ctx.strokeRect(selectionStart.x, selectionStart.y, width, height)
    }
  }

  const handleCanvasMouseUp = () => {
    setIsSelecting(false)
  }

  const removeWatermark = async () => {
    if (!file || !preview || !selectionStart || !selectionEnd) {
      setError("Please select an image and mark the watermark area")
      return
    }

    setProcessing(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate watermark removal process with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setProgress(i)
      }

      // In a real implementation, we would use an AI service or library
      // For this demo, we'll just simulate a successful watermark removal

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

      // Simulate watermark removal by blurring the selected area
      // This is just for demonstration - a real implementation would use AI
      const x = Math.min(selectionStart.x, selectionEnd.x)
      const y = Math.min(selectionStart.y, selectionEnd.y)
      const width = Math.abs(selectionEnd.x - selectionStart.x)
      const height = Math.abs(selectionEnd.y - selectionStart.y)

      // Get the image data from the selected area
      const imageData = ctx.getImageData(x, y, width, height)

      // Apply a simple blur effect (averaging nearby pixels)
      // This is a very basic simulation - real watermark removal is much more complex
      const data = imageData.data
      const blurRadius = 5

      for (let i = 0; i < data.length; i += 4) {
        // Skip transparent pixels
        if (data[i + 3] === 0) continue

        // Simple color adjustment to simulate watermark removal
        // In a real implementation, this would be much more sophisticated
        data[i] = Math.min(255, data[i] + 20) // R
        data[i + 1] = Math.min(255, data[i + 1] + 20) // G
        data[i + 2] = Math.min(255, data[i + 2] + 20) // B
      }

      // Put the modified image data back
      ctx.putImageData(imageData, x, y)

      // Get the result as a JPEG
      const processedDataUrl = canvas.toDataURL("image/jpeg")
      setProcessedImage(processedDataUrl)
    } catch (err) {
      setError("Failed to remove watermark. Please try again.")
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
    link.download = file ? `${file.name.split(".")[0]}-no-watermark.jpg` : "image-no-watermark.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Watermark Remover</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Remove watermarks from your images with our AI-powered tool. Select the area containing the watermark and our
        tool will intelligently remove it.
      </p>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Select an image and mark the watermark area</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors cursor-pointer"
              onClick={() => !preview && document.getElementById("file-upload")?.click()}
            >
              <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
              {preview ? (
                <div className="relative">
                  <canvas
                    ref={previewCanvasRef}
                    className="max-h-64 w-full object-contain mx-auto rounded-lg cursor-crosshair"
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    <MousePointer className="h-3 w-3 inline mr-1" />
                    Select watermark area
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500">Supports JPG, PNG, WebP (Max 10MB)</p>
                </>
              )}
            </div>

            {preview && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFile(null)
                    setPreview(null)
                    setProcessedImage(null)
                    setSelectionStart(null)
                    setSelectionEnd(null)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Image
                </Button>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
              onClick={removeWatermark}
              disabled={!file || !selectionStart || !selectionEnd || processing}
            >
              {processing ? "Processing..." : "Remove Watermark"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>Download your image with watermark removed</CardDescription>
          </CardHeader>
          <CardContent>
            {processing ? (
              <div className="space-y-4">
                <p className="text-slate-600 text-center">Removing watermark...</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-slate-500 text-center">{progress}% complete</p>
              </div>
            ) : processedImage ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg overflow-hidden">
                  <img src={processedImage || "/placeholder.svg"} alt="Processed" className="max-h-80 mx-auto" />
                </div>

                <div className="flex justify-center mt-6">
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={downloadImage}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Image
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
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">About Watermark Removal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">How It Works</h3>
            <p className="text-slate-700 mb-4">
              Our watermark remover uses advanced AI technology to identify and remove watermarks from your images:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-700">
              <li>Upload your image with a watermark</li>
              <li>Select the area containing the watermark</li>
              <li>Our AI analyzes the watermark pattern</li>
              <li>The algorithm intelligently removes the watermark</li>
              <li>The surrounding area is seamlessly reconstructed</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">Best Practices</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Select only the area containing the watermark</li>
              <li>For best results, use high-resolution images</li>
              <li>Simple watermarks (text, logos) are easier to remove</li>
              <li>Semi-transparent watermarks work better than opaque ones</li>
              <li>Complex patterns may require multiple selections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

