import * as React from 'react'
import { nostr, logout, Event, getConnectedPubkey } from '@joyid/nostr'
// @ts-ignore
import { getBlankEvent, verifySignature } from 'nostr-tools'

interface Props {
  pubkey: string | null
}

const blankEvent = getBlankEvent() as Event<number>

blankEvent.content = Math.random().toString()

const SignEvent = ({ pubkey }: Props) => {
  const [event, setEvent] = React.useState<Event>(blankEvent)
  const onSign = async () => {
    const signedEvent = await nostr.signEvent(blankEvent)
    setEvent(signedEvent)
  }
  const onVerify = async () => {
    try {
      const res = verifySignature(event)
      alert(res)
    } catch (error: any) {
      alert(error.message)
    }
  }
  return pubkey ? (
    <div className="w-full">
      <h2 className="mb-4 text-lg text-center">Sign Event</h2>
      <label className="label">Event:</label>
      <textarea
        className="textarea textarea-bordered w-full h-60 mb-4"
        placeholder="Signature"
        value={JSON.stringify(event, null, 4)}
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

export default function App() {
  const [pubkey, setPubkey] = React.useState<string | null>(
    getConnectedPubkey()
  )
  const onConnect = async () => {
    try {
      const res = await nostr.getPublicKey()
      setPubkey(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="app">
      {pubkey ? (
        <>
          <h1 className="text-xl mb-4">Connected: {pubkey}</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              logout()
              setPubkey(null)
            }}>
            Disconnect
          </button>
          <div className="divider" />
        </>
      ) : (
        <button className="btn btn-primary" onClick={onConnect}>
          Connect JoyID
        </button>
      )}
      {pubkey ? <SignEvent pubkey={pubkey} /> : null}
    </div>
  )
}
