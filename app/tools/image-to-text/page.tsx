"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ImageToTextPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleExtractText = async () => {
    if (!file) {
      setError("Please select an image first")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // This is where you would normally call your API
      // For demo purposes, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulated response
      setExtractedText(
        "This is sample extracted text from the image. In a real implementation, this would be the actual text extracted from the uploaded image using OCR technology.",
      )
    } catch (err) {
      setError("Failed to extract text. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Image to Text Converter</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Extract text from images with our free online OCR (Optical Character Recognition) tool. Upload an image
        containing text, and our tool will convert it to editable text.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Select an image file containing text to extract</CardDescription>
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
              <p className="text-xs text-slate-500">Supports JPG, PNG, GIF, BMP (Max 5MB)</p>
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
              onClick={handleExtractText}
              disabled={!file || isLoading}
            >
              {isLoading ? "Processing..." : "Extract Text"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extracted Text</CardTitle>
            <CardDescription>The text extracted from your image will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 rounded-lg p-4 min-h-[300px] border border-slate-200">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
                </div>
              ) : extractedText ? (
                <div>
                  <div className="flex justify-between mb-4">
                    <Button variant="outline" size="sm" className="text-emerald-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Copy Text
                    </Button>
                    <Button variant="outline" size="sm" className="text-emerald-700">
                      Download as TXT
                    </Button>
                  </div>
                  <div className="whitespace-pre-wrap text-slate-700">{extractedText}</div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <FileText className="h-12 w-12 mb-2" />
                  <p>Extracted text will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">How to Use Image to Text Converter</h2>
        <ol className="list-decimal list-inside space-y-2 text-slate-700">
          <li>Upload an image containing text using the upload button.</li>
          <li>Click the "Extract Text" button to process the image.</li>
          <li>Wait for the OCR process to complete.</li>
          <li>View the extracted text in the output area.</li>
          <li>Copy the text or download it as a TXT file.</li>
        </ol>
      </div>
    </div>
  )
}

