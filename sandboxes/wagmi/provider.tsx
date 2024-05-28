import React from 'react'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { sepolia, polygonAmoy, opBNBTestnet } from 'wagmi/chains'
import { joyidConnector } from '@joyid/wagmi'

const config = createConfig({
  chains: [sepolia, polygonAmoy, opBNBTestnet],
  transports: {
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [opBNBTestnet.id]: http(),
  },
  connectors: [
    joyidConnector({
      // name of your app
      name: 'JoyID Rainbowkit demo',
      // logo of your app
      logo: 'https://fav.farm/🆔',
      // JoyID app url that your app is integrated with
      joyidAppURL: 'https://testnet.joyid.dev',
    }),
  ],
})

export const Provider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const queryClient = new QueryClient()
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
