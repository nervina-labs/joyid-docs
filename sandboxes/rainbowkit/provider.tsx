import React from 'react'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { sepolia, polygonAmoy, opBNBTestnet } from 'wagmi/chains'
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { createJoyIdWallet } from '@joyid/rainbowkit'
import { injectedWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets'
import '@rainbow-me/rainbowkit/styles.css'

const joyidWallet = createJoyIdWallet({
  // name of your app
  name: 'JoyID Rainbowkit demo',
  // logo of your app
  logo: 'https://fav.farm/🆔',
  // JoyID app url that your app is integrated with
  joyidAppURL: 'https://testnet.joyid.dev',
})

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [joyidWallet, injectedWallet, coinbaseWallet],
    },
  ],
  {
    appName: 'JoyID RainbowKit demo',
    // for walletconnect
    projectId: 'YOUR_PROJECT_ID',
  }
)

const config = createConfig({
  chains: [sepolia, polygonAmoy, opBNBTestnet],
  transports: {
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [opBNBTestnet.id]: http(),
  },
  connectors,
})

export const Provider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const queryClient = new QueryClient()
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
