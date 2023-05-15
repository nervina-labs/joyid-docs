# `JoyIDProvider`

`JoyIDProvider` is a sub-class of [`JsonRpcProvider`](https://docs.ethers.org/v5/api/providers/jsonrpc-provider/). It the same interface/API as `Provider` in `ethers.js to interact with AXON node, but it also provides some JoyID specific methods.

For more information about `Provider`, please refer to [ethers.js documentation](https://docs.ethers.org/v5/api/providers/provider/).

## Methods

### `constructor`

Create a new `JoyIDProvider` instance.

```typescript
constructor(config: DappConfig)
```

### `getConfig`

Get the config of the provider.

```typescript
function getConfig(): DappConfig
```

### `connect`

Connect JoyID Wallet to your app.

```typescript
function connect(popupConfig?: PopupConifg): Promise<ConnectResponse>
```

### `getSigner`

Get the signer of an address.

```typescript
function getSigner(address: string): JoyIDSigner
```

### Types

```typescript
interface DappConfig {
  /**
   * The name of your app
   */
  name?: string
  /**
   * The logo of your app
   */
  logo?: string
  /**
   * The RPC URL of the AXON node that your app is using, defaults to https://axon-rpc.internal.joyid.dev
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

interface PopupConifg {
  /**
   * Default is 300s
   */
  timeoutInSeconds?: number
  /**
   * popup instance
   */
  popup?: Window
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
import { JoyIDProvider } from '@joyid/ethers'

const provider = new JoyIDProvider({
  name: 'MyApp',
  logo: 'https://myapp.com/logo.png',
  rpcURL: 'https://axon-rpc.internal.joyid.dev',
})

// connect to JoyID Wallet
const res = await provider.connect()

const connectedAddress = res.ethAddress

// get balance of an address
const balance = await provider.getBalance(connectedAddress)
// { BigNumber: "37426320346873870455" }

// get JoyID signer and sign a transaction
const signer = provider.getSigner(connectedAddress)
const tx = await signer.sendTransaction({ to: '0x...', value: '100', from: connectedAddress })
```
