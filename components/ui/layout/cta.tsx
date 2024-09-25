import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="bg-gray-900 rounded-3xl my-20">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-[#D0BFB4] mt-2">Start building with BARK BLINK today.</span>
        </h2>
        <div className="mt-8">
          <Link href="/signup" passHref>
            <Button className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 text-lg px-8 py-3">
              Get started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}