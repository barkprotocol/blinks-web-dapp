'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function WalletConnectButton() {
  const { connected, connecting, disconnect, publicKey } = useWallet();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (connected) {
      toast({
        title: "Wallet Connected",
        description: `Connected to ${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}`,
        variant: "default",
      });
    }
  }, [connected, publicKey]);

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast({
        title: "Disconnection Error",
        description: "An error occurred while disconnecting your wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isClient) {
    return (
      <Button disabled className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (connected) {
    return (
      <Button
        onClick={handleDisconnect}
        className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne"
      >
        Disconnect Wallet
      </Button>
    );
  }

  return (
    <WalletMultiButton
      className="!bg-[#D0BFB4] !hover:bg-[#C0AFA4] !text-gray-800 !font-syne !rounded-md !h-10 !px-4 !py-2"
      style={{
        fontFamily: 'var(--font-syne)',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
      }}
    >
      {connecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        'Connect Wallet'
      )}
    </WalletMultiButton>
  );
}