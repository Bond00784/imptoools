"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download, FileText, AlertCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function PdfCompressorPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<{ original: File; url: string; size: number }[]>([])
  const [compressionLevel, setCompressionLevel] = useState("medium")
  const [compressing, setCompressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      const pdfFiles = Array.from(selectedFiles).filter((file) => file.type === "application/pdf")
      setFiles((prev) => [...prev, ...pdfFiles])
      setError(null)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const compressPdfs = async () => {
    if (files.length === 0) {
      setError("Please select at least one PDF file")
      return
    }

    setCompressing(true)
    setProgress(0)
    setCompressedFiles([])
    setError(null)

    try {
      // Simulate compression process with progress
      const totalFiles = files.length
      const compressedResults: { original: File; url: string; size: number }[] = []

      for (let i = 0; i < totalFiles; i++) {
        // Simulate API call for each file
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Update progress
        const currentProgress = Math.round(((i + 1) / totalFiles) * 100)
        setProgress(currentProgress)

        // Calculate simulated compressed size based on compression level
        let compressionRatio = 0.7 // medium
        if (compressionLevel === "low") {
          compressionRatio = 0.85
        } else if (compressionLevel === "high") {
          compressionRatio = 0.4
        }

        const originalSize = files[i].size
        const compressedSize = Math.round(originalSize * compressionRatio)

        // Add compressed file to results
        compressedResults.push({
          original: files[i],
          url: "/placeholder.svg?height=400&width=300",
          size: compressedSize,
        })
      }

      setCompressedFiles(compressedResults)
    } catch (err) {
      setError("Failed to compress PDF files. Please try again.")
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

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">PDF Compressor</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Reduce the file size of your PDF documents while maintaining quality. Perfect for email attachments, uploading
        to websites, or saving storage space.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload PDF Files</CardTitle>
            <CardDescription>Select one or more PDF files to compress</CardDescription>
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
                accept=".pdf,application/pdf"
                multiple
                onChange={handleFileChange}
              />
              <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-500">Supports PDF files (Max 50MB per file)</p>
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-slate-700 mb-3">Selected Files ({files.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-emerald-600 mr-2" />
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
                <Label>Compression Level</Label>
                <RadioGroup
                  value={compressionLevel}
                  onValueChange={setCompressionLevel}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low" className="cursor-pointer">
                      Low Compression (Better Quality)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="cursor-pointer">
                      Medium Compression (Balanced)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="cursor-pointer">
                      High Compression (Smaller Size)
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
              onClick={compressPdfs}
              disabled={files.length === 0 || compressing}
            >
              {compressing ? "Compressing..." : "Compress PDFs"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compressed PDFs</CardTitle>
            <CardDescription>Download your compressed PDF files</CardDescription>
          </CardHeader>
          <CardContent>
            {compressing ? (
              <div className="space-y-4">
                <p className="text-slate-600 text-center">Compressing your PDF files...</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-slate-500 text-center">{progress}% complete</p>
              </div>
            ) : compressedFiles.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-medium text-slate-700">
                    {compressedFiles.length} file{compressedFiles.length > 1 ? "s" : ""} compressed
                  </span>
                  <Button variant="outline" size="sm" className="text-emerald-700">
                    Download All
                  </Button>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {compressedFiles.map((item, index) => {
                    const { saved, percentage } = calculateSavings(item.original, item.size)
                    return (
                      <div key={index} className="bg-slate-50 p-4 rounded-md">
                        <div className="flex items-start gap-4">
                          <FileText className="h-10 w-10 text-emerald-600" />
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-700 mb-1 truncate">{item.original.name}</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                              <div>Original: {formatFileSize(item.original.size)}</div>
                              <div>Compressed: {formatFileSize(item.size)}</div>
                              <div>Saved: {formatFileSize(saved)}</div>
                              <div>Reduction: {percentage}%</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-emerald-700">
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
                <p>Compressed PDFs will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">About PDF Compression</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">How It Works</h3>
            <p className="text-slate-700 mb-4">Our PDF compressor reduces file size by:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Optimizing images within the PDF</li>
              <li>Removing redundant information</li>
              <li>Applying compression algorithms</li>
              <li>Reducing resolution where appropriate</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">When to Use</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>When you need to email large PDF files</li>
              <li>When uploading PDFs to websites with size limits</li>
              <li>To save storage space on your device</li>
              <li>To improve loading times for PDFs on websites</li>
              <li>When you need to fit PDFs on storage media</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

