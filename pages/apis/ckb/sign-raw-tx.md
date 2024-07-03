# `signRawTransaction`

Open a JoyID app popup window to sign a CKB raw transaction.

## Types

```typescript
function signRawTransaction(
  tx: Transaction,
  signerAddress: string,
  config?: SignConfig
): Promise<Transaction>

interface Transaction {
  cellDeps: CellDep[]
  hash?: Hash
  headerDeps: Hash[]
  inputs: Input[]
  outputs: Output[]
  outputsData: HexString[]
  version: HexNumber
  witnesses: HexString[]
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
  /**
   * The witnessIndex represents the positions of JoyID cells in inputs, and the default value is an empty array.
   */
  witnessIndexes?: number[]
}

/**
 * Get the subkey unlock from CoTA aggregator to build JoyID witness.
 * @param aggregatorUrl The CoTA aggregator url
 * @param connection The response of JoyID function `connect`
 */
function getSubkeyUnlock(
  aggregatorUrl: string,
  connection: AuthResponseData
): Promise<string>

// Get JoyID contract cell dep
function getJoyIDCellDep(isMainnet: boolean)

// Get JoyID lock script whose args is empty
function getJoyIDLockScript(isMainnet: boolean)

// Get CoTA contract cell dep
function getCotaCellDep(isMainnet: boolean)

// Get CoTA type script whose args is empty
function getCotaTypeScript(isMainnet: boolean)
```

## Example

### signRawTransaction

```js
import { signRawTransaction, getSubkeyUnlock } from '@joyid/ckb'
import JSBI from 'jsbi'

async function joyidSignRawTransaction() {
  try {
    const signedTx = await signRawTransaction({
      "version": "0x0",
      "cellDeps": [
          {
              "outPoint": {
                  "txHash": "0x4dcf3f3b09efac8995d6cbee87c5345e812d310094651e0c3d9a730f32dc9263",
                  "index": "0x0"
              },
              "depType": "depGroup"
          },
          {
              "outPoint": {
                  "txHash": "0x7bf3899cf41879ed0319bf5312c9db5bf5620fff9ebe59556c261c48f0369054",
                  "index": "0x0"
              },
              "depType": "code"
          }
      ],
      "headerDeps": [],
      "inputs": [
          {
              "previousOutput": {
                  "txHash": "0x62c8488177f17a7868520c8f3f3dbbbfe2753412c23d1f472671c55f32839199",
                  "index": "0x2"
              },
              "since": "0x0"
          }
      ],
      "outputs": [
          {
              "capacity": "0x525433d00",
              "lock": {
                  "codeHash": "0xd23761b364210735c19c60561d213fb3beae2fd6172743719eff6920e020baac",
                  "hashType": "type",
                  "args": "0x0001f21be6c96d2103946d37a1ee882011f7530a92a7"
              },
              "type": {
                  "codeHash": "0x50fdea2d0030a8d0b3d69f883b471cab2a29cae6f01923f19cecac0f27fdaaa6",
                  "hashType": "type",
                  "args": "0xd28f286bd1c2998882656ccaa09b634abc1d14f584b8ad4e8132bdd1b7841c19"
              }
          },
          {
              "capacity": "0x1252e28b50",
              "lock": {
                  "codeHash": "0xd23761b364210735c19c60561d213fb3beae2fd6172743719eff6920e020baac",
                  "hashType": "type",
                  "args": "0x0001f21be6c96d2103946d37a1ee882011f7530a92a7"
              }
          }
      ],
      "outputsData": [
          "0x0814434b42204669737420496e736372697074696f6e04434b4249ac90307abd4a5dc3233fe26661e5f797de2da541bcd0f3b73bccde0ef6978cb10040075af0750700000000000000000000e8764817000000000000000000000000",
          "0x"
      ],
      "witnesses": [
          "0x10000000100000001000000010000000",
          "0x"
      ]
    })
    // send signed tx to blockchain
    const hash = await rpc.sendTransaction(signedTx, 'passthrough')
    console.log(txHash)
  } catch (e) {
    console.error(e)
  }
}
```

### Unlock with Subkey

`getSubkeyUnlock` is used to build JoyID witness with the sub key

```js
import { connect, getSubkeyUnlock, getCotaTypeScript } from '@joyid/ckb'

const config = {
  title: 'Example App',
  logo: 'https://example.com/logo.png',
}
try {
  const connection = await connect(config)

  if (connectData.keyType === 'sub_key') {
    // Build JoyID corresponding witness with subkey unlock entry
    const unlockEntry = await getSubkeyUnlock("aggregator-url", connection)
    const emptyWitness = {
      lock: '',
      inputType: '',
      outputType: append0x(unlockEntry),
    }
    const joyidWitness = serializeWitnessArgs(emptyWitness)

    // Get CoTA cell from CKB blockchain and append it to the head of the cellDeps list
    const cotaType = getCotaTypeScript(isMainnet)
    const cotaCells = await collector.getCells({ lock: anyLock, type: cotaType })
    if (!cotaCells || cotaCells.length === 0) {
      throw new NoCotaCellException("Cota cell doesn't exist")
    }
    const cotaCell = cotaCells[0]
    const cotaCellDep: CKBComponents.CellDep = {
      outPoint: cotaCell.outPoint,
      depType: 'code',
    }
    cellDeps = [cotaCellDep, ...cellDeps]
  }
} catch (e) {
  console.error(e)
}

```