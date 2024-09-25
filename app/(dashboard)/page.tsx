'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Layers, Shield, Code, Coins, Clock, Users, Globe, Lock, CreditCard, Gift, Users as UsersIcon, Repeat, ArrowLeftRight, Workflow, PlusCircle, Cog, Send, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { BlinkCreator, Blink } from '@/components/blink/blink-creator';
import { BlinkList } from '@/components/blink/blink-list';
import { syne, poppins } from '../fonts';

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D0BFB4] text-gray-800 transition-transform hover:scale-110">
    {children}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <IconWrapper>
      <Icon className="h-6 w-6" />
    </IconWrapper>
    <h3 className="text-xl font-bold text-gray-900 font-syne">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const UseCaseCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-start space-y-2 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <IconWrapper>
      <Icon className="h-6 w-6" />
    </IconWrapper>
    <h3 className="text-xl font-bold text-gray-900 font-syne">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ProcessStep = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex items-start space-x-4">
    <IconWrapper>
      <Icon className="h-6 w-6" />
    </IconWrapper>
    <div>
      <h3 className="text-lg font-bold text-gray-900 font-syne">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const [blinks, setBlinks] = useState<Blink[]>([]);
  const { connected } = useWallet();

  const handleBlinkCreated = (newBlink: Blink) => {
    setBlinks((prevBlinks) => [...prevBlinks, newBlink]);
  };

  return (
    <main className={`flex-1 bg-gray-50 ${poppins.variable} ${syne.variable} font-sans`}>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-syne">
                BARK Blink Dashboard
                <span className="block text-[#D0BFB4] mt-2">Manage Your Blockchain Interactions</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 text-lg sm:text-xl md:text-2xl mt-6">
                Create and manage your Blinks, monitor transactions, and streamline your blockchain operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blink Creator Section */}
      {connected && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-syne">Create a Blink</h2>
            <div className="max-w-md mx-auto">
              <BlinkCreator onBlinkCreated={handleBlinkCreated} />
            </div>
          </div>
        </section>
      )}

      {/* Blink List Section */}
      {connected && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <BlinkList blinks={blinks} />
          </div>
        </section>
      )}

      {/* Key Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Lightning-Fast Transactions"
              description="Experience blazing-fast blockchain transactions with our optimized infrastructure."
            />
            <FeatureCard
              icon={Layers}
              title="Multi-Chain Support"
              description="Seamlessly interact with multiple blockchain networks through a single, unified API."
            />
            <FeatureCard
              icon={Shield}
              title="Enhanced Security"
              description="Benefit from our robust security measures to protect your transactions and data."
            />
            <FeatureCard
              icon={Code}
              title="Developer-Friendly SDKs"
              description="Integrate blockchain functionality effortlessly with our comprehensive SDKs."
            />
            <FeatureCard
              icon={Coins}
              title="Multi-Currency Support"
              description="Support for a wide range of cryptocurrencies and tokens across various chains."
            />
            <FeatureCard
              icon={Clock}
              title="Real-Time Monitoring"
              description="Stay informed with real-time transaction monitoring and instant alerts."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-syne">
                Ready to Explore More?
              </h2>
              <p className="max-w-[900px] text-gray-400 text-lg sm:text-xl md:text-2xl mt-4">
                Discover advanced features and integrations to take your blockchain interactions to the next level.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/advanced-features">
                <Button className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 rounded-full px-8 py-3 text-lg font-syne transition-all duration-300 hover:shadow-lg">
                  Explore Advanced Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}