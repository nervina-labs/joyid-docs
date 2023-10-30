export const appTsxFile = `import * as React from "react";
import { nostr, logout, Event, getConnectedPubkey } from "@joyid/nostr";
import { getBlankEvent, verifySignature } from "nostr-tools";

interface Props {
  pubkey: string | null;
}

const blankEvent = getBlankEvent() as Event<number>;

blankEvent.content = Math.random().toString();

const SignEvent = ({ pubkey }: Props) => {
  const [event, setEvent] = React.useState<Event>(blankEvent);
  const onSign = async () => {
    const signedEvent = await nostr.signEvent(blankEvent);
    setEvent(signedEvent);
  };
  const onVerify = async () => {
    try {
      const res = verifySignature(event);
      alert(res);
    } catch (error) {
      alert(error.message);
    }
  };
  return pubkey ? (
    <div className="w-full">
      <h2 className="mb-4 text-lg text-center">Sign Event</h2>
      <label className="label">Event:</label>
      <textarea
        className="textarea textarea-bordered w-full h-60 mb-4"
        placeholder="Signature"
        value={JSON.stringify(event, null, 4)}
        disabled
      ></textarea>

      <button className="btn btn-primary mb-4 mr-4" onClick={onSign}>
        Sign
      </button>

      <button className="btn btn-primary btn-outline mb-4" onClick={onVerify}>
        Verify
      </button>

      <div className="divider"></div>
    </div>
  ) : null;
};

export default function App() {
  const [pubkey, setPubkey] = React.useState<string | null>(
    getConnectedPubkey(),
  );
  const onConnect = async () => {
    try {
      const res = await nostr.getPublicKey();
      setPubkey(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="app">
      {pubkey ? (
        <>
          <h1 className="text-xl mb-4">{\`Connected: \${pubkey}\`}</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              logout();
              setPubkey(null);
            }}
          >
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
  );
}`

export const appVueFile = `<template>
  <div id="app">
    <div v-if="pubkey">
      <h1 class="text-xl mb-4">Connected: {{pubkey}}</h1>
      <button class="btn btn-primary" @click="disconnect">Disconnect</button>
      <div class="divider" />
      <SignEvent :address="pubkey" />
    </div>
    <button v-else class="btn btn-primary" @click="onConnect">
      Connect JoyID
    </button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { nostr, logout, getConnectedPubkey } from "@joyid/nostr";
import SignEvent from "./SignEvent.vue";

export default {
  components: { SignEvent },
  setup() {
    const pubkey = ref<string | null>(getConnectedPubkey());

    const onConnect = async () => {
      try {
        const res = await nostr.getPublicKey();
        pubkey.value = res;
      } catch (error) {
        console.log(error);
      }
    };

    const disconnect = () => {
      logout();
      pubkey.value = null;
    };

    return { pubkey, onConnect, disconnect };
  },
};
</script>`

export const signEventVueFile = `<template>
  <div v-if="address" class="w-full">
    <h2 class="mb-4 text-lg text-center">Sign Event</h2>
    <label class="label">Event:</label>
    <textarea class="textarea textarea-bordered w-full h-60 mb-4" placeholder="Signature" :value="JSON.stringify(event, null, 4)" disabled></textarea>
    <button class="btn btn-primary mb-4 mr-4" @click="onSign">Sign</button>
    <button class="btn btn-primary btn-outline mb-4" @click="onVerify">Verify</button>
    <div class="divider"></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { nostr, Event } from "@joyid/nostr";
import { getBlankEvent, verifySignature } from "nostr-tools";

const blankEvent = getBlankEvent();
blankEvent.content = Math.random().toString();

export default defineComponent({
  props: {
    address: {
      type: String,
      default: null,
    },
  },
  setup() {
    const event = ref<Event>(blankEvent);

    const onSign = async () => {
      const signedEvent = await nostr.signEvent(blankEvent);
      event.value = signedEvent;
    };

    const onVerify = async () => {
      try {
        const res = verifySignature(event.value);
        alert(res);
      } catch (error) {
        alert(error.message);
      }
    };

    return { event, onSign, onVerify };
  },
});
</script>`
