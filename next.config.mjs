/** @type {import('next').NextConfig} */
const nextConfig = {
    // Load environment variables
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  
      // Supabase
      POSTGRES_URL: process.env.POSTGRES_URL,
      BASE_URL: process.env.BASE_URL,
      AUTH_SECRET: process.env.AUTH_SECRET,
  
      // Solana configurations
      SOLANA_NETWORK: process.env.SOLANA_NETWORK,
      SOLANA_MAINNET_RPC: process.env.SOLANA_MAINNET_RPC,
      TOKEN_PROGRAM_ID: process.env.TOKEN_PROGRAM_ID,
  
      // Metaplex
      TOKEN_METADATA_PROGRAM_ID: process.env.TOKEN_METADATA_PROGRAM_ID,
  
      // Helius API configuration
      HELIUS_API_URL: process.env.HELIUS_API_URL,
      HELIUS_API_KEY: process.env.HELIUS_API_KEY,
  
      // SHYFT API configuration
      SHYFT_API_URL: process.env.SHYFT_API_URL,
      SHYFT_API_KEY: process.env.SHYFT_API_KEY,
  
      // Payments
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  
      // BARK BLINK configuration
      BARK_BLINK_POSTGRES_URL: process.env.BARK_BLINK_POSTGRES_URL,
      BARK_BLINK_STRIPE_SECRET_KEY: process.env.BARK_BLINK_STRIPE_SECRET_KEY,
      BARK_BLINK_STRIPE_WEBHOOK_SECRET: process.env.BARK_BLINK_STRIPE_WEBHOOK_SECRET,
      BARK_BLINK_BASE_URL: process.env.BARK_BLINK_BASE_URL,
      BARK_BLINK_AUTH_SECRET: process.env.BARK_BLINK_AUTH_SECRET,
  
      // Marketing & Mail
      NEXT_PUBLIC_MAILCHIMP_API_KEY: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
      NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID: process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
      NEXT_PUBLIC_MAILCHIMP_DATA_CENTER: process.env.NEXT_PUBLIC_MAILCHIMP_DATA_CENTER,
    },
  
    // Add your custom domains for image optimization
    images: {
      domains: [
        'uploadcare.com',
        'ucarecdn.com',
        'unsplash.com',
      ],
    },
  };
  
  export default nextConfig;
  