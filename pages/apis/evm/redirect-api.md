# Redirect API

## connectWithRedirect

Connect JoyID and redirect to a specified URL. This function has same parameters as [`connect`](/apis/evm/connect) function, except for first parameter is a redirect URL.

```ts
function connectWithRedirect (
  redirectURL: string,
  config?: EvmConfig
): void
```

## connectCallback

Get an ethereum address of redirect URL from `connectWithRedirect` specified URL.

This function accepts one optional url parameter. If url parameter is not specified, it will use `window.location.href` as default.

```ts
function connectCallback (uri?: string): { state?: any; address: string }
```

## signMessageWithRedirect

Sign message and redirect to a specified URL.

This function has same parameters as [`signMessage`](/apis/evm/sign-message) function, except for first parameter is a redirect URL.

```ts
function signMessageWithRedirect (
  redirectURL: string,
  message: string | Uint8Array,
  signerAddress?: string,
  config?: EvmConfig
): void
```

## signMessageCallback

Get signature from `signMessageWithRedirect` specified URL.

This function accepts one optional url parameter. If url parameter is not specified, it will use `window.location.href` as default.

```ts
function signMessageCallback (uri?: string): { state?: any; signature: string }
```

## signTypedDataWithRedirect

Sign typed data and redirect to a specified URL.

This function has same parameters as [`signTypedData`](/apis/evm/sign-typed-data) function, except for first parameter is a redirect URL.

```ts
function signTypedData  (
  redirectURL: string,
  typedData: TypedData,
  signerAddress?: string,
  config?: SignConfig
): Promise<Hex>
```

## signTypedDataCallback

Get signature from `signTypedDataWithRedirect` specified URL.

This function accepts one optional url parameter. If url parameter is not specified, it will use `window.location.href` as default.

```ts
function signTypedDataCallback (uri?: string): { state?: any; signature: string }
```

## signTransactionWithRedirect

Sign transaction and redirect to a specified URL.

This function has same parameters as [`signTransaction`](/apis/evm/sign-tx) function, except for first parameter is a redirect URL.

```ts
function signTransactionWithRedirect (
  redirectURL: string,
  tx: TransactionRequest,
  signerAddress?: string,
  config?: EvmConfig
): void
```

## signTransactionCallback

Get signed transaction from `signTransactionWithRedirect` specified URL.

This function accepts one optional url parameter. If url parameter is not specified, it will use `window.location.href` as default.

```ts
function signTransactionCallback (uri?: string): { state?: any; tx: string }
```

## sendTransactionWithRedirect

Send transaction and redirect to a specified URL.

This function has same parameters as [`sendTransaction`](/apis/evm/send-tx) function, except for first parameter is a redirect URL.

```ts
function sendTransactionWithRedirect (
  redirectURL: string,
  tx: TransactionRequest,
  signerAddress?: string,
  config?: EvmConfig
): void
```

## sendTransactionCallback

Get transaction hash from `sendTransactionWithRedirect` specified URL.

This function accepts one optional url parameter. If url parameter is not specified, it will use `window.location.href` as default.

```ts
function sendTransactionCallback (uri?: string): { state?: any; tx: string }
```

## Usage

Check out the [JoyID Evm Demo ↗](https://github.com/nervina-labs/joyid-evm-demo/) for a full example of how to use Redirect API.
