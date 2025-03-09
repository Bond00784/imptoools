"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download, FileText, AlertCircle, Trash2, MoveUp, MoveDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [merging, setMerging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mergedPdf, setMergedPdf] = useState<string | null>(null)
  const [outputFileName, setOutputFileName] = useState("merged-document.pdf")
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

  const moveFileUp = (index: number) => {
    if (index === 0) return
    setFiles((prev) => {
      const newFiles = [...prev]
      const temp = newFiles[index]
      newFiles[index] = newFiles[index - 1]
      newFiles[index - 1] = temp
      return newFiles
    })
  }

  const moveFileDown = (index: number) => {
    if (index === files.length - 1) return
    setFiles((prev) => {
      const newFiles = [...prev]
      const temp = newFiles[index]
      newFiles[index] = newFiles[index + 1]
      newFiles[index + 1] = temp
      return newFiles
    })
  }

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError("Please select at least two PDF files to merge")
      return
    }

    setMerging(true)
    setProgress(0)
    setMergedPdf(null)
    setError(null)

    try {
      // Simulate PDF merging process with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setProgress(i)
      }

      // In a real implementation, we would use a PDF library like pdf-lib
      // For this demo, we'll just simulate a successful merge
      setMergedPdf("/placeholder.svg?height=400&width=300")
    } catch (err) {
      setError("Failed to merge PDF files. Please try again.")
      console.error(err)
    } finally {
      setMerging(false)
      setProgress(100)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB"
    else return (bytes / 1048576).toFixed(2) + " MB"
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Merge PDF Files</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Combine multiple PDF files into a single document. Arrange the files in the order you want them to appear in the
        final PDF.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload PDF Files</CardTitle>
            <CardDescription>Select two or more PDF files to merge</CardDescription>
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
                        <div className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                          {index + 1}
                        </div>
                        <FileText className="h-5 w-5 text-emerald-600 mr-2" />
                        <div>
                          <span className="text-sm text-slate-700 truncate max-w-[200px] block">{file.name}</span>
                          <span className="text-xs text-slate-500">{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveFileUp(index)}
                          disabled={index === 0}
                          className="text-slate-500 hover:text-emerald-500 h-8 w-8 p-0"
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveFileDown(index)}
                          disabled={index === files.length - 1}
                          className="text-slate-500 hover:text-emerald-500 h-8 w-8 p-0"
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-slate-500 hover:text-red-500 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="output-filename">Output Filename</Label>
                <Input
                  id="output-filename"
                  value={outputFileName}
                  onChange={(e) => setOutputFileName(e.target.value)}
                  placeholder="merged-document.pdf"
                />
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
              onClick={mergePdfs}
              disabled={files.length < 2 || merging}
            >
              {merging ? "Merging..." : "Merge PDFs"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Merged PDF</CardTitle>
            <CardDescription>Download your merged PDF document</CardDescription>
          </CardHeader>
          <CardContent>
            {merging ? (
              <div className="space-y-4">
                <p className="text-slate-600 text-center">Merging your PDF files...</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-slate-500 text-center">{progress}% complete</p>
              </div>
            ) : mergedPdf ? (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-md flex flex-col items-center">
                  <img
                    src={mergedPdf || "/placeholder.svg"}
                    alt="Merged PDF preview"
                    className="h-40 object-contain mb-4"
                  />
                  <div className="text-center">
                    <h4 className="font-medium text-slate-700 mb-1">{outputFileName}</h4>
                    <p className="text-xs text-slate-500 mb-4">{files.length} files merged successfully</p>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Merged PDF
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                <FileText className="h-12 w-12 mb-2" />
                <p>Your merged PDF will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">About PDF Merging</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">How It Works</h3>
            <ol className="list-decimal list-inside space-y-1 text-slate-700">
              <li>Upload two or more PDF files</li>
              <li>Arrange them in the desired order using the up/down arrows</li>
              <li>Set a name for the output file</li>
              <li>Click "Merge PDFs" to combine them</li>
              <li>Download the merged PDF document</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-emerald-800 mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Merge multiple PDF files into one document</li>
              <li>Rearrange pages before merging</li>
              <li>Customize the output filename</li>
              <li>Fast and secure processing</li>
              <li>No installation required - works in your browser</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

