
"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

interface NavbarProps {
  onExport: () => void
}

export function Navbar({ onExport }: NavbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="border-b px-4 py-3 flex justify-between items-center bg-background">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">DocuSigner</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button onClick={onExport}>Export</Button>
      </div>
    </nav>
  )
}
