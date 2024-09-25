'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export function SolanaWalletSelector() {
  const [walletConnected, setWalletConnected] = useState(false)

  const handleWalletConnection = () => {
    // Here you would implement the actual Solana wallet connection logic
    // For this example, we'll just toggle the state
    setWalletConnected(!walletConnected)
  }

  return (
    <Button
      onClick={handleWalletConnection}
      className="bg-[#D0BFB4] text-black hover:bg-[#C0AFA4] flex items-center space-x-2"
    >
      <Wallet className="w-4 h-4" />
      <span>{walletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}</span>
    </Button>
  )
}