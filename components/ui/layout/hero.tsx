import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">BARK BLINK</span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
          Revolutionizing Solana development with cutting-edge tools and technologies.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}