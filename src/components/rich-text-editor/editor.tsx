'use client'

import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Menubar } from './menubar'

export function RichTextEditor({ field }: { field: any }) {
  const editor = useEditor({
    extensions: [StarterKit, TextAlign.configure({ types: ['heading', 'paragraph'] })],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none',
      },
    },
    content: field.value ? JSON.parse(field.value) : '<p></p>',
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()))
    },
  })

  return (
    <div className="w-full rounded-lg border border-input overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
