"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, ImageIcon, AlertCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ImageConverterPage() {
  const [files, setFiles] = useState<File[]>([])
  const [convertedImages, setConvertedImages] = useState<{ original: File; converted: string; format: string }[]>([])
  const [targetFormat, setTargetFormat] = useState("webp")
  const [quality, setQuality] = useState("80")
  const [converting, setConverting] = useState(false)
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

  const convertImage = (file: File): Promise<string> => {
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

          // Get converted image as data URL
          let mimeType = "image/jpeg"
          switch (targetFormat) {
            case "png":
              mimeType = "image/png"
              break
            case "webp":
              mimeType = "image/webp"
              break
            case "jpeg":
            case "jpg":
              mimeType = "image/jpeg"
              break
          }

          const convertedDataUrl = canvas.toDataURL(mimeType, Number.parseInt(quality) / 100)
          resolve(convertedDataUrl)
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

  const convertAllImages = async () => {
    if (files.length === 0) {
      setError("Please select at least one image")
      return
    }

    setConverting(true)
    setConvertedImages([])
    setError(null)

    try {
      const results = []

      for (const file of files) {
        const dataUrl = await convertImage(file)
        results.push({
          original: file,
          converted: dataUrl,
          format: targetFormat,
        })
      }

      setConvertedImages(results)
    } catch (err) {
      setError("Failed to convert images. Please try again.")
      console.error(err)
    } finally {
      setConverting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB"
    else return (bytes / 1048576).toFixed(2) + " MB"
  }

  const downloadImage = (dataUrl: string, fileName: string) => {
    const link = document.createElement("a")
    link.href = dataUrl
    const extension = targetFormat === "jpg" ? "jpeg" : targetFormat
    const baseName = fileName.substring(0, fileName.lastIndexOf(".")) || fileName
    link.download = `${baseName}.${extension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Image Converter</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Convert your images between different formats including JPEG, PNG, and WebP. Choose the best format for your
        needs.
      </p>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Images</CardTitle>
            <CardDescription>Select one or more images to convert</CardDescription>
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
                <Label htmlFor="format">Target Format</Label>
                <Select value={targetFormat} onValueChange={setTargetFormat}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webp">WebP (Best compression)</SelectItem>
                    <SelectItem value="jpg">JPEG (Photos)</SelectItem>
                    <SelectItem value="png">PNG (Transparency)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quality</Label>
                <RadioGroup value={quality} onValueChange={setQuality} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="60" id="low" />
                    <Label htmlFor="low" className="cursor-pointer">
                      Low (60%)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="80" id="medium" />
                    <Label htmlFor="medium" className="cursor-pointer">
                      Medium (80%)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="90" id="high" />
                    <Label htmlFor="high" className="cursor-pointer">
                      High (90%)
                    </Label>
                  </div>
                </RadioGroup>
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
              onClick={convertAllImages}
              disabled={files.length === 0 || converting}
            >
              {converting ? "Converting..." : "Convert Images"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Converted Images</CardTitle>
            <CardDescription>Download your converted images</CardDescription>
          </CardHeader>
          <CardContent>
            {converting ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700 mb-4"></div>
                <p>Converting your images...</p>
              </div>
            ) : convertedImages.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-medium text-slate-700">
                    {convertedImages.length} image{convertedImages.length > 1 ? "s" : ""} converted
                  </span>
                  <Button variant="outline" size="sm" className="text-emerald-700">
                    Download All
                  </Button>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {convertedImages.map((item, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-md">
                      <div className="flex items-start gap-4">
                        <img
                          src={item.converted || "/placeholder.svg"}
                          alt={item.original.name}
                          className="h-20 w-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-700 mb-1 truncate">{item.original.name}</h4>
                          <div className="text-xs text-slate-600">
                            <div>Original Format: {item.original.type.split("/")[1].toUpperCase()}</div>
                            <div>Converted Format: {item.format.toUpperCase()}</div>
                            <div>Original Size: {formatFileSize(item.original.size)}</div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-700"
                          onClick={() => downloadImage(item.converted, item.original.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                <Download className="h-12 w-12 mb-2" />
                <p>Converted images will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">About Image Formats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">JPEG/JPG</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Best for photographs</li>
              <li>Lossy compression</li>
              <li>No transparency support</li>
              <li>Smaller file sizes</li>
              <li>Widely supported</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">PNG</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Best for graphics with transparency</li>
              <li>Lossless compression</li>
              <li>Supports transparency</li>
              <li>Larger file sizes</li>
              <li>Good for logos and icons</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">WebP</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Modern format developed by Google</li>
              <li>Supports both lossy and lossless compression</li>
              <li>Supports transparency</li>
              <li>Smaller file sizes than JPEG and PNG</li>
              <li>Growing browser support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

