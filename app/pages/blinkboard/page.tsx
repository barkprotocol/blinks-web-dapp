"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Banknote, ArrowLeftRight, Image, Users, Wallet, Settings, ChevronRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { ToastProvider } from "@/components/ui/toast"

// Simulated wallet interface
interface WalletState {
  isConnected: boolean
  balance: number
  transactions: Transaction[]
}

interface Transaction {
  id: string
  type: "Sent" | "Received"
  amount: number
  counterparty: string
  timestamp: Date
}

export default function BlinkboardPage() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    balance: 0,
    transactions: []
  })

  const [usdPrice, setUsdPrice] = useState<number>(0)
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching SOL price
    const fetchSolPrice = async () => {
      // In a real app, you'd fetch this from an API
      setUsdPrice(20.5) // Example price
    }
    fetchSolPrice()
  }, [])

  const handleConnectWallet = async () => {
    // Simulating wallet connection
    setWallet(prevState => ({
      ...prevState,
      isConnected: true,
      balance: 100 + Math.random() * 100, // Random balance between 100 and 200 SOL
    }))
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been successfully connected.",
    })
  }

  const handleDisconnectWallet = () => {
    setWallet({
      isConnected: false,
      balance: 0,
      transactions: []
    })
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  const simulateTransaction = (type: "Sent" | "Received") => {
    const amount = 1 + Math.random() * 10 // Random amount between 1 and 11 SOL
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      amount,
      counterparty: Math.random().toString(36).substr(2, 5),
      timestamp: new Date()
    }

    setWallet(prevState => ({
      ...prevState,
      balance: type === "Sent" ? prevState.balance - amount : prevState.balance + amount,
      transactions: [newTransaction, ...prevState.transactions.slice(0, 4)] // Keep only last 5 transactions
    }))

    toast({
      title: `Transaction ${type}`,
      description: `${amount.toFixed(2)} SOL has been ${type.toLowerCase()}.`,
    })
  }

  return (
    <ToastProvider>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Solana Blinkboard</h1>
        <p className="text-xl mb-8">Overview of Solana blinks and Actions</p>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="wallet">
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Overview</CardTitle>
                  <CardDescription>Manage your Solana wallet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {wallet.isConnected ? (
                        <>
                          <p className="text-2xl font-bold">{wallet.balance.toFixed(2)} SOL</p>
                          <p className="text-sm text-muted-foreground">
                            ${(wallet.balance * usdPrice).toFixed(2)} USD
                          </p>
                        </>
                      ) : (
                        <p className="text-lg">Connect your wallet to view balance</p>
                      )}
                    </div>
                    <Button onClick={wallet.isConnected ? handleDisconnectWallet : handleConnectWallet}>
                      <Wallet className="mr-2 h-4 w-4" color="#D0BFB4" />
                      {wallet.isConnected ? "Disconnect" : "Connect Wallet"}
                    </Button>
                  </div>
                  {wallet.isConnected && (
                    <>
                      <div className="flex space-x-2 mb-4">
                        <Button onClick={() => simulateTransaction("Sent")} variant="outline">
                          Simulate Send
                        </Button>
                        <Button onClick={() => simulateTransaction("Received")} variant="outline">
                          Simulate Receive
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Recent Transactions</h3>
                        <ul className="space-y-2">
                          {wallet.transactions.map(tx => (
                            <TransactionItem
                              key={tx.id}
                              type={tx.type}
                              amount={`${tx.amount.toFixed(2)} SOL`}
                              to={tx.type === "Sent" ? tx.counterparty : undefined}
                              from={tx.type === "Received" ? tx.counterparty : undefined}
                            />
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Network</p>
                        <p className="text-sm text-muted-foreground">Current: Mainnet Beta</p>
                      </div>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" color="#D0BFB4" /> Change Network
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Language</p>
                        <p className="text-sm text-muted-foreground">Current: English</p>
                      </div>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" color="#D0BFB4" /> Change Language
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            title="NFT"
            description="Create and manage NFTs"
            icon={<Image className="h-6 w-6" color="#D0BFB4" />}
          />
          <ActionCard
            title="Swap"
            description="Exchange tokens seamlessly"
            icon={<ArrowLeftRight className="h-6 w-6" color="#D0BFB4" />}
          />
          <ActionCard
            title="Payments"
            description="Send and receive payments"
            icon={<Banknote className="h-6 w-6" color="#D0BFB4" />}
          />
          <ActionCard
            title="Donations"
            description="Set up and manage donations"
            icon={<Gift className="h-6 w-6" color="#D0BFB4" />}
          />
          <ActionCard
            title="Crowdfunding"
            description="Launch crowdfunding campaigns"
            icon={<Users className="h-6 w-6" color="#D0BFB4" />}
          />
          <ActionCard
            title="Gift"
            description="Send crypto gifts to friends"
            icon={<Gift className="h-6 w-6" color="#D0BFB4" />}
          />
        </div>
      </div>
    </ToastProvider>
  )
}

function ActionCard({ title, description, icon }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {icon}
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full group">
                Go to {title}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" color="#D0BFB4" />
              </Button>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to explore {title} features</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function TransactionItem({ type, amount, to, from }) {
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="flex items-center">
        <Badge variant={type === "Sent" ? "destructive" : "success"} className="mr-2">
          {type}
        </Badge>
        {amount}
      </span>
      <span className="text-muted-foreground">
        {type === "Sent" ? `To: ${to}` : `From: ${from}`}
      </span>
    </li>
  )
}