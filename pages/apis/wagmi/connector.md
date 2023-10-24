# JoyIdConnector

`JoyIdConnector` is a [Wagmi Connector ↗](https://wagmi.sh/core/config#connectors-optional), it can be used to integrate JoyID into your wagmi-based dApp.

## Types

- [`EvmConfig`](/apis/evm/init-config#evmconfig)

```ts
import { Chain } from 'wagmi'

interface JoyIdConnectorOptions {
  // List of chains to support
  chains: Chain[]
  // JoyID EVM config
  options?: EvmConfig
}

constructor({ chains, options }: JoyIdConnectorOptions)
```

## Usage

Check out [Wagmi Guide](/guide/evm/adapters/wagmi).
