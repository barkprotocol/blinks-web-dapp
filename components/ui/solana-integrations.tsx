'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { createQR, encodeURL, TransactionRequestURLFields, findReference, validateTransfer } from '@solana/pay'
import { Metaplex, walletAdapterIdentity, bundlrStorage } from '@metaplex-foundation/js'
import { createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Loader2, RefreshCw } from 'lucide-react'

// Initialize Solana connection (replace with your RPC URL)
const connection = new Connection('https://api.mainnet-beta.solana.com')

// USDC token mint address on Solana mainnet
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

// Blink types
type BlinkType = 'transfer' | 'swap' | 'nft_mint'

interface Blink {
  id: string
  type: BlinkType
  data: Record<string, any>
  status: 'pending' | 'completed' | 'failed'
}

export default function SolanaIntegration() {
  const wallet = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [nftName, setNftName] = useState('')
  const [nftDescription, setNftDescription] = useState('')
  const [nftImageUrl, setNftImageUrl] = useState('')
  const [blinkType, setBlinkType] = useState<BlinkType>('transfer')
  const [blinkData, setBlinkData] = useState('')
  const [blinks, setBlinks] = useState<Blink[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (wallet.publicKey) {
      updateBalance()
      updateUSDCBalance()
    }
  }, [wallet.publicKey])

  const updateBalance = async () => {
    if (wallet.publicKey) {
      try {
        const balance = await connection.getBalance(wallet.publicKey)
        setBalance(balance / LAMPORTS_PER_SOL)
      } catch (error) {
        console.error('Failed to fetch SOL balance:', error)
        toast({ title: 'Error', description: 'Failed to fetch SOL balance.' })
      }
    }
  }

  const updateUSDCBalance = async () => {
    if (wallet.publicKey) {
      try {
        const tokenAccount = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey)
        const balance = await connection.getTokenAccountBalance(tokenAccount)
        setUsdcBalance(parseFloat(balance.value.uiAmount?.toFixed(2) || '0'))
      } catch (error) {
        console.error('Failed to fetch USDC balance:', error)
        toast({ title: 'Error', description: 'Failed to fetch USDC balance.' })
      }
    }
  }

  const handleSolanaPay = async () => {
    if (!wallet.publicKey) {
      toast({ title: 'Error', description: 'Please connect your wallet first.' })
      return
    }

    setIsLoading(true)
    try {
      const recipientPublicKey = new PublicKey(recipient)
      const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL

      const urlFields: TransactionRequestURLFields = {
        recipient: recipientPublicKey,
        amount: amountInLamports,
        label: 'BARK BLINK Payment',
        message: 'Thanks for using BARK BLINK!',
        memo: `Payment of ${amount} SOL`,
      }

      const url = encodeURL(urlFields)
      const qr = createQR(url)
      setQrCode(await qr.toDataURL())

      // Monitor the transaction
      const { signature } = await findReference(connection, url.reference, { finality: 'confirmed' })
      
      // Validate the transaction
      await validateTransfer(connection, signature, { recipient: recipientPublicKey, amount: amountInLamports })

      toast({ title: 'Success', description: 'Payment completed successfully.' })
      updateBalance()
    } catch (error) {
      console.error('Solana Pay error:', error)
      toast({ title: 'Error', description: 'Failed to complete Solana Pay transaction.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNftMint = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast({ title: 'Error', description: 'Please connect your wallet first.' })
      return
    }

    setIsLoading(true)
    try {
      const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(bundlrStorage())

      const { nft } = await metaplex.nfts().create({
        name: nftName,
        description: nftDescription,
        uri: nftImageUrl,
        sellerFeeBasisPoints: 500, // 5% royalty
      })

      toast({ title: 'Success', description: `NFT minted with address: ${nft.address.toString()}` })
      
      // Create a Blink for the NFT mint
      handleBlinkCreation('nft_mint', {
        name: nftName,
        description: nftDescription,
        imageUrl: nftImageUrl,
        mintAddress: nft.address.toString(),
      })
    } catch (error) {
      console.error('NFT minting error:', error)
      toast({ title: 'Error', description: 'Failed to mint NFT.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBlinkCreation = async (type: BlinkType, data: Record<string, any>) => {
    if (!wallet.publicKey) {
      toast({ title: 'Error', description: 'Please connect your wallet first.' })
      return
    }

    setIsLoading(true)
    try {
      const newBlink: Blink = {
        id: `blink_${Date.now()}`,
        type,
        data,
        status: 'pending',
      }

      // In a real scenario, you'd send this blink to your backend
      console.log('Created Blink:', newBlink)

      // Update local state
      setBlinks(prevBlinks => [...prevBlinks, newBlink])

      toast({ title: 'Success', description: `Blink created with ID: ${newBlink.id}` })

      // Simulate blink completion after 2 seconds
      setTimeout(() => {
        setBlinks(prevBlinks => 
          prevBlinks.map(blink => 
            blink.id === newBlink.id ? { ...blink, status: 'completed' } : blink
          )
        )
        toast({ title: 'Blink Completed', description: `Blink ${newBlink.id} has been completed.` })
      }, 2000)
    } catch (error) {
      console.error('Blink creation error:', error)
      toast({ title: 'Error', description: 'Failed to create Blink.' })
    } finally {
      setIsLoading(false)
    }
  }

  const executeBlink = async (blinkId: string) => {
    const blink = blinks.find(b => b.id === blinkId)
    if (!blink) {
      toast({ title: 'Error', description: 'Blink not found.' })
      return
    }

    if (blink.status !== 'pending') {
      toast({ title: 'Error', description: 'This Blink has already been processed.' })
      return
    }

    setIsLoading(true)
    try {
      // Simulate blink execution
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Update blink status
      setBlinks(prevBlinks => 
        prevBlinks.map(b => 
          b.id === blinkId ? { ...b, status: 'completed' } : b
        )
      )

      toast({ title: 'Success', description: `Blink ${blinkId} executed successfully.` })
    } catch (error) {
      console.error('Blink execution error:', error)
      toast({ title: 'Error', description: 'Failed to execute Blink.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUSDCTransfer = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast({ title: 'Error', description: 'Please connect your wallet first.' })
      return
    }

    setIsLoading(true)
    try {
      const recipientPublicKey = new PublicKey(recipient)
      const amountInUSDC = parseFloat(amount) * 1_000_000 // USDC has 6 decimal places

      const senderUsdcAddress = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey)
      const recipientUsdcAddress = await getAssociatedTokenAddress(USDC_MINT, recipientPublicKey)

      const transaction = new Transaction()

      // Check if the recipient has an associated token account, if not, create one
      const recipientAccount = await connection.getAccountInfo(recipientUsdcAddress)
      if (!recipientAccount) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            recipientUsdcAddress,
            recipientPublicKey,
            USDC_MINT
          )
        )
      }

      // Add transfer instruction
      transaction.add(
        createTransferInstruction(
          senderUsdcAddress,
          recipientUsdcAddress,
          wallet.publicKey,
          amountInUSDC
        )
      )

      // Sign and send the transaction
      const signature = await wallet.sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      toast({ title: 'Success', description: `USDC transfer completed. Signature: ${signature}` })
      updateUSDCBalance()
    } catch (error) {
      console.error('USDC transfer error:', error)
      toast({ title: 'Error', description: 'Failed to complete USDC transfer.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-primary">Solana Wallet</CardTitle>
          <CardDescription className="text-muted-foreground">Connect your Solana wallet and view your balance</CardDescription>
        </CardHeader>
        <CardContent>
          <WalletMultiButton className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90" />
          {wallet.publicKey && (
            <div className="space-y-2">
              <p className="text-foreground">SOL Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
              <p className="text-foreground">USDC Balance: {usdcBalance !== null ? `${usdcBalance} USDC` : 'Loading...'}</p>
              <Button
                onClick={() => { updateBalance(); updateUSDCBalance(); }}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh Balances
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-primary">Solana Pay</CardTitle>
          <CardDescription className="text-muted-foreground">Generate a Solana Pay QR code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="recipient" className="text-foreground">Recipient Address</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient's Solana address"
              className="bg-input text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="amount" className="text-foreground">Amount (SOL)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in SOL"
              className="bg-input text-foreground"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSolanaPay} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate QR Code
          </Button>
        </CardFooter>
        {qrCode && (
          <CardContent>
            <img src={qrCode} alt="Solana Pay QR Code" className="mx-auto" />
          </CardContent>
        )}
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-primary">USDC Transfer</CardTitle>
          <CardDescription className="text-muted-foreground">Transfer USDC to another address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="usdcRecipient" className="text-foreground">Recipient Address</Label>
            <Input
              id="usdcRecipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient's Solana address"
              className="bg-input text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="usdcAmount" className="text-foreground">Amount (USDC)</Label>
            <Input
              id="usdcAmount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in USDC"
              className="bg-input text-foreground"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUSDCTransfer} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Transfer USDC
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-primary">NFT Minting</CardTitle>
          <CardDescription className="text-muted-foreground">Create a new NFT on Solana</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nftName" className="text-foreground">NFT Name</Label>
            <Input
              id="nftName"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
              placeholder="Enter NFT name"
              className="bg-input text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="nftDescription" className="text-foreground">NFT Description</Label>
            <Input
              id="nftDescription"
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
              placeholder="Enter NFT description"
              className="bg-input text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="nftImageUrl" className="text-foreground">NFT Image URL</Label>
            <Input
              id="nftImageUrl"
              value={nftImageUrl}
              onChange={(e) => setNftImageUrl(e.target.value)}
              placeholder="Enter NFT image URL"
              className="bg-input text-foreground"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNftMint} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Mint NFT
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-primary">Blink Creation</CardTitle>
          <CardDescription className="text-muted-foreground">Create a new Blink operation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="blinkType" className="text-foreground">Blink Type</Label>
            <select
              id="blinkType"
              value={blinkType}
              onChange={(e) => setBlinkType(e.target.value as BlinkType)}
              className="w-full p-2 border rounded bg-input text-foreground"
            >
              <option value="transfer">Transfer</option>
              <option value="swap">Swap</option>
              <option value="nft_mint">NFT Mint</option>
            </select>
          </div>
          <div>
            <Label htmlFor="blinkData" className="text-foreground">Blink Data (JSON)</Label>
            <Input
              id="blinkData"
              value={blinkData}
              onChange={(e) => setBlinkData(e.target.value)}
              placeholder='Enter Blink data (e.g., {"amount": "1", "token": "SOL"})'
              className="bg-input text-foreground"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleBlinkCreation(blinkType, JSON.parse(blinkData))}
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create Blink
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-primary">Blink History</CardTitle>
          <CardDescription className="text-muted-foreground">View and manage your Blinks</CardDescription>
        </CardHeader>
        <CardContent>
          {blinks.length === 0 ? (
            <p className="text-muted-foreground">No Blinks created yet.</p>
          ) : (
            <ul className="space-y-4">
              {blinks.map((blink) => (
                <li key={blink.id} className="border p-4 rounded bg-secondary">
                  <p className="text-foreground"><strong>ID:</strong> {blink.id}</p>
                  <p className="text-foreground"><strong>Type:</strong> {blink.type}</p>
                  <p className="text-foreground"><strong>Status:</strong> {blink.status}</p>
                  <p className="text-foreground"><strong>Data:</strong> {JSON.stringify(blink.data)}</p>
                  {blink.status === 'pending' && (
                    <Button
                      onClick={() => executeBlink(blink.id)}
                      disabled={isLoading}
                      className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Execute Blink
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}