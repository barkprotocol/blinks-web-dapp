"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { LogIn, Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WalletButton } from "@/components/ui/connect-wallet"

const navigationItems = [
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Resources",
    items: [
      {
        title: "Documentation",
        href: "/docs",
        description: "Learn how to integrate BARK BLINK into your projects.",
      },
      {
        title: "API Reference",
        href: "/api",
        description: "Detailed API documentation for developers.",
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Read the latest news and updates from our team.",
      },
    ],
  },
]

function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

function BlinkingText() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 500) // Blink every 500ms

    return () => clearInterval(interval)
  }, [])

  return (
    <span 
      className={`font-medium text-[#D0BFB4] ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      aria-hidden="true"
    >
      BLINK
    </span>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://barkblink.vercel.app/logo.png"
              alt=""
              width={32}
              height={32}
            />
            <span className="font-semibold text-lg">
              BARK <span className="sr-only">BLINK</span>
              <BlinkingText />
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 group w-max">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  ) : (
                    <>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login" aria-label="Log in">
              <LogIn className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <WalletButton />
          <ModeToggle />
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.title}>
                    {item.href ? (
                      <Link href={item.href} className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                        {item.title}
                      </Link>
                    ) : (
                      <>
                        <h2 className="text-lg font-medium mb-2">{item.title}</h2>
                        <ul className="space-y-2 ml-4">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <Link href={subItem.href} className="text-sm" onClick={() => setIsOpen(false)}>
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
                <div className="flex flex-col space-y-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/login" aria-label="Log in">
                      <LogIn className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <WalletButton />
                  <ModeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}