import Link from 'next/link'
import { Facebook, Twitter, Instagram, GitHub } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 font-geist-sans">BARK BLINK</h3>
            <p className="text-gray-600 dark:text-gray-300 font-geist-sans">Revolutionizing blockchain interactions</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 font-geist-sans">Quick Links</h3>
            <ul className="space-y-2">
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/services">Services</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 font-geist-sans">Legal</h3>
            <ul className="space-y-2">
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 font-geist-sans">Follow Us</h3>
            <div className="flex space-x-4">
              <SocialLink href="https://facebook.com" icon={Facebook} />
              <SocialLink href="https://twitter.com" icon={Twitter} />
              <SocialLink href="https://instagram.com" icon={Instagram} />
              <SocialLink href="https://github.com" icon={GitHub} />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-gray-400 font-geist-sans">&copy; {new Date().getFullYear()} BARK BLINK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-600 dark:text-gray-300 hover:text-[#D0BFB4] dark:hover:text-[#D0BFB4] transition-colors duration-300 font-geist-sans">
      {children}
    </Link>
  )
}

function SocialLink({ href, icon: Icon }: { href: string; icon: React.ElementType }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D0BFB4] transition-colors duration-300">
      <Icon className="h-6 w-6" aria-hidden="true" />
      <span className="sr-only">Visit our {Icon.name} page</span>
    </a>
  )
}