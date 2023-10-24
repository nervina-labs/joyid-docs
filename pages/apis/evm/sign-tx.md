# signTransaction

Signs `tx`, returning the fully signed serialized transaction. Note that `gasLimit`, `gasPrice`, `maxPriorityFeePerGas`, `maxFeePerGas` is a **string** that can be passed to [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). eg.

```js
// ✅ valid
const gasPriceString = "9007199254740991"
// ✅ valid
const gasPriceHex = "0x1fffffffffffff"
// ✅ valid
const gasPriceOctal = "0o377777777777777777"
// ❌ invalid
const gasPriceNumber = 9007199254740991
// ❌ invalid
const gasPriceBigInt = 9007199254740991n
// ❌ invalid
const gasPriceBigInt2 = BigInt(9007199254740991)
```

## Types

```ts
function signTransaction(tx: TransactionRequest, signerAddress?: string): Promise<string>

interface TransactionRequest {
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string

  to?: string
  from?: string
  nonce?: number

  gasLimit?: string
  gasPrice?: string

  data?: string
  value?: string
  chainId?: number

  accessList?: AccessList

  customData?: Record<string, any>
  ccipReadEnabled?: boolean
}

type AccessList = Array<{ address: EthAddress; storageKeys: Array<string> }>
```

## Example

```js
import { signTransaction } from '@joyid/evm'

async function signTransactionOnClick(tx) {
  const signedTx = await signTransaction(tx)
  await provider.sendTransaction(signedTx)
}
```
