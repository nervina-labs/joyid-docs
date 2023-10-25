# `signChallenge`

Open a JoyID app popup window to sign message.

## Types

```typescript
function signChallenge(
  // The challenge that was requested to be signed
  challenge: string | Uint8Array,
  // The address of the signer
  signerAddress: string,
  config?: SignConfig,
): Promise<signChallengeResponse>

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
   * The network that your app is using, defaults to JoyID ckb testnet
   */
  network?: 'mainnet' | 'testnet'
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

interface signChallengeResponse {
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
```

## Example

```js
import { signChallenge } from '@joyid/ckb'

async function joyidSign() {
  try {
    const res = await signChallenge(
      'Sign this message',
      'ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqqxv6drphrp47xalweq9pvr6ll3mvkj225quegpcw',
      {
        logo: 'https://example.com/logo.png',
        name: 'Example App',
      },
    )
    console.log(res)
  } catch (e) {
    console.error(e)
  }
}
```

## Details

Note that `challenge` and `message` are two different concepts, in short:

`challenge` is what you as a developer want JoyID to sign.

`message` is what JoyID actually signs, which is a combination of `challenge` and some other data (such as authenticator data, etc.), and `challenge` will be always included in `message`.

For more information, you can check out the [WebAuthn Spec](https://www.w3.org/TR/webauthn-2/#sctn-op-get-assertion).
