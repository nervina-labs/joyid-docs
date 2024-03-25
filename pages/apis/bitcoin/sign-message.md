# signMessage

Sign a message with the current account.

## Parameters

- `msg - string`: a string to sign
- `type - string`:  (Optional) "ecdsa" | "bip322-simple". default is "ecdsa"
- `signerAddress - string`: (Optional) the address of the signer. default is the current account address.

## Returns

`Promise<string>`: the signature.

## Example

```js
// sign by ecdsa
try {
  let res = await signMessage("abcdefghijk123456789");
  console.log(res)
} catch (e) {
  console.log(e);
}

> G+LrYa7T5dUMDgQduAErw+i6ebK4GqTXYVWIDM+snYk7Yc6LdPitmaqM6j+iJOeID1CsMXOJFpVopvPiHBdulkE=

// verify by ecdsa
import { verifyMessage } from "@unisat/wallet-utils";
const pubkey = "026887958bcc4cb6f8c04ea49260f0d10e312c41baf485252953b14724db552aac";
const message = "abcdefghijk123456789";
const signature = "G+LrYa7T5dUMDgQduAErw+i6ebK4GqTXYVWIDM+snYk7Yc6LdPitmaqM6j+iJOeID1CsMXOJFpVopvPiHBdulkE=";
const result = verifyMessage(pubkey,message,signature);
console.log(result);

> true


// sign by bip322-simple
import { message } from '@unisat/wallet-sdk'
try {
  let res = await signMessage("abcdefghijk123456789","bip322-simple");
  console.log(res)
  // verify bip322-simple
  const isVerified = message.verifyMessageOfBIP322Simple(
    address,
    "abcdefghijk123456789", // message
    res, // signature
  )
} catch (e) {
  console.log(e);
}

> AkcwRAIgeHUcjr0jODaR7GMM8cenWnIj0MYdGmmrpGyMoryNSkgCICzVXWrLIKKp5cFtaCTErY7FGNXTFe6kuEofl4G+Vi5wASECaIeVi8xMtvjATqSSYPDRDjEsQbr0hSUpU7FHJNtVKqw=
```
