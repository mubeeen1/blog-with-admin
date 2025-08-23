"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
} from "lucide-react"

const RichTextEditor = ({ value, onChange }) => {
  const [content, setContent] = useState(value || "")
  const editorRef = useRef(null)

  useEffect(() => {
    if (value !== content) {
      setContent(value || "")
    }
  }, [value])

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      setContent(newContent)
      onChange(newContent)
    }
  }

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleContentChange()
  }

  const insertHeading = (level) => {
    executeCommand("formatBlock", `h${level}`)
  }

  const highlightText = (color) => {
    executeCommand("hiliteColor", color)
  }

  const changeTextColor = (color) => {
    executeCommand("foreColor", color)
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      executeCommand("createLink", url)
    }
  }

  const colors = ["#ff6b35", "#f7931e", "#ffd700", "#32cd32", "#00bfff", "#8a2be2", "#ff1493"]
  const highlightColors = ["#ffff00", "#00ff00", "#00ffff", "#ff00ff", "#ffa500", "#ff69b4"]

  return (
    <div className="border border-slate-600 rounded-lg bg-slate-700">
      {/* Toolbar */}
      <div className="border-b border-slate-600 p-3">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("bold")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("italic")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("underline")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <Underline className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("strikeThrough")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 bg-slate-600" />

          {/* Headings */}
          <select
            onChange={(e) => {
              if (e.target.value) {
                if (e.target.value === "p") {
                  executeCommand("formatBlock", "div")
                } else {
                  insertHeading(e.target.value)
                }
                e.target.value = ""
              }
            }}
            className="bg-slate-600 text-slate-300 border border-slate-500 rounded px-2 py-1 text-sm"
          >
            <option value="">Heading</option>
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
            <option value="4">H4</option>
            <option value="5">H5</option>
            <option value="6">H6</option>
            <option value="p">Normal</option>
          </select>

          <Separator orientation="vertical" className="h-6 bg-slate-600" />

          {/* Alignment */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("justifyLeft")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("justifyCenter")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("justifyRight")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <AlignRight className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 bg-slate-600" />

          {/* Lists */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("insertUnorderedList")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("insertOrderedList")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 bg-slate-600" />

          {/* Special */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("formatBlock", "blockquote")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("formatBlock", "pre")}
            className="text-slate-300 hover:bg-slate-600"
          >
            <Code className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={insertLink} className="text-slate-300 hover:bg-slate-600">
            <Link className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 bg-slate-600" />

          {/* Colors */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400">Text:</span>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => changeTextColor(color)}
                className="w-6 h-6 rounded border border-slate-500 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={`Text color: ${color}`}
              />
            ))}
          </div>

          <Separator orientation="vertical" className="h-6 bg-slate-600" />

          {/* Highlight Colors */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400">Highlight:</span>
            {highlightColors.map((color) => (
              <button
                key={color}
                onClick={() => highlightText(color)}
                className="w-6 h-6 rounded border border-slate-500 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={`Highlight: ${color}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleContentChange}
        onBlur={handleContentChange}
        className="min-h-[400px] p-4 text-white focus:outline-none"
        style={{
          lineHeight: "1.6",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}

export default RichTextEditor
