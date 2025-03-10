import { cn } from "@/lib/utils"

interface AdBannerProps {
  className?: string
  size?: "small" | "medium" | "large"
}

export function AdBanner({ className, size = "medium" }: AdBannerProps) {
  const heightClass = size === "small" ? "h-16" : size === "large" ? "h-60" : "h-24"

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50",
        heightClass,
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">Advertisement Space</p>
    </div>
  )
}

