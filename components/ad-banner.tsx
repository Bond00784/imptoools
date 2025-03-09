import { cn } from "@/lib/utils"

interface AdBannerProps {
  className?: string
  vertical?: boolean
}

export default function AdBanner({ className, vertical = false }: AdBannerProps) {
  return (
    <div
      className={cn(
        "bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center",
        vertical ? "h-[600px]" : "h-[90px]",
        className,
      )}
    >
      <div className="text-gray-500 text-sm font-medium">{vertical ? "300x600 Ad Space" : "728x90 Ad Space"}</div>
    </div>
  )
}

