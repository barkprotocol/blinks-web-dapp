import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Zap, Heart } from 'lucide-react'

export function AboutSection() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              Secure
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Blockchain-based pet identification and ownership verification
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              Fast
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Quick and easy access to your pet's information anytime, anywhere
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Heart className="w-4 h-4 mr-2 text-primary" />
              Caring
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            Ensuring the best care for your furry friends through innovative technology
          </CardContent>
        </Card>
      </div>
    </section>
  )
}