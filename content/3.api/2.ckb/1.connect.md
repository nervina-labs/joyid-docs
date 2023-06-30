# `connect`

Connect JoyID Wallet to your app.

## Types

```typescript
function connect(config?: SignConfig): Promise<ConnectResponse>

interface SignConfig extends PopupConfig {
  /**
   * The name of your app
   */
  name?: string
  /**
   * The logo of your app
   */
  logo?: string
  /**
   * The RPC URL of the ckb node that your app is using
   */
  rpcURL?: string
  /**
   * The network that your app is using, defaults to JoyID AXON devnet
   */
  network?: Network
  /**
   * The URL of JoyID app url that your app is integrated with, defaults to https://app.joyid.dev
   */
  joyidAppURL?: string
  /**
   * The URL of JoyID server url that your app is integrated with
   */
  joyidServerURL?: string
}

interface PopupConfig {
  /**
   * Default is 300s
   */
  timeoutInSeconds?: number
  /**
   * popup instance
   */
  popup?: Window
}

interface Network {
  name: string
  chainId: number
}

interface ConnectResponse {
  // The CKB address of the authenticated user
  address: string
  // The Ethereum address of the authenticated user
  ethAddress: string
  // The public key of the authenticated user
  pubkey: string
  /**
   * key type of the authenticated user
   */
  keyType: 'main_key' | 'sub_key' | 'main_session_key' | 'sub_session_key'
}
```

## Example

```js
import { connect } from '@joyid/ckb'

async function joyidConnect() {
  const config = {
    title: 'Example App',
    logo: 'https://example.com/logo.png',
  }
  try {
    const res = await connect(config)
    console.log(res)
  } catch (e) {
    console.error(e)
  }
}
```
