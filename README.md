# DevPulsar Frontend

![Build Status](https://img.shields.io/github/actions/workflow/status/devpulsar/devpulsar-frontend/ci.yml?branch=main&style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Stellar](https://img.shields.io/badge/Stellar-Network-7B61FF?style=for-the-badge&logo=stellar)

> Track contributions. Earn points. Claim rewards — on-chain.

---

## Overview

**DevPulsar Frontend** is the user-facing interface for the DevPulsar platform — a decentralized contribution tracking system built on the [Stellar](https://stellar.org) blockchain. It bridges open-source activity with on-chain incentives, giving contributors real-time visibility into their impact and earnings.

The frontend serves two primary audiences:

- **Contributors** — developers who submit pull requests to tracked repositories and want to monitor their points, wave cycle standing, and USDC reward history.
- **Maintainers** — project owners who oversee contribution waves, validate activity, and manage reward distribution.

When a contributor's pull request is merged into a tracked repository, DevPulsar picks it up, assigns on-chain points based on contribution weight, and queues USDC rewards for distribution at the end of each wave cycle — all surfaced through this interface.

---

## Key Features

- **Contribution Dashboard** — real-time feed of merged PRs, point assignments, and contribution status across tracked repositories.
- **Wave Cycle Tracker** — live countdown and progress bar for the current reward wave, with historical wave summaries.
- **Points Leaderboard** — ranked view of contributors by points earned within the active wave or all-time.
- **Wallet Connection** — seamless Stellar wallet integration via Stellar Wallets Kit, supporting Freighter, xBull, and other Stellar-compatible wallets.
- **Reward History** — paginated log of past USDC distributions, claimable rewards, and transaction links on Stellar Explorer.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | [React 18](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Build Tool | [Vite](https://vitejs.dev) |
| Wallet Integration | [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit) |
| Blockchain SDK | [Stellar JS SDK](https://github.com/stellar/js-stellar-sdk) |
| Routing | [React Router v6](https://reactrouter.com) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs) |
| HTTP Client | [Axios](https://axios-http.com) |

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** `>= 18.x` — [Download](https://nodejs.org)
- **npm** `>= 9.x` or **yarn** `>= 1.22.x`
- A Stellar-compatible browser wallet (e.g. [Freighter](https://www.freighter.app))

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/devpulsar/devpulsar-frontend.git
cd devpulsar-frontend
```

### 2. Install dependencies

```bash
# using npm
npm install

# or using yarn
yarn install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

See the [Environment Variables](#environment-variables) section for details on each variable.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
devpulsar-frontend/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Buttons, badges, modals, loaders
│   │   ├── dashboard/       # ContributionFeed, PRCard, PointsBadge
│   │   ├── leaderboard/     # LeaderboardTable, RankBadge
│   │   ├── wallet/          # WalletButton, WalletModal, AddressChip
│   │   └── wave/            # WaveCycleTimer, WaveProgress, WaveHistory
│   ├── pages/               # Route-level page components
│   │   ├── Dashboard.tsx    # Main contributor dashboard
│   │   ├── Leaderboard.tsx  # Points leaderboard
│   │   ├── Rewards.tsx      # Reward history & claim interface
│   │   ├── Wave.tsx         # Wave cycle detail view
│   │   └── NotFound.tsx     # 404 fallback
│   ├── hooks/               # Custom React hooks
│   │   ├── useWallet.ts     # Stellar wallet state & actions
│   │   ├── useContributions.ts  # Fetch & subscribe to PR data
│   │   ├── useWaveCycle.ts  # Current wave data & countdown
│   │   └── useRewards.ts    # Reward history & claim logic
│   ├── utils/               # Pure utility functions
│   │   ├── stellar.ts       # Stellar SDK helpers (tx building, formatting)
│   │   ├── format.ts        # Date, number, address formatters
│   │   └── api.ts           # Axios instance & API request helpers
│   ├── store/               # Zustand global state slices
│   ├── types/               # Shared TypeScript interfaces & enums
│   ├── App.tsx              # Root component & router setup
│   └── main.tsx             # Vite entry point
├── .env.example             # Environment variable template
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

---

## Environment Variables

Create a `.env` file at the project root based on `.env.example`. All variables must be prefixed with `VITE_` to be exposed to the Vite client bundle.

| Variable | Required | Description |
|---|---|---|
| `VITE_STELLAR_NETWORK` | ✅ | Stellar network to connect to. `testnet` or `mainnet` |
| `VITE_BACKEND_URL` | ✅ | Base URL of the devpulsar-backend API (e.g. `https://api.devpulsar.io`) |
| `VITE_CONTRACT_ADDRESS` | ✅ | Stellar smart contract address for the DevPulsar rewards contract |
| `VITE_HORIZON_URL` | ❌ | Custom Horizon server URL. Defaults to the public Stellar Horizon endpoint |
| `VITE_SOROBAN_RPC_URL` | ❌ | Soroban RPC endpoint for contract interactions. Defaults to the public RPC |

Example `.env`:

```env
VITE_STELLAR_NETWORK=testnet
VITE_BACKEND_URL=https://api.devpulsar.io
VITE_CONTRACT_ADDRESS=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

> Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Available Scripts

```bash
# Start the local development server with hot reload
npm run dev

# Build the app for production (outputs to /dist)
npm run build

# Preview the production build locally
npm run preview

# Run ESLint across all source files
npm run lint

# Run the test suite (Vitest)
npm run test
```

---

## Wallet Connection

DevPulsar uses [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit) to provide a unified wallet connection experience across multiple Stellar wallets.

### Supported Wallets

- [Freighter](https://www.freighter.app)
- [xBull](https://xbull.app)
- [Lobstr](https://lobstr.co)
- Any WalletConnect-compatible Stellar wallet

### How It Works

1. The user clicks "Connect Wallet" in the top navigation.
2. `WalletModal` opens and presents available wallet options detected in the browser.
3. On selection, Stellar Wallets Kit requests the public key from the wallet extension.
4. The public key is stored in the Zustand wallet store and used to:
   - Fetch the contributor's on-chain points and reward balance from the contract.
   - Sign transactions when claiming USDC rewards.
5. Wallet state persists across page refreshes via `localStorage`.

The core wallet logic lives in `src/hooks/useWallet.ts`:

```ts
import { useWalletStore } from '@/store/walletStore'

const { address, connect, disconnect, isConnected } = useWallet()
```

---

## Connecting to the Backend

The frontend communicates with [devpulsar-backend](https://github.com/devpulsar/devpulsar-backend) over a REST API. All requests are made through the Axios instance configured in `src/utils/api.ts`, which automatically attaches the connected wallet address as an `X-Wallet-Address` header for authenticated endpoints.

### Key Endpoints Consumed

| Endpoint | Description |
|---|---|
| `GET /contributions/:address` | Fetch merged PRs and points for a contributor |
| `GET /wave/current` | Get the active wave cycle metadata |
| `GET /wave/history` | List past wave cycles and reward totals |
| `GET /leaderboard` | Ranked contributor list for the current wave |
| `GET /rewards/:address` | Reward history and claimable balance |
| `POST /rewards/claim` | Initiate a USDC reward claim (requires signed tx) |

The base URL is configured via `VITE_BACKEND_URL` in your `.env` file.

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes, following the existing code style (ESLint + Prettier are enforced).

3. Run lint and tests before pushing:
   ```bash
   npm run lint
   npm run test
   ```

4. Open a pull request against `main` with a clear description of what you changed and why.

Please keep PRs focused — one feature or fix per PR. For larger changes, open an issue first to discuss the approach.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

<p align="center">Built on Stellar. Powered by open source.</p>
