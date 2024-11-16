# ETH Balance Checker

A simple web application built with Preact that allows users to check the balance of any Ethereum address on the
network using the Tatum SDK.

## Prerequisites

- **Node.js**
- **npm**
- **Tatum API Key**

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/jojkos/tatum-hello.git
    cd tatum-hello
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your Tatum API key:

    ```env
    VITE_TATUM_API_KEY=your_tatum_api_key_here
    ```

   **Note:** Ensure that `.env` is included in your `.gitignore` file to prevent it from being committed.

## Scripts

- `npm run dev` - Starts a dev server at http://localhost:5173/

- `npm run build` - Builds for production, emitting to `dist/`

- `npm run preview` - Starts a server at http://localhost:4173/ to test production build locally
