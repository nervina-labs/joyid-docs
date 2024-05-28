<template>
  <div v-if="address" class="w-full">
    <h2 class="mb-4 text-lg text-center">Sign Event</h2>
    <label class="label">Event:</label>
    <textarea class="textarea textarea-bordered w-full h-60 mb-4" placeholder="Signature"
      :value="JSON.stringify(event, null, 4)" disabled></textarea>
    <button class="btn btn-primary mb-4 mr-4" @click="onSign">Sign</button>
    <button class="btn btn-primary btn-outline mb-4" @click="onVerify">Verify</button>
    <div class="divider"></div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { nostr } from "@joyid/nostr";
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
    const event = ref(blankEvent);

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
</script>
