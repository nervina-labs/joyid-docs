import * as React from 'react'
import { verifyMessage, parseEther, Hex } from 'viem'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSignMessage,
} from 'wagmi'
import { SignTypedData } from './typedData'

const SignMessage = ({ address }: { address?: Hex }) => {
  const [message, setMessage] = React.useState('Hello world')
  const [signature, setSignature] = React.useState<Hex>('0x')
  const { signMessageAsync } = useSignMessage()
  const onSign = async () => {
    const sig = await signMessageAsync({
      message,
    })
    setSignature(sig)
  }
  const onVerify = async () => {
    try {
      const res = await verifyMessage({
        message,
        signature,
        address: address!,
      })
      alert(res)
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }
  return address ? (
    <div className="w-full">
      <h2 className="mb-4 text-lg text-center">Sign Message</h2>
      <label className="label">Message:</label>
      <input
        className="input input-bordered w-full mb-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <label className="label">Signature:</label>
      <textarea
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Signature"
        value={signature}
        disabled></textarea>

      <button className="btn btn-primary mb-4 mr-4" onClick={onSign}>
        Sign
      </button>

      <button className="btn btn-primary btn-outline mb-4" onClick={onVerify}>
        Verify
      </button>

      <div className="divider"></div>
    </div>
  ) : null
}

const SendTransaction = ({ address }: { address?: Hex }) => {
  const [toAddress, setToAddress] = React.useState<Hex>(
    '0xA6eBeCE9938C3e1757bE3024D2296666d6F8Fc49'
  )
  const [amount, setAmount] = React.useState('0.01')
  const { sendTransactionAsync } = useSendTransaction()
  const onSign = async () => {
    const signedTx = await sendTransactionAsync({
      to: toAddress,
      value: parseEther(amount),
      account: address,
    })
    alert(`tx hash: ${signedTx}`)
  }
  return address ? (
    <div className="w-full">
      <h2 className="mb-4 text-lg text-center">Send Transaction</h2>
      <label className="label">To Address:</label>
      <input
        className="input input-bordered w-full mb-4"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value as Hex)}
      />
      <label className="label">Amount:</label>
      <input
        className="input input-bordered w-full mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="btn btn-primary" onClick={onSign}>
        Send
      </button>
      <div className="divider"></div>
    </div>
  ) : null
}

export function App() {
  const { address, status } = useAccount()
  const { connect, connectors } = useConnect()
  const connecting = status === 'connecting' || status === 'reconnecting'
  const { disconnect } = useDisconnect()
  return (
    <div id="app">
      {address ? (
        <>
          <h1 className="text-xl mb-4">{`Connected: ${address}`}</h1>
          <button className="btn btn-primary" onClick={() => disconnect()}>
            Disconnect
          </button>
          <div className="divider" />
        </>
      ) : (
        <button
          className="btn btn-primary"
          disabled={connecting}
          onClick={() =>
            connect({
              connector: connectors[0],
            })
          }>
          {connecting ? (
            <span className="loading loading-spinner"></span>
          ) : null}
          Connect JoyID
        </button>
      )}
      <div className="divider"></div>
      <SignMessage address={address} />
      <SendTransaction address={address} />
      <SignTypedData address={address} />
    </div>
  )
}
