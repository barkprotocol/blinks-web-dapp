import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ActionsSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <Card className="bg-secondary text-secondary-foreground rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="py-16 px-4 sm:px-6 lg:py-20 lg:px-8 text-center">
            <CardHeader>
              <p className="text-sm font-semibold tracking-wide uppercase text-primary">Get Started</p>
              <CardTitle className="mt-2 text-4xl font-extrabold sm:text-5xl">
                Take the next step with BARK BLINK
              </CardTitle>
            </CardHeader>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                <Link href="/signup">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto">
                <Link href="/docs">
                  <BookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                  Explore Docs
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}