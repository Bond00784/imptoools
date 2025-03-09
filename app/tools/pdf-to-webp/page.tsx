"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download, FileType, AlertCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function PdfToWebpPage() {
  const [files, setFiles] = useState<File[]>([])
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [convertedFiles, setConvertedFiles] = useState<{ name: string; url: string }[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles).filter((file) => file.type === "application/pdf")
      setFiles((prev) => [...prev, ...fileArray])
      setError(null)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const convertFiles = async () => {
    if (files.length === 0) {
      setError("Please select at least one PDF file")
      return
    }

    setConverting(true)
    setProgress(0)
    setConvertedFiles([])
    setError(null)

    try {
      // Simulate conversion process with progress
      const totalFiles = files.length
      const convertedResults: { name: string; url: string }[] = []

      for (let i = 0; i < totalFiles; i++) {
        // Simulate API call for each file
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Update progress
        const currentProgress = Math.round(((i + 1) / totalFiles) * 100)
        setProgress(currentProgress)

        // Add converted file to results
        const originalName = files[i].name.replace(".pdf", "")
        convertedResults.push({
          name: `${originalName}.webp`,
          // In a real implementation, this would be the URL to the converted file
          url: `/placeholder.svg?height=400&width=300`,
        })
      }

      setConvertedFiles(convertedResults)
    } catch (err) {
      setError("Failed to convert files. Please try again.")
      console.error(err)
    } finally {
      setConverting(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">PDF to WEBP Converter</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Convert your PDF files to WEBP format with our free online converter. WEBP offers superior compression and
        quality compared to other image formats.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload PDF Files</CardTitle>
            <CardDescription>Select one or more PDF files to convert to WEBP format</CardDescription>
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
              <p className="text-xs text-slate-500">Supports PDF files (Max 10MB per file)</p>
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-slate-700 mb-3">Selected Files ({files.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <FileType className="h-5 w-5 text-emerald-600 mr-2" />
                        <span className="text-sm text-slate-700 truncate max-w-[200px]">{file.name}</span>
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

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
              onClick={convertFiles}
              disabled={files.length === 0 || converting}
            >
              {converting ? "Converting..." : "Convert to WEBP"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Converted Files</CardTitle>
            <CardDescription>Download your converted WEBP files</CardDescription>
          </CardHeader>
          <CardContent>
            {converting ? (
              <div className="space-y-4">
                <p className="text-slate-600 text-center">Converting your files...</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-slate-500 text-center">{progress}% complete</p>
              </div>
            ) : convertedFiles.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-medium text-slate-700">
                    {convertedFiles.length} file{convertedFiles.length > 1 ? "s" : ""} converted
                  </span>
                  <Button variant="outline" size="sm" className="text-emerald-700">
                    Download All
                  </Button>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {convertedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          className="h-10 w-10 object-cover rounded mr-3"
                        />
                        <span className="text-sm text-slate-700">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-emerald-700">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                <Download className="h-12 w-12 mb-2" />
                <p>Converted files will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">About PDF to WEBP Conversion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">Benefits of WEBP Format</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Smaller file sizes compared to PNG and JPEG</li>
              <li>Supports both lossy and lossless compression</li>
              <li>Supports transparency like PNG</li>
              <li>Better quality-to-size ratio than other formats</li>
              <li>Faster loading times for websites</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">How It Works</h3>
            <ol className="list-decimal list-inside space-y-1 text-slate-700">
              <li>Upload your PDF files using the upload button</li>
              <li>Click the "Convert to WEBP" button</li>
              <li>Wait for the conversion process to complete</li>
              <li>Download your converted WEBP files individually or as a ZIP</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

