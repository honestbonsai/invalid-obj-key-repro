# invalid-obj-key-repro


1. Install dependencies: `yarn`
2. Start dev server: `yarn dev`
3. Get a free Alchemy API key from: https://www.alchemy.com/
4. Put a `.env` file at the root of this project with the line `RPC_URL=https://eth-mainnet.alchemyapi.io/v2/<MY API KEY GOES HERE>`
5. Start the testnet and fork mainnet: `yarn hh:node`
6. Run Cypress tests: `yarn test:e2e`
7. Observe the errors in the console: `invalid object key - from`
