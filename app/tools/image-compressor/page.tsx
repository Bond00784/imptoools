"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, ImageIcon, AlertCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export default function ImageCompressorPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedImages, setCompressedImages] = useState<{ original: File; compressed: string; size: number }[]>([])
  const [quality, setQuality] = useState(80)
  const [compressing, setCompressing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      const imageFiles = Array.from(selectedFiles).filter((file) => file.type.startsWith("image/"))
      setFiles((prev) => [...prev, ...imageFiles])
      setError(null)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const compressImage = (file: File): Promise<{ dataUrl: string; size: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string
        img.onload = () => {
          const canvas = canvasRef.current
          if (!canvas) return reject(new Error("Canvas not available"))

          const ctx = canvas.getContext("2d")
          if (!ctx) return reject(new Error("Canvas context not available"))

          // Set canvas dimensions to match image
          canvas.width = img.width
          canvas.height = img.height

          // Draw image on canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0)

          // Get compressed image as data URL
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality / 100)

          // Calculate size of compressed image
          const base64str = compressedDataUrl.split(",")[1]
          const compressedSize = Math.round((base64str.length * 3) / 4)

          resolve({
            dataUrl: compressedDataUrl,
            size: compressedSize,
          })
        }
        img.onerror = () => {
          reject(new Error("Failed to load image"))
        }
      }
      reader.onerror = () => {
        reject(new Error("Failed to read file"))
      }
    })
  }

  const compressAllImages = async () => {
    if (files.length === 0) {
      setError("Please select at least one image")
      return
    }

    setCompressing(true)
    setCompressedImages([])
    setError(null)

    try {
      const results = []

      for (const file of files) {
        const { dataUrl, size } = await compressImage(file)
        results.push({
          original: file,
          compressed: dataUrl,
          size: size,
        })
      }

      setCompressedImages(results)
    } catch (err) {
      setError("Failed to compress images. Please try again.")
      console.error(err)
    } finally {
      setCompressing(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB"
    else return (bytes / 1048576).toFixed(2) + " MB"
  }

  const calculateSavings = (original: File, compressedSize: number) => {
    const originalSize = original.size
    const saved = originalSize - compressedSize
    const percentage = Math.round((saved / originalSize) * 100)
    return { saved, percentage }
  }

  const downloadImage = (dataUrl: string, fileName: string) => {
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `compressed_${fileName}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Image Compressor</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Compress your images to reduce file size while maintaining quality. Perfect for websites, emails, and social
        media.
      </p>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Images</CardTitle>
            <CardDescription>Select one or more images to compress</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-500">Supports JPG, PNG, WebP, and GIF (Max 10MB per file)</p>
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-slate-700 mb-3">Selected Images ({files.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <ImageIcon className="h-5 w-5 text-emerald-600 mr-2" />
                        <div>
                          <span className="text-sm text-slate-700 truncate max-w-[200px] block">{file.name}</span>
                          <span className="text-xs text-slate-500">{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-slate-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="quality">Compression Quality: {quality}%</Label>
                </div>
                <Slider
                  id="quality"
                  min={1}
                  max={100}
                  step={1}
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Lower Quality (Smaller Size)</span>
                  <span>Higher Quality (Larger Size)</span>
                </div>
              </div>
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
              onClick={compressAllImages}
              disabled={files.length === 0 || compressing}
            >
              {compressing ? "Compressing..." : "Compress Images"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compressed Images</CardTitle>
            <CardDescription>Download your compressed images</CardDescription>
          </CardHeader>
          <CardContent>
            {compressing ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700 mb-4"></div>
                <p>Compressing your images...</p>
              </div>
            ) : compressedImages.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-medium text-slate-700">
                    {compressedImages.length} image{compressedImages.length > 1 ? "s" : ""} compressed
                  </span>
                  <Button variant="outline" size="sm" className="text-emerald-700">
                    Download All
                  </Button>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {compressedImages.map((item, index) => {
                    const { saved, percentage } = calculateSavings(item.original, item.size)
                    return (
                      <div key={index} className="bg-slate-50 p-4 rounded-md">
                        <div className="flex items-start gap-4">
                          <img
                            src={item.compressed || "/placeholder.svg"}
                            alt={item.original.name}
                            className="h-20 w-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-700 mb-1 truncate">{item.original.name}</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                              <div>Original: {formatFileSize(item.original.size)}</div>
                              <div>Compressed: {formatFileSize(item.size)}</div>
                              <div>Saved: {formatFileSize(saved)}</div>
                              <div>Reduction: {percentage}%</div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-700"
                            onClick={() => downloadImage(item.compressed, item.original.name)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                <Download className="h-12 w-12 mb-2" />
                <p>Compressed images will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">About Image Compression</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">Benefits of Image Compression</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Faster website loading times</li>
              <li>Reduced storage space usage</li>
              <li>Lower bandwidth consumption</li>
              <li>Improved user experience</li>
              <li>Better SEO rankings</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">Tips for Best Results</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Use 70-80% quality for most web images</li>
              <li>For photographs, 60-70% usually works well</li>
              <li>For graphics with text, use 80-90% to maintain clarity</li>
              <li>WebP format offers better compression than JPEG or PNG</li>
              <li>Preview the compressed image before downloading</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

