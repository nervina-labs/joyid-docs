# nostr

`nostr` implemented [NIP-07](https://github.com/nostr-protocol/nips/blob/master/07.md). The `nostr` object may be made available by web browsers or extensions and websites or web-apps may make use of it after checking its availability.

JoyID has currently only implemented the basic methods of NIP-07: `getPublicKey()` and `signEvent()`.

## Types

```ts
// returns a public key as hex
nostr.getPublicKey(): Promise<string>
// takes an event object, adds `id`, `pubkey` and `sig` and returns it
nostr.signEvent(event: { created_at: number, kind: number, tags: string[][], content: string }): Promise<Event>
```

## Usage

Check out the [NIP-07 Guide](/guide/nostr/nip-07).
