"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"

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

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <header className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
            alt="BARK BLINK logo"
            width={32}
            height={32}
          />
          <span className="font-semibold text-lg">
            BARK <span className="sr-only">BLINK</span>
            <BlinkingText />
          </span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Features</a></li>
            <li><a href="#" className="hover:underline">Pricing</a></li>
            <li><a href="#" className="hover:underline">Docs</a></li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col gap-8 items-center text-center max-w-2xl">
        <h1 className="text-4xl font-bold">Welcome to BARK BLINK</h1>
        <p className="text-xl">The ultimate platform for dog lovers and their furry friends.</p>
        <ol className="list-inside list-decimal text-sm text-left font-mono">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Customize BARK BLINK to fit your needs.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button
            className="rounded-full"
            asChild
          >
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="mr-2 dark:invert"
                src="https://nextjs.org/icons/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy BARK BLINK
            </a>
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            asChild
          >
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </Button>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          BARK BLINK Community
        </a>
      </footer>
    </div>
  )
}