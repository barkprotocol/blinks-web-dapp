"use client"

import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider, useWalletModal } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl, Connection, PublicKey, Transaction } from '@solana/web3.js'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import the CSS styles for the wallet adapter
import '@solana/wallet-adapter-react-ui/styles.css'

// Custom hook for Solana functionality
export function useSolana() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const { setVisible } = useWalletModal()
  const { toast } = useToast()

  const [balance, setBalance] = useState<number | null>(null)

  const getBalance = useCallback(async () => {
    if (!publicKey) return null
    try {
      const balance = await connection.getBalance(publicKey)
      setBalance(balance / 1e9) // Convert lamports to SOL
      return balance / 1e9
    } catch (error) {
      console.error('Error fetching balance:', error)
      toast({
        title: "Error",
        description: "Failed to fetch balance. Please try again.",
        variant: "destructive",
      })
      return null
    }
  }, [publicKey, connection, toast])

  useEffect(() => {
    if (publicKey) {
      getBalance()
    } else {
      setBalance(null)
    }
  }, [publicKey, getBalance])

  const connectWallet = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  const disconnectWallet = useCallback(() => {
    if (window.solana && window.solana.disconnect) {
      window.solana.disconnect()
    }
  }, [])

  const sendSol = useCallback(async (to: string, amount: number) => {
    if (!publicKey) {
      toast({
        title: "Error",
        description: "Wallet not connected",
        variant: "destructive",
      })
      return
    }

    try {
      const toPublicKey = new PublicKey(to)
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toPublicKey,
          lamports: amount * 1e9, // Convert SOL to lamports
        })
      )

      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      toast({
        title: "Success",
        description: `Sent ${amount} SOL to ${to}`,
      })

      getBalance() // Refresh balance after sending
    } catch (error) {
      console.error('Error sending SOL:', error)
      toast({
        title: "Error",
        description: "Failed to send SOL. Please try again.",
        variant: "destructive",
      })
    }
  }, [publicKey, connection, sendTransaction, toast, getBalance])

  return {
    publicKey,
    balance,
    getBalance,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    sendSol,
  }
}

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet)
  const { toast } = useToast()

  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  )

  const switchNetwork = useCallback((newNetwork: WalletAdapterNetwork) => {
    setNetwork(newNetwork)
    toast({
      title: "Network Changed",
      description: `Switched to ${newNetwork}`,
    })
  }, [toast])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={(error) => {
        console.error('Wallet error:', error)
        toast({
          title: "Wallet Error",
          description: error.message,
          variant: "destructive",
        })
      }}>
        <WalletModalProvider>
          <div className="flex flex-col min-h-screen">
            <header className="bg-primary text-primary-foreground p-4">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">BARK BLINK</h1>
                <Select value={network} onValueChange={(value) => switchNetwork(value as WalletAdapterNetwork)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={WalletAdapterNetwork.Devnet}>Devnet</SelectItem>
                    <SelectItem value={WalletAdapterNetwork.Testnet}>Testnet</SelectItem>
                    <SelectItem value={WalletAdapterNetwork.Mainnet}>Mainnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </header>
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

// Example usage of the useSolana hook
export function WalletStatus() {
  const { publicKey, balance, connectWallet, disconnectWallet, getBalance } = useSolana()

  return (
    <div className="p-4">
      {publicKey ? (
        <div className="space-y-2">
          <p>Connected: {publicKey.toBase58()}</p>
          <p>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
          <Button onClick={disconnectWallet}>Disconnect</Button>
          <Button onClick={getBalance}>Refresh Balance</Button>
        </div>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </div>
  )
}