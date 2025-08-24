"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Upload, Type, Trash2, Eye, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const fontApplicationAreas = [
  { value: "headings", label: "Headings (H1-H6)" },
  { value: "body", label: "Body Text" },
  { value: "navigation", label: "Navigation" },
  { value: "buttons", label: "Buttons" },
  { value: "code", label: "Code Blocks" },
  { value: "quotes", label: "Blockquotes" },
]

export default function FontManager() {
  const [fonts, setFonts] = useState([])
  const [selectedFont, setSelectedFont] = useState(null)
  const [previewText, setPreviewText] = useState("The quick brown fox jumps over the lazy dog")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [fontName, setFontName] = useState("")
  const [fontFamily, setFontFamily] = useState("")
  const fileInputRef = useRef(null)
  const supabase = createClient()

  useEffect(() => {
    loadFonts()
  }, [])

  const loadFonts = async () => {
    try {
      const response = await fetch("/api/fonts")
      const data = await response.json()

      if (data.success) {
        setFonts(data.fonts || [])
      } else {
        console.error("Error loading fonts:", data.error)
      }
    } catch (error) {
      console.error("Error loading fonts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const validFormats = ["woff2", "woff", "ttf", "otf"]
    const fileExtension = file.name.split(".").pop()?.toLowerCase()

    if (!fileExtension || !validFormats.includes(fileExtension)) {
      alert("Please upload a valid font file (.woff2, .woff, .ttf, .otf)")
      return
    }

    if (!fontName || !fontFamily) {
      alert("Please enter font name and font family before uploading")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("font", file)
      formData.append("name", fontName)
      formData.append("fontFamily", fontFamily)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/fonts", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      clearInterval(progressInterval)
      setUploadProgress(100)

      if (data.success) {
        setFonts((prev) => [...prev, data.font])
        setFontName("")
        setFontFamily("")

        // Load the font dynamically
        const fontFace = new FontFace(data.font.font_family, `url(${data.font.file_url})`)
        await fontFace.load()
        document.fonts.add(fontFace)

        setTimeout(() => {
          setIsUploading(false)
          setUploadProgress(0)
        }, 500)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Error uploading font:", error)
      alert("Error uploading font: " + error.message)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const deleteFont = async (fontId) => {
    try {
      const response = await fetch(`/api/fonts/${fontId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setFonts(fonts.filter((font) => font.id !== fontId))
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Error deleting font:", error)
      alert("Error deleting font: " + error.message)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  useEffect(() => {
    fonts.forEach(async (font) => {
      try {
        const fontFace = new FontFace(font.font_family, `url(${font.file_url})`)
        await fontFace.load()
        document.fonts.add(fontFace)
      } catch (error) {
        console.error("Error loading font:", font.name, error)
      }
    })
  }, [fonts])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading fonts...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Custom Font
          </CardTitle>
          <CardDescription>
            Upload custom font files to enhance your blog's typography. Supported formats: WOFF2, WOFF, TTF, OTF
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="font-name">Font Name</Label>
                <Input
                  id="font-name"
                  value={fontName}
                  onChange={(e) => setFontName(e.target.value)}
                  placeholder="e.g., Inter Bold"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Input
                  id="font-family"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  placeholder="e.g., Inter"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-blue-500/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drop font files here or click to browse</p>
              <p className="text-sm text-muted-foreground">Maximum file size: 2MB per font</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".woff2,.woff,.ttf,.otf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading font...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Font Preview */}
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Font Preview
          </CardTitle>
          <CardDescription>Preview how your custom fonts will look with different text</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="preview-text">Preview Text</Label>
            <Textarea
              id="preview-text"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              placeholder="Enter text to preview..."
              rows={2}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-4">
            {fonts.map((font) => (
              <div key={font.id} className="p-4 border border-border/40 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{font.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {font.font_family} • {font.font_format?.toUpperCase()}
                    </p>
                  </div>
                  <Badge variant="default">Available</Badge>
                </div>
                <div
                  className="text-lg leading-relaxed p-3 bg-muted/30 rounded text-white"
                  style={{
                    fontFamily: font.font_family,
                  }}
                >
                  {previewText}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font Management */}
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Manage Fonts
          </CardTitle>
          <CardDescription>Your uploaded custom fonts are stored in the database and ready to use</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fonts.map((font) => (
              <div key={font.id} className="p-4 border border-border/40 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white">{font.name}</h4>
                      <Badge variant="default">Available</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Family: {font.font_family}</p>
                      <p>
                        Size: {formatFileSize(font.file_size)} • Format: {font.font_format?.toUpperCase()}
                      </p>
                      <p>Uploaded: {new Date(font.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600/20 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-800 border-slate-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Delete Font</AlertDialogTitle>
                          <AlertDialogDescription className="text-slate-300">
                            Are you sure you want to delete "{font.name}"? This action cannot be undone and will remove
                            the font from the database.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteFont(font.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-700/50 rounded">
                  <p className="text-sm text-slate-400 mb-2">Font Preview:</p>
                  <div
                    className="text-lg text-white"
                    style={{
                      fontFamily: font.font_family,
                    }}
                  >
                    {previewText}
                  </div>
                </div>
              </div>
            ))}

            {fonts.length === 0 && (
              <div className="text-center py-8">
                <Type className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">No Custom Fonts</h3>
                <p className="text-muted-foreground">Upload your first custom font to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
