# `signCotaNFTTx`

Open a JoyID app popup window to sign a CKB CoTA NFT transaction.

## Types

```typescript
function signTransaction(
  // The tx that was requested to be signed
  tx: CotaNFTTransactionRequest,
  config?: SignConfig,
): Promise<string>

interface CotaNFTTransactionRequest {
  /**
   * The from ckb address
   */
  from: string
  /**
   * The to ckb address
   */
  to: string
  /**
   * The CoTA NFT unique id which includes cota id and token index
   */
  tokenKey?: string
  /**
   * The cota id of CoTA NFT
   */
  tokenId?: string
  /**
   * The token index of CoTA NFT
   */
  tokenIndex?: string
}

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
   * The network that your app is using, defaults to JoyID testnet
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
export interface SignCotaNFTResponseData {
  /**
   * The CKB transaction
   */
  tx: CKBTransaction
}
```

## Example

```js
import { signCotaNFTTx } from '@joyid/ckb'

async function joyidSignCotaNFT() {
  try {
    // send the NFT whose tokenKey is 0x003688bb1cba009d89dd3f1c8a6027a0c5851e8600000006 to
    // ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqqxv6drphrp47xalweq9pvr6ll3mvkj225quegpcw
    const signedTx = await signCotaNFTTx({
      from: 'ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqq9t8kvtsy2u2yz6s49r3fzk8dnt2rudy5gg5hfnm',
      to: 'ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqqxv6drphrp47xalweq9pvr6ll3mvkj225quegpcw',
      tokenKey: '0x003688bb1cba009d89dd3f1c8a6027a0c5851e8600000006',
    })
    // send signed tx to blockchain
    const hash = await rpc.sendTransaction(signedTx, 'passthrough')
    console.log(txHash)
  } catch (e) {
    console.error(e)
  }
}
```
