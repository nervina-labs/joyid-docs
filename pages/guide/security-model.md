# Security Model

JoyID Wallet is a hybrid wallet, seamlessly blending the strengths of both software and hardware components. While it may not reach the absolute security level of hardware wallets, this strategic fusion empowers us to offer an accessible and reasonably secure decentralized non-custodial wallet for everyday blockchain interactions for everyone.

A key aspect that intrigues many is how we achieve Signature Transformation. Notably, Passkey lacks the common secp256k1 signing capability found in blockchain technology. The secp256k1 signing process involves the Passkey hardware device in generating the r1 signature first. Following this initial step, we conduct additional calculations in a browser environment to derive a stable entropy value from the unchanging part of the r1 algorithm. This entropy value is then used to produce the k1 keys for Ethereum and other blockchain transaction signatures. Throughout this intricate process, we prioritize two primary security concerns. Firstly, while the k1 private key necessitates user biometric authentication for each use, there exists a brief 50ms time window in the browser environment where a potential security risk may arise, hence our classification as a hybrid wallet. Secondly, the r1 to k1 conversion employs a non-standard cryptographic scheme, securely nested within the Passkey architecture. This r1 key remains hidden and is never exposed in any transaction, accessible solely through the user's own biometric information.

Under what circumstances could a hacker potentially compromise JoyID and access a user's assets? For such an occurrence, the hacker would need browser console access to the user's device and the ability to manipulate the user into biometrically authenticating an insecure transaction. The former condition is a demanding prerequisite, requiring remote access to the user's device, the opening of the console, inputting malicious scripts, or guiding the user to manually enter a lengthy malicious script into the browser's address bar. In fact, if a hacker possesses this level of capability, they could potentially manipulate nearly all assets on the user's device.

In summary:

- **Security, Hardware wallet > JoyID Wallet > Software wallet (non-custodial) > Custodial wallet**
- UX friendliness, JoyID Wallet > Custodial wallet > Software wallet (non-custodial) > Hardware wallet

We appreciate your trust and support as we endeavor to provide a secure and convenient wallet solution. Together, we will continue enhancing the security and user experience of JoyID Passkey Wallet.
