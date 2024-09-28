# BARK - Blinks Web Dapp
**Alpha version**

Production version: https://github.com/barkprotocol/blink-as-a-service

## Overview

**BARK - Blinks Web UI** is a user-friendly interface for the Blinks As A Service platform, enabling users to easily create, send, and manage SPL tokens, transactions, NFTs, gifts or airdrops on the Solana blockchain. This application provides a seamless experience for both NFT, gift creators and recipients.

## Features

- **Simple Gift Creation**: Quickly create gifts with just a few clicks.
- **Cross-Wallet Support**: Recipients can claim gifts using any Solana-compatible wallet.
- **Real-Time Tracking**: Monitor the status of gifts, including unclaimed and claimed gifts.
- **Integration with Blinks As A Service**: Utilizes the Blinks protocol for native transaction handling across applications.
- **Support for Various Use Cases**: Ideal for donations, crowdfunding, commerce, and micro-payments.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Docker (optional for containerization)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/barkprotocol/blinks-web-ui.git
   cd blinks-web-ui
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure Environment Variables:

   Create a `.env.local` file in the root of your project and add the following environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   POSTGRES_URL=postgresql://postgres.
   BASE_URL=http://localhost:3000
   AUTH_SECRET=your_auth_secret
   SOLANA_NETWORK=devnet
   SOLANA_MAINNET_RPC=https://api.mainnet-beta.solana.com
   TOKEN_PROGRAM_ID=your_token_program_id
   TOKEN_METADATA_PROGRAM_ID=your_token_metadata_program_id
   HELIUS_API_URL=https://api.helius.xyz
   HELIUS_API_KEY=your_helius_api_key
   SHYFT_API_URL=https://api.shyft.network
   SHYFT_API_KEY=your_shyft_api_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   NEXT_PUBLIC_MAILCHIMP_API_KEY=your_mailchimp_api_key
   NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID=your_mailchimp_audience_id
   NEXT_PUBLIC_MAILCHIMP_DATA_CENTER=your_mailchimp_data_center
   ```
5. Auth config

openssl genrsa -out jwtRS256.key 2048
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

6. Start the Development Server:

   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000`.

### Docker Setup (Optional)

If you prefer to run the application in a Docker container, follow these steps:

1. Build the Docker image:

   ```bash
   docker build -t blinks-web-ui .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 blinks-web-ui
   ```

3. Access the application at `http://localhost:3000`.

## API Reference (not implemented)

For detailed API documentation, refer to the [API Documentation](link-to-api-docs).

## Contributing

We welcome contributions to Blinks Web UI! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
