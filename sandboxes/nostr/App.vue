<template>
  <div id="app">
    <div v-if="pubkey">
      <h1 class="text-xl mb-4">Connected: {{ pubkey }}</h1>
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
</script>
