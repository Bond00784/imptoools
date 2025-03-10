import type { LucideIcon } from "lucide-react"

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  category: string
  icon?: LucideIcon
  popular?: boolean
  new?: boolean
}

