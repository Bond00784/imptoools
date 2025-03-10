"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Tool } from "@/lib/types"

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      transition={{ duration: 0.2 }}
      className="flex aspect-square flex-col items-center justify-center rounded-lg border bg-card p-4 text-center shadow-sm transition-all hover:border-primary/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/tools/${tool.slug}`} className="flex h-full w-full flex-col items-center justify-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {tool.icon && <tool.icon className="h-6 w-6" />}
        </div>
        <h3 className="mb-1 font-medium">{tool.name}</h3>
        {isHovered && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground">
            {tool.description.length > 60 ? `${tool.description.substring(0, 60)}...` : tool.description}
          </motion.p>
        )}
      </Link>
    </motion.div>
  )
}

