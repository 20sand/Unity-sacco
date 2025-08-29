"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { Upload, type File, CheckCircle, XCircle, Eye, Trash2, Download } from "lucide-react"

interface DocumentUploadProps {
  onDocumentUploaded?: (document: any) => void
  requiredDocuments?: string[]
  maxFileSize?: number // in MB
}

export function DocumentUpload({
  onDocumentUploaded,
  requiredDocuments = ["ID Copy", "Passport Photo", "Proof of Income"],
  maxFileSize = 5,
}: DocumentUploadProps) {
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      // Validate file size
      if (file.size > maxFileSize * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds the maximum size of ${maxFileSize}MB.`,
          variant: "destructive",
        })
        return
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported file type. Please upload JPG, PNG, or PDF files.`,
          variant: "destructive",
        })
        return
      }

      uploadFile(file)
    })
  }

  const uploadFile = async (file: File) => {
    const fileId = `${Date.now()}-${file.name}`

    // Add file to uploaded documents with pending status
    const newDocument = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file), // For preview
    }

    setUploadedDocuments((prev) => [...prev, newDocument])
    setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }))

    // Simulate file upload with progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const currentProgress = prev[fileId] || 0
        const newProgress = Math.min(currentProgress + Math.random() * 30, 100)

        if (newProgress >= 100) {
          clearInterval(uploadInterval)

          // Update document status to completed
          setUploadedDocuments((prevDocs) =>
            prevDocs.map((doc) => (doc.id === fileId ? { ...doc, status: "completed" } : doc)),
          )

          toast({
            title: "Upload Successful",
            description: `${file.name} has been uploaded successfully.`,
          })

          onDocumentUploaded?.(newDocument)
        }

        return { ...prev, [fileId]: newProgress }
      })
    }, 500)
  }

  const removeDocument = (documentId: string) => {
    setUploadedDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[documentId]
      return newProgress
    })

    toast({
      title: "Document Removed",
      description: "Document has been removed from your uploads.",
    })
  }

  const previewDocument = (document: any) => {
    if (document.type.startsWith("image/")) {
      // Open image in new tab
      window.open(document.url, "_blank")
    } else {
      toast({
        title: "Preview Available",
        description: "PDF preview will open in a new window.",
      })
      window.open(document.url, "_blank")
    }
  }

  const downloadDocument = (document: any) => {
    const link = document.createElement("a")
    link.href = document.url
    link.download = document.name
    link.click()
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return "🖼️"
    } else if (fileType === "application/pdf") {
      return "📄"
    }
    return "📎"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>Please upload the following documents to complete your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {requiredDocuments.map((docType, index) => {
              const isUploaded = uploadedDocuments.some((doc) =>
                doc.name.toLowerCase().includes(docType.toLowerCase().split(" ")[0]),
              )

              return (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                  {isUploaded ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium">{docType}</p>
                    <Badge variant={isUploaded ? "default" : "secondary"}>{isUploaded ? "Uploaded" : "Required"}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Drag and drop files here or click to browse. Maximum file size: {maxFileSize}MB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop files here to upload</p>
              <p className="text-gray-600">or</p>
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer bg-transparent">
                    Browse Files
                  </Button>
                </Label>
              </div>
              <p className="text-sm text-gray-500">Supported formats: JPG, PNG, PDF (Max {maxFileSize}MB each)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Documents */}
      {uploadedDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
            <CardDescription>Manage your uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedDocuments.map((document) => (
                <div key={document.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="text-2xl">{getFileIcon(document.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium truncate">{document.name}</p>
                      <Badge
                        variant={
                          document.status === "completed"
                            ? "default"
                            : document.status === "uploading"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {document.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formatFileSize(document.size)} • {new Date(document.uploadDate).toLocaleDateString()}
                    </p>

                    {document.status === "uploading" && (
                      <div className="mt-2">
                        <Progress value={uploadProgress[document.id] || 0} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round(uploadProgress[document.id] || 0)}% uploaded
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {document.status === "completed" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => previewDocument(document)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => downloadDocument(document)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeDocument(document.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
          <CardDescription>Please follow these guidelines for successful document upload</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Document Requirements</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Clear, readable images or scans</li>
                <li>• All four corners visible</li>
                <li>• No glare or shadows</li>
                <li>• Original documents preferred</li>
                <li>• Recent documents (within 3 months)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Technical Specifications</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Maximum file size: {maxFileSize}MB</li>
                <li>• Supported formats: JPG, PNG, PDF</li>
                <li>• Minimum resolution: 300 DPI</li>
                <li>• Color or black & white accepted</li>
                <li>• Multiple files can be uploaded</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
