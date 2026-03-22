"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";

// If you have shadcn Button installed
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Link,
      Image,
      Underline,
      TextStyle,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg p-2 focus:outline-none border rounded bg-[#071d33] text-[#e6c984]",
      },
    },
    immediatelyRender: false, // prevents SSR hydration errors
    onUpdate({ editor }) {
      onChange && onChange(editor.getHTML()); // Send HTML content to parent
    },
  });

  // Update editor content if value changes from parent
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const addLink = () => {
    const url = prompt("Enter URL");
    if (url) editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="w-full space-y-4 p-3 rounded-md border border-[#d4af37]/30">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2">
        <Button type="button" className={`bg-[#071D33] hover:bg-[#08243f]`} onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</Button>
        <Button type="button" className={`bg-[#071D33] hover:bg-[#08243f]`} onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</Button>
        <Button type="button" className={`bg-[#071D33] hover:bg-[#08243f]`} onClick={() => editor?.chain().focus().toggleUnderline().run()}>Underline</Button>
        <Button type="button" className={`bg-[#071D33] hover:bg-[#08243f]`} onClick={() => editor?.chain().focus().toggleStrike().run()}>Strikethrough</Button>
        <Button type="button" className={`bg-[#071D33] hover:bg-[#08243f]`} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Button>
        <Button type="button" className={`bg-[#071D33] hover:bg-[#08243f]`} onClick={addLink}>Link</Button>
        <Button type="button" className={`bg-[#071D33] hover:bg-[#08243f]`} onClick={addImage}>Image</Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
