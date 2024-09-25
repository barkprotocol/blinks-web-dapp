import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins, Gift, ShoppingBag, Users, Zap, Sparkles, Code, Share2, Server, CreditCard } from 'lucide-react'

export function FeatureCardSection() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Sparkles className="w-4 h-4 mr-2 text-[#D0BFB4]" />
              Compressed NFTs
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Create and claim unique, blockchain-verified pet identities as compressed NFTs on the Solana network
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Coins className="w-4 h-4 mr-2 text-[#D0BFB4]" />
              Micro-payments
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Enable quick and low-cost transactions for pet-related services using Solana
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Gift className="w-4 h-4 mr-2 text-[#D0BFB4]" />
              Donations & Gifts
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Facilitate easy donations and gift-giving for pets and shelters on the Solana blockchain
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <ShoppingBag className="w-4 h-4 mr-2 text-[#D0BFB4]" />
              Create Commerce
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Build and manage your own pet-related e-commerce platform powered by Solana's blockchain
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2 text-[#D0BFB4]" />
              Crowdfunding
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Launch and participate in pet-related crowdfunding campaigns powered by Solana
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Code className="w-4 h-4 mr-2 text-[#D0BFB4]" />
              Developer SDK
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Integrate BARK BLINK features into your applications with our comprehensive Solana-based SDK
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Server className="w-4 h-4 mr-2 text-[#D0BFB4]" />
              API
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Access BARK BLINK functionality through our robust and flexible API for seamless integration
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Share2 className="w-4 h-4 mr-2 text-[#D0BFB4]" />
              Social Finance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Engage in social financial activities within the pet community, powered by Solana's blockchain
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <CreditCard className="w-4 h-4 mr-2 text-[#D0BFB4]" />
              Membership
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Join exclusive pet-owner communities and access premium features with blockchain-verified memberships
          </CardContent>
        </Card>
      </div>
    </section>
  )
}