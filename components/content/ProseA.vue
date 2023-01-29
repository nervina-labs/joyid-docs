<script lang="ts">
export default {
    props: {
        href: {
            type: String,
        },
        target: {
            type: String,
        },
        to: {
            type: String,
        }
    },
    computed: {
        link() {
            return this.to ?? this.href
        },
        isExternal() {
            return this.link?.startsWith('http')
        }
    },
}
</script>

<template>
    <a v-if="isExternal" :href="link" target="_blank">
        <slot />
    </a>
    <NuxtLink v-if="!isExternal" :href="link" :target="target">
        <slot />
    </NuxtLink>
</template>

<style scoped>
a {
    border-bottom: var(--prose-a-borderBottom);
    border-style: var(--prose-a-borderStyle-default);
    font-weight: var(--prose-a-fontWeight);
    padding-bottom: var(--prose-a-borderDistance);
    -webkit-text-decoration: var(--prose-a-textDecoration);
    text-decoration: var(--prose-a-textDecoration);
}
</style>