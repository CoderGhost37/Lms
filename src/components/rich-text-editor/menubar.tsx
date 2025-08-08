'use client'

import type { Editor } from '@tiptap/react'
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  ListIcon,
  ListOrderedIcon,
  Redo,
  Strikethrough,
  Undo,
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

interface MenubarProps {
  editor: Editor | null
}

export function Menubar({ editor }: MenubarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b border-input rounded-t-lg p-2 flex flex-wrap gap-1 items-center bg-accent">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                className={cn(editor.isActive('bold') && '!bg-muted !text-muted-foreground')}
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Bold</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('italic')}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                className={cn(editor.isActive('italic') && '!bg-muted !text-muted-foreground')}
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Italic</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('strike')}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                className={cn(editor.isActive('strike') && '!bg-muted !text-muted-foreground')}
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Strike</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={cn(
                  editor.isActive('heading', { level: 1 }) && '!bg-muted !text-muted-foreground'
                )}
              >
                <Heading1 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Heading 1</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn(
                  editor.isActive('heading', { level: 2 }) && '!bg-muted !text-muted-foreground'
                )}
              >
                <Heading2 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Heading 2</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={cn(
                  editor.isActive('heading', { level: 3 }) && '!bg-muted !text-muted-foreground'
                )}
              >
                <Heading3 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Heading 3</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('bulletList')}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(editor.isActive('bulletList') && '!bg-muted !text-muted-foreground')}
              >
                <ListIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Bullet List</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('orderedList')}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(editor.isActive('orderedList') && '!bg-muted !text-muted-foreground')}
              >
                <ListOrderedIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Ordered List</span>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 mx-2 bg-border" />

        <div className="flex flex-wrap gap-1 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'left' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
                className={cn(
                  editor.isActive({ textAlign: 'left' }) && '!bg-muted !text-muted-foreground'
                )}
              >
                <AlignLeftIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Align Left</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'center' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
                className={cn(
                  editor.isActive({ textAlign: 'center' }) && '!bg-muted !text-muted-foreground'
                )}
              >
                <AlignCenterIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Align Center</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'right' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
                className={cn(
                  editor.isActive({ textAlign: 'right' }) && '!bg-muted !text-muted-foreground'
                )}
              >
                <AlignRightIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span>Align Right</span>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 mx-2 bg-border" />

        <div className="flex flex-wrap gap-1 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Undo</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Redo</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}
