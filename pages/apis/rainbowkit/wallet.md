# JoyIdWallet

`JoyIdWallet` is a [Custom Wallet ↗](https://www.rainbowkit.com/docs/custom-wallets) that can be used with [RainbowKit](https://www.rainbowkit.com/).

## Types

- [`EvmConfig`](/apis/evm/init-config#evmconfig)

```ts
import { Chain } from 'wagmi'
import { Wallet } from '@rainbow-me/rainbowkit'

export interface JoyIdWalletOptions {
  // List of chains to support
  chains: Chain[]
  // JoyID EVM config
  options?: EvmConfig
}

function JoyIdWallet ({
  chains,
  options,
}: JoyIdWalletOptions): Wallet
```

## Usage

Check out [RainbowKit Guide](/guide/evm/adapters/rainbowkit).
