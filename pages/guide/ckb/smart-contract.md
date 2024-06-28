# JoyID Smart Contract

## Introduction

JoyID smart contract is based on [Nervos CKB](https://docs.nervos.org/) and provides on-chain Passkey crypto verification for JoyID wallet. JoyID smart contract is a [Lock Script](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0022-transaction-structure/0022-transaction-structure.md#lock-script) and it will success when the Passkey signature and CKB transaction are valid, otherwise, it will fail.

The JoyID smart contract has not yet undergone a security audit, so it is not open source now.

## Error Codes and Reasons

When the JoyID smart contract verification fails, you will receive an error code. This error code will indicate the cause of the error, which you can use to check and update the CKB transaction accordingly.

The following are the JoyID smart contract common error codes and their corresponding error reasons:

| Error Code |                                                       Reason                                                             |
|------------|--------------------------------------------------------------------------------------------------------------------------|
| 6          | The public key hash parsed from the witness does not match the one requested in the script.                              |
| 7          | The length of the witness is invalid                                                                                     |
| 8          | The unlock mode parsed from the witness is invalid which should be Secp256r1 main key unlock or Secp256r1 sub key unlock |
| 11         | The Secp256r1 signature verification fails, and please check the WitnessArgs.Lock of the corresponding JoyID input       |
| 12         | The calculated challenge which includes the sigHashAll message cannot be found in WebAuthn ClientData                    |
| 13         | The CoTA SMT root parsed from the CoTA cell dep is invalid                                                               |
| 14         | The sub key SMT proof verification fails                                                                                 |
| 21         | The CoTA cell lock script from cell deps does not match.                                                                 |


## JoyID Smart Contract Deployment Information

JoyID smart contract has been deployed on Nervos CKB Mainnet and Testnet and the following are the deployment information:

### Mainnet Deployment

```shell
code_hash: 0xd00c84f0ec8fd441c38bc3f87a371f547190f2fcff88e642bc5bf54b9e318323
hash_type: type

tx_hash: 0xf05188e5f3a6767fc4687faf45ba5f1a6e25d3ada6129dae8722cb282f262493
index: 0x0
dep_type: dep_group
```

### Testnet Deployment

```shell
code_hash: 0xd23761b364210735c19c60561d213fb3beae2fd6172743719eff6920e020baac
hash_type: type

tx_hash: 0x4dcf3f3b09efac8995d6cbee87c5345e812d310094651e0c3d9a730f32dc9263
index: 0x0
dep_type: dep_group
```
