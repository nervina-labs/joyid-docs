# `signTransaction`

Open a JoyID app popup window to sign a CKB transaction.

## Types

```typescript
function signTransaction(
  // The tx that was requested to be signed
  tx: CkbTransactionRequest,
  config?: SignConfig,
): Promise<string>

interface CkbTransactionRequest {
  /**
   * The from ckb address
   */
  from: string
  /**
   * The to ckb address
   */
  to: string
  /**
   * The amount of ckb native token in Shannon
   */
  amount: string
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

export interface SignCkbTxResponseData {
  /**
   * The CKB transaction
   */
  tx: CKBTransaction
}
```

## Example

```js
import { signTransaction } from '@joyid/ckb'
import JSBI from 'jsbi'

async function joyidSignTransaction() {
  try {
    // send 100 ckb to `ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqqxv6drphrp47xalweq9pvr6ll3mvkj225quegpcw`
    const signedTx = await signTransaction({
      from: 'ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqq9t8kvtsy2u2yz6s49r3fzk8dnt2rudy5gg5hfnm',
      to: 'ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqqxv6drphrp47xalweq9pvr6ll3mvkj225quegpcw',
      value: JSBI.BigInt(100 * 10 ** 8).toString(),
    })
    // send signed tx to blockchain
    const hash = await rpc.sendTransaction(signedTx, 'passthrough')
    console.log(txHash)
  } catch (e) {
    console.error(e)
  }
}
```
