"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the email to your API
    console.log('Subscribing email:', email)
    toast({
      title: "Subscribed!",
      description: "You've successfully subscribed to our newsletter.",
    })
    setEmail('')
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <Card className="bg-secondary text-secondary-foreground rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="py-16 px-4 sm:px-6 lg:py-20 lg:px-8 text-center">
            <CardHeader>
              <p className="text-sm font-semibold tracking-wide uppercase text-primary">Newsletter</p>
              <CardTitle className="mt-2 text-4xl font-extrabold sm:text-5xl">
                Stay updated with BARK BLINK
              </CardTitle>
            </CardHeader>
            <p className="mt-4 text-xl text-secondary-foreground/80">
              Subscribe to our newsletter for the latest updates, tips, and insights on Solana development with BARK BLINK.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow px-5 py-3"
                  aria-label="Email address"
                />
                <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}