# `JoyIDSigner`

`JoyIDSigner` is sub-class of `Signer` in `ethers.js`, it provides the same interface/API as `Signer` in `ethers.js` to interact with JoyID, but it also provides some JoyID specific methods.

For more information about `Signer`, please refer to [ethers.js documentation](https://docs.ethers.io/v5/api/signer/){:target="\_blank"}.

## Methods

### `signChallenge`

Open a JoyID app popup window to sign message.

```typescript
function signChallenge(challenge: string | Uint8Array, popupConfig?: PopupConfig): Promise<SignMessageResponse>
```

::callout{type="info"}

#summary
`challenge` vs. `message`

#content
You may have noticed that in JoyID we have been signing `challenge` instead of `message`. Because `challenge` and `message` are two different concepts, in short:

`challenge` is what you as a developer want JoyID to sign.

`message` is what JoyID actually signs, which is a combination of `challenge` and some other data (such as authenticator data, etc.), and `challenge` will be always included in `message`.

For more information, you can check out the [WebAuthn Spec](https://www.w3.org/TR/webauthn-2/#sctn-op-get-assertion){:target="\_blank"}.

::

::list{type="info"}

- See also: [Guide - Verify Signature](/guide/verification/verify-signature) with a live demo

::

### `signTransaction`

Open a JoyID app popup window to sign transaction.

```typescript
function signTransaction(tx: TransactionRequest, popupConfig?: PopupConfig): Promise<string>
```

### `sendTransaction`

Open a JoyID app popup window to sign transaction and send it.

```typescript
function sendTransaction(tx: TransactionRequest, popupConfig?: PopupConfig): Promise<providers.TransactionResponse>
```

### `sendUncheckedTransaction`

Open a popup window in the JoyID app to sign and send the transaction, regardless of the transaction's status.

```typescript
function sendUncheckedTransaction(
  tx: TransactionRequest,
  popupConfig?: PopupConfig
): Promise<TxHash extends string>
```

### Types

```typescript
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

interface SignMessageResponse {
  // The public key of the authenticated user
  pubkey: string
  /**
   * The challenge that was requested to be signed
   */
  challenge: string
  /**
   * The message that was signed by the authenticator,
   * Note that the message may not be the original raw message,
   * but is combined with client data and authenticator data
   * according to [WebAuthn Spec](https://www.w3.org/TR/webauthn-2/#sctn-op-get-assertion).
   */
  message: string
  /**
   * The signature of the message that was signed by the authenticator
   */
  signature: string
  /**
   * key type of the authenticated user
   */
  keyType: 'main_key' | 'sub_key' | 'main_session_key' | 'sub_session_key'

  /**
   * The algorithm of the signature.
   * corresponds to the `value` field of the [COSE](https://www.iana.org/assignments/cose/cose.xhtml#algorithms) structure
   */
  alg: number

  /**
   * The attestation of the signature,
   * only available when keyType is `main_session_key` or `sub_session_key`
   */
  attestation?: string
}

interface TransactionRequest {
  to?: string
  from: string
  nonce?: string
  gasLimit?: string
  gasPrice?: string
  data?: string
  value?: string
  chainId?: number
  customData?: Record<string, any>
  ccipReadEnabled?: boolean
}
```

## Details

Some methods in `JoyIDSigner` are different from `Signer` in `ethers.js`:

- `signMessage()`: not supported in `JoyIDSigner`, use `signChallenge` instead.
- `_legacySignMessage()`: not supported in `JoyIDSigner`, use `signChallenge` instead.
- `populateTransaction()`: `JoyIDSigner` DO NOT populate transaction, the transaction will be populated by JoyID App instead.

## Example

```typescript
import { JoyIDProvider } from '@joyid/ethers'

const provider = new JoyIDProvider({
  name: 'MyApp',
  logo: 'https://myapp.com/logo.png',
  rpcURL: 'https://axon-rpc.internal.joyid.dev',
})

// connect to JoyID Wallet
const res = await provider.connect()
const connectedAddress = res.ethAddress

// get JoyID signer and sign a transaction
const signer = provider.getSigner(connectedAddress)
const tx = await signer.sendTransaction({
  to: '0x...',
  value: '100',
  from: connectedAddress,
})
```
