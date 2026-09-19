# DevPulsar Frontend

![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Stellar](https://img.shields.io/badge/Stellar-Network-7B61FF?style=for-the-badge&logo=stellar)

> Track contributions. Earn points. Wallet-connected, with on-chain reward distribution in progress.

---

## Overview

**DevPulsar Frontend** is the user-facing interface for the DevPulsar platform — a contribution tracking system for open-source projects, built with Stellar wallet integration at its core. It gives contributors visibility into their tracked activity, points, and wave cycle standing, with USDC reward distribution designed around the Stellar network.

The frontend serves two primary audiences:

- **Contributors** — developers who submit pull requests to tracked repositories and want to monitor their points, wave cycle standing, and reward history.
- **Maintainers** — project owners who oversee contribution waves, validate activity, and manage reward distribution.

**Current status:** wallet connection (Freighter, xBull, and other Stellar wallets via Stellar Wallets Kit) is fully implemented and working. Points, contribution tracking, and wave data are served by the backend API. On-chain reward distribution via a Soroban smart contract is planned but not yet built — see [Reconciliation Notes](#reconciliation-notes) below.

---

## Key Features

- **Contribution Dashboard** — feed of merged PRs, point assignments, and contribution status across tracked repositories.
- **Wave Cycle Tracker** — live countdown and progress bar for the current reward wave, with historical wave summaries.
- **Points Leaderboard** — ranked view of contributors by points earned within the active wave or all-time.
- **Wallet Connection** — working Stellar wallet integration via Stellar Wallets Kit, supporting Freighter, xBull, and other Stellar-compatible wallets.
- **Reward History** — log of past distributions and claimable balances (claim flow is currently a stub — see below).

---

## Reconciliation Notes

This section exists so the docs match the code exactly. If you're evaluating this project, start here.

- **Live and working:** wallet connect/disconnect, address persistence, dashboard/leaderboard/wave UI, backend API integration.
- **Backend-served, not on-chain:** points, contributions, and leaderboard data currently come from the backend API (seeded data in v1 — see backend README). There is no deployed Soroban contract yet, and `@stellar/stellar-sdk` is a dependency but not yet wired into any on-chain read/write path.
- **Stub, not functional:** `claimReward()` in `src/utils/stellar.ts` currently logs and resolves without submitting a transaction. `POST /rewards/claim` on the backend returns a null transaction payload. Claiming rewards is not yet live end-to-end.
- **Planned, not built:** GitHub webhook ingestion of real PR merges (currently mocked/seeded), on-chain point assignment, on-chain reward payout.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | [React 18](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Build Tool | [Vite](https://vitejs.dev) |
| Wallet Integration | [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit) |
| Blockchain SDK | [Stellar JS SDK](https://github.com/stellar/js-stellar-sdk) (installed; not yet used for on-chain calls) |
| Routing | [React Router v6](https://reactrouter.com) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs) |
| HTTP Client | [Axios](https://axios-http.com) |

---

## Prerequisites

- **Node.js** `>= 18.x` — [Download](https://nodejs.org)
- **npm** `>= 9.x` or **yarn** `>= 1.22.x`
- A Stellar-compatible browser wallet (e.g. [Freighter](https://www.freighter.app))

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/harold-reese123/devpulsar-frontend.git
cd devpulsar-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

See [Environment Variables](#environment-variables) for details.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
devpulsar-frontend/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── dashboard/ # ContributionFeed, PRCard, PointsBadge
│ │ ├── leaderboard/ # LeaderboardTable, RankBadge
│ │ ├── wallet/ # WalletButton, WalletModal, AddressChip
│ │ └── wave/ # WaveCycleTimer, WaveProgress, WaveHistory
│ ├── pages/ # Route-level page components
│ │ ├── Dashboard.tsx
│ │ ├── Leaderboard.tsx
│ │ ├── Rewards.tsx
│ │ ├── Wave.tsx
│ │ └── NotFound.tsx
│ ├── hooks/
│ │ ├── useWallet.ts
│ │ ├── useContributions.ts
│ │ ├── useWaveCycle.ts
│ │ └── useRewards.ts
│ ├── utils/
│ │ ├── stellar.ts # Wallet + Stellar helpers (claim flow is a stub — see Reconciliation Notes)
│ │ ├── format.ts
│ │ └── api.ts
│ ├── store/ # Zustand global state slices
│ ├── types/ # Shared TypeScript interfaces & enums
│ ├── App.tsx
│ └── main.tsx
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```


---

## Environment Variables

All variables must be prefixed with `VITE_` to be exposed to the Vite client bundle.

| Variable | Required | Description |
|---|---|---|
| `VITE_STELLAR_NETWORK` | ✅ | Stellar network. `testnet` or `mainnet` |
| `VITE_BACKEND_URL` | ✅ | Base URL of the devpulsar-backend API |
| `VITE_CONTRACT_ADDRESS` | ❌ (not yet used) | Reserved for the future rewards contract — no contract is deployed yet, so this has no effect currently |
| `VITE_HORIZON_URL` | ❌ | Custom Horizon server URL. Defaults to the public endpoint |
| `VITE_SOROBAN_RPC_URL` | ❌ (not yet used) | Reserved for future Soroban contract interactions |

Example `.env`:

```env
VITE_STELLAR_NETWORK=testnet
VITE_BACKEND_URL=https://api.devpulsar.io
```

> Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Available Scripts

```bash
npm run dev       # Start local dev server with hot reload
npm run build      # Build for production (outputs to /dist)
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
npm run test       # Run the test suite (Vitest)
```

---

## Wallet Connection

DevPulsar uses [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit) for wallet connection across multiple Stellar wallets. This part is fully implemented and working.

### Supported Wallets

- [Freighter](https://www.freighter.app)
- [xBull](https://xbull.app)
- [Lobstr](https://lobstr.co)
- Any WalletConnect-compatible Stellar wallet

### How It Works

1. The user clicks "Connect Wallet" in the top navigation.
2. `WalletModal` opens and presents available wallet options detected in the browser.
3. On selection, Stellar Wallets Kit requests the public key from the wallet extension.
4. The public key is stored in the Zustand wallet store and used to fetch the contributor's points and reward data **from the backend API** (not from an on-chain contract — see Reconciliation Notes).
5. Wallet state persists across page refreshes via `localStorage`.

```ts
import { useWalletStore } from '@/store/walletStore'

const { address, connect, disconnect, isConnected } = useWallet()
```

---

## Connecting to the Backend

The frontend communicates with [devpulsar-backend](https://github.com/harold-reese123/devpulsar-backend) over a REST API via the Axios instance in `src/utils/api.ts`, which attaches the connected wallet address as an `X-Wallet-Address` header for authenticated endpoints.

### Key Endpoints Consumed

| Endpoint | Description |
|---|---|
| `GET /contributions/:address` | Fetch tracked PRs and points for a contributor |
| `GET /wave/current` | Get the active wave cycle metadata |
| `GET /wave/history` | List past wave cycles and reward totals |
| `GET /leaderboard` | Ranked contributor list for the current wave |
| `GET /rewards/:address` | Reward history and claimable balance |
| `POST /rewards/claim` | Initiate a reward claim (currently returns a stubbed response — see Reconciliation Notes) |

The base URL is configured via `VITE_BACKEND_URL` in your `.env` file.

---

## Contributing

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes, following the existing code style (ESLint + Prettier).
3. Run lint and tests before pushing:
   ```bash
   npm run lint
   npm run test
   ```
4. Open a pull request against `main` with a clear description of what you changed and why.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

<p align="center">Built on Stellar. Powered by open source.</p>
